# Pachin website (Node.js)

The Pachin Paints website, rebuilt as a standalone Node.js app with Express and EJS templates.
It no longer depends on the live pachinpaints.com site: pages, styles, scripts, images and data are all served locally.

## Running it

```bash
npm install
npm run dev     # development: restarts automatically when server code changes
npm start       # production
```

The site runs at http://localhost:3000 (set `PORT` to change it). Set `NODE_ENV=production` in production so static files are cached by browsers.

## Project structure

```
server.js              App setup: view engine, static files, compression, routes, 404 page
config/site.js         Navigation menu, footer links, product categories, colour families, tag icons
config/home.js         Home page content (hero slides, product tiles, ink section, contact form options)
lib/data.js            Loads the JSON files in data/ and provides queries and site search
routes/pages.js        One route per page; passes data to the templates
routes/api.js          JSON API, contact form and job application endpoints
data/*.json            Site content: products, subcategories, colours, tinting centres, team, news, catalogs, jobs, countries
views/partials/        Shared header, footer, page top/bottom and the product card
views/pages/           One template per page (all 5 product categories share products.ejs)
public/css/            tailwind.css (the original site's compiled styles) and site.css (additions)
public/js/             main.js (menus, search, sliders) plus one script per interactive page
public/                Images, icons and other static files
design/                Full-page screenshots of the original site, for reference
legacy/                The original saved HTML/CSS snapshots (no longer used; safe to delete)
```

## Pages

| URL | Template | Data |
| --- | --- | --- |
| `/` | home.ejs | config/home.js, data/countries.json |
| `/about-us` | about-us.ejs | data/team-members.json |
| `/news`, `/news/:id` | news.ejs, news-detail.ejs | data/posts.json |
| `/careers` | careers.ejs | data/jobs.json |
| `/catalogs` | catalogs.ejs | data/catalogs.json |
| `/tinting-center` | tinting-center.ejs | data/tinting-centers.json |
| `/our-colors`, `/color-visualizer` | our-colors.ejs, color-visualizer.ejs | data/colors.json |
| `/color-trends` | color-trends.ejs | data/catalogs.json (download link) |
| `/interior-paints`, `/exterior-paints`, `/industrial-paints`, `/ink`, `/alkyd` | products.ejs | data/products.json, data/subcategories.json |

Product pages accept `?subcategory=<name>` and `?q=<search>`, and `?product=<id>` highlights a product (used by site search).

## Editing content

Edit the JSON files in `data/` and restart the server (data is cached in memory). For example, to add a job opening, add an object to `data/jobs.json`:

```json
{
  "_id": "sales-engineer-2026",
  "title": "Sales Engineer",
  "type": "Full-time",
  "location": "Cairo",
  "department": "Sales",
  "description": "…",
  "requirements": ["…"],
  "benefits": ["…"],
  "postedDate": "2026-10-01",
  "deadline": "2026-11-01"
}
```

## Forms

- **Contact form** (home page) posts to `POST /api/contact`. Messages are saved to `storage/contact-messages.json`.
- **Job applications** (careers page) post to `POST /api/jobs/apply` with a CV (PDF or Word, max 5 MB). CVs are saved to `storage/cv/` and details to `storage/job-applications.json`.

`storage/` is created automatically and is git-ignored. Nobody is notified of new submissions yet; to get emails, connect an email service in `routes/api.js`.

## API

`GET /api/main-categories`, `/api/subcategories?mainCategorySlug=`, `/api/products?mainCategorySlug=&subcategoryId=`, `/api/products/:id`,
`/api/colors?colorType=`, `/api/tinting-centers`, `/api/team-members`, `/api/posts`, `/api/catalogs`, `/api/jobs`, `/api/search?q=`

## Styling notes

`public/css/tailwind.css` is the original site's compiled Tailwind CSS, so it only contains the utility classes the original site used.
If you use a Tailwind class in a template and it has no effect, add it to `public/css/site.css` (there is a section for these).

## Not converted

- **Arabic version:** the "ع" button links to the Arabic version on the live site (pachinpaints.com/ar). Only the English site was converted.
- **Images on Google Cloud Storage:** product photos, PDFs, team photos and most banners are still loaded from `storage.googleapis.com`, as on the original site.
