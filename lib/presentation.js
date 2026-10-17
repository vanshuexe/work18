// Translate the original CSS declarations into React style objects.
export function cssStyle(value) {
  return Object.fromEntries(
    String(value)
      .split(";")
      .filter(Boolean)
      .map((declaration) => {
        const colon = declaration.indexOf(":");
        const property = declaration.slice(0, colon).trim();
        const key = property.startsWith("--")
          ? property
          : property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        return [key, declaration.slice(colon + 1).trim()];
      }),
  );
}

export function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
