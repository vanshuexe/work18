import PageShell from '../../components/PageShell';
import Content from '../../components/pages/VisionPage';
export const metadata = { title: 'Our Vision', description: 'Aeropolish vision: building a trusted Indian coatings brand for the world.' };
export default function Page() {
 return <PageShell active="about"><Content /></PageShell>;
}
