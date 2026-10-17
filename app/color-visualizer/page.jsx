import PageShell from "../../components/PageShell";
import Content from "../../components/pages/ColorVisualizerPage";
import data from "../../lib/data";
import site from "../../config/site";
import home from "../../config/home";
export const metadata = { title: "Color Visualizer" };
export default function Page() {
  const colors = data.getColors();
  const props = {
    counts: Object.fromEntries(
      site.colorFamilies.map((f) => [
        f.type,
        colors.filter((c) => c.colorType === f.type).length,
      ]),
    ),
    defaultColor: colors.find((c) => c.colorType === "neutral") || colors[0],
    sofas: [
      {
        hex: "#9CA3AF",
        desktop: "/desktop_grey-sofa.webp",
        mobile: "/mobile_grey-sofa-final-min.webp",
      },
      {
        hex: "#8B4513",
        desktop: "/desktop_brown-sofa.webp",
        mobile: "/mobile-brown-sofa-min.webp",
      },
      {
        hex: "#FFFFFF",
        desktop: "/desktop_white-sofa.webp",
        mobile: "/mobile-white-sofa-final-min.webp",
      },
    ],
  };
  return (
    <PageShell
      active="colors"
      behavior="color-visualizer"
      headerTheme="dark"
      hideFooter={true}
    >
      <Content {...props} />
    </PageShell>
  );
}
