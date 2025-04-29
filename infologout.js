import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCe9JZZKe2QZCFUJLhmd2lH5tLX0sSTAcE",
    authDomain: "loginpage-3c189.firebaseapp.com",
    projectId: "loginpage-3c189",
    storageBucket: "loginpage-3c189.appspot.com",
    messagingSenderId: "22514805227",
    appId: "1:22514805227:web:cbe0b918eeff0eb31591ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app); // Correctly initialize auth
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('loggedUserEmail').innerText = userData.email;
                } else {
                    console.log("No document found matching the ID");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    } else {
        console.log("User ID not found in local storage");
    }
});

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth) // Correctly handle the sign-out process
        .then(() => {
            console.log("User signed out successfully");
            window.location.href = 'sports.html'; // Redirect after sign out
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});
