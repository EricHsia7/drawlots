import { generateIdentifier } from '../../tools/index';
import { getElement, SetElementObject } from '../elements/index';
import { lfGetItem, lfListItemKeys, lfSetItem } from '../storage/index';

export interface SetObject {
  id: string;
  elements: Array<SetElementObject['id']>;
  name: string;
  thumbnail: number;
}

export async function createSet(name: SetObject['name'] = 'Untitled Set'): Promise<SetObject['id']> {
  const id = generateIdentifier('set');
  let object: SetObject = {
    id: id,
    elements: [],
    name: name,
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
  const item = await lfGetItem(0, id);
  const parsedItem = JSON.parse(item);
  return parsedItem;
}

export async function addElementToSet(setID: SetObject['id'], elementID: SetElementObject['id']): boolean {
  let currentSet = await getSet(setID);
  if (currentSet.elements.indexOf(elementID) < 0) {
    currentSet.elements.push(elementID);
  }
  await lfSetItem(0, setID, JSON.stringify(currentSet));
  return true;
}

export async function drawFromSet(setID: SetObject['id']): Promise<SetElementObject> {
  const set = await getSet(setID);
  const elementsLength = set.elements.length;
  if (elementsLength > 0) {
    const randomIndex = Math.round((elementsLength - 1) * Math.random());
    const elementID = set.elements[randomIndex];
    const result = await getElement(elementID);
    return result;
  }
}
