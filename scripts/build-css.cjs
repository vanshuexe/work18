/* Compiles public/css/tailwind.css = scripts/tailwind-base.css + Tailwind utilities
 * for every class used in the source.
 *
 * Run after adding or changing Tailwind classes:  npm run css
 */
const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const tailwind = require("tailwindcss");

const root = path.join(__dirname, "..");

(async () => {
  const base = fs.readFileSync(path.join(__dirname, "tailwind-base.css"), "utf8");
  const result = await postcss([tailwind(path.join(root, "tailwind.config.cjs"))]).process("@tailwind utilities;", {
    from: undefined,
  });
  const out = path.join(root, "public", "css", "tailwind.css");
  fs.writeFileSync(out, base + "\n" + result.css.replace(/\n\s*/g, ""));
  console.log("wrote " + path.relative(root, out) + " (" + fs.statSync(out).size + " bytes)");
})();
