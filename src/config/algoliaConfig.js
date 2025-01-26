import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch('4KQCCFVTYI', '70311166dda6879e3f42e0848d0d2456');

export const algoliaConfig = {
  searchClient,
  indexName: 'products',
};
