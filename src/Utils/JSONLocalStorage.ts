import { v4 as UUIDV4 } from 'uuid';
import flatten from 'flat';

const getFlatItem = (item: Record<any, any>): Record<string, any> =>
  flatten(item, {
    safe: false,
    delimiter: '/',
    maxDepth: Infinity,
    transformKey: (k) => encodeURIComponent(k),
  });

export type PersistableItem = {
  id: string;
};

export class JSONLocalStorage<ItemType extends PersistableItem> {
  constructor(public appName: string, public itemTypeName: string) {}

  getKey = (id: string) => `${this.appName}/${this.itemTypeName}/${id}`;

  create = (item: Omit<ItemType, 'id'>): ItemType => {
    const id = UUIDV4();
    const itemWithId: ItemType = {
      ...item,
      id,
    } as any;

    localStorage.setItem(this.getKey(id), JSON.stringify(itemWithId));

    return itemWithId;
  };

  read = (id: string): ItemType | undefined => {
    try {
      const item = JSON.parse(localStorage.getItem(this.getKey(id)) as any);

      if (item) {
        return item as any;
      }
    } catch (error) {
      // Ignore.
    }

    return undefined;
  };

  update = (item: ItemType): ItemType => {
    const { id } = item || {};

    if (id) {
      localStorage.setItem(this.getKey(id), JSON.stringify(item));
    }

    return item;
  };

  delete = (id: string): ItemType | undefined => {
    const item = this.read(id);

    localStorage.removeItem(this.getKey(id));

    return item;
  };

  search = (query: Partial<ItemType> = {}): ItemType[] => {
    const flatQuery = getFlatItem(query);
    const items: ItemType[] = [];

    for (const key in localStorage) {
      const [appName, itemTypeName, id] = key.split('/');

      if (appName === this.appName && itemTypeName === this.itemTypeName && id) {
        const currentItem = this.read(id);

        if (currentItem) {
          const flatItem = getFlatItem(currentItem);
          const matches: boolean = Object.keys(flatQuery).reduce((acc, k) => acc && flatQuery[k] === flatItem[k], true);

          if (matches) {
            items.push(currentItem);
          }
        }
      }
    }

    return items;
  };
}
