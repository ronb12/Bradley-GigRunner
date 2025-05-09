import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, collection, addDoc, updateDoc, doc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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
const db = getFirestore(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    const currentUserId = user.uid;
    document.getElementById("userEmail").innerText = user.email;
    loadRequests();
  }
});

window.logout = async () => {
  await signOut(auth);
  location.reload();
};

function loadRequests() {
  const list = document.getElementById("requestsList");
  const q = query(collection(db, "requests"), where("status", "!=", "delivered"));
  onSnapshot(q, (snapshot) => {
    list.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const d = docSnap.data();
      const id = docSnap.id;
      let buttons = "";
      if (d.status === "pending") buttons = `<button onclick="acceptRequest('${id}')">Accept</button>`;
      else if (d.status === "accepted") buttons = `<button onclick="markPickedUp('${id}')">Picked Up</button>`;
      else if (d.status === "picked_up") buttons = `<button onclick="markDelivered('${id}')">Delivered</button>`;

      const box = document.createElement("div");
      box.className = "box";
      box.innerHTML = `
        <p><strong>Pickup:</strong> ${d.pickup}</p>
        <p><strong>Dropoff:</strong> ${d.dropoff}</p>
        <p><strong>Details:</strong> ${d.details}</p>
        <p><strong>Status:</strong> ${d.status.toUpperCase()}</p>
        ${buttons}
      `;
      list.appendChild(box);
    });
  });
}

window.acceptRequest = async (id) => await updateDoc(doc(db, "requests", id), { status: "accepted" });
window.markPickedUp = async (id) => await updateDoc(doc(db, "requests", id), { status: "picked_up" });
window.markDelivered = async (id) => await updateDoc(doc(db, "requests", id), { status: "delivered" });
