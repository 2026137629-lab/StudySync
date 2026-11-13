
// STUDYSYNC LOGIN AUTHENTICATION

console.log("NEW STUDYSYNC SCRIPT LOADED");

// Get HTML elements
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

// Demo login credentials
const correctEmail = "student@studysync.com";
const correctPassword = "123456";

// Check login when form is submitted
loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (email === correctEmail && password === correctPassword) {

        console.log("Redirecting to dashboard...");

        window.location.assign("./dashboard.html");

    } else {

        loginMessage.textContent = "Invalid email or password. Please try again.";
        loginMessage.style.color = "red";

    }

});
