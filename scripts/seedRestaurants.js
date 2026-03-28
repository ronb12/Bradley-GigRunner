// Seed real Columbia, SC restaurants into Firestore
// Run: node scripts/seedRestaurants.js

const admin = require("../functions/node_modules/firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const restaurants = [
  {
    id: "mcdonalds-devine",
    name: "McDonald's",
    cuisine: "Fast Food",
    category: "burger",
    address: "3020 Devine St, Columbia, SC 29205",
    lat: 34.0089, lng: -81.0358,
    rating: 4.1,
    deliveryTime: "15-25 min",
    deliveryFee: 3.99,
    image: "🍔",
    isOpen: true,
    menu: [
      { id: "mc1", name: "Big Mac", price: 5.99, description: "Two beef patties, special sauce, lettuce, cheese, pickles, onions" },
      { id: "mc2", name: "Quarter Pounder with Cheese", price: 6.49, description: "Quarter pound beef, two slices of cheese, onions, pickles" },
      { id: "mc3", name: "10pc McNuggets", price: 7.99, description: "Crispy chicken nuggets with your choice of sauce" },
      { id: "mc4", name: "Large Fries", price: 3.49, description: "World-famous golden fries" },
      { id: "mc5", name: "McFlurry Oreo", price: 3.99, description: "Vanilla soft serve blended with Oreo cookie pieces" }
    ]
  },
  {
    id: "chickfila-gervais",
    name: "Chick-fil-A",
    cuisine: "Chicken",
    category: "chicken",
    address: "700 Gervais St, Columbia, SC 29201",
    lat: 33.9994, lng: -81.0446,
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 4.49,
    image: "🍗",
    isOpen: true,
    menu: [
      { id: "cf1", name: "Chick-fil-A Sandwich", price: 5.99, description: "Crispy chicken breast, pickles, toasted bun" },
      { id: "cf2", name: "Spicy Deluxe Sandwich", price: 7.29, description: "Spicy chicken, pepper jack cheese, lettuce, tomato" },
      { id: "cf3", name: "8pc Nuggets", price: 6.49, description: "Bite-sized chicken nuggets, hand-breaded" },
      { id: "cf4", name: "Waffle Fries (Large)", price: 3.79, description: "Crispy waffle-cut potato fries" },
      { id: "cf5", name: "Peach Milkshake", price: 4.99, description: "Hand-spun milkshake with real peach pieces" }
    ]
  },
  {
    id: "chipotle-decker",
    name: "Chipotle Mexican Grill",
    cuisine: "Mexican",
    category: "mexican",
    address: "2700 Decker Blvd, Columbia, SC 29206",
    lat: 34.0456, lng: -80.9689,
    rating: 4.4,
    deliveryTime: "20-30 min",
    deliveryFee: 3.99,
    image: "🌯",
    isOpen: true,
    menu: [
      { id: "ch1", name: "Chicken Burrito", price: 10.50, description: "Flour tortilla, cilantro-lime rice, black beans, chicken, salsa, sour cream" },
      { id: "ch2", name: "Steak Bowl", price: 11.50, description: "Cilantro-lime rice, fajita veggies, steak, guacamole, cheese" },
      { id: "ch3", name: "Carnitas Tacos (3)", price: 10.25, description: "Soft corn tortillas, slow-roasted carnitas, salsa fresca" },
      { id: "ch4", name: "Chips & Guacamole", price: 5.75, description: "Fresh-made guacamole with house chips" },
      { id: "ch5", name: "Sofritas Bowl", price: 9.75, description: "Spiced organic tofu, rice, beans, pico de gallo" }
    ]
  },
  {
    id: "dominos-gervais",
    name: "Domino's Pizza",
    cuisine: "Pizza",
    category: "pizza",
    address: "2015 Gervais St, Columbia, SC 29204",
    lat: 34.0082, lng: -81.0178,
    rating: 4.2,
    deliveryTime: "25-40 min",
    deliveryFee: 4.99,
    image: "🍕",
    isOpen: true,
    menu: [
      { id: "dom1", name: "Large Pepperoni Pizza", price: 14.99, description: "Hand-tossed, loaded with pepperoni" },
      { id: "dom2", name: "Large 3-Topping Pizza", price: 13.99, description: "Choose any 3 toppings on a large pizza" },
      { id: "dom3", name: "Chicken Alfredo Pasta", price: 8.99, description: "Penne pasta, creamy Alfredo sauce, grilled chicken" },
      { id: "dom4", name: "Stuffed Cheesy Bread (8pc)", price: 7.99, description: "Oven-baked bread stuffed with cheese and garlic" },
      { id: "dom5", name: "Cinnamon Twists (8pc)", price: 5.99, description: "Sweet oven-baked bread with cinnamon sugar and icing" }
    ]
  },
  {
    id: "fiveguys-forest",
    name: "Five Guys",
    cuisine: "Burgers",
    category: "burger",
    address: "4800 Forest Dr, Columbia, SC 29206",
    lat: 34.0075, lng: -80.9934,
    rating: 4.5,
    deliveryTime: "20-35 min",
    deliveryFee: 4.99,
    image: "🍔",
    isOpen: true,
    menu: [
      { id: "fg1", name: "Cheeseburger", price: 10.99, description: "Two beef patties, two slices of cheese, your choice of toppings — always free" },
      { id: "fg2", name: "Bacon Cheeseburger", price: 12.49, description: "Two patties, bacon, cheese, and all the toppings you want" },
      { id: "fg3", name: "Veggie Sandwich", price: 8.99, description: "Fresh veggies on a toasted sesame bun" },
      { id: "fg4", name: "Large Fries", price: 5.99, description: "Boardwalk Style or Cajun — always fresh-cut" },
      { id: "fg5", name: "Large Milkshake", price: 7.99, description: "Hand-spun with mix-ins of your choice" }
    ]
  },
  {
    id: "panera-forest",
    name: "Panera Bread",
    cuisine: "Healthy",
    category: "healthy",
    address: "3600 Forest Dr, Columbia, SC 29204",
    lat: 34.0079, lng: -80.9912,
    rating: 4.3,
    deliveryTime: "20-30 min",
    deliveryFee: 3.99,
    image: "🥗",
    isOpen: true,
    menu: [
      { id: "pan1", name: "Broccoli Cheddar Soup (Bowl)", price: 8.49, description: "Creamy cheddar soup with fresh broccoli" },
      { id: "pan2", name: "Chicken Fuji Apple Salad", price: 11.99, description: "Mixed greens, chicken, Fuji apple, gorgonzola, pecans, balsamic vinaigrette" },
      { id: "pan3", name: "Turkey Avocado BLT", price: 12.49, description: "Smoked turkey, avocado, bacon, lettuce, tomato on sourdough" },
      { id: "pan4", name: "Mac & Cheese (Large)", price: 9.99, description: "Creamy Vermont white cheddar mac and cheese" },
      { id: "pan5", name: "Cinnamon Crunch Bagel", price: 3.49, description: "Crunchy cinnamon sugar topping on a sweet dough bagel" }
    ]
  },
  {
    id: "panda-harbison",
    name: "Panda Express",
    cuisine: "Chinese",
    category: "asian",
    address: "110 Harbison Blvd, Columbia, SC 29212",
    lat: 34.0789, lng: -81.1234,
    rating: 4.0,
    deliveryTime: "20-30 min",
    deliveryFee: 3.99,
    image: "🍜",
    isOpen: true,
    menu: [
      { id: "pe1", name: "Orange Chicken Plate", price: 11.99, description: "Signature orange chicken with fried rice and chow mein" },
      { id: "pe2", name: "Beijing Beef Bowl", price: 12.49, description: "Crispy beef, red peppers, onions in tangy sauce with steamed rice" },
      { id: "pe3", name: "Kung Pao Chicken", price: 11.49, description: "Chicken, peanuts, vegetables in a spicy Szechuan sauce" },
      { id: "pe4", name: "Honey Walnut Shrimp", price: 13.49, description: "Crispy shrimp, glazed walnuts, honey melon sauce" },
      { id: "pe5", name: "Veggie Spring Rolls (2pc)", price: 4.49, description: "Crispy rolls with cabbage, celery, and carrots" }
    ]
  },
  {
    id: "zaxbys-twonotch",
    name: "Zaxby's",
    cuisine: "Chicken",
    category: "chicken",
    address: "7320 Two Notch Rd, Columbia, SC 29223",
    lat: 34.0934, lng: -80.9234,
    rating: 4.3,
    deliveryTime: "20-35 min",
    deliveryFee: 3.99,
    image: "🍗",
    isOpen: true,
    menu: [
      { id: "zax1", name: "Chicken Fingerz Plate (5pc)", price: 11.49, description: "Five tenders, Texas toast, crinkle fries, coleslaw, dipping sauce" },
      { id: "zax2", name: "Wings & Things (5pc)", price: 10.99, description: "Wings, crinkle fries, Texas toast, celery, sauce" },
      { id: "zax3", name: "Zalad - Grilled Chicken", price: 10.49, description: "Grilled chicken, mixed greens, cheddar, tomatoes, croutons" },
      { id: "zax4", name: "Kickin' Chicken Sandwich", price: 8.99, description: "Spicy fried chicken, pickles, mayo on a toasted bun" },
      { id: "zax5", name: "Crinkle Fries (Large)", price: 4.49, description: "Golden crinkle-cut fries with Zax sauce" }
    ]
  },
  {
    id: "motor-supply",
    name: "Motor Supply Co. Bistro",
    cuisine: "American",
    category: "american",
    address: "920 Gervais St, Columbia, SC 29201",
    lat: 34.0001, lng: -81.0424,
    rating: 4.8,
    deliveryTime: "35-50 min",
    deliveryFee: 5.99,
    image: "🍽️",
    isOpen: true,
    menu: [
      { id: "ms1", name: "Shrimp & Grits", price: 18.99, description: "Carolina shrimp, stone-ground grits, andouille sausage, tasso gravy" },
      { id: "ms2", name: "Duck Confit", price: 22.99, description: "Slow-cooked duck leg, sweet potato hash, cherry gastrique" },
      { id: "ms3", name: "Salmon Fillet", price: 24.99, description: "Pan-seared salmon, asparagus, lemon beurre blanc" },
      { id: "ms4", name: "Filet Mignon 8oz", price: 34.99, description: "Hand-cut filet, truffle butter, roasted fingerlings" },
      { id: "ms5", name: "Charcuterie Board", price: 16.99, description: "Seasonal cured meats, artisan cheeses, house pickles, mustard" }
    ]
  },
  {
    id: "grouchos-deli",
    name: "Groucho's Deli",
    cuisine: "Deli",
    category: "sandwiches",
    address: "611 Harden St, Columbia, SC 29205",
    lat: 34.0088, lng: -81.0358,
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 3.99,
    image: "🥪",
    isOpen: true,
    menu: [
      { id: "gr1", name: "Groucho's Original Sub", price: 9.99, description: "Ham, salami, turkey, Swiss, lettuce, tomato, 45 sauce on hoagie" },
      { id: "gr2", name: "Club Sub", price: 10.99, description: "Turkey, bacon, ham, Swiss, American on toasted hoagie" },
      { id: "gr3", name: "Vegetarian Sub", price: 8.99, description: "Hummus, avocado, cucumber, tomato, sprouts, 45 sauce" },
      { id: "gr4", name: "Cup of Soup + Half Sub", price: 10.49, description: "Daily soup with any half sub" },
      { id: "gr5", name: "Pastrami on Rye", price: 11.99, description: "Hot pastrami, Swiss cheese, spicy mustard, toasted rye" }
    ]
  },
  {
    id: "yesterdays-divine",
    name: "Yesterday's Restaurant",
    cuisine: "American",
    category: "american",
    address: "2030 Devine St, Columbia, SC 29205",
    lat: 34.0195, lng: -81.0341,
    rating: 4.5,
    deliveryTime: "30-45 min",
    deliveryFee: 4.99,
    image: "🍺",
    isOpen: true,
    menu: [
      { id: "yd1", name: "Yesterday's Burger", price: 13.99, description: "8oz hand-pattied beef, aged cheddar, house pickles, garlic aioli, brioche bun" },
      { id: "yd2", name: "Fish & Chips", price: 15.99, description: "Beer-battered cod, hand-cut fries, house tartar sauce, malt vinegar" },
      { id: "yd3", name: "Chicken Tenders (5pc)", price: 12.99, description: "Hand-breaded tenders, honey mustard, crinkle fries" },
      { id: "yd4", name: "Loaded Nachos", price: 11.99, description: "Tortilla chips, queso, jalapeños, pico, sour cream, guac" },
      { id: "yd5", name: "BLT Avocado Wrap", price: 10.99, description: "Bacon, lettuce, tomato, avocado, chipotle mayo, flour tortilla" }
    ]
  },
  {
    id: "olive-garden-harbison",
    name: "Olive Garden",
    cuisine: "Italian",
    category: "pizza",
    address: "299 Columbiana Dr, Columbia, SC 29212",
    lat: 34.0756, lng: -81.1289,
    rating: 4.2,
    deliveryTime: "30-45 min",
    deliveryFee: 5.49,
    image: "🍝",
    isOpen: true,
    menu: [
      { id: "og1", name: "Fettuccine Alfredo", price: 14.99, description: "Fettuccine tossed in creamy Parmesan Alfredo sauce" },
      { id: "og2", name: "Chicken Parmigiana", price: 17.99, description: "Breaded chicken, marinara, melted mozzarella, spaghetti" },
      { id: "og3", name: "Lasagna Classico", price: 15.99, description: "Layers of pasta, meat sauce, béchamel, mozzarella" },
      { id: "og4", name: "Tour of Italy", price: 19.99, description: "Lasagna, chicken parm, and fettuccine Alfredo sampler" },
      { id: "og5", name: "Unlimited Soup & Breadsticks", price: 9.99, description: "Choose from Zuppa Toscana, Minestrone, or Pasta e Fagioli" }
    ]
  },
  {
    id: "moes-blanding",
    name: "Moe's Southwest Grill",
    cuisine: "Mexican",
    category: "mexican",
    address: "1400 Blanding St, Columbia, SC 29201",
    lat: 34.0134, lng: -81.0245,
    rating: 4.1,
    deliveryTime: "20-30 min",
    deliveryFee: 3.49,
    image: "🌮",
    isOpen: true,
    menu: [
      { id: "moe1", name: "Joey Jr. Burrito", price: 9.99, description: "Flour tortilla, rice, beans, choice of protein, salsa, cheese" },
      { id: "moe2", name: "Homewrecker Burrito", price: 11.49, description: "Oversized burrito with queso, guac, all the toppings" },
      { id: "moe3", name: "Stack (Quesadilla)", price: 8.99, description: "Grilled flour tortilla, melted cheese, protein, pico de gallo" },
      { id: "moe4", name: "Close Talker Salad", price: 9.49, description: "Mixed greens, chicken, black beans, corn, salsa, sour cream" },
      { id: "moe5", name: "Chips, Salsa & Queso", price: 6.49, description: "House chips, fresh salsa, and creamy queso dip" }
    ]
  },
  {
    id: "ihop-harbison",
    name: "IHOP",
    cuisine: "Breakfast",
    category: "breakfast",
    address: "260 Harbison Blvd, Columbia, SC 29212",
    lat: 34.0756, lng: -81.1278,
    rating: 4.0,
    deliveryTime: "25-40 min",
    deliveryFee: 4.49,
    image: "🥞",
    isOpen: true,
    menu: [
      { id: "ih1", name: "Original Buttermilk Pancakes (Short Stack)", price: 8.99, description: "Three fluffy buttermilk pancakes, whipped butter, syrup" },
      { id: "ih2", name: "Steak & Eggs", price: 14.99, description: "8oz sirloin, two eggs your way, hash browns, toast" },
      { id: "ih3", name: "Chicken & Waffles", price: 13.99, description: "Crispy fried chicken strips over Belgian waffle, maple syrup" },
      { id: "ih4", name: "Colorado Omelette", price: 12.99, description: "Ham, bacon, peppers, onions, cheddar, hash browns, toast" },
      { id: "ih5", name: "NY Cheesecake Pancakes", price: 11.99, description: "Buttermilk pancakes, cheesecake filling, strawberry topping" }
    ]
  },
  {
    id: "buffalo-wild-wings",
    name: "Buffalo Wild Wings",
    cuisine: "American",
    category: "chicken",
    address: "125 Columbiana Dr, Columbia, SC 29212",
    lat: 34.0789, lng: -81.1245,
    rating: 4.2,
    deliveryTime: "30-45 min",
    deliveryFee: 4.99,
    image: "🍗",
    isOpen: true,
    menu: [
      { id: "bww1", name: "Wings (10pc)", price: 14.99, description: "Classic or boneless wings, choose from 26 signature sauces" },
      { id: "bww2", name: "Wings (20pc)", price: 26.99, description: "20 wings, two sauce choices, celery, ranch or bleu cheese" },
      { id: "bww3", name: "Cheese Curds", price: 9.49, description: "Wisconsin cheese curds, lightly breaded and fried, ranch dip" },
      { id: "bww4", name: "Loaded Burger", price: 13.99, description: "Beef patty, fried egg, bacon, cheddar, jalapeños, BBQ sauce" },
      { id: "bww5", name: "Fried Pickles", price: 7.99, description: "Crispy fried pickle chips, sriracha ranch dipping sauce" }
    ]
  }
];

async function seed() {
  console.log(`Seeding ${restaurants.length} restaurants...`);
  const batch = db.batch();

  for (const r of restaurants) {
    const { id, ...data } = r;
    const ref = db.collection("restaurants").doc(id);
    batch.set(ref, {
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      // Mark as seeded so the restaurant dashboard doesn't overwrite
      seeded: true
    });
    console.log(`  + ${r.name} (${r.address})`);
  }

  await batch.commit();
  console.log("\n✅ Done! All restaurants seeded to Firestore.");
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
