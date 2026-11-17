
// =========================================================
// STUDYSYNC | BACK TO TOP BUTTON
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.getElementById("backToTop");

    if (!backToTop) return;

    // Show button when scrolling down
    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }, { passive: true });

    // Smooth scroll to top
    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});
