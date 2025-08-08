document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenuButton = document.getElementById("close-menu");
  let isMenuOpen = false;

  if (!mobileMenuButton || !mobileMenu || !closeMenuButton) {
    console.log("Mobile menu elements not found");
    return;
  }

  // Ensure menu starts closed
  mobileMenu.classList.remove("active");
  mobileMenuButton.classList.remove("active");
  document.body.style.overflow = "";

  // Toggle mobile menu
  mobileMenuButton.addEventListener("click", function (e) {
    e.stopPropagation();
    if (isMenuOpen) {
      mobileMenu.classList.remove("active");
      mobileMenuButton.classList.remove("active");
      document.body.style.overflow = "";
      isMenuOpen = false;
    } else {
      mobileMenu.classList.add("active");
      mobileMenuButton.classList.add("active");
      document.body.style.overflow = "hidden";
      isMenuOpen = true;
    }
  });

  // Close mobile menu
  closeMenuButton.addEventListener("click", function (e) {
    e.stopPropagation();
    mobileMenu.classList.remove("active");
    mobileMenuButton.classList.remove("active");
    document.body.style.overflow = "";
    isMenuOpen = false;
  });

  // Prevent menu from closing when clicking inside
  mobileMenu.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
      isMenuOpen = false;
    }
  });

  // Close menu when clicking on navigation links
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
      isMenuOpen = false;
    });
  });

  // Close menu on Escape key
  document.addEventListener("keydown", function (e) {
    if (isMenuOpen && e.key === "Escape") {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
      isMenuOpen = false;
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
