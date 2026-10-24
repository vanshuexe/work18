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

  // Videos in the "Aeropolish Paint Gallery" section.
  videos: [
    { src: "/videos/stylish-wall-painting.mp4", title: "Stylish Wall Painting" },
    { src: "/videos/wall-painting-1.mp4", title: "Wall Painting in Action" },
    { src: "/videos/wall-painting-2.mp4", title: "Wall Painting Finish" },
  ],

  // Headings and paragraphs shown on the home page.
  text: {
    aboutEyebrow: "About us",
    aboutHeading: "About Aeropolish",
    aboutBlurb:
      "Aeropolish is an emerging Indian paint and coatings company delivering reliable, high-performance solutions for decorative, commercial, and industrial applications.",
    aboutCta: "Read more about us",

    productsHeading: "Products",
    productsIntroBefore: "Explore",
    productsDecorative: "Decorative",
    productsAnd: " and ",
    productsIndustrial: "Industrial",
    productsIntroAfter: "formulated for durability, color brilliance, and protection.",

    effectsHeading: "Special Paint Effects",
    effectsTitle: "Crafted for Durable Elegance",
    effectsText:
      "Elevate any living room, bedroom, or feature wall with light-reflecting metallics, velvet tactile softness, and natural stone-wash textures.",
    effectsButton: "Explore Smart Effects",

    shadeHeading: "Discover Your Perfect Shade",
    shadeTitle: "Mocha Mousse & Earth Tones",
    shadeText:
      "Explore Aeropolish Paints' signature 2026 forecast — a grounding palette of velvety mocha, sun-baked terracotta, and soft sandstone designed to bring warmth and harmony home.",
    shadeChips: [
      { name: "Mocha Mousse", color: "#9E6D53" },
      { name: "Terracotta Warmth", color: "#C87D55" },
      { name: "Soft Sandstone", color: "#D4A373" },
      { name: "Velvet Espresso", color: "#4A2E2B" },
    ],
    shadeButton: "Explore NCS Color Trends 2026",

    paintsHeading: "Stronger Paints, Brighter Results",
    paintsButton: "Explore Our Paints",

    galleryHeading: "Aeropolish Paint Gallery",
    gallerySub: "Watch walls come alive with colour, finish and craftsmanship.",

    contactHeading: "Get in Touch with Aeropolish",
    contactBadge: "Aeropolish Corporate Office",
    contactTitle: "Let's Build Something Exceptional Together",
    contactText:
      "Whether you need guidance on heavy-duty industrial coatings or want to explore our color visualizer for an interior project, our experts are here to help.",
    callLabel: "Call Us",
    emailLabel: "Email Inquiries",
    formTitle: "Send Us a Message",
    formIntro: "Fill out the form below and our technical advisory team will get in touch within 24 hours.",
    labelName: "Full Name",
    labelCity: "City / Location",
    labelProduct: "Product Interest",
    labelEmail: "Email Address",
    labelPhone: "Phone Number",
    labelMessage: "How Can We Help You?",
    submit: "Send Message",
  },

  contactCategories: [
    { value: "interior-paints", label: "Interior Paints" },
    { value: "exterior-paints", label: "Exterior Paints" },
    { value: "industrial-paints", label: "Industrial Paints" },
    { value: "inks", label: "Inks" },
  ],
  defaultCountryCode: "+91",
};
