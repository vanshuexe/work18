import CollectionPage, { collectionMetadata } from '../../components/catalog/CollectionPage';

export const metadata = collectionMetadata('accessories');

export default function Page() {
  return <CollectionPage slug="accessories" />;
}
