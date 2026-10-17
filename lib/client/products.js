// Product category pages: instant search and subcategory filtering.
// The server renders the same filters from ?q= and ?subcategory=, so links stay shareable.
export default function initialize(scope) {
  const page = document.querySelector("[data-products-page]");
  if (!page) return;

  const searchInput = page.querySelector("[data-product-search]");
  const filters = page.querySelectorAll("[data-subcategory-filter]");
  const cards = page.querySelectorAll("[data-product-card]");
  const heading = page.querySelector("[data-products-heading]");
  const empty = page.querySelector("[data-products-empty]");
  const allLabel = page.dataset.allLabel;

  let activeFilter = page.querySelector(".filter-btn.is-active");

  function apply() {
    const query = searchInput.value.trim().toLowerCase();
    const subcategoryId = activeFilter.dataset.subcategoryFilter;
    let visible = 0;
    cards.forEach((card) => {
      const show =
        (!subcategoryId || card.dataset.subcategory === subcategoryId) &&
        (!query || card.dataset.search.includes(query));
      card.classList.toggle("hidden", !show);
      if (show) visible += 1;
    });
    heading.textContent = `${activeFilter.dataset.subcategoryName || allLabel} (${visible})`;
    empty.classList.toggle("hidden", visible > 0);

    const params = new URLSearchParams();
    if (activeFilter.dataset.subcategoryName)
      params.set("subcategory", activeFilter.dataset.subcategoryName);
    if (query) params.set("q", searchInput.value.trim());
    const qs = params.toString();
    history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
  }

  filters.forEach((filter) => {
    scope.on(filter, "click", (event) => {
      event.preventDefault();
      activeFilter.classList.remove("is-active");
      activeFilter = filter;
      activeFilter.classList.add("is-active");
      apply();
    });
  });

  scope.on(searchInput, "input", apply);
  scope.on(searchInput.form, "submit", (event) => event.preventDefault());

  // Links from the site search (?product=<id>) scroll to and highlight that product
  const productId = new URLSearchParams(location.search).get("product");
  const target = productId && document.getElementById(`product-${productId}`);
  if (target) {
    target.classList.remove("hidden");
    target.classList.add("is-highlighted");
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
