import content from "../lib/content.cjs";
import siteLib from "../lib/site.cjs";

const icons = {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
    { url: "/favicon.png", sizes: "512x512", type: "image/png" },
  ],
  shortcut: "/favicon.ico",
  apple: "/apple-touch-icon.png",
};

// Site title and description come from the admin panel (Menu, footer & SEO).
export async function generateMetadata() {
  await content.load();
  const site = siteLib.getSite();
  return {
    title: { default: site.seoTitle, template: `%s | ${site.siteName}` },
    description: site.description,
    openGraph: { title: site.seoTitle, description: site.description, siteName: site.siteName, type: "website" },
    icons,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/tailwind.css" />
        <link rel="stylesheet" href="/css/site.css" />
      </head>
      <body className="h-full m-0 p-0">{children}</body>
    </html>
  );
}
