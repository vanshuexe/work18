import Header from "./Header";
import Footer from "./Footer";
import Interactions from "./Interactions";
import WhatsAppButton from "./WhatsAppButton";
import content from "../lib/content.cjs";
import siteLib from "../lib/site.cjs";

export default async function PageShell({
  children,
  active = "",
  headerTheme = "",
  hideFooter = false,
  behavior = "",
}) {
  await content.load();
  const site = siteLib.getSite();
  const contact = siteLib.getContact();
  return (
    <div className="h-full flex flex-col">
      <div className="relative">
        <Header active={active} headerTheme={headerTheme} site={site} />
      </div>
      <main className="site-main flex-1" data-page={behavior || active || "content"}>{children}</main>
      {!hideFooter && (
        <div className="relative">
          <Footer site={site} />
        </div>
      )}
      <WhatsAppButton contact={contact} />
      <Interactions behavior={behavior} />
    </div>
  );
}
