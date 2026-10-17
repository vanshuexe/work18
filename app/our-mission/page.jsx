import PageShell from '../../components/PageShell';
import Content from '../../components/pages/MissionPage';
export const metadata = { title: 'Our Mission', description: 'Aeropolish mission: bringing quality paints closer to every home.' };
export default function Page() {
 return <PageShell active="about"><Content /></PageShell>;
}
