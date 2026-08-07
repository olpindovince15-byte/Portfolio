// ===================================
// ENHANCED FOOTER FUNCTIONALITY
// ===================================

// ===================================
// BACK TO TOP BUTTON
// ===================================

class BackToTopButton {
  constructor() {
    this.button = document.getElementById("backToTop");
    this.threshold = 300; // Show button after scrolling 300px

    if (!this.button) return;

    this.init();
  }

  init() {
    // Listen to scroll events
    window.addEventListener("scroll", () => this.handleScroll());

    // Click handler
    this.button.addEventListener("click", () => this.scrollToTop());
  }

  handleScroll() {
    if (window.scrollY > this.threshold) {
      this.button.classList.add("show");
    } else {
      this.button.classList.remove("show");
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

// ===================================
// NEWSLETTER FORM HANDLER
// ===================================

class NewsletterForm {
  constructor() {
    this.form = document.getElementById("newsletterForm");

    if (!this.form) return;

    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    const emailInput = this.form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    const button = this.form.querySelector("button");

    // Validate email
    if (!this.isValidEmail(email)) {
      this.showMessage("Please enter a valid email address", "error");
      return;
    }

    // Disable button during submission
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = "Subscribing...";

    // Simulate API call
    setTimeout(() => {
      this.showMessage("Successfully subscribed! Check your email.", "success");
      emailInput.value = "";
      button.disabled = false;
      button.textContent = originalText;
    }, 1000);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showMessage(message, type) {
    // Remove existing message
    const existingMsg = this.form.querySelector(".form-message");
    if (existingMsg) existingMsg.remove();

    // Create message element
    const msgDiv = document.createElement("div");
    msgDiv.className = `form-message form-message--${type}`;
    msgDiv.textContent = message;
    msgDiv.style.cssText = `
      padding: 0.8rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      animation: slideIn 0.3s ease-out;
      ${
        type === "success"
          ? "background: rgba(34, 197, 94, 0.15); border: 1px solid #22c55e; color: #86efac;"
          : "background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5;"
      }
    `;

    this.form.insertBefore(msgDiv, this.form.firstChild);

    // Auto remove after 4 seconds
    setTimeout(() => msgDiv.remove(), 4000);
  }
}

// ===================================
// SMOOTH SCROLL FOR FOOTER LINKS
// ===================================

function setupSmoothScroll() {
  const footerLinks = document.querySelectorAll('footer a[href^="#"]');

  footerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ===================================
// ANIMATION ON SCROLL
// ===================================

function setupFooterAnimations() {
  if (!("IntersectionObserver" in window)) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.animation = "slideInUp 0.6s ease-out forwards";
      }
    });
  }, observerOptions);

  // Observe footer sections
  document.querySelectorAll(".footer-section").forEach((section, index) => {
    section.style.opacity = "0";
    section.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s backwards`;
    observer.observe(section);
  });
}

// ===================================
// KEYBOARD SHORTCUTS
// ===================================

function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // Alt + T to scroll to top
    if (e.altKey && e.key === "t") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Alt + E to focus email input
    if (e.altKey && e.key === "e") {
      e.preventDefault();
      const emailInput = document.querySelector(
        '.newsletter-form input[type="email"]',
      );
      if (emailInput) emailInput.focus();
    }
  });
}

// ===================================
// CURRENT YEAR IN FOOTER
// ===================================

function updateCopyrightYear() {
  const yearElements = document.querySelectorAll(".copyright-year");
  const currentYear = new Date().getFullYear();

  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });
}

// ===================================
// FOOTER LINK TRACKING (Optional)
// ===================================

class FooterLinkTracker {
  constructor() {
    this.setupTracking();
  }

  setupTracking() {
    const footerLinks = document.querySelectorAll("footer a");

    footerLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.trackEvent("footer_link_click", {
          text: link.textContent,
          href: link.href,
        });
      });
    });

    // Track newsletter signup
    const newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", () => {
        this.trackEvent("newsletter_signup");
      });
    }

    // Track back to top clicks
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        this.trackEvent("back_to_top_click");
      });
    }
  }

  trackEvent(eventName, eventData = {}) {
    // This can be connected to Google Analytics or other tracking service
    // Example: gtag('event', eventName, eventData);
    console.log(`📊 Event: ${eventName}`, eventData);
  }
}

// ===================================
// INITIALIZE ALL FUNCTIONALITY
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Initializing enhanced footer...");

  // Initialize components
  new BackToTopButton();
  new NewsletterForm();
  new FooterLinkTracker();

  // Setup features
  setupSmoothScroll();
  setupFooterAnimations();
  setupKeyboardShortcuts();
  updateCopyrightYear();

  console.log("✅ Footer initialized successfully!");
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Detect if user prefers dark mode
function detectDarkMode() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark;
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Scroll to specific element
function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ===================================
// EXPORT FOR EXTERNAL USE
// ===================================

window.FooterUtils = {
  scrollToElement,
  isElementInViewport,
  detectDarkMode,
};
