# Aeropolish website — Next.js

The complete English website runs on **Next.js 16 with the App Router and React 19**. Pages are React components; data APIs and form submissions use Next.js route handlers. The original responsive design, content, styles, and assets are preserved.

## Run locally

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000. For production:

```bash
npm run build
npm start
```

Use `npm run dev -- --port 3001` or `npm start -- --port 3001` to change the port.

## Pages

| URL | Content |
| --- | --- |
| `/` | Home, sliders, products, contact form |
| `/about-us` | Company, infrastructure, board, executives |
| `/news` and `/news/[id]` | News listing and articles |
| `/careers` | Job filters, expandable details, CV applications |
| `/tinting-center` | Center search, city/area filters, map |
| `/our-colors` | Color families, swatches, code copying |
| `/color-trends` | Trend collections and catalog download |
| `/color-visualizer` | Wall colors and sofa previews |
| `/interior-paints` | Interior products |
| `/exterior-paints` | Exterior products |
| `/industrial-paints` | Industrial products |
| `/ink` | Ink products |
| `/alkyd` | Alkyd products |
| `/client`, `/vendor`, `/investor` | Inquiry forms |

Product routes support `?subcategory=<name>`, `?q=<search>`, and `?product=<id>`. Invalid pages, categories, and news IDs return 404 responses.

## Structure

```text
app/                    Next.js pages, layout, metadata, error and 404 screens
app/[category]/         Shared route for five product categories
app/news/[id]/          Article details
app/api/[...endpoint]/  API route handlers
components/             Shared header, footer, cards, navigation, interactions
components/pages/       React page content
lib/client/             Interactive controls with React lifecycle cleanup
lib/data.js             Server-side JSON queries and search
lib/api.cjs              API logic
lib/submissions.cjs      Form validation and private storage
config/                 Shared navigation, home content, and inquiry definitions
data/                   Products, colors, news, catalogs, team, jobs, centers, countries
public/                 Images, icons, and compiled styles
tests/                  API and form tests
scripts/smoke-test.mjs   Checks all pages and APIs against a running server
design/                 Original design screenshots
legacy/                 Original HTML/CSS, archived Express/EJS code and migration tools
```

Internal links use Next.js navigation. Client interactions initialize after hydration and clean up listeners, timers, and in-flight requests on navigation. Express and EJS are no longer runtime dependencies.

## Content and styling

Aeropolish company, vision, mission and investor copy is stored in `config/company.js`, based on the supplied website content and investor documents. The home page introduces the company and links to the full About page.

The client and supplier document forms are defined in `config/inquiries.js`. They support grouped sections, multiple selections, conditional Other details, Indian PIN validation, and independent mobile/WhatsApp country codes (default +91). Business email on the client form is optional, following the document's optional notation.

Vendor catalogue, company profile and GST certificate attachments accept PDF, Word, JPG or PNG files of at most 5 MB each. Files are stored privately in `storage/vendor-documents/`, with attachment references in `storage/vendor-inquiries.json`. The API accepts multipart submissions and retains JSON support. Vendor submissions do not guarantee approval.

Edit `data/*.json`, `config/site.js`, `config/home.js`, or `config/inquiries.js`. Restart development after editing JSON; rebuild production to refresh prerendered pages.

The supplied `data/jobs.json` is empty, so careers displays its empty state. Add active jobs to enable application forms.

The original compiled Tailwind stylesheet is retained at `public/css/tailwind.css`; add custom styles in `public/css/site.css`. No Tailwind build pipeline is required.

## APIs and forms

```text
GET /api/main-categories
GET /api/subcategories?mainCategorySlug=
GET /api/products?mainCategorySlug=&subcategoryId=
GET /api/products/[id]
GET /api/colors?colorType=
GET /api/tinting-centers
GET /api/team-members
GET /api/posts
GET /api/catalogs
GET /api/jobs
GET /api/search?q=
POST /api/contact
POST /api/jobs/apply
POST /api/inquiries/client
POST /api/inquiries/vendor
POST /api/inquiries/investor
```

Existing data response formats are retained. Contact messages are saved to `storage/contact-messages.json`. Applications and CVs are saved to `storage/job-applications.json` and `storage/cv/`. Inquiry forms save to separate `storage/*-inquiries.json` files.

CVs must be nonempty PDF or Word files of at most 5 MB. Requests are bounded before parsing. Invalid submissions are rejected before files are saved. Forms display success or error messages.

Set `STORAGE_DIR` to a persistent writable directory for deployment. Default file storage is designed for a single Node.js server. For serverless or multiple instances, replace the adapter with a shared database and private object storage. Email notifications are not configured.

## Verify

```bash
npm test
npm run build
# With npm start running in another terminal:
npm run test:smoke
```

Set `TEST_BASE_URL` to test a different port.

## External resources

The supplied site contains an English version. The Arabic button retains its link to the original Arabic website. Existing Google Cloud images and PDFs, Google Fonts, and the embedded Google Map require an internet connection.

## Styles

`public/css/tailwind.css` is generated: `scripts/tailwind-base.css` plus the Tailwind utilities used in `app/`, `components/`, `lib/` and `config/`. After adding or changing Tailwind classes, run `npm run css` to rebuild it. Hand-written styles live in `public/css/site.css`.
