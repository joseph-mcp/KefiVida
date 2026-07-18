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
  // ==========================================================================
  // HERO CAROUSEL LOGIC (4s Autoplay, Pause on Hover, Arrows & Dots)
  // ==========================================================================
  const carouselContainer = document.querySelector('.hero-carousel-container');
  const slides = document.querySelectorAll('.hero-slide');
  const arrows = document.querySelectorAll('.carousel-arrow');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  
  if (carouselContainer && slides.length > 0) {
    let currentSlide = 0;
    let autoplayInterval;
    const slideDuration = 6000; // 6 segundos solicitado por el usuario

    function showSlide(index) {
      // Loop boundaries
      if (index >= slides.length) currentSlide = 0;
      else if (index < 0) currentSlide = slides.length - 1;
      else currentSlide = index;

      // Update Slides Active States
      slides.forEach((slide, i) => {
        if (i === currentSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      // Update Dots Active States
      dots.forEach((dot, i) => {
        if (i === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function startAutoplay() {
      stopAutoplay(); // Clear any existing intervals
      autoplayInterval = setInterval(() => {
        showSlide(currentSlide + 1);
      }, slideDuration);
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    }

    // Set up navigation controls
    arrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
        if (arrow.classList.contains('prev')) {
          showSlide(currentSlide - 1);
        } else {
          showSlide(currentSlide + 1);
        }
        startAutoplay(); // Restart autoplay timer on manual click
      });
    });

    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        showSlide(slideIndex);
        startAutoplay(); // Restart autoplay timer
      });
    });

    // Pause on Hover (Mumuso Style)
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);

    // Initial Start
    startAutoplay();
  }

  // ==========================================================================
  // RECIPES PAGE LOGIC (Tira Scrollable, Card click, active state, details load)
  // ==========================================================================
  const recipesTrack = document.getElementById('recipes-track');
  const recipeCards = document.querySelectorAll('.recipe-card');
  const detailContainer = document.getElementById('featured-recipe-container');

  // Recipes Data
  const recipesData = {
    avena: {
      title: "Avena Nocturna con Kéfir y Chía",
      category: "☀️ En Ayunas",
      image: "./Fotos/original_receta_avena.png",
      ingredients: [
        "1/2 taza de avena integral en hojuelas",
        "1/2 taza de KefiVida Original",
        "1 cucharada de semillas de chía",
        "1 cucharada de miel pura de abejas",
        "Fresas frescas y arándanos para decorar"
      ],
      benefits: [
        "💚 Salud Intestinal",
        "💚 Digestión Ligera",
        "💚 Energía Sostenida"
      ],
      steps: [
        "Mezcla la avena, la chía, el endulzante y tu KefiVida en un frasco o recipiente de vidrio.",
        "Tapa el frasco y déjalo reposar en el refrigerador durante toda la noche (o al menos 4 horas).",
        "Por la mañana, revuelve bien la mezcla y añade las frutas frescas por encima antes de disfrutar."
      ]
    },
    batido: {
      title: "Batido Energético de Plátano y Avena",
      category: "🏃‍♂️ Pre-Entreno",
      image: "./Fotos/original_receta_batido.png",
      ingredients: [
        "1 taza de KefiVida Original",
        "1 plátano maduro",
        "3 cucharadas de avena integral en hojuelas",
        "1/4 cucharadita de canela en polvo",
        "1 cucharadita de miel de abejas"
      ],
      benefits: [
        "💚 Energía Rápida",
        "💚 Fuerza Muscular",
        "💚 Saciedad Prolongada"
      ],
      steps: [
        "Coloca el plátano, la avena, la canela y la miel en el vaso de la licuadora.",
        "Vierte el kéfir bien frío sobre los ingredientes.",
        "Licúa a alta potencia durante 1 o 2 minutos hasta obtener una consistencia suave y cremosa."
      ]
    },
    smoothie: {
      title: "Smoothie Verde de Kéfir y Espinacas",
      category: "🔋 Post-Entreno",
      image: "./Fotos/original_receta_smoothie.png",
      ingredients: [
        "1 taza de KefiVida Original",
        "1 puñado de espinacas tiernas frescas",
        "1/2 manzana verde en trozos",
        "1/2 pepino sin semillas",
        "Hojas de menta fresca al gusto"
      ],
      benefits: [
        "💚 Recuperación Muscular",
        "💚 Antioxidante Natural",
        "💚 Super Hidratante"
      ],
      steps: [
        "Lava minuciosamente las espinacas, la manzana y el pepino.",
        "Agrégalos a la licuadora junto con la menta y la taza de KefiVida.",
        "Licúa a máxima velocidad hasta que los vegetales queden completamente integrados."
      ]
    },
    panqueques: {
      title: "Panqueques Esponjosos de Kéfir",
      category: "🥞 Desayuno",
      image: "./Fotos/original_receta_panqueques.png",
      ingredients: [
        "1 taza de harina de avena (o de trigo)",
        "1 taza de KefiVida Original",
        "1 huevo fresco",
        "1 cucharadita de polvo para hornear",
        "1 cucharadita de vainilla",
        "Aceite de coco para engrasar la sartén"
      ],
      benefits: [
        "💚 Proteína Natural",
        "💚 Fácil Digestión",
        "💚 Snack Saludable"
      ],
      steps: [
        "En un bol grande, bate el huevo con el kéfir y la vainilla. Añade la harina y el polvo de hornear, mezclando suavemente.",
        "Calienta una sartén antiadherente a fuego medio y engrásala con un toque de aceite de coco.",
        "Vierte porciones de la mezcla. Cocina hasta que salgan burbujas en la superficie, dale la vuelta y dora el otro lado."
      ]
    },
    ensalada: {
      title: "Ensalada Fresca con Aderezo de Kéfir",
      category: "🥗 Almuerzo / Cena",
      image: "./Fotos/original_receta_ensalada.png",
      ingredients: [
        "Hojas variadas de lechuga y espinaca fresca",
        "Tomates cherry partidos a la mitad y pepino en rodajas",
        "1/2 taza de KefiVida Original (para el aliño)",
        "1 cucharada de jugo de limón y 1 cucharadita de aceite de oliva",
        "Cilantro picado fino, 1/2 diente de ajo machacado, sal y pimienta"
      ],
      benefits: [
        "💚 Nutrición Fibrosa",
        "💚 Digestión Óptima",
        "💚 Bajo en Calorías"
      ],
      steps: [
        "En un tazón pequeño, mezcla enérgicamente el kéfir, el limón, el aceite de oliva, el ajo machacado y el cilantro. Condimenta con sal y pimienta.",
        "Coloca la base de lechugas, espinacas, pepinos y tomates en una ensaladera.",
        "Baña la ensalada con el aderezo cremoso justo antes de servir y mezcla bien."
      ]
    },
    crema_aguacate: {
      title: "Crema Untable de Kéfir y Aguacate",
      category: "🥑 Snack / Dip",
      image: "./Fotos/original_receta_crema_aguacate.png",
      ingredients: [
        "1 aguacate maduro grande",
        "1/2 taza de KefiVida Original",
        "Jugo de 1/2 limón",
        "Un puñado de cilantro fresco picado",
        "Sal de mar y pimienta molida al gusto"
      ],
      benefits: [
        "💚 Grasas Saludables",
        "💚 Vitaminas A, C, E",
        "💚 Digestión Amigable"
      ],
      steps: [
        "Corta el aguacate, retira la semilla y extrae la pulpa colocándola en un plato hondo o licuadora.",
        "Añade el kéfir, el jugo de limón y el cilantro fresco.",
        "Tritura con un tenedor o procesa hasta obtener una crema suave. Sazona con sal y pimienta al gusto y sirve frío."
      ]
    }
  };

  if (recipeCards.length > 0 && detailContainer) {
    const detailImage = document.getElementById('detail-image');
    const detailTitle = document.getElementById('detail-title');
    const detailCategory = document.getElementById('detail-category-tag');
    const detailIngredients = document.getElementById('detail-ingredients');
    const detailBenefits = document.getElementById('detail-benefits');
    const detailSteps = document.getElementById('detail-steps');

    recipeCards.forEach(card => {
      card.addEventListener('click', () => {
        const recipeId = card.getAttribute('data-recipe-id');
        const data = recipesData[recipeId];

        if (!data) return;

        // Update active class on cards (KefiVida green border active ring)
        recipeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Fade animation out
        detailContainer.style.opacity = '0';

        setTimeout(() => {
          // Update details
          if (detailImage) {
            detailImage.src = data.image;
            detailImage.alt = data.title;
          }
          if (detailTitle) detailTitle.textContent = data.title;
          if (detailCategory) detailCategory.textContent = data.category;

          // Update ingredients
          if (detailIngredients) {
            detailIngredients.innerHTML = data.ingredients.map(ing => `
              <li><span class="dot-marker"></span> ${ing}</li>
            `).join('');
          }

          // Update benefits
          if (detailBenefits) {
            detailBenefits.innerHTML = data.benefits.map(ben => `
              <li><span class="benefit-marker">💚</span> ${ben.replace('💚 ', '')}</li>
            `).join('');
          }

          // Update steps
          if (detailSteps) {
            detailSteps.innerHTML = data.steps.map((step, idx) => `
              <div class="recipe-step-item">
                <span class="step-number">${idx + 1}</span>
                <p>${step}</p>
              </div>
            `).join('');
          }

          // Fade animation in
          detailContainer.style.opacity = '1';

          // Smooth scroll to details
          const headerHeight = window.innerWidth <= 768 ? 70 : 80;
          const targetPosition = detailContainer.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 200);
      });
    });

    // Horizontal Scroll Buttons for Recipes Track
    const btnPrev = document.getElementById('recipes-prev');
    const btnNext = document.getElementById('recipes-next');

    if (recipesTrack && btnPrev && btnNext) {
      const scrollStep = 304; // 280px ancho tarjeta + 24px gap

      btnPrev.addEventListener('click', () => {
        recipesTrack.scrollBy({
          left: -scrollStep,
          behavior: 'smooth'
        });
      });

      btnNext.addEventListener('click', () => {
        recipesTrack.scrollBy({
          left: scrollStep,
          behavior: 'smooth'
        });
      });
    }

    // Navegación Inferior en el Visor de Detalle (Prev/Next Receta)
    const btnDetailPrev = document.getElementById('detail-prev-btn');
    const btnDetailNext = document.getElementById('detail-next-btn');

    if (btnDetailPrev && btnDetailNext) {
      const recipeIdsOrder = ['avena', 'batido', 'smoothie', 'panqueques', 'ensalada', 'crema_aguacate'];
      
      btnDetailPrev.addEventListener('click', () => {
        const activeCard = document.querySelector('.recipe-card.active');
        if (activeCard) {
          const currentId = activeCard.getAttribute('data-recipe-id');
          const currentIndex = recipeIdsOrder.indexOf(currentId);
          let prevIndex = currentIndex - 1;
          if (prevIndex < 0) prevIndex = recipeIdsOrder.length - 1;
          
          const prevCard = document.querySelector(`.recipe-card[data-recipe-id="${recipeIdsOrder[prevIndex]}"]`);
          if (prevCard) prevCard.click();
        }
      });

      btnDetailNext.addEventListener('click', () => {
        const activeCard = document.querySelector('.recipe-card.active');
        if (activeCard) {
          const currentId = activeCard.getAttribute('data-recipe-id');
          const currentIndex = recipeIdsOrder.indexOf(currentId);
          let nextIndex = currentIndex + 1;
          if (nextIndex >= recipeIdsOrder.length) nextIndex = 0;
          
          const nextCard = document.querySelector(`.recipe-card[data-recipe-id="${recipeIdsOrder[nextIndex]}"]`);
          if (nextCard) nextCard.click();
        }
      });
    }
  }

  // ==========================================================================
  // BENEFITS TABS SELECTION LOGIC (General vs 24h vs 48h)
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.benefits-tab-btn');
  const benefitsGrids = document.querySelectorAll('.benefits-grid');

  if (tabButtons.length > 0 && benefitsGrids.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Deactivate other buttons and activate clicked button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Toggle active grids
        benefitsGrids.forEach(grid => {
          const gridId = grid.getAttribute('id');
          if (gridId === `benefits-${targetTab}`) {
            grid.classList.add('active');
          } else {
            grid.classList.remove('active');
          }
        });
      });
    });
  }
});

