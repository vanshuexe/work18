// Home page: contact form. (The image sliders are handled in main.js.)
(function () {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const status = form.querySelector('[data-form-status]');
  const button = form.querySelector('button[type="submit"]');

  const setStatus = (message, ok) => {
    status.textContent = message;
    status.classList.remove('hidden', 'is-success', 'is-error');
    status.classList.add(ok ? 'is-success' : 'is-error');
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    button.disabled = true;
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      if (response.ok) {
        form.reset();
        setStatus('Thank you! Your message has been sent. We will get back to you soon.', true);
      } else {
        setStatus(result.errors ? result.errors.join(' ') : 'Something went wrong. Please try again.', false);
      }
    } catch (error) {
      setStatus('Could not send your message. Please check your connection and try again.', false);
    } finally {
      button.disabled = false;
    }
  });
})();
