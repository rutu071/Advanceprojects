import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCe9JZZKe2QZCFUJLhmd2lH5tLX0sSTAcE",
  authDomain: "loginpage-3c189.firebaseapp.com",
  projectId: "loginpage-3c189",
  storageBucket: "loginpage-3c189.appspot.com", // Fix storage domain
  messagingSenderId: "22514805227",
  appId: "1:22514805227:web:cbe0b918eeff0eb31591ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

document.getElementById('submitsignup').addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = { email: email };

      return setDoc(doc(db, "users", user.uid), userData);
    })
    .then(() => {
      showMessage('Account Created Successfully', 'signUpMessage');
      window.location.href = 'sports.html';
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

