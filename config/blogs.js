// Blog page, the "From our blog" strip on the home page, and the posts themselves.
// In the admin panel (Blogs) you can add, edit, reorder and delete posts. A post only shows on the
// website when "Published" is Yes. Slug is the web address (/blogs/<slug>); leave it empty and it is
// made from the title. In a section's text, leave a blank line between paragraphs, start lines with
// "- " for a list, and use **bold** or ==bold orange== for emphasis.
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
  ctaTitle: "Need help choosing the right paint?",
  ctaText: "Tell us about your project and the Aeropolish team will suggest the right product, finish and colour.",
  ctaButton: "Talk to our team",
  ctaLink: "/client",
  posts: [
    {
      title: "Best Paint for Indian Homes and Industries: How to Choose the Right Paint",
      slug: "best-paint-for-indian-homes-and-industries",
      category: "Buying Guide",
      author: "Aeropolish Team",
      date: "2026-10-24",
      image: "https://zzszqgoborvqquzuhkcf.supabase.co/storage/v1/object/public/media/images/1792855745897--after-with-wood-floors-moulding-yellow-ochre-paint-and-ceiling-lights-photo.jpg",
      excerpt: "Choosing the right paint is more than just selecting a colour. Learn which paint suits Indian homes, metal gates and grills, and industrial machinery, and how climate and surface preparation decide how long it lasts.",
      published: true,
      sections: [
        {
          title: "",
          image: "",
          content:
            "Choosing the right paint is more than just selecting a colour. Whether you are painting your home, protecting metal gates, coating industrial machinery, or finishing fabricated steel structures, the right paint can improve appearance, durability, and long-term value.\n\nIn India, changing weather conditions, dust, humidity, heat, and monsoon rains can affect paint performance. That is why choosing the right paint for the right surface is essential.\n\nAt Aeropolish Paints & Coating Industry, we believe that better painting decisions start with the right product knowledge. This guide explains which paint suits which surface, what to look for before you buy and how to get a finish that lasts.",
        },
        {
          title: "1. Which paint is best for Indian homes?",
          image: "",
          content:
            "Walls make up most of the painted area in a home, and they are of two kinds: interior walls that need a clean, comfortable finish, and exterior walls that must fight the weather. Each needs a paint made for its own conditions.\n\nFor most houses, **water-based emulsion paints** are the first choice. They dry quickly, have a mild smell, are easy to apply and clean up with water, and are available in a wide range of colours and finishes, from soft matt to sheen.",
        },
        {
          title: "Water-based emulsion paint",
          image: "",
          content:
            "Water-based emulsion paints are commonly used on interior and exterior walls. They are available in different finishes and are generally easy to apply and clean up.\n\nThey are a good fit when you want:\n\n- A wide choice of shades and finishes for living rooms, bedrooms and dining areas.\n- A paint that dries fast so the room can be used again soon.\n- Easy tool cleaning with plain water.\n- Lower odour compared to solvent-based paints.\n\nFor interior walls, pick a finish according to the room: matt for bedrooms and living rooms, and a washable sheen for kitchens, children's rooms and corridors.",
        },
        {
          title: "Exterior paint",
          image: "",
          content:
            "Exterior paints are designed for outdoor walls exposed to sunlight, rain, and environmental conditions. Always choose a product suitable for the specific surface and exposure.\n\nWhen choosing exterior paint, look for:\n\n- Good resistance to sunlight, so that the colour does not fade quickly.\n- Water repellence, so that rain does not soak into the wall.\n- Protection against algae and fungus in damp and shaded areas.\n- Flexibility to cope with small movements and hairline cracks.\n\nNever use an interior paint on outside walls. It is not built for sun and rain and usually fades, chalks or peels early.",
        },
        {
          title: "2. Which paint is best for metal gates, grills and fabrication work?",
          image: "",
          content:
            "Metal surfaces need protection against corrosion, weather exposure, and everyday wear.\n\nFor metal gates, railings, fabrication structures, and selected industrial applications, **synthetic enamel paint** is a popular option. It forms a hard, glossy film that is easy to clean and gives steel a smart, finished look.",
        },
        {
          title: "What to check when selecting synthetic enamel",
          image: "",
          content:
            "When selecting synthetic enamel, consider:\n\n- Gloss and surface finish.\n- Adhesion to the prepared surface.\n- Drying time under recommended conditions.\n- Coverage and application method.\n- Resistance to the expected environmental conditions.\n- Compatibility with the primer.\n\nFor better results, remove rust, oil, dust, and loose coatings before painting. Apply a compatible primer wherever required and follow the product's recommended application instructions.",
        },
        {
          title: "Why rust removal and primer matter",
          image: "",
          content:
            "Paint applied over rust does not stop the rust. The corrosion keeps spreading under the film and pushes the paint off in flakes. Clean the metal down to a sound surface with a wire brush or sandpaper, wipe off oil and grease, and apply a suitable primer before the enamel.\n\nApply thin, even coats and allow each coat to dry as recommended. Two thin coats always perform better than one heavy coat, which can sag, run or stay soft.",
        },
        {
          title: "3. What about industrial machinery and steel structures?",
          image: "/gallery/industrial-2.jpg",
          content:
            "Industrial environments are far tougher than a home. Machinery, tanks, pipelines, structural steel and plant equipment face heavy wear, chemicals, moisture, heat and constant vibration. A normal wall paint will not survive for long here.\n\nIndustrial coatings are engineered for these conditions, and they are usually applied as a system: surface preparation, a primer, and one or more topcoats that match the working environment. The right system depends on what the surface is exposed to, for example outdoor weather, indoor dry areas, humidity, oils or chemicals.\n\nAlways follow the technical data sheet for the product, and use the thinner made for that coating system. Our blog on thinners explains why the wrong thinner can spoil an otherwise good job.",
        },
        {
          title: "4. How Indian weather affects paint performance",
          image: "",
          content:
            "India's climate is hard on paint. Strong sunlight fades colours and breaks down binders. Heavy monsoon rain and humidity push moisture into walls and encourage algae and fungus. Hot summers and cooler nights make surfaces expand and contract, which can open cracks. Dust and pollution in cities dull the finish.\n\nChoosing a product made for these conditions, and painting in dry, mild weather, makes a big difference to how long the paint looks good.",
        },
        {
          title: "5. Surface preparation decides how long paint lasts",
          image: "",
          content:
            "Even the best paint fails on a poorly prepared surface. Whatever you are painting:\n\n- Clean the surface of dust, dirt, grease and loose material.\n- Repair cracks, holes and damaged plaster, and sand smooth.\n- Treat damp, fungus and rust before painting.\n- Apply a compatible primer.\n- Paint only when the surface is completely dry.\n\nTime spent on preparation is the cheapest way to extend the life of any paint job.",
        },
        {
          title: "Quick answers",
          image: "",
          content:
            "**Which paint is best for home walls?** A water-based emulsion in a finish that suits the room, and an exterior-grade product for outside walls.\n\n**Which paint is best for gates and grills?** Synthetic enamel on a rust-free, primed surface.\n\n**Which paint is best for industrial equipment?** An industrial coating system chosen for the exposure, applied as per its data sheet.\n\n**Can I use interior paint outside?** No. Always use a paint made for the surface and exposure.\n\n**Do I need a primer?** In most cases, yes. It improves adhesion, evens the surface and helps the topcoat last longer.",
        },
        {
          title: "Choose the right paint with confidence",
          image: "",
          content:
            "The best paint is the one that suits the surface, the environment and the way the space is used. Understand the surface, prepare it well, choose a compatible system and follow the application instructions.\n\nIf you are unsure which Aeropolish product to use for your home, gate or industrial project, our team will be happy to guide you.",
        },
      ],
    },
    {
      title: "How to Choose the Right Interior Paint Finish: A Complete Guide",
      slug: "choose-the-right-interior-paint-finish",
      category: "Interior Paints",
      author: "Aeropolish Team",
      date: "2026-10-20",
      image: "/gallery/interior-1.webp",
      excerpt: "Matt, satin or gloss? This complete guide explains how each finish looks, how it wears and where it works best, so you can pick the right one for every room.",
      published: true,
      sections: [
        {
          title: "",
          image: "",
          content:
            "Most people spend hours choosing a colour and about ten seconds choosing the finish. That is a mistake, because the finish decides how the colour looks in daylight, how easily the wall can be cleaned and how well small flaws stay hidden. Two walls painted in exactly the same shade can look completely different if one is matt and the other is glossy.\n\nThis guide walks you through the common interior finishes, where each one works best and the questions to ask before you buy. By the end you will be able to match the finish to the room, the lighting and the way your family actually lives.",
        },
        {
          title: "What does a paint finish actually mean?",
          image: "",
          content:
            "The finish, also called the sheen, describes how much light the dried paint reflects. A matt finish scatters light in all directions, so the surface looks soft and flat. A gloss finish reflects light in a sharp, mirror-like way, so the surface looks shiny and smooth.\n\nSheen is not only about looks. The more glossy a paint is, the more resin it usually contains and the tighter and harder its surface becomes. That is why shinier paints are generally easier to wipe clean and tougher against scuffs, while flatter paints are better at hiding bumps, patches and roller marks.",
        },
        {
          title: "Matt finish: soft, modern and forgiving",
          image: "/gallery/interior-2.webp",
          content:
            "A matt finish gives walls a calm, velvety look with no glare. Because it does not reflect light, it hides small dents, uneven plaster and repair marks far better than any other finish. This makes it the first choice for living rooms, bedrooms, dining areas and ceilings, especially in older homes where walls are not perfectly flat.\n\n**Best for:** bedrooms, living rooms, ceilings and any wall with minor imperfections.\n\n**Keep in mind:** matt surfaces are the most delicate to scrub. Choose a washable or stain-resistant matt if the room has children or pets, and wipe marks gently with a soft damp cloth rather than scrubbing hard.",
        },
        {
          title: "Satin and sheen finishes: the practical all-rounder",
          image: "",
          content
            : "Satin, silk and soft sheen finishes sit between matt and gloss. They reflect a gentle amount of light, which adds a little depth to the colour while still looking refined. They are noticeably tougher than matt and can be wiped clean without leaving shiny patches.\n\n**Best for:** kitchens, corridors, children's rooms, staircases and family spaces that see daily wear.\n\n**Keep in mind:** a sheen finish shows wall imperfections more than matt does, so good surface preparation matters. Fill cracks, sand smooth and use a primer before painting.",
        },
        {
          title: "Gloss finish: tough, bright and bold",
          image: "",
          content:
            "Gloss paints form the hardest, most easily cleaned surface. They are used on doors, window frames, skirting, railings, furniture and trims, where the surface is touched often and needs to resist knocks and moisture. A glossy trim against matt walls also creates a crisp, clean outline that makes a room look finished.\n\n**Best for:** doors, windows, trims, grills and furniture.\n\n**Keep in mind:** gloss shows every flaw. Sand the surface well, remove dust completely and apply thin, even coats. Painting a large wall in full gloss is rarely a good idea unless you want a high-shine, dramatic look.",
        },
        {
          title: "Match the finish to the room",
          image: "",
          content:
            "Use this quick room-by-room guide when you are unsure:\n\n- **Living room:** matt or soft sheen for a relaxed, premium look.\n- **Bedroom:** matt for a calm, restful feel.\n- **Kitchen:** washable sheen, because of cooking splashes and steam.\n- **Bathroom:** moisture-resistant sheen, with good ventilation.\n- **Kids' room and corridors:** washable sheen or stain-resistant matt.\n- **Ceilings:** flat matt, which hides joints and reduces glare.\n- **Doors and trims:** satin or gloss for durability.",
        },
        {
          title: "Think about light before you decide",
          image: "",
          content:
            "Light changes how a finish behaves. In a room with strong sunlight, a glossy or high-sheen wall will glare and exaggerate every ripple in the plaster. In a dark room, a little sheen helps bounce light around and makes the space feel larger and brighter.\n\nAlways test a sample patch about one metre square and look at it in the morning, afternoon and under artificial light in the evening. A finish that looks perfect on a shade card can behave very differently on your own wall.",
        },
        {
          title: "Common mistakes to avoid",
          image: "",
          content:
            "- Choosing a high-gloss finish for a wall with visible cracks or patches.\n- Using matt paint in a kitchen or bathroom without checking that it is washable and moisture resistant.\n- Mixing too many different sheens in one room, which makes the finish look uneven.\n- Skipping the primer, which leads to patchy sheen and uneven colour.\n- Judging colour and finish from a small card instead of a painted sample on the wall.",
        },
        {
          title: "Caring for your painted walls",
          image: "",
          content:
            "Whatever finish you choose, let the paint cure fully before cleaning. Most paints feel dry in hours but take a couple of weeks to reach full hardness. After that, remove dust with a soft dry cloth, and treat marks with a damp sponge and mild soap. Avoid abrasive pads and strong chemicals, which dull the finish.\n\nKeep a small tin of the leftover paint, with the shade name and date written on the lid. It makes future touch-ups simple and saves you from hunting for a colour match later.",
        },
        {
          title: "The short version",
          image: "",
          content:
            "Pick **matt** for a soft look and for hiding flaws, **satin or sheen** for busy family rooms that need frequent cleaning, and **gloss** for doors and trims that need maximum toughness. Test a patch in your own light, prepare the surface properly and use a primer. If you are not sure which Aeropolish interior product suits your rooms, our team is happy to guide you.",
        },
      ],
    },
    {
      title: "Preparing Walls Before Painting: A Complete 8 Step Checklist",
      slug: "preparing-walls-before-painting",
      category: "Painting Tips",
      author: "Aeropolish Team",
      date: "2026-10-14",
      image: "/gallery/interior-3.webp",
      excerpt: "A great finish starts long before the first coat. Follow this detailed checklist for smooth, even and long-lasting walls that do not peel, bubble or fade early.",
      published: true,
      sections: [
        {
          title: "",
          image: "",
          content:
            "Ask any professional painter what separates a long-lasting paint job from one that fails within a year, and the answer is almost always preparation. Peeling, bubbling, flaking, patchy colour and cracks that keep returning rarely come from poor paint. They come from paint applied on a surface that was dirty, damp, loose or uneven.\n\nPreparation takes up most of the time in a good paint job, often more than the painting itself. This checklist explains each step in detail so you know what to do, why it matters and what mistakes to avoid.",
        },
        {
          title: "Step 1: Clear the room and protect everything",
          image: "",
          content:
            "Move furniture to the centre of the room or out of it, and cover what remains with plastic sheets or old cotton cloth. Cover the floor with a drop cloth, not just newspaper, because newspaper tears and soaks through. Take down curtains, switch plates, light fittings and wall hangings, and use masking tape on window frames, skirting and edges you do not want painted.\n\nTurn off the electricity to the area when you are working near switches and sockets. A few minutes of protection saves hours of cleaning later.",
        },
        {
          title: "Step 2: Inspect the walls properly",
          image: "",
          content:
            "Walk along every wall with a torch held at a low angle. Side light shows cracks, bumps, patches and rough areas that you cannot see under normal light. Press a hand along suspicious spots to find loose or hollow-sounding plaster, and look for stains, dark patches and a powdery white salt deposit, all of which point to moisture.\n\nMake a note of every problem before you start. A wall that is damp must be fixed at the source first, because no paint can hold on a surface that keeps getting wet from behind.",
        },
        {
          title: "Step 3: Remove old, loose and flaking paint",
          image: "",
          content:
            "Scrape away every bit of paint that is peeling, blistering or flaking, using a scraper or putty knife. Keep scraping until you reach firm, well-attached paint. For old chalky surfaces, brush off the loose powder with a stiff brush, because paint cannot grip on dust.\n\nIf the old coat is sound but glossy, you do not need to strip it. A light sanding will roughen it just enough for the new paint to bond.",
        },
        {
          title: "Step 4: Treat damp, fungus and efflorescence",
          image: "",
          content:
            "Dark green or black patches are fungus or algae. Scrub them with a stiff brush and a fungus-removing solution, rinse and let the wall dry completely. White salt deposits, called efflorescence, should be brushed off dry and then wiped with a damp cloth.\n\nThe important part is to find why the wall is damp. Check for leaking pipes, cracks in external walls, blocked drain pipes and gaps around windows. If the dampness continues, consider a waterproofing treatment before painting.",
        },
        {
          title: "Step 5: Fill cracks, holes and uneven areas",
          image: "",
          content:
            "Open up hairline cracks slightly with a scraper so the filler can go deep, then clean out the dust. Fill cracks and holes with a suitable putty or crack filler, pressing it in firmly and leaving it slightly raised. For large areas of uneven plaster, apply a thin skim coat of wall putty.\n\nWait until the filler is completely dry. Rushing this step is the main reason cracks and patches show through the finished paint.",
        },
        {
          title: "Step 6: Sand until the surface is smooth",
          image: "",
          content:
            "Sand the filled spots and the whole wall lightly with fine sandpaper, using a sanding block to keep the surface flat. Work in gentle circular strokes and do not press hard. The goal is a smooth surface with no ridges where the filler ends.\n\nWear a dust mask and keep the room ventilated. When you finish, run your hand over the wall. Anything you can feel now, you will see after painting.",
        },
        {
          title: "Step 7: Clean off all dust, grease and dirt",
          image: "",
          content:
            "Dust left from sanding is the enemy of a smooth finish. Brush the walls down, vacuum the corners and wipe with a slightly damp cloth. Kitchen walls and areas near cooking need extra attention, because oil and grease stop paint from sticking. Wash greasy patches with mild detergent water, rinse and let them dry.\n\nOnly paint on a completely dry wall. Painting over even slightly damp plaster causes bubbles and peeling.",
        },
        {
          title: "Step 8: Apply the right primer",
          image: "",
          content:
            "Primer is not an optional extra. It seals the surface, evens out how much paint the wall absorbs, improves adhesion and helps the topcoat show its true colour with fewer coats. New plaster, repaired patches, bare putty and dark old colours all need a good primer.\n\nUse a primer that is suitable for the surface and for the paint you plan to use on top, whether interior or exterior. Let it dry fully before applying the first coat of paint.",
        },
        {
          title: "How long should you wait between steps?",
          image: "",
          content:
            "Drying times depend on temperature, humidity and thickness, so always check the instructions on the tin. As a general idea, allow filler and putty to dry completely, often a day for deep repairs, and let primer dry for several hours before painting. Apply the second coat only after the first is dry to the touch and the recoat time on the label has passed.\n\nGood preparation might feel slow, but it protects the cost and effort you put into the paint itself. Walls prepared this way keep their look for years.",
        },
      ],
    },
    {
      title: "Why the Right Thinner Matters for Industrial Coatings",
      slug: "why-the-right-thinner-matters",
      category: "Industrial Coatings",
      author: "Aeropolish Team",
      date: "2026-10-08",
      image: "/gallery/industrial-2.jpg",
      excerpt: "Using the wrong thinner can ruin an otherwise perfect coating job. Learn what thinners do, how to match them to your paint system and how to mix and use them safely.",
      published: true,
      sections: [
        {
          title: "",
          image: "",
          content:
            "Industrial paints are engineered systems. The resin, pigment and solvents are balanced to give a specific film thickness, drying time, hardness and finish. When a painter adds the wrong thinner, or adds too much, that balance breaks, and problems follow: poor flow, runs, orange peel, blushing, weak adhesion and a film that never cures properly.\n\nThis article explains what a thinner actually does, how to choose the right one for your coating and how to use it safely on the shop floor or at the site.",
        },
        {
          title: "What is a thinner and why do we use it?",
          image: "",
          content:
            "A thinner is a blend of solvents used to reduce the viscosity of a paint so that it can be applied smoothly by spray, brush or roller. Thick paint applied straight from the tin can leave brush marks, clog spray guns or lay down an uneven film. A suitable thinner lets the paint flow and level out before it dries.\n\nA thinner does not add any protection to the surface. It evaporates as the coating dries. That is why the amount you add matters so much: too much thinner leaves a thin, weak film that does not protect the steel and may need extra coats.",
        },
        {
          title: "Thinner is not the same as cleaning solvent",
          image: "/new-images/aeropolish-all-purpose-thinner.webp",
          content:
            "It is tempting to use any available solvent for both thinning and cleaning, but they are not interchangeable. Cleaning solvents are chosen to dissolve dried paint and residue from tools. Thinners are formulated to blend with a specific paint system without damaging its chemistry.\n\nUse the thinner recommended for your coating when mixing the paint, and keep a separate, lower-grade solvent for washing guns, brushes and containers.",
        },
        {
          title: "Match the thinner to the paint system",
          image: "",
          content:
            "Different resin systems need different solvent blends:\n\n- **Nitrocellulose (NC) coatings:** use NC thinner, which dissolves and balances the nitrocellulose resin and dries quickly.\n- **Polyurethane (PU) systems:** use PU thinner, which is free of moisture and reactive ingredients that could interfere with the curing.\n- **Synthetic enamels and general-purpose paints:** an all-purpose thinner is generally suitable.\n- **Quick-dry and fast-evaporating systems:** use the thinner that the manufacturer specifies for the spray conditions.\n\nWhen in doubt, check the technical data sheet. It lists the recommended thinner and the typical thinning ratio.",
        },
        {
          title: "How much thinner should you add?",
          image: "",
          content
            : "The right amount depends on the paint, the method and the weather. Spray application normally needs more thinning than brush or roller work, and hot dry weather usually calls for a slower thinner than cool humid weather. The data sheet gives a recommended range, often shown as a percentage by volume.\n\nAdd the thinner gradually while stirring, test on a scrap panel and stop as soon as the paint flows well. Measure with a clean container instead of guessing, so every batch is consistent and colours stay uniform across large jobs.",
        },
        {
          title: "Problems caused by the wrong thinner",
          image: "",
          content:
            "- **Orange peel:** a thinner that evaporates too fast does not give the paint time to level.\n- **Runs and sags:** too much thinner, or one that is too slow, leaves the film wet for too long.\n- **Blushing:** a milky haze caused by moisture trapped as a fast thinner cools the surface in humid air.\n- **Poor adhesion or lifting:** a solvent that does not suit the paint can soften the previous coat.\n- **Slow or incomplete curing:** the wrong thinner can interfere with two-component systems.\n- **Gun problems:** wrong viscosity causes spitting, clogging and uneven spray patterns.",
        },
        {
          title: "Mixing and application tips",
          image: "",
          content:
            "Stir the paint thoroughly before adding thinner, because pigments settle at the bottom. Keep your tools, gun and containers clean and dry, since water and contamination ruin many industrial coatings. Strain the paint through a filter before spraying to catch lumps.\n\nWork at the temperature range given on the data sheet and avoid painting steel that is damp or very hot. Always apply a test coat on a scrap piece before starting the real job.",
        },
        {
          title: "Safety: respect the solvent",
          image: "",
          content:
            "Thinners are flammable and their vapours can harm your health. Work in a well-ventilated area, keep them away from flames, sparks and hot surfaces, and never smoke nearby. Wear a suitable respirator, chemical-resistant gloves and eye protection. Close containers tightly after use and store them in a cool, shaded place.\n\nDispose of leftover solvent and used rags responsibly, because oily rags can heat up and ignite on their own if left in a pile.",
        },
        {
          title: "Key takeaway",
          image: "",
          content:
            "A thinner is a small part of the paint system, but it controls how the coating flows, dries and performs. Choose the thinner made for your paint, add it carefully, test before you commit and follow the safety rules. If you are unsure which Aeropolish thinner is right for your coating, contact our team before you start.",
        },
      ],
    },
    {
      title: "Exterior Paint in Monsoon and Heat: How to Make It Last",
      slug: "exterior-paint-monsoon-and-heat",
      category: "Exterior Paints",
      author: "Aeropolish Team",
      date: "2026-10-02",
      image: "/gallery/exterior-1.webp",
      excerpt: "Strong sun, heavy rain and humidity are tough on outside walls. Learn how to choose, apply and maintain exterior paint so it keeps its colour and protection for years.",
      published: true,
      sections: [
        {
          title: "",
          image: "",
          content:
            "The outside of your home faces the weather every single day. Summer sun bakes the walls, monsoon rain soaks them, and humidity feeds algae and fungus. Over time this causes fading, chalking, cracks and peeling, and the building starts to look old long before its time.\n\nThe good news is that most exterior paint failure is avoidable. With the right product, careful preparation and good timing, an exterior paint job can stay fresh and protective for many years. Here is how to get it right.",
        },
        {
          title: "What your walls are up against",
          image: "",
          content:
            "**Ultraviolet rays** break down pigments and resins, causing fading and a chalky powder on the surface. **Rain and moisture** enter hairline cracks and porous plaster, pushing paint off from behind. **Heat and cold cycles** make walls expand and contract, which opens small cracks. **Humidity and shade** allow algae, moss and fungus to grow, leaving black and green stains. **Dust and pollution** make surfaces dirty and dull.\n\nA good exterior paint is designed to stand up to all of these, but only if it is applied on a sound, clean and dry surface.",
        },
        {
          title: "Choose a paint made for the outdoors",
          image: "/gallery/exterior-2.webp",
          content:
            "Never use an interior paint outside. Exterior paints contain resins and additives that resist UV, flex slightly with the wall and repel water while still letting trapped moisture escape. Look for products with features such as weather resistance, water repellence, fungus and algae resistance and good colour retention.\n\nChoose the finish with care too. A matt or soft sheen exterior finish hides surface imperfections, while a higher sheen sheds dirt and water more easily but shows flaws more clearly. For textured walls, choose a product suited to texture work.",
        },
        {
          title: "Preparation is half the battle",
          image: "",
          content:
            "Exterior walls need even more preparation than interior ones:\n\n- Wash the wall with water and a stiff brush to remove dust, dirt, algae and chalky residue.\n- Scrape off loose and peeling paint until you reach a firm surface.\n- Treat fungus and algae with a suitable cleaner and allow the wall to dry fully.\n- Repair cracks with a flexible exterior filler, especially around windows and joints.\n- Fix leaking pipes, gutters and roof edges so water stops reaching the wall.\n- Apply a good quality exterior primer so the paint grips well and colours stay even.",
        },
        {
          title: "Pick the right time to paint",
          image: "",
          content:
            "Timing matters a great deal. The best weather for exterior painting is dry, mild and not too windy. Avoid painting in the monsoon, when walls hold moisture, and avoid painting in the harshest midday sun, which makes paint dry too fast, leaving brush marks and poor adhesion.\n\nMany painters schedule exterior work in the dry months after the monsoon, when walls have dried out, so the paint has time to cure before the next rains. Do not paint if rain is expected within a day or so of application.",
        },
        {
          title: "Application tips",
          image: "",
          content:
            "Start from the top and work downwards so that drips can be smoothed out as you go. Paint in the shade where possible, following the sun around the building. Apply two coats for proper coverage and protection, letting each coat dry as recommended on the label.\n\nUse the right tools for the surface. Rollers with a longer nap suit textured walls, while brushes help reach corners and edges. Do not thin the paint more than the label allows, because over-thinning reduces film thickness and durability.",
        },
        {
          title: "Maintenance that adds years",
          image: "",
          content:
            "Once the paint is done, a little care goes a long way. Wash the walls gently with water once or twice a year to remove dust and early algae. Check for new cracks after each monsoon and repair them before water gets in. Keep plants and creepers away from walls, trim overhanging branches and clean gutters so water does not run down the façade.\n\nTouch up small damaged spots early with the leftover paint. A small repair today prevents a big repaint later.",
        },
        {
          title: "Summary",
          image: "",
          content:
            "To make exterior paint last: use a product made for outdoors, prepare the surface carefully, fix water problems first, paint in suitable weather, apply two coats and look after the walls. Our team can help you choose the right Aeropolish exterior system for your building and climate.",
        },
      ],
    },
    {
      title: "How to Choose Paint Colours: Light, Mood and RAL Shades",
      slug: "how-to-choose-paint-colours",
      category: "Colour Ideas",
      author: "Aeropolish Team",
      date: "2026-09-26",
      image: "/gallery/interior-4.webp",
      excerpt: "Choosing colour is the most exciting and the most stressful part of painting. These practical steps will help you decide with confidence and avoid costly repaints.",
      published: true,
      sections: [
        {
          title: "",
          image: "",
          content:
            "Colour sets the mood of a space more than any other design choice. The right shade can make a small room feel open, a large room feel cosy and a factory floor feel clean and safe. The wrong one can feel cold, dull or tiring within weeks.\n\nBecause colour looks different in every home, there is no single perfect shade. What you can do is follow a process that removes the guesswork. This guide covers light, mood, undertones, testing and how industrial users can specify exact RAL colours.",
        },
        {
          title: "Start with how you want the room to feel",
          image: "",
          content:
            "Before looking at shade cards, decide the mood:\n\n- **Calm and restful:** soft blues, greens, warm greys and creamy whites.\n- **Warm and welcoming:** beiges, soft yellows, terracotta and peach.\n- **Fresh and energetic:** bright whites, citrus tones and light aqua.\n- **Elegant and bold:** deep blues, rich greens, charcoal and plum, often as a feature wall.\n\nThink about how the room is used. Bedrooms and study rooms benefit from restful tones, while dining areas and entrances can handle more energy.",
        },
        {
          title: "Understand light and direction",
          image: "",
          content:
            "A colour is not just what is in the tin. Daylight changes through the day, and each direction gives a different feel. North-facing rooms get cooler, softer light, so warm shades help balance them. South-facing rooms get bright, warm light, which suits almost any colour including cool ones. East-facing rooms are bright in the morning and softer later. West-facing rooms glow in the evening, which can make some colours look more intense.\n\nArtificial light matters too. Warm bulbs add a yellow cast while cool white bulbs make colours look crisper and bluer.",
        },
        {
          title: "Look for the undertone",
          image: "/new-images/color-trends-banner.webp",
          content:
            "Most colours have a hidden undertone. A grey can lean blue, green or purple. A white can lean warm cream or cool blue. Undertones become obvious on a large wall and next to flooring, curtains and furniture.\n\nHold your shade card next to the things that will stay in the room, such as the floor, wood and fabrics. If the undertone fights with them, try another shade from the same family.",
        },
        {
          title: "Test before you commit",
          image: "",
          content:
            "Always test paint on the actual wall. Paint a sample patch at least one metre square, or paint a large board that you can move around the room. Check it in the morning, afternoon and evening, and view it from different parts of the room. Let it dry fully, because most paints dry slightly darker or lighter than they first appear.\n\nLive with the sample for a few days before you decide. It costs very little compared with repainting a whole room.",
        },
        {
          title: "Use the 60-30-10 idea",
          image: "",
          content:
            "A simple way to balance colour is the 60-30-10 rule. Use a main colour for about 60 percent of the space, usually the walls. Add a secondary colour for about 30 percent, such as furniture and curtains. Use an accent for the final 10 percent, such as cushions, art and small decor. This keeps a room lively without feeling chaotic.\n\nFeature walls follow the same idea: one bolder wall in a room of calm colours gives a focal point without overwhelming the space.",
        },
        {
          title: "Colour for small and large rooms",
          image: "",
          content:
            "Light colours reflect more light and make small rooms feel larger. Dark colours absorb light and make large rooms feel more intimate, though they need good lighting. Painting the ceiling a lighter shade than the walls makes the room feel taller. Using the same colour on walls and trims can make a narrow space look wider and cleaner.",
        },
        {
          title: "Specifying exact shades with RAL colours",
          image: "",
          content:
            "For industrial, commercial and architectural work, accuracy matters. RAL Classic is a standard colour system where every shade has a code, such as RAL 5015 for sky blue or RAL 9005 for jet black. Using a code means everyone on the project, from the designer to the applicator, refers to exactly the same colour.\n\nOn our RAL Colours page you can browse the shades, search by code or name and preview a colour on steel pipes and a pressure vessel. Use it as a guide, and always confirm the final shade with a physical sample before ordering large quantities, because screens show colour differently from real paint.",
        },
        {
          title: "Final thoughts",
          image: "",
          content:
            "Choose the mood first, check the light, find the undertone, test on the wall and give yourself time. If you are working on an industrial project, specify colours by RAL code to avoid mix-ups. Our colour team is happy to help you make the final call.",
        },
      ],
    },
    {
      title: "Waterproofing Basics: Stopping Dampness Before It Damages Your Building",
      slug: "waterproofing-basics-stop-dampness",
      category: "Waterproofing",
      author: "Aeropolish Team",
      date: "2026-09-18",
      image: "/new-images/aeropolish-leakage-master.webp",
      excerpt: "Leaking terraces, damp walls and peeling paint all point to one problem: water. Understand the causes of dampness and the steps that protect your building for the long term.",
      published: true,
      sections: [
        {
          title: "",
          image: "",
          content:
            "Water is the most common reason buildings deteriorate. It weakens concrete, corrodes the steel inside it, spoils plaster, peels paint and encourages mould that harms health. Often the damage is slow and hidden, so by the time you notice a stain on the ceiling, the problem has been growing for a while.\n\nThe cheapest way to deal with water is to stop it early. This article explains where dampness comes from, which areas need waterproofing and how a good waterproofing job is done.",
        },
        {
          title: "Where does dampness come from?",
          image: "",
          content:
            "There are several common sources:\n\n- **Leaking roofs and terraces:** cracks, poor slopes and worn-out coatings let rainwater seep through the slab.\n- **Rising damp:** moisture travels up from the ground through the lower part of walls.\n- **Penetrating damp:** rain enters through cracks, porous plaster and poorly sealed joints in external walls.\n- **Plumbing leaks:** damaged pipes, joints and bathroom floors leak into walls and ceilings below.\n- **Condensation:** warm, humid indoor air meets cold surfaces and forms water, especially in poorly ventilated rooms.",
        },
        {
          title: "Warning signs you should not ignore",
          image: "",
          content:
            "Watch out for damp patches and stains, peeling or bubbling paint, white powdery salt deposits, a musty smell, black or green mould, cracked plaster and rust marks on exposed steel. If you see any of these, find the source before repainting. Painting over a damp wall only hides the problem for a short time.",
        },
        {
          title: "Areas that need waterproofing",
          image: "",
          content:
            "**Terraces and roofs** take the full force of sun and rain. **Bathrooms, kitchens and wet areas** see constant water. **Basements and foundations** deal with ground moisture. **External walls** face driving rain. **Water tanks, balconies and swimming pools** need reliable protection to stay watertight.\n\nEach area needs a waterproofing system suited to its conditions, such as whether the surface moves, is walked on or is exposed to sunlight.",
        },
        {
          title: "How a good waterproofing job is done",
          image: "",
          content:
            "1. **Find and fix the cause:** repair leaking pipes, blocked drains and structural cracks first.\n2. **Prepare the surface:** remove loose material, clean off dust, oil and old coatings, and open and repair cracks.\n3. **Treat joints and corners:** seal junctions between the wall and floor, around pipes and at drains.\n4. **Apply the waterproofing system:** put on the coating or chemical in the recommended number of coats and thickness, letting each coat dry.\n5. **Protect and test:** allow the system to cure, and on terraces and bathrooms, flood test with water for a day or more to confirm there are no leaks.\n6. **Finish:** add a protective screed, tiles or topcoat as needed.",
        },
        {
          title: "Common mistakes",
          image: "",
          content:
            "- Painting over damp walls and expecting the paint to stop the leak.\n- Skipping crack treatment and joint sealing, where most leaks start.\n- Applying too thin a coat to save material.\n- Not allowing enough curing time before exposing the surface to water or foot traffic.\n- Forgetting drainage and slope, so that water collects on the surface.\n- Choosing a product that is not suited to the surface or the weather exposure.",
        },
        {
          title: "Maintenance and long-term care",
          image: "",
          content:
            "Even the best waterproofing benefits from regular checks. Clear terrace drains and gutters before every monsoon, look for new cracks or lifting and repair them quickly, and keep rooms ventilated to reduce condensation. A small repair after the rains is far cheaper than redoing a whole waterproofing system.\n\nIf you notice persistent dampness, speak to a waterproofing specialist. Our team can suggest an Aeropolish waterproofing solution for your building and explain the right application method.",
        },
      ],
    },
  ],
};
