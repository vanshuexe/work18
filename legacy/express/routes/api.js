const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const multer = require('multer');
const data = require('../lib/data');

const router = express.Router();
const STORAGE_DIR = path.join(__dirname, '..', 'storage');
const MESSAGES_FILE = path.join(STORAGE_DIR, 'contact-messages.json');
const APPLICATIONS_FILE = path.join(STORAGE_DIR, 'job-applications.json');
const CV_DIR = path.join(STORAGE_DIR, 'cv');

router.get('/main-categories', (req, res) => {
  res.json({ mainCategories: data.getMainCategories() });
});

router.get('/subcategories', (req, res) => {
  const subcategories = data.getSubcategories(req.query.mainCategorySlug);
  res.json({ subcategories, count: subcategories.length });
});

router.get('/products', (req, res) => {
  const products = data.getProducts({ mainCategorySlug: req.query.mainCategorySlug, subcategoryId: req.query.subcategoryId });
  res.json({ products, count: products.length });
});

router.get('/products/:id', (req, res) => {
  const product = data.getProduct(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

router.get('/colors', (req, res) => {
  res.json(data.getColors(req.query.colorType));
});

router.get('/tinting-centers', (req, res) => {
  const centers = data.getTintingCenters();
  res.json({ centers, count: centers.length });
});

router.get('/team-members', (req, res) => {
  res.json({ teamMembers: data.getTeamMembers() });
});

router.get('/posts', (req, res) => {
  res.json({ posts: data.getPosts() });
});

router.get('/catalogs', (req, res) => {
  res.json({ catalogs: data.getCatalogs() });
});

router.get('/jobs', (req, res) => {
  res.json(data.getJobs());
});

router.get('/search', (req, res) => {
  const q = String(req.query.q || '');
  const results = data.search(q);
  res.json({ results, query: q, count: results.length });
});

function appendToStorage(file, record) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const existing = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
  existing.push(record);
  fs.writeFileSync(file, JSON.stringify(existing, null, 2));
}

// Job applications from the careers page. CVs are saved to storage/cv/, details to storage/job-applications.json.
const cvUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdirSync(CV_DIR, { recursive: true });
      cb(null, CV_DIR);
    },
    filename: (req, file, cb) => cb(null, `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${path.extname(file.originalname).toLowerCase()}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 10 },
  fileFilter: (req, file, cb) => cb(null, ['.pdf', '.doc', '.docx'].includes(path.extname(file.originalname).toLowerCase())),
});

router.post('/jobs/apply', (req, res) => {
  cvUpload.single('cv')(req, res, (err) => {
    if (err) return res.status(400).json({ ok: false, errors: [err.code === 'LIMIT_FILE_SIZE' ? 'CV must be 5 MB or smaller.' : 'Upload failed.'] });

    const field = (name, max = 200) => String(req.body[name] || '').trim().slice(0, max);
    const job = data.getJobs().find((j) => j._id === field('jobId'));
    const errors = [];
    if (!job) errors.push('This job is no longer available.');
    if (!field('name')) errors.push('Name is required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field('email'))) errors.push('A valid email is required.');
    if (!field('phone', 30)) errors.push('Phone is required.');
    if (!req.file) errors.push('Please attach your CV as a PDF or Word file.');
    if (errors.length) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ ok: false, errors });
    }

    appendToStorage(APPLICATIONS_FILE, {
      jobId: job._id,
      jobTitle: job.title,
      name: field('name'),
      email: field('email'),
      countryCode: field('countryCode', 10),
      phone: field('phone', 30),
      cvFile: path.relative(path.join(__dirname, '..'), req.file.path),
      receivedAt: new Date().toISOString(),
    });
    res.status(201).json({ ok: true });
  });
});

// Contact form on the home page. Messages are appended to storage/contact-messages.json.
router.post('/contact', (req, res) => {
  const field = (name, max = 200) => String(req.body[name] || '').trim().slice(0, max);
  const message = {
    name: field('name'),
    email: field('email'),
    city: field('city'),
    category: field('category'),
    countryCode: field('countryCode', 10),
    phone: field('phone', 30),
    message: field('message', 5000),
    receivedAt: new Date().toISOString(),
  };

  const errors = [];
  if (!message.name) errors.push('Name is required.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message.email)) errors.push('A valid email is required.');
  if (!message.message) errors.push('Message is required.');
  if (errors.length) return res.status(400).json({ ok: false, errors });

  appendToStorage(MESSAGES_FILE, message);
  res.status(201).json({ ok: true });
});

router.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = router;
