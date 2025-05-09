import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBYJkHvoa43DbF5Wn_a8uGZ9o_olCMnuFc",
  authDomain: "bradley-gigrunner.firebaseapp.com",
  projectId: "bradley-gigrunner",
  storageBucket: "bradley-gigrunner.firebasestorage.app",
  messagingSenderId: "497753581430",
  appId: "1:497753581430:web:db6c22866194dd3285bc57",
  measurementId: "G-FB45MP5R5G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Check for admin role
    const idTokenResult = await user.getIdTokenResult();
    const role = idTokenResult.claims.role;  // 'role' is the custom claim added for admin users
    
    if (role === "admin") {
      window.location.href = "admin.html";  // Redirect to admin dashboard if admin
    } else if (role === "customer") {
      window.location.href = "customer.html";  // Redirect to customer dashboard
    } else if (role === "driver") {
      window.location.href = "driver.html";  // Redirect to driver dashboard
    }
  } else {
    window.location.href = "login.html";  // Redirect to login if not authenticated
  }
});

// Login function
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};
