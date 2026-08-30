/* ============================================
   SOLARIS — Main JavaScript
   Framework-free, vanilla JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky Header ---------- */
  const header = document.querySelector('.header');

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------- Mobile Menu ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        var spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  /* ---------- Active Nav Link ---------- */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  /* ---------- Scroll Reveal Animation ---------- */
  var revealElements = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    var windowHeight = window.innerHeight;
    revealElements.forEach(function (el) {
      var elementTop = el.getBoundingClientRect().top;
      var revealPoint = 120;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('revealed');
      }
    });
  }

  if (revealElements.length > 0) {
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll();
  }

  /* ---------- Counter Animation ---------- */
  function animateCounters() {
    var counters = document.querySelectorAll('[data-count]');
    counters.forEach(function (counter) {
      if (counter.dataset.animated) return;

      var rect = counter.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      counter.dataset.animated = 'true';
      var target = parseInt(counter.getAttribute('data-count'), 10);
      var suffix = counter.getAttribute('data-suffix') || '';
      var duration = 2000;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        var current = Math.floor(eased * target);
        counter.textContent = current.toLocaleString() + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target.toLocaleString() + suffix;
        }
      }

      requestAnimationFrame(step);
    });
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

  /* ---------- FAQ Accordion ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(function (other) {
        other.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ---------- Contact Form ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(contactForm);
      var name = formData.get('name');
      var email = formData.get('email');

      if (!name || !email) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }

      // Simulate form submission
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(function () {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#10B981';
        contactForm.reset();

        setTimeout(function () {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  function showFormMessage(text, type) {
    var existing = document.querySelector('.form-message');
    if (existing) existing.remove();

    var msg = document.createElement('div');
    msg.className = 'form-message';
    msg.textContent = text;
    msg.style.cssText = 'padding:12px 20px;border-radius:8px;margin-bottom:16px;font-size:0.9rem;font-weight:500;';
    msg.style.background = type === 'error' ? '#FEF2F2' : '#F0FDF4';
    msg.style.color = type === 'error' ? '#DC2626' : '#16A34A';
    msg.style.border = '1px solid ' + (type === 'error' ? '#FECACA' : '#BBF7D0');

    contactForm.insertBefore(msg, contactForm.firstChild);
    setTimeout(function () { msg.remove(); }, 4000);
  }

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var headerHeight = header.offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Service Card Hover Effect ---------- */
  var serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-6px)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

});