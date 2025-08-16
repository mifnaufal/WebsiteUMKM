// Inisialisasi navbar
const initNavbar = () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link-3d');

  // Efek hover yang stabil
  navLinks.forEach(link => {
    link.style.pointerEvents = 'auto';
    
    link.addEventListener('mouseenter', () => {
      link.style.transition = 'all 0.3s ease-out';
      link.style.transform = 'translateZ(15px)';
      link.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      link.style.transform = 'translateZ(0)';
      link.style.boxShadow = 'none';
    });
  });

  // Toggle mobile menu
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Tutup menu saat klik di luar
    document.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Cegah propagasi klik di dalam menu
    mobileMenu.addEventListener('click', (e) => e.stopPropagation());
  }
};

// Jalankan saat DOM siap
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
      initNavbar();

      // Particles generation
      const particlesContainer = document.getElementById('particles');
      if (particlesContainer) {
        particlesContainer.style.pointerEvents = 'none';
        createParticles(particlesContainer, 30);
      }

      // Viewport height CSS var for mobile browsers
      function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
      setVH();
      window.addEventListener('resize', setVH);
    })
    .catch((err) => console.error(err));

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
      p.style.transform = `translateY(${move}px) translateZ(${z}px)`;
    });
  }

  window.addEventListener('scroll', parallaxEffect);
});