export default {
  async redirects() {
    const to = (sources, destination, permanent = false) => sources.map((source) => ({ source: '/' + source, destination, permanent }));
    return [
      // Earlier catalogue pages that merged into the bicycle categories
      ...to(['kids-carriers', 'kids-carriers2', 'ladies-carriers', 'ladies-carriers2', 'mtb-carriers', 'mtb-carriers2', 'mtb-carriers3', 'welded', 'roadstar-carriers', 'european-carriers', 'european-carriers2', 'european-carriers3', 'hi-end-carriers', 'e-bike-carriers'], '/carriers'),
      ...to(['stands2', 'stands3'], '/stands'),
      ...to(['frame', 'frame-2', 'forks'], '/bicycle-parts'),
      ...to(['cargo-bike-parts', 'baskets'], '/bicycle-parts', true),
      // Ranges no longer offered online
      ...to(['two-wheeler-parts', 'side-stands', 'side-stands2', 'side-stands3', 'side-stands4', 'center-stands', 'center-stands2', 'side-hooks', 'footrest', 'footrests', 'side-stand', 'kick-scooty-parts'], '/products'),
      ...to(['infrastructure2'], '/infrastructure'),
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/:page.php', destination: '/:page', permanent: true },
    ];
  },
};
