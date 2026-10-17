import bicycle from '../data/bicycle-catalog.json';

const bicycleItems = (category) =>
  bicycle
    .filter((item) => item.category === category)
    .map((item) => ({
      id: item.code,
      code: item.code,
      name: item.name,
      finish: item.finish || '',
      size: item.size || '',
      note: item.info || '',
      image: item.image,
    }));

// Agriculture parts, classified from the product photographs.
// [file, type, coils per side, bridge, legs, finish, note]
const AGRI_FINISH = 'Zinc plated or powder coated (any colour)';
const TYPES = {
  dt: 'Double torsion tine',
  ll: 'Long-leg tine',
  sc: 'Single-coil / hooked',
  wf: 'Wire form',
};
const agricultureRows = [
  ['tine-01.webp', 'dt', '2', 'Peaked, with eye', 'Straight', 'Bright steel'],
  ['tine-02.jpg', 'dt', '2', 'Square shoulders, with eye', 'Straight', 'Zinc plated'],
  ['tine-03.webp', 'dt', '3', 'Peaked, with eye', 'Slight bend', 'Zinc / galvanised'],
  ['tine-04.jpg', 'dt', '4', 'Square, with eye', 'Straight, long', 'Bright zinc'],
  ['tine-05.webp', 'dt', '3', 'Square, with eye', 'Bent tips', 'Gold zinc'],
  ['tine-06.webp', 'sc', '—', 'Single curved wire with an eye at the top', 'One long curved leg', 'Bright steel'],
  ['tine-07.webp', 'dt', '2', 'Arched, with eye', 'Straight', 'Bright zinc'],
  ['tine-08.png', 'dt', '4', 'Small rectangular loop', 'Flattened tips', 'Gold zinc'],
  ['tine-09.jpg', 'sc', '1', 'Single coil with a hook end', 'One long curved leg', 'Bright zinc'],
  ['tine-10.webp', 'dt', '5', 'V-shaped, with eye', 'Straight', 'Zinc (brass tone)'],
  ['tine-11.webp', 'dt', '5', 'U-shaped, with eye', 'Flattened, flared tips', 'Bright zinc'],
  ['tine-12.webp', 'dt', '5', 'U-shaped', 'Bent tips', 'Yellow painted'],
  ['tine-13.webp', 'dt', '4', 'Narrow neck, with eye', 'Bent tips', 'Zinc plated'],
  ['tine-14.webp', 'll', '4', 'U-shaped', 'Long, one leg kinked', 'Brass-tone zinc'],
  ['tine-15.webp', 'll', '3', 'Low U-shaped', 'Long, curved', 'Grey painted'],
  ['tine-16.webp', 'wf', '—', 'Open top with a notch, no coils', 'Long, bent', 'Black painted'],
  ['tine-17.webp', 'll', '3', 'Low U-shaped', 'Long, one leg kinked', 'Brown painted'],
  ['tine-18.webp', 'dt', '4', 'Tall U-shaped loop', 'Splayed outward', 'Gold zinc'],
  ['tine-19.webp', 'dt', '4', 'Tall square U', 'Offset', 'Grey painted'],
];
const agricultureItems = agricultureRows.map(([file, type, coils, bridge, legs, finish], index) => {
  const number = String(index + 1).padStart(2, '0');
  return {
    id: file,
    code: `PART ${number}`,
    name: TYPES[type],
    group: TYPES[type],
    finish: AGRI_FINISH,
    size: '',
    note: '',
    specs: [coils !== '—' && ['Coils per side', coils], ['Bridge', bridge], ['Legs', legs], ['Finish', AGRI_FINISH]].filter(Boolean),
    image: `/images/agriculture/${file}`,
  };
});

export const categories = {
  carriers: {
    slug: 'carriers',
    family: 'bicycle-parts',
    title: 'Carriers',
    enquiry: 'Bicycle parts',
    lead: 'Rear carriers for bicycles, in designs for kids, MTB, ladies and roadster frames.',
    intro: [
      'Our carriers are formed from wire and tube and welded into one rigid assembly. The range covers 16 to 26-inch wheels, with models for kids’ bicycles, MTB frames, ladies’ cycles and classic roadsters.',
      'Most carriers are supplied powder coated in black; selected models come in other colours or with a BCP finish. Quote the product code, wheel size and finish and we will confirm availability.',
    ],
    items: bicycleItems('carrier'),
  },
  stands: {
    slug: 'stands',
    family: 'bicycle-parts',
    title: 'Stands',
    enquiry: 'Bicycle parts',
    lead: 'Tube stands for bicycles, finished to match the rest of the build.',
    intro: [
      'Bicycle stands are made from tube and formed on our own press and welding lines. The Empress tube stand (HCI-147) is shown for 26-inch wheels.',
      'Need a different wheel size or a custom length? Send us a drawing or a sample.',
    ],
    items: bicycleItems('stand'),
  },
  accessories: {
    slug: 'accessories',
    family: 'bicycle-parts',
    title: 'Accessories',
    enquiry: 'Bicycle parts',
    lead: 'Tool boxes, bottle stands and derailleur guards.',
    intro: [
      'Small fitments that complete a bicycle: a tool box, a bottle stand and a derailleur guard.',
      'Accessories are often ordered alongside carriers and stands — tell us the combined quantity when you enquire.',
    ],
    items: bicycleItems('accessories'),
  },
  'agriculture-parts': {
    slug: 'agriculture-parts',
    family: 'agriculture-parts',
    title: 'Agriculture parts',
    enquiry: 'Agriculture parts',
    lead: 'Double torsion spring tines, long-leg tines and wire forms for combine harvesters, reapers and balers.',
    intro: [
      'Spring tines and wire-formed parts made at the Harison plant under the Harison India name. Every part is available zinc plated or powder coated in any colour.',
      'Each part is shown as photographed and described by its type, coil count, bridge shape, legs and finish. To order, send the machine make and model with the photo number, a drawing or a sample, and your quantity.',
    ],
    items: agricultureItems,
  },
};

export const families = [
  {
    slug: 'bicycle-parts',
    title: 'Bicycle parts',
    number: '01',
    blurb: 'Carriers, stands and accessories for bicycle manufacturers, assemblers and distributors.',
    image: '/images/catalog/bicycle/hci-154.webp',
    categories: ['carriers', 'stands', 'accessories'],
  },
  {
    slug: 'agriculture-parts',
    title: 'Agriculture parts',
    number: '02',
    blurb: 'Formed-wire parts for combine harvesters, reapers and balers, made under the Harison India name.',
    image: '/images/agriculture/tine-12.webp',
    categories: ['agriculture-parts'],
  },
];

export const getFamily = (slug) => families.find((family) => family.slug === slug);

const everyProduct = Object.values(categories).flatMap((category) => category.items);
export const featuredProducts = ['HCI-154', 'HCI-120', 'HCI-151', 'HCI-140', 'HCI-133', 'HCI-131']
  .map((code) => everyProduct.find((item) => item.code === code))
  .filter(Boolean);
