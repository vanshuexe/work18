// Photos used by the RAL colour preview. The painted area of each photo is either a polygon
// (image pixels) or a black/white mask image the same size as the photo.
const tank = require("./ral-tank");

module.exports = [
  {
    key: "pipes",
    label: "Steel pipes",
    image: "/new-images/ral-pipes.webp",
    mask: "/new-images/ral-pipes-mask.png?v=3",
    width: 1536,
    height: 1024,
    alt: "Bundles of galvanised steel pipes strapped on a pallet",
    target: "the steel pipes",
  },
  {
    key: "tank",
    label: "Pressure vessel",
    image: tank.image,
    polygon: tank.polygon,
    width: tank.width,
    height: tank.height,
    alt: tank.alt,
    target: "the vessel",
  },
];
