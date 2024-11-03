import { ColorInRGB } from '../../tools/colors';
import { generateIdentifier } from '../../tools/index';
import { ImageHash } from '../images/index';
import { lfGetItem, lfSetItem } from '../storage/index';

export interface NumberSetElementObject {
  id: string;
  type: 'number';
  number: number;
  color: ColorInRGB;
}

export interface TextSetElementObject {
  id: string;
  type: 'text';
  text: string;
  color: ColorInRGB;
}

export interface ImageSetElementObject {
  id: string;
  type: 'image';
  image: ImageHash;
  color: ColorInRGB;
}

export type SetElementObject = NumberSetElementObject | TextSetElementObject | ImageSetElementObject;

export async function createElement(type: SetElementObject['type'], content: NumberSetElementObject['number'] | TextSetElementObject['text'] | ImageSetElementObject['image'], color: SetElementObject['color']): Promise<SetElementObject['id']> {
  const id = generateIdentifier('element');
  let object: SetElementObject = {
    id: id,
    type: type,
    color: color
  };
  switch (type) {
    case 'number':
      object.number = content;
      break;
    case 'text':
      object.text = content;
      break;
    case 'image':
      object.image = content;
      break;
    default:
      break;
  }
  await lfSetItem(2, id, JSON.stringify(object));
  return id;
}

export async function getElement(id: SetElementObject['id']): Promise<SetElementObject> {
  const item = await lfGetItem(2, id);
  const parsedItem = JSON.parse(item);
  return parsedItem;
}
