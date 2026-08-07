// ===================================
// PROGRAMMING SKILLS CAROUSEL
// ===================================

class SkillsCarousel {
  constructor() {
    this.container = document.getElementById("skillsContainer");
    this.leftBtn = document.querySelector(".arrow-btn--left");
    this.rightBtn = document.querySelector(".arrow-btn--right");
    this.cards = document.querySelectorAll(".skill-card");

    if (!this.container || !this.leftBtn || !this.rightBtn) {
      console.error("Carousel elements not found");
      return;
    }

    this.cardWidth = 0;
    this.gap = 24; // 1.5rem = 24px
    this.scrollAmount = 0;

    this.init();
  }

  init() {
    // Calculate card width
    this.updateCardWidth();

    // Add event listeners
    this.leftBtn.addEventListener("click", () => this.scroll("left"));
    this.rightBtn.addEventListener("click", () => this.scroll("right"));

    // Handle window resize
    window.addEventListener("resize", () => this.updateCardWidth());

    // Initial button state
    this.updateButtonStates();

    // Listen to scroll events to update button states
    this.container.addEventListener("scroll", () => this.updateButtonStates());

    // Touch support for mobile
    this.setupTouchSupport();
  }

  updateCardWidth() {
    if (this.cards.length > 0) {
      const firstCard = this.cards[0];
      this.cardWidth = firstCard.offsetWidth;
    }
  }

  scroll(direction) {
    const scrollDistance = this.cardWidth + this.gap;

    if (direction === "left") {
      this.container.scrollBy({
        left: -scrollDistance,
        behavior: "smooth",
      });
    } else if (direction === "right") {
      this.container.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  }

  updateButtonStates() {
    const maxScroll = this.container.scrollWidth - this.container.clientWidth;
    const currentScroll = this.container.scrollLeft;

    // Disable left button at start
    this.leftBtn.disabled = currentScroll <= 0;

    // Disable right button at end
    this.rightBtn.disabled = currentScroll >= maxScroll - 5; // 5px tolerance
  }

  setupTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;

    this.container.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      false,
    );

    this.container.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      },
      false,
    );

    const handleSwipe = () => {
      const swipeThreshold = 50; // minimum distance for swipe
      const difference = touchStartX - touchEndX;

      if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
          // Swiped left, scroll right
          this.scroll("right");
        } else {
          // Swiped right, scroll left
          this.scroll("left");
        }
      }
    };

    this.handleSwipe = handleSwipe;
  }
}

// Initialize carousel when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new SkillsCarousel();
});

// ===================================
// KEYBOARD NAVIGATION
// ===================================

document.addEventListener("keydown", (e) => {
  const container = document.getElementById("skillsContainer");
  if (!container) return;

  if (e.key === "ArrowLeft") {
    document.querySelector(".arrow-btn--left")?.click();
  } else if (e.key === "ArrowRight") {
    document.querySelector(".arrow-btn--right")?.click();
  }
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATION
// ===================================

if ("IntersectionObserver" in window) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.animation = "slideIn 0.6s ease-out forwards";
      }
    });
  }, observerOptions);

  // Observe all skill cards
  document.querySelectorAll(".skill-card").forEach((card) => {
    observer.observe(card);
  });
}
