const express = require('express');
const data = require('../lib/data');
const { productCategories, colorFamilies } = require('../config/site');
const home = require('../config/home');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/home', { title: '', active: 'home', home, countries: data.getCountries(), scripts: ['/js/home.js'] });
});

router.get('/about-us', (req, res) => {
  // class 1 = board leadership row, class 2 = board members row, class 3 = executive managers
  const team = data.getTeamMembers();
  res.render('pages/about-us', {
    title: 'About Pachin',
    active: 'about',
    boardLeaders: team.filter((m) => m.category === 'boardTeam' && m.class === 1),
    boardMembers: team.filter((m) => m.category === 'boardTeam' && m.class === 2),
    executives: team.filter((m) => m.category !== 'boardTeam'),
  });
});

router.get('/news', (req, res) => {
  res.render('pages/news', { title: 'News', active: 'about', posts: data.getPosts() });
});

router.get('/news/:id', (req, res, next) => {
  const post = data.getPost(req.params.id);
  if (!post) return next();
  res.render('pages/news-detail', { title: post.title, active: 'about', post });
});

router.get('/careers', (req, res) => {
  const jobs = data.getJobs();
  const unique = (key) => [...new Set(jobs.map((j) => j[key]).filter(Boolean))].sort();
  res.render('pages/careers', {
    title: 'Careers',
    active: 'about',
    jobs,
    types: unique('type'),
    locations: unique('location'),
    departments: unique('department'),
    countries: data.getCountries(),
    scripts: ['/js/careers.js'],
  });
});

router.get('/catalogs', (req, res) => {
  res.render('pages/catalogs', { title: 'Catalogs', active: '', catalogs: data.getCatalogs() });
});

router.get('/tinting-center', (req, res) => {
  const centers = data.getTintingCenters();
  const cities = [...new Set(centers.map((c) => c.city).filter(Boolean))].sort();
  res.render('pages/tinting-center', { title: 'Tinting Centers', active: 'tinting-center', centers, cities, scripts: ['/js/tinting-center.js'] });
});

router.get('/our-colors', (req, res) => {
  const colors = [...data.getColors()].sort((a, b) => a.row - b.row || a.column - b.column);
  res.render('pages/our-colors', { title: 'Our Colors', active: 'colors', headerTheme: 'dark', hideFooter: true, colors, scripts: ['/js/our-colors.js'] });
});

router.get('/color-trends', (req, res) => {
  const catalog = data.getCatalogs().find((c) => /trend/i.test(c.title));
  res.render('pages/color-trends', { title: 'Color Trends', active: 'colors', catalog });
});

router.get('/color-visualizer', (req, res) => {
  const colors = data.getColors();
  const counts = Object.fromEntries(colorFamilies.map((f) => [f.type, colors.filter((c) => c.colorType === f.type).length]));
  const sofas = [
    { hex: '#9CA3AF', desktop: '/desktop_grey-sofa.webp', mobile: '/mobile_grey-sofa-final-min.webp' },
    { hex: '#8B4513', desktop: '/desktop_brown-sofa.webp', mobile: '/mobile-brown-sofa-min.webp' },
    { hex: '#FFFFFF', desktop: '/desktop_white-sofa.webp', mobile: '/mobile-white-sofa-final-min.webp' },
  ];
  res.render('pages/color-visualizer', {
    title: 'Color Visualizer',
    active: 'colors',
    headerTheme: 'dark',
    hideFooter: true,
    counts,
    sofas,
    defaultColor: colors.find((c) => c.colorType === 'neutral') || colors[0],
    scripts: ['/js/color-visualizer.js'],
  });
});

// Product category pages: /interior-paints, /exterior-paints, /industrial-paints, /ink, /alkyd
router.get('/:category', (req, res, next) => {
  const slug = req.params.category;
  const category = productCategories[slug];
  if (!category) return next();

  const subcategories = data.getSubcategories(slug);
  const products = data.getProducts({ mainCategorySlug: slug });
  const normalize = (text) => String(text || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const activeSubcategory = subcategories.find((s) => normalize(s.subcategoryEn) === normalize(req.query.subcategory)) || null;
  const query = String(req.query.q || '').trim();
  const q = query.toLowerCase();

  const isVisible = (p) =>
    (!activeSubcategory || p.subcategory._id === activeSubcategory._id) &&
    (!q || [p.productNameEn, p.productCode, p.subcategoryEn, ...(p.tags || [])].join(' ').toLowerCase().includes(q));

  res.render('pages/products', {
    title: category.title,
    description: category.description,
    active: 'products',
    category,
    subcategories,
    products,
    activeSubcategory,
    query,
    isVisible,
    visibleCount: products.filter(isVisible).length,
    scripts: ['/js/products.js'],
  });
});

module.exports = router;
