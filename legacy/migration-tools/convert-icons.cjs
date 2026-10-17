const fs = require("node:fs");
const path = require("node:path");
const attributes = {
  class: "className",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-width": "strokeWidth",
};
function jsx(html) {
  return html
    .replace(/([\w-]+)="([^"]*)"/g, (_, name, value) => {
      const key = attributes[name] || name;
      const expression = value.includes("${")
        ? "`" + value + "`"
        : JSON.stringify(value);
      return `${key}={${key === "style" ? `cssStyle(${expression})` : expression}}`;
    })
    .replace(/\bdata-chevron(?=\s)/g, 'data-chevron=""');
}
for (const directory of ["components", "components/pages"]) {
  for (const name of fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".jsx"))) {
    const file = path.join(directory, name);
    let source = fs.readFileSync(file, "utf8");
    source = source.replace(
      /const (\w+) = (\([^;\n]*?\)) => `(<svg[^]*?)`;/g,
      (_, name, params, html) => `const ${name} = ${params} => (${jsx(html)});`,
    );
    source = source.replace(
      /const (\w+) = '(<(?:svg|div)[^]*?)';/g,
      (_, name, html) => `const ${name} = (${jsx(html)});`,
    );
    source = source.replace(
      /copyIcon\.replace\('text-gray-700', 'text-white'\)/g,
      "cloneElement(copyIcon, { className: 'w-4 h-4 text-white' })",
    );
    if (source.includes("cloneElement(copyIcon"))
      source = source.replace(
        "import { Fragment }",
        "import { Fragment, cloneElement }",
      );
    source = source.replace(
      /<span className="inline-flex" dangerouslySetInnerHTML=\{\{ __html: ([^]*?) \}\} \/>/g,
      "{$1}",
    );
    fs.writeFileSync(file, source);
  }
}
