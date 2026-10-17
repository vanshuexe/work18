// Tinting centers page: search plus city -> area filters.
export default function initialize(scope) {
  const page = document.querySelector("[data-centers-page]");
  if (!page) return;

  const search = page.querySelector("[data-center-search]");
  const citySelect = page.querySelector("[data-center-city]");
  const areaSelect = page.querySelector("[data-center-area]");
  const centers = [...page.querySelectorAll("[data-center]")];
  const empty = page.querySelector("[data-centers-empty]");

  function fillAreas() {
    const city = citySelect.value;
    const areas = [
      ...new Set(
        centers
          .filter((c) => c.dataset.city === city)
          .map((c) => c.dataset.area)
          .filter(Boolean),
      ),
    ].sort();
    areaSelect.innerHTML = '<option value="">All Areas</option>';
    areas.forEach((area) => areaSelect.add(new Option(area, area)));
    areaSelect.disabled = !city;
  }

  function apply() {
    const query = search.value.trim().toLowerCase();
    const city = citySelect.value;
    const area = areaSelect.value;
    let visible = 0;
    centers.forEach((center) => {
      const show =
        (!city || center.dataset.city === city) &&
        (!area || center.dataset.area === area) &&
        (!query || center.dataset.search.includes(query));
      center.classList.toggle("hidden", !show);
      if (show) visible += 1;
    });
    empty.classList.toggle("hidden", visible > 0);
  }

  scope.on(citySelect, "change", () => {
    fillAreas();
    apply();
  });
  scope.on(areaSelect, "change", apply);
  scope.on(search, "input", apply);
}
