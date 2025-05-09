import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, collection, addDoc, updateDoc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore(app);

// Splash handling
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("splash").style.display = "none";
    document.getElementById("authBox").classList.add("hidden");
    document.getElementById("userEmail").innerText = user.email;
    
    // Toggle between customer/driver views
    const userRole = user.customClaims?.role || "customer";  // Assuming you add a custom claim for user role
    if (userRole === "customer") {
      document.getElementById("customerView").classList.remove("hidden");
      loadMyRequests();
    } else if (userRole === "driver") {
      document.getElementById("driverView").classList.remove("hidden");
      loadDriverRequests();
    }
  } else {
    document.getElementById("splash").style.display = "none";
    document.getElementById("authBox").classList.remove("hidden");
  }
});

// Login functionality
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};

// Signup functionality
window.signup = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert("Signup failed: " + error.message);
  }
};

// Logout functionality
window.logout = async () => {
  await signOut(auth);
  location.reload();
};

// Request Handling for customers
window.createRequest = async () => {
  const pickup = document.getElementById("pickup").value;
  const dropoff = document.getElementById("dropoff").value;
  const details = document.getElementById("details").value;
  await addDoc(collection(db, "requests"), {
    pickup,
    dropoff,
    details,
    status: "pending",
    userId: auth.currentUser.uid
  });
  loadMyRequests();
};

// Load customer requests
function loadMyRequests() {
  const display = document.getElementById("myRequestStatus");
  const q = query(collection(db, "requests"), where("userId", "==", auth.currentUser.uid));
  onSnapshot(q, (snap) => {
    display.innerHTML = "";
    snap.forEach(docSnap => {
      const d = docSnap.data();
      display.innerHTML += `
        <div class="box">
          <p><strong>Pickup:</strong> ${d.pickup}</p>
          <p><strong>Dropoff:</strong> ${d.dropoff}</p>
          <p><strong>Status:</strong> ${d.status}</p>
        </div>
      `;
    });
  });
}

// Load driver requests
function loadDriverRequests() {
  const list = document.getElementById("requestsList");
  const q = query(collection(db, "requests"), where("status", "in", ["pending", "accepted", "picked_up"]));
  onSnapshot(q, (snapshot) => {
    list.innerHTML = "";
    snapshot.forEach(docSnap => {
      const d = docSnap.data();
      const requestId = docSnap.id;
      list.innerHTML += `
        <div class="box">
          <p><strong>Pickup:</strong> ${d.pickup}</p>
          <p><strong>Dropoff:</strong> ${d.dropoff}</p>
          <p><strong>Status:</strong> ${d.status}</p>
          <button onclick="acceptRequest('${requestId}')">Accept</button>
        </div>
      `;
    });
  });
}

// Accept a request as a driver
window.acceptRequest = async (requestId) => {
  const requestRef = doc(db, "requests", requestId);
  await updateDoc(requestRef, {
    status: "accepted",
    driverId: auth.currentUser.uid
  });
};
