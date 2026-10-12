import FamilyPage, { familyMetadata } from '../../components/catalog/FamilyPage';

export const metadata = familyMetadata('bicycle-parts');

export default function Page() {
  return <FamilyPage slug="bicycle-parts" />;
}
