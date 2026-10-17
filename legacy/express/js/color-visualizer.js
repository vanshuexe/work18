// Color Visualizer: pick a sofa and a Pachin wall colour.
(function () {
  const root = document.querySelector('[data-visualizer]');
  if (!root) return;

  const sofas = JSON.parse(root.dataset.sofas);
  const wall = root.querySelector('[data-wall]');
  const pickers = root.querySelectorAll('[data-picker]');
  let colors = [];
  let wallName = root.querySelector('[data-wall-name]').textContent;

  // ----- Open / close the two picker popups -----
  const closeAll = (except) =>
    pickers.forEach((picker) => {
      if (picker === except) return;
      picker.querySelector('[data-picker-popup]').classList.add('hidden');
      picker.querySelector('[data-picker-toggle]').setAttribute('aria-expanded', 'false');
      picker.querySelector('[data-chevron]').classList.remove('rotate-180');
    });

  pickers.forEach((picker) => {
    const toggle = picker.querySelector('[data-picker-toggle]');
    const popup = picker.querySelector('[data-picker-popup]');
    toggle.addEventListener('click', () => {
      const open = popup.classList.contains('hidden');
      closeAll(picker);
      popup.classList.toggle('hidden', !open);
      toggle.setAttribute('aria-expanded', String(open));
      picker.querySelector('[data-chevron]').classList.toggle('rotate-180', open);
    });
  });
  document.addEventListener('mousedown', (event) => {
    if (!event.target.closest('.color-visualizer-buttons')) closeAll();
  });

  // ----- Sofa -----
  const sofaImage = root.querySelector('[data-sofa-image]');
  const sofaMobile = root.querySelector('[data-sofa-mobile]');
  root.querySelectorAll('[data-sofa]').forEach((button) => {
    button.addEventListener('click', () => {
      const sofa = sofas[Number(button.dataset.sofa)];
      sofaImage.src = sofa.desktop;
      sofaMobile.srcset = sofa.mobile;
      root.querySelector('[data-sofa-dot]').style.backgroundColor = sofa.hex;
      root.querySelector('[data-sofa-hex]').textContent = sofa.hex;
      root.querySelectorAll('[data-sofa]').forEach((b) => {
        const active = b === button;
        b.classList.toggle('is-active', active);
        b.classList.toggle('opacity-50', !active);
        b.classList.toggle('hover:opacity-75', !active);
      });
    });
  });

  // ----- Wall colour -----
  const familyTitle = root.querySelector('[data-family-title]');
  const familyColors = root.querySelector('[data-family-colors]');

  const textColorFor = (hex) => {
    const n = parseInt(hex.replace('#', ''), 16);
    return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255 > 0.6 ? '#000' : '#fff';
  };

  function setWall(color) {
    wallName = color.dataColorname;
    wall.style.backgroundColor = color.hexCode;
    root.querySelector('[data-wall-dot]').style.backgroundColor = color.hexCode;
    root.querySelector('[data-wall-name]').textContent = color.dataColorname;
  }

  function showFamily(button) {
    root.querySelectorAll('[data-family]').forEach((b) => {
      const active = b === button;
      b.classList.toggle('is-active', active);
      b.classList.toggle('opacity-50', !active);
    });
    const type = button.dataset.family;
    familyTitle.textContent = button.title.replace(/\s*\(.*\)$/, '').toUpperCase();
    familyTitle.classList.remove('hidden');
    familyColors.innerHTML = '';
    colors
      .filter((c) => c.colorType === type)
      .forEach((color) => {
        const swatch = document.createElement('button');
        swatch.type = 'button';
        swatch.className = 'relative rounded-md md:rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105';
        swatch.title = `${color.dataColorname} (${color.hexCode})`;
        swatch.innerHTML = `<div class="w-full h-10 md:h-12 lg:h-14 flex items-center justify-center" style="background-color:${color.hexCode}">
          <span class="text-[8px] md:text-[10px] lg:text-xs font-medium text-center px-0.5" style="color:${textColorFor(color.hexCode)}">${color.dataColorname}</span></div>`;
        swatch.addEventListener('click', () => setWall(color));
        familyColors.appendChild(swatch);
      });
  }

  root.querySelectorAll('[data-family]').forEach((button) => {
    button.addEventListener('click', async () => {
      if (!colors.length) colors = await fetch('/api/colors').then((r) => r.json());
      showFamily(button);
    });
  });

  // ----- Copy current colour code -----
  const copyButton = root.querySelector('[data-copy-wall]');
  copyButton.addEventListener('click', async () => {
    await navigator.clipboard.writeText(wallName);
    const label = copyButton.querySelector('[data-copy-label]');
    label.textContent = 'Copied!';
    setTimeout(() => (label.textContent = 'Copy color code'), 2000);
  });
})();
