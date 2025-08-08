document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenuButton = document.getElementById("close-menu");
  const menuLinks = mobileMenu.querySelectorAll("nav a");
  let isMenuOpen = false;

  if (!mobileMenuButton || !mobileMenu || !closeMenuButton) {
    console.log("Mobile menu elements not found");
    return;
  }

  // Set animation delays for menu items
  menuLinks.forEach((link, index) => {
    link.style.setProperty('--link-index', index);
  });

  // Ensure menu starts closed
  mobileMenu.classList.remove("active");
  mobileMenuButton.classList.remove("active");
  document.body.style.overflow = "";

  function toggleMenu(open) {
    isMenuOpen = open;
    
    if (open) {
      mobileMenu.classList.add("active");
      mobileMenuButton.classList.add("active");
      document.body.style.overflow = "hidden";
      
      // Animate menu items with delay
      menuLinks.forEach((link, index) => {
        setTimeout(() => {
          link.style.transform = "translateX(0)";
          link.style.opacity = "1";
        }, 100 * index);
      });
    } else {
      mobileMenu.classList.remove("active");
      mobileMenuButton.classList.remove("active");
      document.body.style.overflow = "";
      
      // Reset menu item animations
      menuLinks.forEach(link => {
        link.style.transform = "translateX(-10px)";
        link.style.opacity = "0";
      });
    }
  }

  // Toggle mobile menu
  mobileMenuButton.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu(!isMenuOpen);
  });

  // Close mobile menu
  closeMenuButton.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu(false);
  });

  // Prevent menu from closing when clicking inside
  mobileMenu.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close menu when clicking on navigation links
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      toggleMenu(false);
    });
  });

  // Close menu on Escape key
  document.addEventListener("keydown", function (e) {
    if (isMenuOpen && e.key === "Escape") {
      toggleMenu(false);
    }
  });

  // Close menu if resized to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768 && isMenuOpen) {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
      isMenuOpen = false;
    }
  });
});
