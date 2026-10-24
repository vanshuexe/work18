// Blog page, the "From our blog" strip on the home page, and the posts themselves.
// In the admin panel (Blogs) you can add, edit, reorder and delete posts. A post only shows on the
// website when "Published" is Yes. Slug is the web address (/blogs/<slug>); leave it empty and it is
// made from the title.
module.exports = {
  banner: "/new-images/careers.svg",
  title: "Aeropolish Blog",
  tagline: "Paint tips, colour ideas and coating know-how from our experts.",
  emptyText: "No blog posts yet. Please check back soon.",
  readMore: "Read more",
  backLabel: "Back to all blogs",
  homeHeading: "From Our Blog",
  homeSub: "Practical advice on choosing, applying and caring for paints and coatings.",
  homeButton: "View all blogs",
  posts: [
    {
      title: "How to Choose the Right Interior Paint Finish",
      slug: "choose-the-right-interior-paint-finish",
      category: "Interior Paints",
      author: "Aeropolish Team",
      date: "2026-10-12",
      image: "/gallery/interior-1.webp",
      excerpt: "Matt, satin or gloss? A simple guide to picking the finish that suits each room, its light and its daily wear.",
      published: true,
      sections: [
        {
          title: "",
          image: "",
          content:
            "The finish of a paint changes how a wall looks and how well it lasts. **Matt** hides small flaws and gives a soft, modern look. **Satin and sheen** finishes reflect a little light and are easier to wipe clean. **Gloss** is the toughest and shines the most, so it suits doors, window frames and trims.",
        },
        {
          title: "Match the finish to the room",
          image: "",
          content:
            "Living rooms and bedrooms look calm in a matt or soft sheen finish. Kitchens, kids' rooms and corridors get dirty faster, so a washable sheen finish saves effort. Bathrooms need paint that handles damp air, so choose a moisture-resistant product.",
        },
        {
          title: "Think about light",
          image: "",
          content:
            "Strong sunlight shows every ripple on a glossy wall. In darker rooms a little sheen bounces light around and makes the space feel larger. Always test a small patch and look at it in the morning and evening before you commit.",
        },
      ],
    },
    {
      title: "Preparing Walls Before Painting: A 6 Step Checklist",
      slug: "preparing-walls-before-painting",
      category: "Painting Tips",
      author: "Aeropolish Team",
      date: "2026-10-05",
      image: "/gallery/interior-3.webp",
      excerpt: "A great finish starts long before the first coat. Follow these six steps for smooth, long-lasting walls.",
      published: true,
      sections: [
        {
          title: "",
          image: "",
          content:
            "Most paint problems such as peeling, bubbling and patchy colour come from poor preparation, not poor paint. Spend time on the surface and the result will last for years.",
        },
        {
          title: "The checklist",
          image: "",
          content:
            "1. Clear the room and cover floors and furniture.\n2. Scrape away loose paint and flaking putty.\n3. Fill cracks and holes, then let the filler dry fully.\n4. Sand the surface smooth and wipe off the dust.\n5. Treat damp or fungus patches before anything else.\n6. Apply a suitable primer so the topcoat sticks and looks even.",
        },
      ],
    },
    {
      title: "Why the Right Thinner Matters for Industrial Coatings",
      slug: "why-the-right-thinner-matters",
      category: "Industrial Coatings",
      author: "Aeropolish Team",
      date: "2026-09-28",
      image: "/gallery/industrial-2.jpg",
      excerpt: "Using the wrong thinner can ruin an otherwise perfect coating job. Here is how to match thinner to paint system.",
      published: true,
      sections: [
        {
          title: "",
          image: "",
          content:
            "A thinner adjusts how thick a coating is so it sprays or brushes properly. Each paint system has a thinner made for it. A thinner that is too fast or too slow can cause orange peel, runs, blushing or a weak film.",
        },
        {
          title: "Match thinner to paint",
          image: "",
          content:
            "Use **NC thinner** with nitrocellulose coatings, **PU thinner** with polyurethane systems and a general-purpose thinner for enamels. Always follow the data sheet for the ratio, and mix in small amounts while stirring.",
        },
        {
          title: "Safety first",
          image: "",
          content:
            "Thinners are flammable. Work in a ventilated area, keep away from flames and wear a suitable respirator and gloves.",
        },
      ],
    },
  ],
};
