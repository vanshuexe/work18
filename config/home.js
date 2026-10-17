// Content for the home page sections. Edit text and images here.

const STORAGE = "https://storage.googleapis.com/pachin/home";

module.exports = {
  hero: {
    title: "From Industrial Coatings to Everyday Paints.",
    subtitle:
      "Reliable, performance-oriented and value-driven coatings for industrial, commercial, infrastructure and decorative applications.",
    button: {
      label: "Explore Now",
      href: "/interior-paints",
      icon: `${STORAGE}/hero/icon-button-pachin.png`,
    },
    slides: [
      "https://ik.imagekit.io/kirgb3odmp/hotel/Premium%20Paints,%20Brighter%20Homes.png",
      "https://ik.imagekit.io/kirgb3odmp/hotel/Aeropolish%20Premium%20Interior%20Paint%20Banner.png",
      "/home/hero-green-bedroom.webp",
      "/home/hero-orange-living-room.webp",
      "/home/hero-yellow-living-room.webp",
    ],
  },

  productTiles: [
    {
      label: "Interior Paints",
      href: "/interior-paints",
      image: "/home/interior-teal-living-room.webp",
      cover: true,
      tagline: "Luxury Emulsions & Washable Finishes",
      badge: "Interior",
      categoryKey: "interior",
    },
    {
      label: "Exterior Paints",
      href: "/exterior-paints",
      image: "/home/exterior-yellow-house.webp",
      cover: true,
      tagline: "All-Weather Shields & UV Defense",
      badge: "Exterior",
      categoryKey: "exterior",
    },
    {
      label: "Industrial Paints",
      href: "/industrial-paints",
      image: "https://ik.imagekit.io/kirgb3odmp/wall/Industrial%20paints.png",
      tagline: "High-Performance Epoxy & Protective Coatings",
      badge: "Industrial",
      categoryKey: "industrial",
    },
  ],

  images: {
    smart: "/new-images/special-paint-effects.webp",
    shiny: "/new-images/color-trends-banner.webp",
    contact: "/new-images/contact-aeropolish.webp",
  },

  // "Stronger Paints, Brighter Results" section (mobile slider; the desktop grid uses the same items)
  paints: [
    {
      label: "Royal Velvet Interior Emulsion",
      href: "/interior-paints",
      image: "/new-images/aeropolish-royal-velvet-purple.jpg",
    },
    {
      label: "Easy Clean Washable Paint",
      href: "/interior-paints",
      image: "/new-images/aeropolish-easyclean-golden.jpg",
    },
    {
      label: "Industrial Quick Drying Paint",
      href: "/industrial-paints",
      image: "/new-images/aeropolish-industrial-blue.jpg",
    },
    {
      label: "Exterior Emulsion",
      href: "/exterior-paints",
      image: "/new-images/aeropolish-exterior-emulsion.jpg",
    },
    {
      label: "Water Based Home Paint",
      href: "/exterior-paints",
      image: "/new-images/aeropolish-home-paint.jpg",
    },
    {
      label: "Weather Shield Acrylic Paint",
      href: "/exterior-paints",
      image: "/new-images/aeropolish-weathershield-ruby.jpg",
    },
  ],

  contactCategories: [
    { value: "interior-paints", label: "Interior Paints" },
    { value: "exterior-paints", label: "Exterior Paints" },
    { value: "industrial-paints", label: "Industrial Paints" },
    { value: "inks", label: "Inks" },
  ],
  defaultCountryCode: "+91",
};
