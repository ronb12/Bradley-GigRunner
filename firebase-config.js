// Unified Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBYJkHvoa43DbF5Wn_a8uGZ9o_olCMnuFc",
  authDomain: "bradley-gigrunner.firebaseapp.com",
  projectId: "bradley-gigrunner",
  storageBucket: "bradley-gigrunner.firebasestorage.app",
  messagingSenderId: "497753581430",
  appId: "1:497753581430:web:db6c22866194dd3285bc57",
  measurementId: "G-FB45MP5R5G"
};

// Database Collections
export const COLLECTIONS = {
  USERS: 'users',
  RESTAURANTS: 'restaurants',
  MENU_ITEMS: 'menuItems',
  ORDERS: 'orders',
  DRIVERS: 'drivers',
  REVIEWS: 'reviews',
  NOTIFICATIONS: 'notifications',
  DELIVERY_ZONES: 'deliveryZones'
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY_FOR_PICKUP: 'ready_for_pickup',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  DRIVER: 'driver',
  RESTAURANT_OWNER: 'restaurant_owner',
  ADMIN: 'admin'
};
