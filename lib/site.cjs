// Site-wide settings (menu, footer, SEO) and contact details with the admin's edits applied.
// Call `await content.load()` first (PageShell and the layout do).

const content = require("./content.cjs");
const base = require("../config/site");
const contactDefaults = require("../config/contact");
const { siteDefaults } = require("./editable.cjs");

function getSite() {
  // Keep helper functions (tagIcon ...) from the code; replace only the editable fields.
  return { ...base, ...content.get("site", siteDefaults()) };
}

function getContact() {
  return content.get("contact", JSON.parse(JSON.stringify(contactDefaults)));
}

module.exports = { getSite, getContact };
