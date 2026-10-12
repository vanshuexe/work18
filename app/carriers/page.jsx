import CollectionPage, { collectionMetadata } from '../../components/catalog/CollectionPage';

export const metadata = collectionMetadata('carriers');

export default function Page() {
  return <CollectionPage slug="carriers" />;
}
