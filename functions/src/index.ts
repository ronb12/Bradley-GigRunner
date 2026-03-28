import {setGlobalOptions} from "firebase-functions";
import {onCall, onRequest} from "firebase-functions/https";
import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import {defineSecret} from "firebase-functions/params";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import Stripe from "stripe";

setGlobalOptions({maxInstances: 10});

admin.initializeApp();
const db = admin.firestore();

// ─── Secrets (set via: firebase functions:secrets:set STRIPE_SECRET_KEY) ─────
const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");

// ─────────────────────────────────────────────────────────────────────────────
// STRIPE: Create Checkout Session
// Called from frontend → redirects customer to Stripe-hosted checkout page
// ─────────────────────────────────────────────────────────────────────────────
export const createCheckoutSession = onCall(
  {secrets: [STRIPE_SECRET_KEY]},
  async (request) => {
    if (!request.auth) {
      throw new Error("You must be signed in to checkout.");
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY.value(), {
      apiVersion: "2024-06-20",
    });

    const {orderId, items, deliveryFee, userId} = request.data as {
      orderId: string;
      items: Array<{name: string; price: number; quantity: number}>;
      deliveryFee: number;
      userId: string;
    };

    if (!orderId || !items?.length) {
      throw new Error("Missing orderId or items.");
    }

    // Build line items from cart
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {name: item.name},
        unit_amount: Math.round(item.price * 100), // cents
      },
      quantity: item.quantity,
    }));

    // Add delivery fee as separate line item
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {name: "Delivery Fee"},
        unit_amount: Math.round(deliveryFee * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `https://bradley-gigrunner.web.app/customer-dashboard.html?payment_success=true&order_id=${orderId}`,
      cancel_url: `https://bradley-gigrunner.web.app/customer-dashboard.html?payment_cancelled=true`,
      metadata: {orderId, userId},
      // Auto-fill customer email if available
      customer_email: request.auth.token.email ?? undefined,
    });

    logger.info(`Stripe session created for order ${orderId}: ${session.id}`);
    return {url: session.url, sessionId: session.id};
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// STRIPE: Webhook — confirms payment and marks order as "confirmed"
// Register this URL in Stripe Dashboard → Developers → Webhooks:
//   https://us-central1-bradley-gigrunner.cloudfunctions.net/stripeWebhook
// Events to listen for: checkout.session.completed, payment_intent.payment_failed
// ─────────────────────────────────────────────────────────────────────────────
export const stripeWebhook = onRequest(
  {secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET]},
  async (req, res) => {
    const stripe = new Stripe(STRIPE_SECRET_KEY.value(), {
      apiVersion: "2024-06-20",
    });

    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        STRIPE_WEBHOOK_SECRET.value()
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      logger.error("Stripe webhook signature failed", msg);
      res.status(400).send(`Webhook Error: ${msg}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const {orderId, userId} = session.metadata as {orderId: string; userId: string};

      await db.collection("orders").doc(orderId).update({
        status: "confirmed",
        paymentStatus: "paid",
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent,
        paidAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      logger.info(`Order ${orderId} paid by ${userId}`);
    }

    if (event.type === "payment_intent.payment_failed") {
      const pi = event.data.object as Stripe.PaymentIntent;
      // Find order by paymentIntent and mark failed
      const snap = await db.collection("orders")
        .where("stripePaymentIntentId", "==", pi.id)
        .limit(1)
        .get();
      if (!snap.empty) {
        await snap.docs[0].ref.update({
          paymentStatus: "failed",
          status: "cancelled",
        });
      }
    }

    res.json({received: true});
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// FCM: Send push notification when an order's status changes
// Triggered automatically by Firestore writes to orders/{orderId}
// ─────────────────────────────────────────────────────────────────────────────
export const notifyOrderStatusChange = onDocumentUpdated(
  "orders/{orderId}",
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();

    // No change — skip
    if (!before || !after || before.status === after.status) return;

    const {orderId} = event.params;
    const userId: string = after.userId;
    const newStatus: string = after.status;

    const statusMessages: Record<string, {title: string; body: string; emoji: string}> = {
      confirmed: {
        title: "Order Confirmed!",
        body: "The restaurant has confirmed your order and will start preparing it soon.",
        emoji: "✅",
      },
      preparing: {
        title: "Being Prepared",
        body: "The kitchen is working on your order.",
        emoji: "👨‍🍳",
      },
      ready_for_pickup: {
        title: "Ready for Pickup",
        body: "Your order is ready! A driver is being assigned.",
        emoji: "🛵",
      },
      out_for_delivery: {
        title: "On the Way!",
        body: "Your driver has picked up your order and is heading to you.",
        emoji: "🚗",
      },
      delivered: {
        title: "Delivered!",
        body: "Your order has arrived. Enjoy your meal! 🎉",
        emoji: "🎉",
      },
      cancelled: {
        title: "Order Cancelled",
        body: "Your order has been cancelled. Contact support if you have questions.",
        emoji: "❌",
      },
    };

    const msgTemplate = statusMessages[newStatus];
    if (!msgTemplate) return;

    const fullTitle = `${msgTemplate.emoji} ${msgTemplate.title}`;

    // Always save in-app notification to Firestore (for notification bell)
    await db
      .collection("users")
      .doc(userId)
      .collection("notifications")
      .add({
        title: fullTitle,
        body: msgTemplate.body,
        orderId,
        status: newStatus,
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    // Try sending FCM push notification if user has a token saved
    const userDoc = await db.collection("users").doc(userId).get();
    const fcmToken: string | undefined = userDoc.data()?.fcmToken;

    if (!fcmToken) {
      logger.info(`No FCM token for user ${userId} — skipping push`);
      return;
    }

    try {
      await admin.messaging().send({
        token: fcmToken,
        notification: {
          title: fullTitle,
          body: msgTemplate.body,
        },
        data: {
          orderId,
          status: newStatus,
          type: "order_status",
        },
        webpush: {
          notification: {
            icon: "/icons/icon-192.png",
            badge: "/icons/icon-192.png",
            vibrate: [200, 100, 200],
          },
          fcmOptions: {
            link: `/customer-dashboard.html?order_id=${orderId}`,
          },
        },
      });
      logger.info(`FCM push sent to user ${userId} for order ${orderId} (${newStatus})`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      logger.error(`FCM failed for user ${userId}: ${msg}`);

      // If token is invalid/unregistered, remove it so we don't spam errors
      if (
        msg.includes("registration-token-not-registered") ||
        msg.includes("invalid-registration-token")
      ) {
        await db.collection("users").doc(userId).update({fcmToken: admin.firestore.FieldValue.delete()});
        logger.info(`Removed stale FCM token for user ${userId}`);
      }
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// FCM: Notify driver when a new order is assigned to them
// ─────────────────────────────────────────────────────────────────────────────
export const notifyDriverAssigned = onDocumentUpdated(
  "orders/{orderId}",
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();

    // Only fire when driverId is newly set
    if (!after?.driverId || before?.driverId === after.driverId) return;

    const driverId: string = after.driverId;
    const {orderId} = event.params;

    await db
      .collection("users")
      .doc(driverId)
      .collection("notifications")
      .add({
        title: "🚗 New Delivery Assigned",
        body: `You have been assigned order #${orderId.substring(0, 8).toUpperCase()}. Head to the restaurant for pickup.`,
        orderId,
        type: "driver_assigned",
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    const driverDoc = await db.collection("users").doc(driverId).get();
    const fcmToken: string | undefined = driverDoc.data()?.fcmToken;
    if (!fcmToken) return;

    try {
      await admin.messaging().send({
        token: fcmToken,
        notification: {
          title: "🚗 New Delivery!",
          body: `Order #${orderId.substring(0, 8).toUpperCase()} assigned. Head to restaurant now.`,
        },
        data: {orderId, type: "driver_assigned"},
        webpush: {
          notification: {icon: "/icons/icon-192.png"},
          fcmOptions: {link: `/driver-dashboard.html`},
        },
      });
    } catch (err) {
      logger.error("Driver FCM failed", err);
    }
  }
);
