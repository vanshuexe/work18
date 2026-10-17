// Careers page: job search/filters, expanding job cards and the application form.
export default function initialize(scope) {
  const page = document.querySelector("[data-careers-page]");
  if (!page) return;

  const jobs = page.querySelectorAll("[data-job]");
  const search = page.querySelector("[data-job-search]");
  const filters = page.querySelectorAll("[data-job-filter]");
  const heading = page.querySelector("[data-jobs-heading]");
  const empty = page.querySelector("[data-jobs-empty]");

  function apply() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    jobs.forEach((job) => {
      const matchesFilters = [...filters].every(
        (f) => !f.value || job.dataset[f.dataset.jobFilter] === f.value,
      );
      const show =
        matchesFilters && (!query || job.dataset.search.includes(query));
      job.classList.toggle("hidden", !show);
      if (show) visible += 1;
    });
    heading.textContent = `Job Opportunities (${visible})`;
    if (jobs.length) empty.classList.toggle("hidden", visible > 0);
  }

  scope.on(search, "input", apply);
  filters.forEach((f) => scope.on(f, "change", apply));

  jobs.forEach((job) => {
    const toggle = job.querySelector("[data-job-toggle]");
    const details = job.querySelector("[data-job-details]");
    scope.on(toggle, "click", () => {
      const open = details.classList.toggle("hidden") === false;
      toggle.setAttribute("aria-expanded", String(open));
    });
  });

  page.querySelectorAll("[data-apply-form]").forEach((form) => {
    const status = form.querySelector("[data-form-status]");
    const button = form.querySelector('button[type="submit"]');
    scope.on(form, "submit", async (event) => {
      event.preventDefault();
      button.disabled = true;
      try {
        const response = await scope.fetch(form.action, {
          method: "POST",
          body: new FormData(form),
        });
        const result = await response.json();
        status.classList.remove("hidden", "is-success", "is-error");
        if (response.ok) {
          form.reset();
          status.classList.add("is-success");
          status.textContent =
            "Thank you! Your application has been submitted.";
        } else {
          status.classList.add("is-error");
          status.textContent = (
            result.errors || ["Something went wrong. Please try again."]
          ).join(" ");
        }
      } catch (error) {
        status.classList.remove("hidden");
        status.classList.add("is-error");
        status.textContent =
          "Could not submit your application. Please try again.";
      } finally {
        button.disabled = false;
      }
    });
  });
}
