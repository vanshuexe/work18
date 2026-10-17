import site from "../config/site";

export const metadata = {
  title: { default: site.siteName, template: `%s | ${site.siteName}` },
  description: site.description,
  icons: { icon: "/aeropolish-logo.jpeg" },
};

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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/tailwind.css" />
        <link rel="stylesheet" href="/css/site.css" />
      </head>
      <body className="h-full m-0 p-0">{children}</body>
    </html>
  );
}
