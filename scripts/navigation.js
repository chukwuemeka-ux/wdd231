// WDD231 responsive navigation

const menuButton = document.querySelector("#menu-button");
const primaryNavigation = document.querySelector("#primary-navigation");

if (menuButton && primaryNavigation) {
    const menuIcon = menuButton.querySelector(".menu-icon");

    function closeMenu() {
        primaryNavigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");

        if (menuIcon) {
            menuIcon.textContent = "☰";
        }
    }

    function toggleMenu() {
        const isOpen = primaryNavigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        if (menuIcon) {
            menuIcon.textContent = isOpen ? "✕" : "☰";
        }
    }

    menuButton.addEventListener("click", toggleMenu);

    // Close the mobile menu after a navigation link is selected.
    primaryNavigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close the menu when the user presses Escape.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            menuButton.focus();
        }
    });

    // Ensure the menu is closed when switching to desktop width.
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 700) {
            closeMenu();
        }
    });
}