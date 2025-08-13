// Initialize animations
function initAnimations() {
  // Animate all elements with data-animate attribute
  const animateElements = document.querySelectorAll('[data-animate]');
  
  // Set up intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay
        const delay = entry.target.dataset.delay || index * 0.1;
        entry.target.style.animationDelay = `${delay}s`;
        entry.target.classList.add('animate-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe elements
  animateElements.forEach(el => observer.observe(el));
}

// Dynamic Motion Effects
function addDynamicMotion() {
  // Get all elements that should have dynamic motion
  const elements = document.querySelectorAll('[data-dynamic]');
  
  elements.forEach(el => {
    // Randomize animation parameters for organic feel
    const duration = 3 + Math.random() * 4; // 3-7 seconds
    const delay = Math.random() * 2; // 0-2 second delay
    const intensity = 0.5 + Math.random(); // 0.5-1.5 intensity
    
    // Apply random motion based on element type
    if (el.classList.contains('card')) {
      el.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      el.style.transform = `scale(${1 - intensity/10})`;
    } 
    else if (el.tagName === 'IMG') {
      el.style.animation = `sway ${duration * 1.5}s ease-in-out ${delay}s infinite`;
    }
    else {
      el.style.animation = `subtlePulse ${duration}s ease-in-out ${delay}s infinite`;
    }
  });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  addDynamicMotion();
  
  // Make elements react to mouse movement
  document.addEventListener('mousemove', (e) => {
    const xPos = e.clientX / window.innerWidth;
    const yPos = e.clientY / window.innerHeight;
    
    document.querySelectorAll('[data-react]').forEach(el => {
      const reactX = (xPos - 0.5) * 20 * (el.dataset.react || 1);
      const reactY = (yPos - 0.5) * 20 * (el.dataset.react || 1);
      el.style.transform = `translate(${reactX}px, ${reactY}px)`;
    });
  });
});
