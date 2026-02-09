// ===================================
// HomeLands - Main JavaScript File
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  // ===================================
  // 1. Smooth Scroll for Anchor Links
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===================================
  // 2. Navbar Scroll Effect
  // ===================================
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // ===================================
  // 3. Active Navigation Link
  // ===================================
  const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentLocation || (currentLocation === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===================================
  // 4. Form Validation (Contact Page)
  // ===================================
  const contactForm = document.querySelector('#contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form fields
      const firstName = document.querySelector('#firstName');
      const lastName = document.querySelector('#lastName');
      const phone = document.querySelector('#phone');
      const email = document.querySelector('#email');
      const message = document.querySelector('#message');

      // Reset previous error states
      [firstName, lastName, phone, email, message].forEach(field => {
        field.classList.remove('is-invalid');
      });

      let isValid = true;

      // Validate First Name
      if (!firstName.value.trim()) {
        firstName.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Last Name
      if (!lastName.value.trim()) {
        lastName.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Phone
      if (!phone.value.trim()) {
        phone.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Message
      if (!message.value.trim()) {
        message.classList.add('is-invalid');
        isValid = false;
      }

      // If all valid, show success message
      if (isValid) {
        alert('Thank you for contacting us! We will get back to you soon.');
        contactForm.reset();
      } else {
        alert('Please fill in all required fields correctly.');
      }
    });

    // Reset button functionality
    const resetBtn = document.querySelector('#resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        contactForm.reset();
        document.querySelectorAll('.is-invalid').forEach(field => {
          field.classList.remove('is-invalid');
        });
      });
    }
  }

  // ===================================
  // 5. Statistics Counter Animation
  // ===================================
  const stats = document.querySelectorAll('.stat-number');

  if (stats.length > 0) {
    const animateCounter = (element, target) => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target + '+';
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current) + '+';
        }
      }, 20);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target);
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    stats.forEach(stat => observer.observe(stat));
  }

  // ===================================
  // 6. Mobile Menu Close on Link Click
  // ===================================
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbarToggler && navbarCollapse) {
    const navLinksInCollapse = navbarCollapse.querySelectorAll('.nav-link');

    navLinksInCollapse.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          navbarToggler.click();
        }
      });
    });
  }

  // ===================================
  // 7. Initialize Bootstrap Tooltips
  // ===================================
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // ===================================
  // 8. Back to Top Button (Optional)
  // ===================================
  const backToTopBtn = document.querySelector('#backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===================================
  // 9. Form Input Focus Effects
  // ===================================
  const formInputs = document.querySelectorAll('.form-control');

  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });

  // ===================================
  // 10. Carousel Auto-initialization
  // ===================================
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    new bootstrap.Carousel(carousel, {
      interval: 5000,
      ride: 'carousel',
      pause: 'hover'
    });
  });

  // ===================================
  // 11. Lazy Loading Images Enhancement
  // ===================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ===================================
  // 12. Add Animation on Scroll (Optional)
  // ===================================
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;

      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.classList.add('animated');
      }
    });
  };

  if (document.querySelectorAll('.animate-on-scroll').length > 0) {
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
  }

  // ===================================
  // 13. Console Welcome Message
  // ===================================
  console.log('%c Welcome to HomeLands! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px;');
  console.log('%c Find your perfect accommodation across 8 global cities ', 'color: #667eea; font-size: 14px;');

});

// ===================================
// Additional Utility Functions
// ===================================

// Email validation helper
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
  const regex = /^[\d\s\+\-\(\)]+$/;
  return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Format phone number
function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}
