
// StudySync - Shared Layout Functions

document.addEventListener("DOMContentLoaded", function () {

    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const mobileToggle = document.getElementById("mobileSidebarToggle");
    const overlay = document.getElementById("sidebarOverlay");

    const mobileScreen = window.matchMedia("(max-width: 760px)");
    const tabletScreen = window.matchMedia("(min-width: 761px) and (max-width: 1100px)");

    // Restore saved sidebar state
    function syncSidebarMode() {

        if (!sidebar) return;

        const savedSidebarState = localStorage.getItem("studySyncSidebar");

        if (mobileScreen.matches) {

            sidebar.classList.remove("collapsed");

        } else {

            if (savedSidebarState === "collapsed") {
                sidebar.classList.add("collapsed");
            } else {
                sidebar.classList.remove("collapsed");
            }

            closeMobileSidebar();
        }

        updateSidebarIcon();
    }

    // Update sidebar toggle icon
    function updateSidebarIcon() {

        if (!sidebar || !sidebarToggle) return;

        const icon = sidebarToggle.querySelector("i");

        if (icon) {
            icon.className = sidebar.classList.contains("collapsed")
                ? "bi bi-layout-sidebar"
                : "bi bi-layout-sidebar-inset";
        }
    }

    // Desktop and Tablet sidebar toggle
    if (sidebar && sidebarToggle) {

        sidebarToggle.addEventListener("click", function () {

            if (mobileScreen.matches) return;

            sidebar.classList.toggle("collapsed");

            const isCollapsed = sidebar.classList.contains("collapsed");

            localStorage.setItem(
                "studySyncSidebar",
                isCollapsed ? "collapsed" : "expanded"
            );

            updateSidebarIcon();
        });
    }

    // Mobile sidebar functions
    function openMobileSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.remove("collapsed");
        sidebar.classList.add("mobile-open");
        overlay.classList.add("active");
    }

    function closeMobileSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.remove("mobile-open");
        overlay.classList.remove("active");
    }

    // Mobile toggle
    if (mobileToggle) {
        mobileToggle.addEventListener("click", openMobileSidebar);
    }

    // Close when clicking overlay
    if (overlay) {
        overlay.addEventListener("click", closeMobileSidebar);
    }

    // Close after selecting navigation link
    if (sidebar) {

        sidebar.querySelectorAll(".sidebar-nav a").forEach(function (link) {

            link.addEventListener("click", function () {

                if (mobileScreen.matches) {
                    closeMobileSidebar();
                }

            });

        });
    }

    // Close using Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMobileSidebar();
        }

    });

    // Detect screen size changes
    mobileScreen.addEventListener("change", syncSidebarMode);
    tabletScreen.addEventListener("change", syncSidebarMode);

    // Apply sidebar state on page load
    syncSidebarMode();

});
