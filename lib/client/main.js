// Shared behaviour for every page: header dropdowns, mobile menu, site search and image sliders.
export default function initialize(scope) {
  // ----- Image sliders: [data-slider] with [data-slide] children and optional [data-slide-dot] buttons -----
  const INACTIVE_DOT = ["bg-white", "bg-opacity-50", "hover:bg-opacity-75"];

  document.querySelectorAll("[data-slider]").forEach((slider) => {
    const slides = slider.querySelectorAll("[data-slide]");
    const dots = slider.querySelectorAll("[data-slide-dot]");
    const interval = Number(slider.dataset.interval) || 5000;
    let current = 0;
    let timer;

    const setDot = (dot, active) => {
      if (!dot) return;
      const activeClasses = (dot.dataset.activeClass || "bg-[#512178]").split(
        " ",
      );
      dot.classList.remove(...(active ? INACTIVE_DOT : activeClasses));
      dot.classList.add(...(active ? activeClasses : INACTIVE_DOT));
    };

    function show(index) {
      slides[current].classList.replace("opacity-100", "opacity-0");
      setDot(dots[current], false);
      current = (index + slides.length) % slides.length;
      slides[current].classList.replace("opacity-0", "opacity-100");
      setDot(dots[current], true);
    }

    const restart = () => {
      scope.clearInterval(timer);
      timer = scope.setInterval(() => show(current + 1), interval);
    };

    dots.forEach((dot, i) =>
      scope.on(dot, "click", () => {
        show(i);
        restart();
      }),
    );
    if (slides.length > 1) restart();
  });

  document.querySelectorAll("[data-product-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-product-track]");
    const scroll = (direction) => {
      const slide = track.querySelector("[data-product-slide]");
      if (!slide) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      track.scrollBy({
        left: direction * (slide.getBoundingClientRect().width + gap),
        behavior: "smooth",
      });
    };

    scope.on(
      carousel.querySelector('[data-product-scroll="previous"]'),
      "click",
      () => scroll(-1),
    );
    scope.on(
      carousel.querySelector('[data-product-scroll="next"]'),
      "click",
      () => scroll(1),
    );
  });

  // ----- Desktop dropdowns (About Us / Products / Colors) -----
  const dropdowns = document.querySelectorAll("[data-dropdown]");

  function closeDropdowns(except) {
    dropdowns.forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.classList.remove("is-open");
      dropdown.querySelector("[data-dropdown-menu]").classList.add("hidden");
      dropdown
        .querySelector("[data-dropdown-toggle]")
        .setAttribute("aria-expanded", "false");
    });
  }

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector("[data-dropdown-toggle]");
    const menu = dropdown.querySelector("[data-dropdown-menu]");
    scope.on(toggle, "click", (event) => {
      event.stopPropagation();
      const open = !dropdown.classList.contains("is-open");
      closeDropdowns(dropdown);
      dropdown.classList.toggle("is-open", open);
      menu.classList.toggle("hidden", !open);
      toggle.setAttribute("aria-expanded", String(open));
    });
  });

  scope.on(document, "click", (event) => {
    if (!event.target.closest("[data-dropdown]")) closeDropdowns();
  });

  // ----- Mobile menu -----
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const mobileTrigger = document.querySelector("[data-mobile-menu-open]");
  const setMobileMenu = (open) => {
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.inert = !open;
    mobileMenu.setAttribute("aria-hidden", String(!open));
    mobileTrigger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) mobileMenu.querySelector('[data-mobile-menu-close]').focus();
    else if (mobileMenu.contains(document.activeElement)) mobileTrigger.focus();
  };
  scope.on(document.querySelector("[data-mobile-menu-open]"), "click", () =>
    setMobileMenu(true),
  );
  scope.on(document.querySelector("[data-mobile-menu-close]"), "click", () =>
    setMobileMenu(false),
  );
  scope.on(mobileMenu, "click", (event) => {
    if (event.target.closest("a")) setMobileMenu(false);
  });
  scope.on(mobileMenu, "keydown", (event) => {
    if (event.key !== "Tab") return;
    const controls = [...mobileMenu.querySelectorAll('a, button')].filter(element => element.getClientRects().length);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  scope.on(window, "resize", () => {
    if (window.innerWidth >= 1200 && mobileMenu.classList.contains("is-open")) setMobileMenu(false);
  });

  document.querySelectorAll("[data-mobile-submenu]").forEach((submenu) => {
    const toggle = submenu.querySelector("[data-mobile-submenu-toggle]");
    scope.on(toggle, "click", () => {
      const open = !submenu.classList.contains("is-open");
      submenu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
  });

  // ----- Site search -----
  const search = document.querySelector("[data-search]");
  const panel = search.querySelector("[data-search-panel]");
  const input = search.querySelector("[data-search-input]");
  const results = search.querySelector("[data-search-results]");
  let timer;
  let lastQuery = "";

  const setSearch = (open) => {
    panel.classList.toggle("hidden", !open);
    search.querySelector('[data-search-toggle]').setAttribute('aria-expanded', String(open));
    if (open) input.focus();
    else if (panel.contains(document.activeElement)) search.querySelector('[data-search-toggle]').focus();
  };

  scope.on(search.querySelector("[data-search-toggle]"), "click", () =>
    setSearch(true),
  );
  scope.on(search.querySelector("[data-search-close]"), "click", () => {
    input.value = "";
    results.innerHTML = "";
    setSearch(false);
  });
  scope.on(document, "click", (event) => {
    if (!event.target.closest("[data-search]")) setSearch(false);
  });
  scope.on(document, "keydown", (event) => {
    if (event.key === "Escape") {
      setSearch(false);
      closeDropdowns();
      setMobileMenu(false);
    }
  });

  const escapeHtml = (text) =>
    String(text == null ? "" : text).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );

  scope.on(input, "input", () => {
    scope.clearTimeout(timer);
    const query = input.value.trim();
    lastQuery = query;
    if (query.length < 2) {
      results.innerHTML = "";
      return;
    }
    timer = scope.setTimeout(async () => {
      try {
        const response = await scope.fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
        );
        if (!response.ok) throw new Error("Search failed");
        const { results: items } = await response.json();
        if (query !== lastQuery || scope.disposed) return;
        results.innerHTML = items.length
          ? items
              .map(
                (
                  item,
                ) => `<a class="search-result" href="${escapeHtml(item.url)}">
                ${item.image ? `<img src="${escapeHtml(item.image)}" alt="" loading="lazy" />` : ""}
                <span>${escapeHtml(item.title)}<small>${escapeHtml(item.category)}${item.subtitle ? " · " + escapeHtml(item.subtitle) : ""}</small></span>
              </a>`,
              )
              .join("")
          : '<p class="search-empty">No results found.</p>';
      } catch (error) {
        if (!scope.disposed && query === lastQuery)
          results.innerHTML =
            '<p class="search-empty">Search is unavailable. Please try again.</p>';
      }
    }, 250);
  });
}
