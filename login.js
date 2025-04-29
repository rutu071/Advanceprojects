import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCe9JZZKe2QZCFUJLhmd2lH5tLX0sSTAcE",
  authDomain: "loginpage-3c189.firebaseapp.com",
  projectId: "loginpage-3c189",
  storageBucket: "loginpage-3c189.appspot.com",
  messagingSenderId: "22514805227",
  appId: "1:22514805227:web:cbe0b918eeff0eb31591ae"
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
        window.location.href = 'user.html';
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
