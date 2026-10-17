// Our Colors page: filter by colour family, select a swatch and copy its code.
export default function initialize(scope) {
  const page = document.querySelector("[data-colors-page]");
  if (!page) return;

  const filters = page.querySelectorAll("[data-color-filter]");
  const swatches = page.querySelectorAll("[data-swatch]");
  const heading = page.querySelector("[data-colors-heading]");
  const selectedBox = page.querySelector("[data-selected-color]");
  const selectedSwatch = page.querySelector("[data-selected-swatch]");
  const selectedName = page.querySelector("[data-selected-name]");
  let selected = null;

  filters.forEach((filter) => {
    scope.on(filter, "click", () => {
      filters.forEach((f) => f.classList.toggle("is-active", f === filter));
      const type = filter.dataset.colorFilter;
      let count = 0;
      swatches.forEach((swatch) => {
        const show = !type || swatch.dataset.type === type;
        swatch.classList.toggle("hidden", !show);
        if (show) count += 1;
      });
      heading.textContent = `${filter.dataset.label || "ALL COLORS"} (${count})`;
      page.querySelector("[data-colors-scroll]").scrollTop = 0;
    });
  });

  swatches.forEach((swatch) => {
    scope.on(swatch, "click", () => {
      if (selected) selected.classList.remove("is-selected");
      selected = swatch;
      swatch.classList.add("is-selected");
      selectedSwatch.style.backgroundColor = swatch.dataset.hex;
      selectedName.textContent = swatch.dataset.name;
      selectedBox.classList.remove("hidden");
      selectedBox.classList.add("flex");
    });
  });

  scope.on(page.querySelector("[data-copy-color]"), "click", async (event) => {
    if (!selected) return;
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText(selected.dataset.name);
      button.title = "Copied!";
    } catch {
      button.title = "Could not copy. Please copy the displayed code manually.";
    }
  });
}
