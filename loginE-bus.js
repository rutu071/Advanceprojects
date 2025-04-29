// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0R6ATrTy7bW8ExWRzqLsBMMa0QL6oP4M",
  authDomain: "e-buslogin.firebaseapp.com",
  projectId: "e-buslogin",
  storageBucket: "e-buslogin.firebaseapp.com",
  messagingSenderId: "475723432068",
  appId: "1:475723432068:web:d62827ab0987674ab802d1"
};


// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Message display function
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 4000);
}

// ✅ Login handler
document.getElementById('submitsignIn').addEventListener('click', (event) => {
  event.preventDefault();

  // ✅ Correctly match IDs to HTML
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showMessage('Please enter both email and password.', 'signInMessage');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // ✅ Successful login
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      showMessage('Login successful! Redirecting...', 'signInMessage');

      setTimeout(() => {
        window.location.href = 'ticket.html';
      }, 1000);
    })
    .catch((error) => {
      // ✅ Handle common Firebase Auth errors
      const errorCode = error.code;
      console.error("Login error:", errorCode);

      switch (errorCode) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          showMessage('Incorrect email or password.', 'signInMessage');
          break;
        case 'auth/invalid-email':
          showMessage('Invalid email format.', 'signInMessage');
          break;
        default:
          showMessage('Login failed. Please try again.', 'signInMessage');
      }
    });
});
