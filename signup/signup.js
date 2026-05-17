document.addEventListener('DOMContentLoaded', function () {
    // Firebase configuration
    const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

    // Initialize Firebase
    let auth;
    try {
        const app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth(); // Initialize auth here
        console.log("Firebase initialized successfully.");
    } catch (error) {
        console.error("Firebase initialization failed:", error);
        return; // Stop further execution
    }

    // Attach event listener for the sign-up button
    document.getElementById('signup-button').addEventListener('click', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const usernameError = document.getElementById('username-error');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');

        // Reset error messages
        usernameError.style.display = 'none';
        emailError.style.display = 'none';
        passwordError.style.display = 'none';

        let isValid = true;

        // Validate inputs
        if (username === "") {
            usernameError.textContent = "Username is required";
            usernameError.style.display = 'block';
            isValid = false;
        }
        if (!isValidEmail(email)) {
            emailError.textContent = "Invalid email address";
            emailError.style.display = 'block';
            isValid = false;
        }
        if (password.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters long";
            passwordError.style.display = 'block';
            isValid = false;
        }

        // Create user if valid
        if (isValid) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log("User created:", userCredential.user);
                    alert("Signup successful!");
                    
                    // Redirect to login page
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    console.error("Signup error:", error.message);
                    alert("Error: " + error.message);
                });
        }
    });

    // Validate email function
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
});
