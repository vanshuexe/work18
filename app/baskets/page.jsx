import CollectionPage, { collectionMetadata } from '../../components/catalog/CollectionPage';

export const metadata = collectionMetadata('baskets');

export default function Page() {
  return <CollectionPage slug="baskets" />;
}
