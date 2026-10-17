import Header from "./Header";
import Footer from "./Footer";
import Interactions from "./Interactions";

export default function PageShell({
  children,
  active = "",
  headerTheme = "",
  hideFooter = false,
  behavior = "",
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="relative">
        <Header active={active} headerTheme={headerTheme} />
      </div>
      <main className="site-main flex-1" data-page={behavior || active || "content"}>{children}</main>
      {!hideFooter && (
        <div className="relative">
          <Footer />
        </div>
      )}
      <Interactions behavior={behavior} />
    </div>
  );
}
