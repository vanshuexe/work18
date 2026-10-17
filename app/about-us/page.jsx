import PageShell from '../../components/PageShell';
import Content from '../../components/pages/AboutPage';
export const metadata = { title: 'About Aeropolish', description: 'Learn about Aeropolish Paints & Coating Industry, our approach, quality, vision and mission.' };
export default function Page() {
 return <PageShell active="about" headerTheme="dark"><Content /></PageShell>;
}
