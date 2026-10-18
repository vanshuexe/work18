// Color Visualizer: pick a sofa and an Aeropolish wall colour.
export default function initialize(scope) {
  const root = document.querySelector("[data-visualizer]");
  if (!root) return;

  const sofas = JSON.parse(root.dataset.sofas);
  const wall = root.querySelector("[data-wall]");
  const pickers = root.querySelectorAll("[data-picker]");
  let colors = [];
  let colorsRequest;
  // One shared request for the colour list; it is prefetched shortly after the page loads
  // so opening a colour family does not wait for the network.
  const loadColors = () => {
    if (colors.length) return Promise.resolve(colors);
    colorsRequest ||= scope
      .fetch("/api/colors")
      .then((response) => {
        if (!response.ok) throw new Error("Colors unavailable");
        return response.json();
      })
      .then((list) => (colors = list))
      .catch((error) => {
        colorsRequest = undefined;
        throw error;
      });
    return colorsRequest;
  };
  scope.setTimeout(() => loadColors().catch(() => {}), 600);
  // Warm the other sofa photos so switching sofas is instant.
  scope.setTimeout(() => sofas.forEach((sofa) => { new Image().src = sofa.desktop; }), 1500);
  let wallName = root.querySelector("[data-wall-name]").textContent;

  // ----- Open / close the two picker popups -----
  const closeAll = (except) =>
    pickers.forEach((picker) => {
      if (picker === except) return;
      picker.querySelector("[data-picker-popup]").classList.add("hidden");
      picker
        .querySelector("[data-picker-toggle]")
        .setAttribute("aria-expanded", "false");
      const chevron = picker.querySelector("[data-chevron]");
      if (chevron) chevron.classList.remove("rotate-180");
    });

  pickers.forEach((picker) => {
    const toggle = picker.querySelector("[data-picker-toggle]");
    const popup = picker.querySelector("[data-picker-popup]");
    scope.on(toggle, "click", () => {
      const open = popup.classList.contains("hidden");
      closeAll(picker);
      popup.classList.toggle("hidden", !open);
      toggle.setAttribute("aria-expanded", String(open));
      const chevron = picker.querySelector("[data-chevron]");
      if (chevron) chevron.classList.toggle("rotate-180", open);
    });
  });

  scope.on(document, "mousedown", (event) => {
    if (!event.target.closest(".color-visualizer-buttons")) closeAll();
  });

  // ----- Sofa -----
  const sofaImage = root.querySelector("[data-sofa-image]");
  const sofaMobile = root.querySelector("[data-sofa-mobile]");
  root.querySelectorAll("[data-sofa]").forEach((button) => {
    scope.on(button, "click", () => {
      const sofa = sofas[Number(button.dataset.sofa)];
      if (sofaImage) sofaImage.src = sofa.desktop;
      if (sofaMobile) sofaMobile.srcset = sofa.mobile;
      const sofaDot = root.querySelector("[data-sofa-dot]");
      if (sofaDot) sofaDot.style.backgroundColor = sofa.hex;
      const sofaHex = root.querySelector("[data-sofa-hex]");
      if (sofaHex) sofaHex.textContent = sofa.hex;
      root.querySelectorAll("[data-sofa]").forEach((b) => {
        const active = b === button;
        b.classList.toggle("is-active", active);
        b.classList.toggle("ring-2", active);
        b.classList.toggle("ring-blue-600", active);
        b.classList.toggle("opacity-50", !active);
        b.classList.toggle("hover:opacity-75", !active);
      });
    });
  });

  // ----- Wall colour -----
  const familyTitle = root.querySelector("[data-family-title]");
  const familyColors = root.querySelector("[data-family-colors]");
  if (familyColors) {
    scope.on(familyColors, "click", (event) => {
      const swatch = event.target.closest("button[data-index]");
      const color = swatch && familyColors._shown?.[Number(swatch.dataset.index)];
      if (color) setWall(color);
    });
  }

  const textColorFor = (hex) => {
    const n = parseInt(hex.replace("#", ""), 16);
    return (0.299 * ((n >> 16) & 255) +
      0.587 * ((n >> 8) & 255) +
      0.114 * (n & 255)) /
      255 >
      0.6
      ? "#000"
      : "#fff";
  };

  function setWall(color) {
    wallName = color.dataColorname;
    wall.style.backgroundColor = color.hexCode;
    const wallDot = root.querySelector("[data-wall-dot]");
    if (wallDot) wallDot.style.backgroundColor = color.hexCode;
    const wallNameEl = root.querySelector("[data-wall-name]");
    if (wallNameEl) wallNameEl.textContent = color.dataColorname;
    const footerName = root.querySelector("[data-active-color-name]");
    if (footerName) footerName.textContent = color.dataColorname;
    const footerHex = root.querySelector("[data-active-color-hex]");
    if (footerHex) footerHex.textContent = color.hexCode;
  }

  function showFamily(button) {
    root.querySelectorAll("[data-family]").forEach((b) => {
      const active = b === button;
      b.classList.toggle("is-active", active);
      b.classList.toggle("ring-2", active);
      b.classList.toggle("ring-blue-600", active);
      b.classList.toggle("opacity-50", !active);
    });
    const type = button.dataset.family;
    if (familyTitle) {
      familyTitle.textContent = button.title
        .replace(/\s*\(.*\)$/, "")
        .toUpperCase();
      familyTitle.classList.remove("hidden");
    }
    if (familyColors) {
      familyColors.innerHTML = "";
      const fragment = document.createDocumentFragment();
      const shown = colors.filter((c) => c.colorType === type);
      shown.forEach((color, index) => {
          const swatch = document.createElement("button");
          swatch.type = "button";
          swatch.className =
            "relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 border border-black/10 group";
          swatch.title = `${color.dataColorname} (${color.hexCode})`;
          swatch.innerHTML = `<div class="w-full h-11 md:h-12 flex flex-col items-center justify-center p-1" style="background-color:${color.hexCode}">
            <span class="text-[9px] md:text-[10px] font-bold text-center leading-tight line-clamp-1" style="color:${textColorFor(color.hexCode)}">${color.dataColorname}</span>
            <span class="text-[8px] font-mono opacity-80" style="color:${textColorFor(color.hexCode)}">${color.hexCode}</span>
          </div>`;
          swatch.dataset.index = index;
          fragment.appendChild(swatch);
        });
      familyColors._shown = shown;
      familyColors.appendChild(fragment);
    }
  }

  root.querySelectorAll("[data-family]").forEach((button) => {
    scope.on(button, "click", async () => {
      try {
        await loadColors();
        if (!scope.disposed) showFamily(button);
      } catch {
        if (!scope.disposed && familyTitle) {
          familyTitle.classList.remove("hidden");
          familyTitle.textContent = "Could not load colors. Please try again.";
        }
      }
    });
  });

  // ----- Shuffle Wall Colour -----
  const shuffleBtn = root.querySelector("[data-shuffle-wall]");
  if (shuffleBtn) {
    scope.on(shuffleBtn, "click", async () => {
      try {
        await loadColors();
        if (colors.length > 0) {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          setWall(randomColor);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  // ----- Ambience / Lighting Toggle -----
  const ambienceBtn = root.querySelector("[data-ambience-toggle]");
  const ambientOverlay = root.querySelector("[data-ambient-overlay]");
  if (ambienceBtn && ambientOverlay) {
    let warm = false;
    scope.on(ambienceBtn, "click", () => {
      warm = !warm;
      ambientOverlay.classList.toggle("opacity-0", !warm);
      ambientOverlay.classList.toggle("opacity-35", warm);
      const label = ambienceBtn.querySelector("[data-ambience-label]");
      if (label) label.textContent = warm ? "Warm Evening 2700K" : "Natural Daylight 5000K";
    });
  }

  // ----- Copy current colour code -----
  const copyButton = root.querySelector("[data-copy-wall]");
  if (copyButton) {
    scope.on(copyButton, "click", async () => {
      const label = copyButton.querySelector("[data-copy-label]");
      try {
        await navigator.clipboard.writeText(wallName);
        if (label) label.textContent = "Copied!";
      } catch {
        if (label) label.textContent = "Copied!";
      }
      scope.setTimeout(() => {
        if (label) label.textContent = "Copy color code";
      }, 2000);
    });
  }
}
