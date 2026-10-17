// One-time migration: preserve the original markup as real React components.
const fs = require("node:fs");
const path = require("node:path");
const names = {
  home: "HomePage",
  "about-us": "AboutPage",
  careers: "CareersPage",
  catalogs: "CatalogsPage",
  news: "NewsPage",
  "news-detail": "NewsDetailPage",
  "tinting-center": "TintingCenterPage",
  "our-colors": "OurColorsPage",
  "color-trends": "ColorTrendsPage",
  "color-visualizer": "ColorVisualizerPage",
  products: "ProductsPage",
  404: "NotFoundPage",
  header: "Header",
  footer: "Footer",
  "product-card": "ProductCard",
};
const props = {
  home: "home, countries",
  "about-us": "boardLeaders, boardMembers, executives",
  careers: "jobs, types, locations, departments, countries",
  catalogs: "catalogs",
  news: "posts",
  "news-detail": "post",
  "tinting-center": "centers, cities",
  "our-colors": "colors",
  "color-trends": "catalog",
  "color-visualizer": "sofas, counts, defaultColor",
  products:
    "category, subcategories, products, activeSubcategory, query, isVisible, visibleCount",
  header: "headerTheme = '', active = ''",
  "product-card": "product, visible = true",
};
const attrNames = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  autocomplete: "autoComplete",
  srcset: "srcSet",
  allowfullscreen: "allowFullScreen",
  referrerpolicy: "referrerPolicy",
  crossorigin: "crossOrigin",
  maxlength: "maxLength",
  novalidate: "noValidate",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  enctype: "encType",
};

function convert(name, folder) {
  let source = fs.readFileSync(`views/${folder}/${name}.ejs`, "utf8");
  source = source.replace(
    /<%- include\('\.\.\/partials\/(?:top|bottom)'[^]*?%>/g,
    "",
  );
  source = source.replace(/<%= i \? 'loading=lazy' : '' %>/g, 'loading="lazy"');
  source = source.replace(
    /<%= c.code === (?:home.defaultCountryCode|'\+20') \? 'selected' : '' %>/g,
    "",
  );
  source = source.replace(
    /<select name="countryCode"/g,
    '<select defaultValue="+20" name="countryCode"',
  );
  const slots = [];
  source = source.replace(/<%([=-]?)([^]*?)%>/g, (_, kind, code) => {
    slots.push({ kind, code: code.trim() });
    return `SLOT${slots.length - 1}TOKEN`;
  });
  source = source.replace(/<!--([^]*?)-->/g, (_, text) => `{/*${text}*/}`);
  const stringExpr = (value) => {
    if (/^SLOT\d+TOKEN$/.test(value))
      return slots[Number(value.match(/\d+/)[0])].code;
    if (!/SLOT\d+TOKEN/.test(value)) return JSON.stringify(value);
    return (
      "`" +
      value
        .replace(/`/g, "\\`")
        .replace(/\$/g, "\\$")
        .replace(/SLOT(\d+)TOKEN/g, (_, id) => "${" + slots[id].code + "}") +
      "`"
    );
  };
  source = source.replace(
    /<([a-z][\w-]*)(\s[^]*?)?(\/?)>/gi,
    (all, tag, attrs = "", slash) => {
      attrs = attrs.replace(/([\w:-]+)="([^]*?)"/g, (_, key, value) => {
        const reactKey = attrNames[key] || key;
        if (key === "style") return `style={cssStyle(${stringExpr(value)})}`;
        const actualKey =
          tag === "input" && key === "value" ? "defaultValue" : reactKey;
        return `${actualKey}={${stringExpr(value)}}`;
      });
      // Bare custom attributes must have a string value in React.
      attrs = attrs.replace(/\b(data-[\w-]+)(?=\s|$)(?!\s*=)/g, '$1=""');
      attrs = attrs
        .replace(/\ballowfullscreen\b/g, "allowFullScreen")
        .replace(/\bnovalidate\b/g, "noValidate");
      const voidTag = [
        "img",
        "input",
        "source",
        "br",
        "hr",
        "meta",
        "link",
      ].includes(tag);
      return `<${tag}${attrs}${slash || voidTag ? "/" : ""}>`;
    },
  );
  const declarations = [];
  const stack = [];
  let loops = 0;
  source = source.replace(/SLOT(\d+)TOKEN/g, (_, id) => {
    const { kind, code } = slots[id];
    if (kind === "=") return `{${code}}`;
    if (kind === "-") {
      if (code.startsWith("include('../partials/product-card'"))
        return "<ProductCard product={product} visible={isVisible(product)} />";
      return `<span className="inline-flex" dangerouslySetInnerHTML={{ __html: ${code} }} />`;
    }
    const loop = code.match(
      /^([^]*?)\.forEach\(function\s*\(([^]*?)\)\s*\{([^]*)$/,
    );
    if (loop) {
      const args = loop[2].split(",").map((s) => s.trim());
      const index = args[1] || `index${loops++}`;
      stack.push("loop");
      const body = loop[3].replace(/return;/g, "return null;");
      return `{${loop[1]}.map((${args[0]}, ${index}) => { ${body} return (<Fragment key={${index}}>`;
    }
    const condition = code.match(/^if\s*\(([^]*)\)\s*\{$/);
    if (condition) {
      stack.push("if");
      return `{(${condition[1]}) ? <>`;
    }
    if (code === "} else {") {
      stack[stack.length - 1] = "else";
      return "</> : <>";
    }
    if (/^\}\)\s*;?$/.test(code)) {
      if (stack.pop() !== "loop")
        throw new Error(`Unexpected loop end: ${name}`);
      return "</Fragment>); })}";
    }
    if (code === "}") {
      const type = stack.pop();
      return type === "else" ? "</>}" : "</> : null}";
    }
    declarations.push(code);
    return "";
  });
  if (stack.length) throw new Error(`Unclosed blocks: ${name}`);
  const dir = folder === "partials" ? "components" : "components/pages";
  const prefix = folder === "partials" ? "../" : "../../";
  fs.mkdirSync(dir, { recursive: true });
  source = source
    .replace(/<a\b/g, "<SiteLink")
    .replace(/<\/a\s*>/g, "</SiteLink>");
  const text = `import { Fragment } from 'react';\nimport SiteLink from '${folder === "partials" ? "./" : "../"}SiteLink';\nimport site from '${prefix}config/site';\nimport { cssStyle, formatDate } from '${prefix}lib/presentation';\n${name === "products" ? "import ProductCard from '../ProductCard';\n" : ""}\nexport default function ${names[name]}({ ${props[name] || ""} } = {}) {\n${declarations.join("\n")}\n  return (<>\n${source.trim()}\n  </>);\n}\n`;
  fs.writeFileSync(path.join(dir, names[name] + ".jsx"), text);
}
for (const name of Object.keys(names))
  convert(
    name,
    ["header", "footer", "product-card"].includes(name) ? "partials" : "pages",
  );
