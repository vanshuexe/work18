const path = require('path');
const express = require('express');
const compression = require('compression');
const site = require('./config/site');
const pageRoutes = require('./routes/pages');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(compression());
// Cache static files in production only, so edits show up immediately while developing
app.use(express.static(path.join(__dirname, 'public'), { maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0 }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Values every template can use
app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.title = '';
  res.locals.active = '';
  res.locals.scripts = [];
  res.locals.formatDate = (value) =>
    new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  next();
});

app.use('/api', apiRoutes);
app.use('/', pageRoutes);

app.use((req, res) => {
  res.status(404).render('pages/404', { title: 'Page not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong.');
});

app.listen(PORT, () => {
  console.log(`Pachin site running at http://localhost:${PORT}`);
});
