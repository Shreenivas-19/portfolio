(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const header = $('.site-header');
  const progressBar = $('#progressBar');
  const updateScrollUI = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${total > 0 ? Math.min(100, window.scrollY / total * 100) : 0}%`;
    header.classList.toggle('scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', updateScrollUI, { passive: true }); updateScrollUI();

  const menuButton = $('#mobile-menu-button');
  const mobileMenu = $('#mobile-menu');
  const setMenuOpen = open => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileMenu.hidden = !open;
  };
  menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  $$('#mobile-menu a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenuOpen(false); });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    }), { threshold: .12, rootMargin: '0px 0px -25px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('in-view'));

  const navLinks = $$('.nav-links a');
  const sections = navLinks.map(link => $(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    }), { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach(section => navObserver.observe(section));
  }

  const thought = $('#thought');
  const thoughts = ['Reality is interpreted, not observed.', 'Understanding is deeper than knowledge.', 'Most people live in borrowed beliefs.'];
  let thoughtIndex = 0;
  if (thought && !reducedMotion) window.setInterval(() => {
    thoughtIndex = (thoughtIndex + 1) % thoughts.length;
    thought.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: 'forwards' }).onfinish = () => {
      thought.textContent = thoughts[thoughtIndex];
      thought.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: 'forwards' });
    };
  }, 5200);
  $('#year').textContent = new Date().getFullYear();

  const starButtons = $$('.star');
  const ratingInput = $('#rating');
  const paintStars = rating => starButtons.forEach(button => {
    const selected = Number(button.dataset.rating) <= rating;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(Number(button.dataset.rating) === rating));
  });
  starButtons.forEach(button => button.addEventListener('click', () => {
    ratingInput.value = button.dataset.rating; paintStars(Number(ratingInput.value));
  }));
  paintStars(0);

  const EMAILJS_PUBLIC_KEY = 'ILNJdBo1YFtfdIDrK';
  const CONTACT_SERVICE_ID = 'service_fs6time';
  const CONTACT_TEMPLATE_ID = 'template_18vw8we';
  const REVIEW_SERVICE_ID = 'service_fs6time';
  const REVIEW_TEMPLATE_ID = 'template_h37734e';
  let emailJsReady = false;
  if (window.emailjs) {
    try { window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); emailJsReady = true; }
    catch (error) { console.error('EmailJS initialization failed:', error); }
  }
  const showStatus = (element, message, isError = false) => {
    element.textContent = message; element.classList.toggle('error', isError);
  };
  const setSubmitting = (form, busy) => {
    const button = $('button[type="submit"]', form); if (!button) return;
    if (!button.dataset.originalLabel) button.dataset.originalLabel = button.innerHTML;
    button.disabled = busy; button.innerHTML = busy ? '<span>Sending…</span><span>···</span>' : button.dataset.originalLabel;
  };

  const contactForm = $('#contactForm');
  contactForm.addEventListener('submit', async event => {
    event.preventDefault(); const status = $('#contactStatus');
    if (!emailJsReady) { showStatus(status, 'Email service could not load. Please email shreenivasb19@gmail.com directly.', true); return; }
    const values = Object.fromEntries(new FormData(contactForm).entries()); setSubmitting(contactForm, true); showStatus(status, 'Sending your message…');
    try {
      await window.emailjs.send(CONTACT_SERVICE_ID, CONTACT_TEMPLATE_ID, { from_name: values.name, from_email: values.email, reply_to: values.email, subject: values.subject, message: values.message, to_name: 'Shreenivas Honnalli' });
      showStatus(status, 'Message sent. Thanks for reaching out.'); contactForm.reset();
    } catch (error) { console.error('Contact form submission failed:', error); showStatus(status, 'Could not send the message. Please email shreenivasb19@gmail.com directly.', true); }
    finally { setSubmitting(contactForm, false); }
  });

  const feedbackForm = $('#bookFeedbackForm');
  feedbackForm.addEventListener('submit', async event => {
    event.preventDefault(); const status = $('#reviewStatus'); const rating = Number(ratingInput.value);
    if (rating < 1 || rating > 5) { showStatus(status, 'Please select a star rating before submitting.', true); return; }
    if (!emailJsReady) { showStatus(status, 'Email service could not load. Please try again later.', true); return; }
    const values = Object.fromEntries(new FormData(feedbackForm).entries()); setSubmitting(feedbackForm, true); showStatus(status, 'Sending your feedback…');
    try {
      await window.emailjs.send(REVIEW_SERVICE_ID, REVIEW_TEMPLATE_ID, { book_title: values.title, from_email: values.email, rating: String(rating), review: values.review, message: values.review, to_name: 'Shreenivas Honnalli' });
      showStatus(status, 'Feedback sent. Thank you for reading.'); feedbackForm.reset(); ratingInput.value = '0'; paintStars(0);
    } catch (error) { console.error('Book feedback submission failed:', error); showStatus(status, 'Could not send feedback. Please try again later.', true); }
    finally { setSubmitting(feedbackForm, false); }
  });
})();
