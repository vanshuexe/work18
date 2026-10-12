import { categories, families } from '../lib/catalog';
import { site } from '../lib/site';

export default function sitemap() {
  const paths = [
    '',
    '/products',
    ...families.map((family) => `/${family.slug}`),
    ...Object.keys(categories).map((slug) => `/${slug}`),
    '/services',
    '/about-us',
    '/infrastructure',
    '/quality',
    '/news-events',
    '/contact-us',
    '/enquiry',
  ];
  return [...new Set(paths)].map((path) => ({ url: `${site.url}${path}`, changeFrequency: 'monthly', priority: path === '' ? 1 : 0.7 }));
}
