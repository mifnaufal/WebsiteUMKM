document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenuButton = document.getElementById("close-menu");
  const menuLinks = mobileMenu.querySelectorAll("nav a");
  let isMenuOpen = false;
  let isMobileView = window.innerWidth < 768;

  if (!mobileMenuButton || !mobileMenu || !closeMenuButton) {
    console.log("Mobile menu elements not found");
    return;
  }

  // Set animation delays for menu items
  menuLinks.forEach((link, index) => {
    link.style.setProperty('--link-index', index);
  });

  // Function to reset menu state
  function resetMenuState() {
    mobileMenu.classList.remove("active");
    mobileMenuButton.classList.remove("active");

    isMenuOpen = false;
    menuLinks.forEach(link => {
      link.style.transform = "";
      link.style.opacity = "";
    });
  }

  // Ensure menu starts closed
  resetMenuState();

  function toggleMenu(open) {
    if (!isMobileView && open) return; // Prevent opening menu in desktop view
    
    isMenuOpen = open;
    
    if (open) {
      mobileMenu.style.display = "block";
      mobileMenu.setAttribute("aria-hidden", "false");
      setTimeout(() => {
        mobileMenu.classList.add("active");
        mobileMenuButton.classList.add("active");
      }, 10); // allow display:block to apply first
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
      mobileMenu.setAttribute("aria-hidden", "true");
      // Animate each menu item out, one by one, for smoother close
      menuLinks.forEach((link, index) => {
        setTimeout(() => {
          link.style.transform = "translateX(-10px)";
          link.style.opacity = "0";
        }, 50 * index); // animate out faster than in
      });
      // After all animations, hide the menu
      setTimeout(() => {
        if (!isMenuOpen) {
          mobileMenu.style.display = "none";
        }
      }, 400 + 50 * menuLinks.length); // allow for all items to finish animating
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
      // Tambahkan class animasi keluar jika perlu
      mobileMenu.classList.remove("active");
      mobileMenuButton.classList.remove("active");
      // Sinkronkan dengan delay CSS agar smooth
      setTimeout(() => {
        toggleMenu(false);
      }, 400); // 400ms sesuai dengan transition di CSS
    }
  });

  // ===== SIMPLE TOGGLE FOR <nav id="mobile-nav"> (for custom HTML snippet) =====
  const burgerBtn = document.getElementById('mobile-menu-button');
  const mobileNav = document.getElementById('mobile-nav');
  const closeMenuBtn = document.getElementById('close-menu');
  if (burgerBtn && mobileNav) {
    // Tampilkan menu saat burger diklik
    burgerBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileNav.removeAttribute('hidden');
    });
  }
  // Sembunyikan menu saat tombol close diklik
  if (closeMenuBtn && mobileNav) {
    closeMenuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileNav.setAttribute('hidden', '');
    });
  }
  // Sembunyikan menu saat klik di luar area menu
  if (mobileNav && burgerBtn) {
    document.addEventListener('click', function(e) {
      if (!mobileNav.hasAttribute('hidden') && !mobileNav.contains(e.target) && !burgerBtn.contains(e.target)) {
        mobileNav.setAttribute('hidden', '');
      }
    });
  }
  // Sembunyikan menu saat klik link di dalam nav
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        mobileNav.setAttribute('hidden', '');
      });
    });
  }
  // ===== END SIMPLE TOGGLE =====

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

  // Handle resize events
  window.addEventListener("resize", function () {
    const wasInMobileView = isMobileView;
    isMobileView = window.innerWidth < 768;
    
    // If transitioning from mobile to desktop view
    if (wasInMobileView && !isMobileView) {
      resetMenuState();
    }
  });
});
