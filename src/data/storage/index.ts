const localforage = require('localforage');

let storage = {
  setsStore: false,
  imagesStore: false,
  elementsStore: false
};

const stores = ['setsStore', 'imagesStore', 'elementsStore'];

async function dropInstance(store: number): Promise<any> {
  const storeKey = stores[store];
  if (storage[storeKey] === false) {
    storage[storeKey] = await localforage.createInstance({
      name: storeKey
    });
  }
  const operation = await storage[storeKey].dropInstance();
  return operation;
}

export async function lfSetItem(store: number, key: string, value: any): Promise<any> {
  try {
    const storeKey = stores[store];
    if (storage[storeKey] === false) {
      storage[storeKey] = await localforage.createInstance({
        name: storeKey
      });
    }
    const operation = await storage[storeKey].setItem(key, value);
    return operation;
  } catch (err) {
    console.error(err);
    await dropInstance(store);
    return null;
  }
}

export async function lfGetItem(store: number, key: string): Promise<any> {
  try {
    const storeKey = stores[store];
    if (storage[storeKey] === false) {
      storage[storeKey] = await localforage.createInstance({
        name: storeKey
      });
    }
    const operation = await storage[storeKey].getItem(key);
    return operation;
  } catch (err) {
    console.error(err);
    await dropInstance(store);
    return null;
  }
}

export async function lfRemoveItem(store: number, key: string): Promise<any> {
  try {
    const storeKey = stores[store];
    if (storage[storeKey] === false) {
      storage[storeKey] = await localforage.createInstance({
        name: storeKey
      });
    }
    const operation = await storage[storeKey].removeItem(key);
    return operation;
  } catch (err) {
    console.error(err);
    await dropInstance(store);
    return null;
  }
}

export async function lfListItemKeys(store: number): Promise<Array<string>> {
  try {
    const storeKey = stores[store];
    if (storage[storeKey] === false) {
      storage[storeKey] = await localforage.createInstance({
        name: storeKey
      });
    }
    const keys = await storage[storeKey].keys();
    return keys;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function isStoragePersistent(): Promise<boolean> {
  // Check if site's storage has been marked as persistent
  if (navigator.storage) {
    if (navigator.storage.persist) {
      const isPersisted = await navigator.storage.persisted();
      return isPersisted;
    }
  }
  return false;
}

export async function askForPersistentStorage(): Promise<'granted' | 'denied' | 'unsupported'> {
  // Request persistent storage for site
  if (navigator.storage) {
    if (navigator.storage.persist) {
      const isPersisted = await navigator.storage.persist();
      return isPersisted ? 'granted' : 'denied';
    }
  }
  return 'unsupported';
}
