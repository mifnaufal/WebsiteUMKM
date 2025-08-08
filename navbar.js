// navbar.js
// Script for responsive navbar (burger menu)
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuButton = document.getElementById('close-menu');
    let isMenuOpen = false;

    if (!mobileMenuButton || !mobileMenu || !closeMenuButton) {
        // Exit if elements not found
        return;
    }

    // Open mobile menu
    mobileMenuButton.addEventListener('click', function (e) {
        e.stopPropagation();
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        isMenuOpen = true;
    });

    // Close mobile menu
    closeMenuButton.addEventListener('click', function (e) {
        e.stopPropagation();
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        isMenuOpen = false;
    });

    // Prevent menu from closing when clicking inside
    mobileMenu.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function () {
        if (isMenuOpen) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            isMenuOpen = false;
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
        if (isMenuOpen && e.key === 'Escape') {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            isMenuOpen = false;
        }
    });

    // Close menu if resized to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768 && isMenuOpen) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            isMenuOpen = false;
        }
    });
});
