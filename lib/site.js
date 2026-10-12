export const site = {
  name: 'Harison Cycle Industries',
  short: 'Harison',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://harison.in',
  founded: 1964,
  area: '67,500 sq ft',
  email: 'harisonindia11@gmail.com',
  phone: { label: '99888-55011', href: '+919988855011' },
  phone2: { label: '98155-02211', href: '+919815502211' },
  instagram: 'https://www.instagram.com/harisoninternational',
  units: [
    {
      name: 'Bicycle parts',
      title: 'Harison Cycle Industries',
      lines: ['3484, St. No. 6, New Janta Nagar', 'Ludhiana – 141003, Punjab, India'],
      map: 'https://www.google.com/maps/search/?api=1&query=3484%20St%20No%206%20New%20Janta%20Nagar%20Ludhiana%20141003',
    },
    {
      name: 'Agriculture parts',
      title: 'Harison India',
      lines: ['3490, St. No. 7, New Janta Nagar, Gill Road', 'Ludhiana – 141003, Punjab, India'],
      map: 'https://www.google.com/maps/search/?api=1&query=3490%20St%20No%207%20New%20Janta%20Nagar%20Gill%20Road%20Ludhiana%20141003',
    },
  ],
};

export const nav = [
  {
    label: 'Products',
    href: '/products',
    groups: [
      { title: 'Bicycle parts', href: '/bicycle-parts', links: [['Carriers', '/carriers'], ['Stands', '/stands'], ['Accessories', '/accessories'], ['Baskets', '/baskets']] },
      { title: 'Agriculture parts', href: '/agriculture-parts', links: [['Combine, reaper & baler parts', '/agriculture-parts']] },
    ],
  },
  { label: 'Services', href: '/services' },
  {
    label: 'Company',
    href: '/about-us',
    groups: [
      { title: 'Harison', href: '/about-us', links: [['Our story', '/about-us'], ['Infrastructure', '/infrastructure'], ['Quality', '/quality'], ['News & events', '/news-events']] },
    ],
  },
  { label: 'Contact', href: '/contact-us' },
];

export const recognition = [
  'Award of Excellence — MSME',
  'Award of Excellence — UCPMA',
  'Vendor approval — T.I. Cycles of India',
];

export const customers = ['Hero Cycles', 'T.I. Cycles of India', 'Avon Cycles', 'Atlas Cycles'];
