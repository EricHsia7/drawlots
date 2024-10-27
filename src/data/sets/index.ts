import { generateIdentifier } from '../../tools/index';
import { SetElementObject } from '../elements/index';
import { lfGetItem, lfListItemKeys, lfSetItem } from '../storage/index';

export interface SetObject {
  id: string;
  elements: Array<SetElementObject['id']>;
  name: string;
  thumbnail: number;
}

export async function createSet(): Promise<SetObject['id']> {
  const id = generateIdentifier('set');
  let object: SetObject = {
    id: id,
    elements: [],
    name: 'Untitled Set',
    thumbnail: 0
  };
  await lfSetItem(0, id, JSON.stringify(object));
  return id;
}

export async function listSets(): Promise<Array<SetObject>> {
  let result: Array<SetObject> = [];
  const keys = await lfListItemKeys(0);
  for (const key of keys) {
    const item = await lfGetItem(0, key);
    const parsedItem = JSON.parse(item);
    result.push(parsedItem);
  }
  return result;
}

export async function getSet(id: SetObject['id']): Promise<SetObject> {
  const item = await lfSetItem(0, id);
  const parsedItem = JSON.parse(item);
  return parsedItem;
}
