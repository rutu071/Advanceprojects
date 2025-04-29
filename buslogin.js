// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0R6ATrTy7bW8ExWRzqLsBMMa0QL6oP4M",
  authDomain: "e-buslogin.firebaseapp.com",
  projectId: "e-buslogin",
  storageBucket: "e-buslogin.firebaseapp.com",
  messagingSenderId: "475723432068",
  appId: "1:475723432068:web:d62827ab0987674ab802d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

// Display a message
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Sign-Up Functionality
document.getElementById('submitsignup').addEventListener('click', (event) => {
  event.preventDefault();

  const username = document.getElementById('rname').value;
  const email = document.getElementById('remail').value;
  const password = document.getElementById('rpassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = { email: email, username: username };

      // Store user data in Firestore
      return setDoc(doc(db, "users", user.uid), userData);
    })
    .then(() => {
      showMessage('Account Created Successfully!', 'signUpMessage');
      window.location.href = 'userRegister.html';
    })
    .catch((error) => {
      console.error("Error:", error);
      if (error.code === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists!!!', 'signUpMessage');
      } else {
        showMessage('Unable to create user', 'signUpMessage');
      }
    });
});

