const content = require("./content.cjs");
const tagIcons = require("../config/tag-icons").default;

const available = new Set(tagIcons);

function tagIcon(tag) {
  const savedIcons = content.raw("tagIcons");
  const savedIcon = Array.isArray(savedIcons)
    ? savedIcons.find((item) => item?.tag === tag)?.icon || ""
    : savedIcons && typeof savedIcons[tag] === "string"
      ? savedIcons[tag]
      : "";

  if (/^\/tags\/[a-z0-9-]+\.svg$/.test(savedIcon)) return savedIcon;
  const file =
    tag === "Yellowing Resistance"
      ? "non-yellowing"
      : tag
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
  return available.has(file) ? `/tags/${file}.svg` : "/tags/generic.svg";
}

module.exports = { tagIcon };
