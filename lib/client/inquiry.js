// Client / Vendor / Investor pages: submit the inquiry form without reloading the page.
export default function initialize(scope) {
  const form = document.querySelector("[data-inquiry-form]");
  if (!form) return;
  const status = form.querySelector("[data-form-status]");
  const button = form.querySelector('button[type="submit"]');

  const updateChoices = () => {
    for (const group of form.querySelectorAll('[data-choice-group]')) {
      const boxes = [...group.querySelectorAll('input[type="checkbox"]')];
      boxes[0]?.setCustomValidity(group.dataset.required === "true" && !boxes.some(box => box.checked) ? "Select at least one option." : "");
    }
    for (const group of form.querySelectorAll('[data-other-field]')) {
      const name = group.dataset.otherField;
      const selected = [...group.querySelectorAll(`input[name="${name}"]:checked, select[name="${name}"]`)].some(control => control.value === "Other");
      const details = group.querySelector('[data-other-details]');
      details.hidden = !selected;
      const input = details.querySelector('input');
      input.disabled = !selected;
      input.required = selected;
    }
  };
  scope.on(form, "change", updateChoices);
  updateChoices();

  const setStatus = (message, ok) => {
    status.textContent = message;
    status.classList.remove("hidden", "is-success", "is-error");
    status.classList.add(ok ? "is-success" : "is-error");
  };

  scope.on(form, "submit", async (event) => {
    event.preventDefault();
    updateChoices();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    button.disabled = true;
    try {
      const response = await scope.fetch(form.action, {
        method: "POST",
        body: new FormData(form),
      });
      const result = await response.json();
      if (response.ok) {
        form.reset();
        updateChoices();
        setStatus(form.dataset.successMessage, true);
      } else {
        setStatus(
          result.errors
            ? result.errors.join(" ")
            : "Something went wrong. Please try again.",
          false,
        );
      }
    } catch (error) {
      if (!scope.disposed)
        setStatus(
          "Could not send your details. Please check your connection and try again.",
          false,
        );
    } finally {
      button.disabled = false;
    }
  });
}
