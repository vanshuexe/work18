import CollectionPage, { collectionMetadata } from '../../components/catalog/CollectionPage';

export const metadata = collectionMetadata('stands');

export default function Page() {
  return <CollectionPage slug="stands" />;
}
