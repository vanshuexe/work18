// Shared behaviour for every page: header dropdowns, mobile menu, site search and image sliders.
(function () {
  // ----- Image sliders: [data-slider] with [data-slide] children and optional [data-slide-dot] buttons -----
  const INACTIVE_DOT = ['bg-white', 'bg-opacity-50', 'hover:bg-opacity-75'];

  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const slides = slider.querySelectorAll('[data-slide]');
    const dots = slider.querySelectorAll('[data-slide-dot]');
    const interval = Number(slider.dataset.interval) || 5000;
    let current = 0;
    let timer;

    const setDot = (dot, active) => {
      if (!dot) return;
      const activeClasses = (dot.dataset.activeClass || 'bg-[#512178]').split(' ');
      dot.classList.remove(...(active ? INACTIVE_DOT : activeClasses));
      dot.classList.add(...(active ? activeClasses : INACTIVE_DOT));
    };

    function show(index) {
      slides[current].classList.replace('opacity-100', 'opacity-0');
      setDot(dots[current], false);
      current = (index + slides.length) % slides.length;
      slides[current].classList.replace('opacity-0', 'opacity-100');
      setDot(dots[current], true);
    }

    const restart = () => {
      clearInterval(timer);
      timer = setInterval(() => show(current + 1), interval);
    };

    dots.forEach((dot, i) =>
      dot.addEventListener('click', () => {
        show(i);
        restart();
      })
    );
    if (slides.length > 1) restart();
  });

  // ----- Desktop dropdowns (About Us / Products / Colors) -----
  const dropdowns = document.querySelectorAll('[data-dropdown]');

  function closeDropdowns(except) {
    dropdowns.forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.classList.remove('is-open');
      dropdown.querySelector('[data-dropdown-menu]').classList.add('hidden');
      dropdown.querySelector('[data-dropdown-toggle]').setAttribute('aria-expanded', 'false');
    });
  }

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('[data-dropdown-toggle]');
    const menu = dropdown.querySelector('[data-dropdown-menu]');
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = !dropdown.classList.contains('is-open');
      closeDropdowns(dropdown);
      dropdown.classList.toggle('is-open', open);
      menu.classList.toggle('hidden', !open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-dropdown]')) closeDropdowns();
  });

  // ----- Mobile menu -----
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const setMobileMenu = (open) => {
    mobileMenu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  document.querySelector('[data-mobile-menu-open]').addEventListener('click', () => setMobileMenu(true));
  document.querySelector('[data-mobile-menu-close]').addEventListener('click', () => setMobileMenu(false));

  document.querySelectorAll('[data-mobile-submenu]').forEach((submenu) => {
    const toggle = submenu.querySelector('[data-mobile-submenu-toggle]');
    toggle.addEventListener('click', () => {
      const open = !submenu.classList.contains('is-open');
      submenu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  });

  // ----- Site search -----
  const search = document.querySelector('[data-search]');
  const panel = search.querySelector('[data-search-panel]');
  const input = search.querySelector('[data-search-input]');
  const results = search.querySelector('[data-search-results]');
  let timer;
  let lastQuery = '';

  const setSearch = (open) => {
    panel.classList.toggle('hidden', !open);
    if (open) input.focus();
  };

  search.querySelector('[data-search-toggle]').addEventListener('click', () => setSearch(true));
  search.querySelector('[data-search-close]').addEventListener('click', () => {
    input.value = '';
    results.innerHTML = '';
    setSearch(false);
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-search]')) setSearch(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setSearch(false);
      closeDropdowns();
      setMobileMenu(false);
    }
  });

  const escapeHtml = (text) =>
    String(text == null ? '' : text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  input.addEventListener('input', () => {
    clearTimeout(timer);
    const query = input.value.trim();
    if (query.length < 2) {
      results.innerHTML = '';
      return;
    }
    timer = setTimeout(async () => {
      lastQuery = query;
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const { results: items } = await response.json();
      if (query !== lastQuery) return;
      results.innerHTML = items.length
        ? items
            .map(
              (item) => `<a class="search-result" href="${escapeHtml(item.url)}">
                ${item.image ? `<img src="${escapeHtml(item.image)}" alt="" loading="lazy" />` : ''}
                <span>${escapeHtml(item.title)}<small>${escapeHtml(item.category)}${item.subtitle ? ' · ' + escapeHtml(item.subtitle) : ''}</small></span>
              </a>`
            )
            .join('')
        : '<p class="search-empty">No results found.</p>';
    }, 250);
  });
})();
