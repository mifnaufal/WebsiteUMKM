document.addEventListener('DOMContentLoaded', () => {
  const navbarContainer = document.getElementById('navbar-container');
  if (!navbarContainer) return;

  fetch('navbar.html')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load navbar: ' + res.statusText);
      return res.text();
    })
    .then((html) => {
      navbarContainer.innerHTML = html;

      // After injecting HTML, scripts inside won't execute. Initialize behaviors here.
      initNavbarInteractions();
    })
    .catch((err) => console.error(err));

  function initNavbarInteractions() {
    const mobileMenuButton = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link-3d');
    const particlesContainer = document.getElementById('particles');
    const navbar = document.querySelector('.navbar-3d');
    const hero = document.querySelector('.hero');

    // Hover fix: reduced rotation and stable reset
    if (navLinks.length) {
      navLinks.forEach((link) => {
        link.style.transform = 'translateZ(5px)';
        link.addEventListener('mouseenter', () => {
          link.style.transition = 'all 0.3s ease';
        });
        link.addEventListener('mousemove', (e) => {
          const rect = link.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          const rx = Math.max(-10, Math.min(10, y * -5));
          const ry = Math.max(-10, Math.min(10, x * 5));
          link.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(15px)`;
        });
        link.addEventListener('mouseleave', () => {
          link.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          link.style.transform = 'translateZ(5px)';
        });
      });
    }

    // Mobile menu toggle using .active class, prevent body scroll
    if (mobileMenuButton && mobileMenu) {
      const closeMenu = () => {
        mobileMenuButton.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      };

      mobileMenuButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileMenuButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
      });

      document.addEventListener('click', (e) => {
        if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
          closeMenu();
        }
      });

      mobileMenu.querySelectorAll('.mobile-link').forEach((a) => {
        a.addEventListener('click', closeMenu);
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) closeMenu();
      });
    }

    // Particles generation
    if (particlesContainer) {
      // Perbaikan: Set pointer-events none pada container particles untuk menghindari penutupan interaksi
      particlesContainer.style.pointerEvents = 'none';
      createParticles(particlesContainer, 30);
    }

    // Helpers
    function createParticles(container, count = 30) {
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 12 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        const hue = Math.floor(Math.random() * 40) + 200;
        particle.style.background = `linear-gradient(135deg, hsl(${hue}, 80%, 60%), hsl(${hue + 40}, 80%, 60%))`;
        particle.style.animationDelay = `${Math.random() * 12}s`;
        const z = Math.floor(Math.random() * 100) - 50;
        particle.style.transform = `translateZ(${z}px)`;
        // Perbaikan: Set pointer-events none pada setiap particle untuk memastikan klik melewati mereka
        particle.style.pointerEvents = 'none';
        container.appendChild(particle);
      }
    }

    function parallaxEffect() {
      const particles = document.querySelectorAll('.particle');
      const y = window.scrollY;
      particles.forEach((p) => {
        const match = /translateZ\((-?\d+(?:\.\d+)?)px\)/.exec(p.style.transform || '');
        const z = match ? parseFloat(match[1]) : 0;
        const move = y * (z / 100);
        // Diperbaiki: Gabungkan translateY dengan translateZ existing untuk menghindari overwrite
        p.style.transform = `translateY(${move}px) translateZ(${z}px)`;
      });
    }

    // Perbaikan: Tambahkan event listener untuk mengaktifkan parallax
    window.addEventListener('scroll', parallaxEffect);

    // Viewport height CSS var for mobile browsers
    function setVH() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVH();
    window.addEventListener('resize', setVH);
  }
});