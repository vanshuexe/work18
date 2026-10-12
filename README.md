# Harison Cycle Industries — website

Next.js (App Router) site for Harison Cycle Industries, Ludhiana: bicycle and two-wheeler component manufacturer, engineering goods since 1964.

```sh
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run check      # static check: routes, internal links, image references
CHECK_URL=http://localhost:3000 npm run check   # also requests every live page
```

## Structure

```
app/
  layout.jsx            fonts, metadata, header/footer, Organization JSON-LD
  globals.css           the whole design system (tokens at the top)
  page.jsx              home
  products/             hub: the two product ranges
  bicycle-parts/        family page → carriers/, stands/, accessories/, baskets/
  agriculture-parts/    combine, reaper & baler parts (Harison India) — quoted on request
  services/             manufacturing services, process, FAQ
  about-us/, infrastructure/, quality/, news-events/
  contact-us/, enquiry/
  api/enquiry/          SMTP enquiry endpoint
  sitemap.js, robots.js, not-found.jsx
components/
  brand/Logo.jsx        vector monogram + wordmark
  layout/               Header (client), Footer
  ui/                   PageHero, SectionHead, CtaBand, Faq (blocks.jsx), Dialog, Gallery
  catalog/              CollectionPage, ProductBrowser (search, filters, quick view), FamilyPage, FamilyTiles
  enquiry/EnquiryForm.jsx
lib/
  site.js               contact details, navigation, customers, recognition
  catalog.js            normalises data/*.json into categories and product lists
data/                   bicycle-catalog.json, site-collections.json (product data)
archive/previous-design earlier components, CSS and migration scripts, kept for reference only
```

Edit contact details and navigation in `lib/site.js`. Add or change products in `data/` .

Products are two ranges: **bicycle parts** and **agriculture parts**. Earlier two-wheeler, cargo-bike and kick-scooter pages redirect to `/products` (cargo-bike baskets moved to `/baskets`); their data stays in `data/site-collections.json` if a range is ever restored. Old URLs (`*.php`, numbered pages such as `/mtb-carriers2`) redirect too — see `next.config.mjs`.

## Design

Warm paper and deep ink with one orange accent from the logo, hairline rules, square corners, no shadows or gradients. Barlow Condensed for headings, Barlow for text, IBM Plex Mono for product codes (self-hosted through `next/font`). Product photos sit on a flat tile with `mix-blend-mode: multiply`, so the off-white backgrounds in the catalogue crops blend in.

## Enquiry email

Copy `.env.example` to `.env.local` and set `SMTP_HOST`, `SMTP_PORT`, `SMTP_FROM` and, if needed, `SMTP_USER` / `SMTP_PASSWORD`. `ENQUIRY_TO` defaults to `dsm@harison.in`. Without SMTP the form tells visitors to email or call; it never claims delivery that did not happen. Set `NEXT_PUBLIC_SITE_URL` to the live domain for correct sitemap and canonical URLs.

## Content to confirm before launch

- **Agriculture parts**: there is no agriculture product data or photos in the project, so the page is built from the AGRI EXPO 2026 stall photo (combine, reaper and baler parts under the Harison India name). Add real product photos and part lists when available.
- **ISO 9001**, customer names (Hero Cycles, T.I. Cycles, Avon, Atlas), the MSME / UCPMA awards and the "60+ models" figure come from the company’s previous website. Confirm they are current.
- **Photography**: factory, equipment and product images in `public/images/recreated/` are AI recreations, and the catalogue crops are low resolution (some under 300 px). Replace them with real photographs when available.
- Services copy describes processes visible in the plant photographs and the original site; nothing about lead times, minimum quantities or pricing is stated.
