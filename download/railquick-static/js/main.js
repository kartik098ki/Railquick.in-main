// Supabase Configuration
const SUPABASE_URL = 'https://lviykwlunvdfjizxpgvd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aXlrd2x1bnZkZmppenhwZ3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NzUyOTYsImV4cCI6MjA3ODI1MTI5Nn0.ugD5GHsfYLKKRidFkvKL8fhQ0U_xXLxrT3lf18g0NW8';

// Toast Notification System
function showToast(title, description, type = 'success') {
  // Remove existing toasts
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-title">${title}</div>
    ${description ? `<div class="toast-description">${description}</div>` : ''}
  `;
  document.body.appendChild(toast);

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Submit to Supabase
async function submitToSupabase(table, data) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });
    return response.ok;
  } catch (error) {
    console.error('Submit error:', error);
    return false;
  }
}

// Navigation Scroll Effect
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('bg-white/95', 'backdrop-blur-xl', 'shadow-md');
      nav.classList.remove('bg-white/80', 'bg-transparent');
    } else {
      nav.classList.remove('bg-white/95', 'backdrop-blur-xl', 'shadow-md');
      if (nav.dataset.transparent === 'true') {
        nav.classList.add('bg-transparent');
      } else {
        nav.classList.add('bg-white/80', 'backdrop-blur-md');
      }
    }
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!menuButton || !mobileMenu) return;

  menuButton.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
      mobileMenu.classList.remove('hidden');
      menuButton.innerHTML = `
        <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      `;
    } else {
      mobileMenu.classList.add('hidden');
      menuButton.innerHTML = `
        <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    }
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuButton.innerHTML = `
        <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    });
  });
}

// Modal Functionality
function initModal() {
  const modal = document.getElementById('waitlist-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalForm = document.getElementById('modal-form');
  const modalEmailInput = document.getElementById('modal-email');
  const modalSubmitBtn = document.getElementById('modal-submit-btn');
  const openModalBtns = document.querySelectorAll('[data-open-modal]');

  if (!modal) return;

  // Open modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Form submission
  if (modalForm) {
    modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = modalEmailInput.value.trim();
      
      if (!email) return;

      modalSubmitBtn.disabled = true;
      modalSubmitBtn.textContent = 'Submitting...';

      const success = await submitToSupabase('notifications', { email });

      if (success) {
        showToast('Success!', "We'll notify you when we launch!");
        modalEmailInput.value = '';
        closeModal();
      } else {
        showToast('Error', 'Failed to submit. Please try again.', 'error');
      }

      modalSubmitBtn.disabled = false;
      modalSubmitBtn.textContent = 'Notify Me';
    });
  }
}

// Waitlist Form (Home Page CTA Section)
function initWaitlistForm() {
  const form = document.getElementById('waitlist-form');
  const emailInput = document.getElementById('waitlist-email');
  const submitBtn = document.getElementById('waitlist-submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    
    if (!email) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';

    const success = await submitToSupabase('notifications', { email });

    if (success) {
      showToast('Success!', "You've joined the waitlist!");
      emailInput.value = '';
    } else {
      showToast('Error', 'Failed to join waitlist.', 'error');
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Join Waitlist';
  });
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const data = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      inquiry: messageInput.value.trim()
    };

    const success = await submitToSupabase('contacts', data);

    if (success) {
      showToast('Message Sent!', "We'll get back to you soon.");
      form.reset();
    } else {
      showToast('Error', 'Failed to send message.', 'error');
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  });
}

// Hiring Application Form
function initHiringForm() {
  const form = document.getElementById('hiring-form');
  const submitBtn = document.getElementById('hiring-submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      reason: formData.get('reason'),
      linkedin: formData.get('linkedin'),
      journey: formData.get('journey') || ''
    };

    const success = await submitToSupabase('applications', data);

    if (success) {
      showToast('Application Submitted!', "We'll review and get back to you.");
      form.reset();
    } else {
      showToast('Error', 'Failed to submit application.', 'error');
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Application';
  });
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (!button || !content) return;

    button.addEventListener('click', () => {
      const isOpen = !content.classList.contains('max-h-0');

      // Close all other FAQs
      faqItems.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.faq-content');
        const otherIcon = otherItem.querySelector('.faq-icon');
        if (otherContent) {
          otherContent.classList.add('max-h-0');
          otherContent.classList.remove('max-h-96');
        }
        if (otherIcon) {
          otherIcon.classList.remove('rotate-180');
        }
      });

      // Toggle current FAQ
      if (!isOpen) {
        content.classList.remove('max-h-0');
        content.classList.add('max-h-96');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
  initModal();
  initWaitlistForm();
  initContactForm();
  initHiringForm();
  initFaqAccordion();
});
