# Harison International — Next.js

Complete migration of the supplied homepage and all linked public content pages from https://harison.in into Next.js App Router and React components. The original design and catalog content are preserved. Images and icon fonts are stored in `public/`.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. Production: `npm run build`, then `npm start`.

## Pages and components

All 42 pages, including product catalog pagination, are listed in `data/routes.json`. `app/[slug]/page.jsx` statically generates those routes. Shared header and footer are in `components/`. Page JSX is in `components/pages/`. Legacy PHP URLs redirect to the new routes. `index.html` and `styles.css` remain as reference source files.

React interactions include mobile navigation, dropdowns, slideshow controls, product image previews and a validated enquiry form. A missing kick scooter image on the source site uses an explicit fallback illustration. Removed legacy analytics and jQuery scripts are not required by the converted site. Google Maps and Google font files still require an internet connection.

## Recreated images

All 222 content and brand assets now use fresh recreations in `public/images/recreated/`: 218 assets created with the built-in ImageGen tool from the original references, plus four native typography/icon assets. Banners, category imagery, factory photographs, client logos and every catalogue model are covered. Original display dimensions are preserved. The unavailable-product graphic was recreated; one factory shot uses an equipment-only scene, and one kids carrier uses a clean undecorated metal render.

The complete asset inventory and prompts are in `output/image-recreation/inventory.json` and `output/image-recreation/generated.json`. Review sheets are in `output/image-recreation/previews/`. `node scripts/check-recreated-images.mjs` verifies full coverage, original dimensions, nonempty pixels and replacement references; with `CHECK_URL` set it also checks each image over HTTP. The migration utility reapplies recreated assets when run again.

## Current design

The current homepage is an original responsive layout with a navy and orange visual system based on the user-supplied Harison Cycle Industries logo. Product cards, forms, the footer and inner-page banners share the refreshed design. The hero is a newly generated unbranded ImageGen scene; banner artwork is native CSS. Client-logo strips, copied slider graphics and generated exhibition-photo replicas are no longer displayed. Product-category cards use component renders instead of decorative cycling photos. Image provenance and the hero prompt are documented in `output/image-recreation/design-assets.md`.

The migration utility is a historical importer and can overwrite redesigned components. Do not rerun it on this design unless intentionally restoring the imported layout. Use `npm run check` and `npm run build` for validation.

## Enquiry email setup

Copy `.env.example` to `.env.local` and configure your SMTP service. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_FROM` and any required `SMTP_USER` / `SMTP_PASSWORD`. `ENQUIRY_TO` defaults to the original business email. Without SMTP, the form explains that email delivery is unavailable and offers direct contact. No successful delivery is claimed unless SMTP accepts the message.

## Verification

`npm run check` checks local routes, internal links and image files. With a running app, set `CHECK_URL=http://localhost:3000` to also check all HTTP routes, redirects, missing pages and form validation. `npm run build` verifies compilation and static generation.

`scripts/migrate.mjs` is a migration utility using the preserved source snapshots in `data/*.source.html`, fetching new pages when needed. `data/asset-report.json` records missing files from the original site; these include obsolete plugin assets. Generated JSX and CSS can be edited directly.
