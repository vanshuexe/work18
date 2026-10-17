import PageShell from '../../components/PageShell';
import Content from '../../components/pages/RalColoursPage';
import colours from '../../data/ral-colours.json';
export const metadata = { title: 'RAL Colours', description: 'RAL Classic colour reference with codes and names.' };
export default function Page() {
 return <PageShell active="colors"><Content colours={colours} /></PageShell>;
}
