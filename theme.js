
// StudySync - Dark & Light Mode

document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    // Get the saved theme
    let currentTheme = localStorage.getItem("studySyncTheme") || "light";

    // Apply the saved theme
    function applyTheme(theme) {

        document.documentElement.setAttribute("data-theme", theme);

        if (themeIcon && themeToggle) {

            if (theme === "dark") {
                themeIcon.className = "bi bi-sun-fill";
                themeToggle.setAttribute("aria-label", "Switch to light mode");
                themeToggle.setAttribute("title", "Switch to light mode");
            } else {
                themeIcon.className = "bi bi-moon-stars-fill";
                themeToggle.setAttribute("aria-label", "Switch to dark mode");
                themeToggle.setAttribute("title", "Switch to dark mode");
            }
        }
    }

    // Display the saved theme when the page loads
    applyTheme(currentTheme);

    // Switch between Light Mode and Dark Mode
    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            currentTheme = currentTheme === "light" ? "dark" : "light";

            // Save the selected theme
            localStorage.setItem("studySyncTheme", currentTheme);

            // Apply the selected theme
            applyTheme(currentTheme);

        });

    }

});
