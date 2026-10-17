/** Used by scripts/build-css.cjs to compile public/css/tailwind.css from the
 *  classes used in the source (app, components, lib, config). */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,cjs}",
    "./config/**/*.js",
  ],
  // Base styles live in scripts/tailwind-base.css, so only utilities are generated.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
        manrope: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
      },
      fontSize: { "2xs": ["0.625rem", { lineHeight: "0.875rem" }] },
      scale: { 101: "1.01", 102: "1.02", 108: "1.08" },
      opacity: { 15: "0.15", 35: "0.35" },
    },
  },
  plugins: [
    ({ addUtilities }) =>
      addUtilities({
        ".scrollbar-hide": { "-ms-overflow-style": "none", "scrollbar-width": "none" },
        ".scrollbar-hide::-webkit-scrollbar": { display: "none" },
      }),
  ],
};
