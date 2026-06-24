document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Smooth Scroll for local anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Adjust for sticky header height (80px on desktop, 70px on mobile)
        const headerHeight = window.innerWidth <= 768 ? 70 : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for scroll animations
  const fadeSections = document.querySelectorAll('.fade-in-section');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.15, // trigger when 15% of section is visible
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once it's visible, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeSections.forEach(section => {
      observer.observe(section);
    });
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    fadeSections.forEach(section => {
      section.classList.add('is-visible');
    });
  }

  // Mascot Tap/Click interaction for mobile
  const mascot = document.querySelector('.about-mascot-img');
  if (mascot) {
    mascot.addEventListener('click', () => {
      mascot.classList.add('petted');
      // Remove class after animation (800ms) to allow re-trigger
      setTimeout(() => {
        mascot.classList.remove('petted');
      }, 800);
    });
  }

  // Diagram Node Pulse interaction
  const diagramNodes = document.querySelectorAll('.diagram-node');
  const pulseDot = document.querySelector('.pulse-dot');
  
  if (pulseDot) {
    diagramNodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        pulseDot.style.animationDuration = '1.5s'; // Faster speed on hover
      });
      node.addEventListener('mouseleave', () => {
        pulseDot.style.animationDuration = '3s'; // Return to normal
      });
    });
  }
});
