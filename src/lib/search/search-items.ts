import Fuse from 'fuse.js';

export type SearchItem<T = any> = {
  label: string;
  /** this will be used to index the search records */
  type: string;
  object?: T;
};

export const fuseForSearchItems = <T>(items: SearchItem<T>[]) =>
  new Fuse(items, {
    keys: [{ name: 'label', weight: 2 }, 'object', 'type'],
    includeScore: true,
    threshold: 0.3,
    minMatchCharLength: 2,
    useExtendedSearch: true,
    shouldSort: true,
  });

type SearchItemAdapter<T, V = T> = (item: T) => SearchItem<V>;

export const fuseForItems =
  <T, V>(adapter: SearchItemAdapter<T, V>) =>
  (items: T[]) =>
    fuseForSearchItems(items.map(adapter));
