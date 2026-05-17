// Import Firebase functions (modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Firebase signInWithEmailAndPassword
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successful login
            console.log("User logged in:", userCredential.user);

            // Show success notification (optional, can use alert as well)
            alert('Login successful!');

            // Redirect to lobby page
            window.location.href = "lobby.html";
        })
        .catch((error) => {
            // Handle login errors
            console.error("Login error:", error.message);
            alert("Error: " + error.message);
        });
});
