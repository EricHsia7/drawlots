import { SetObject } from '../sets/index';

export interface NumberSetElementObject {
  id: string;
  type: 'number';
  number: number;
}

export interface TextSetElementObject {
  id: string;
  type: 'text';
  text: string;
}

export interface ImageSetElementObject {
  id: string;
  type: 'image';
  image: ImageObject;
}

export type SetElementObject = NumberSetElementObject | TextSetElementObject | ImageSetElementObject;

export async function addElementToSet(setId: SetObject['id'], type: SetElementObject['type'], content: NumberSetElementObject['number'] | TextSetElementObject['text'] | ImageSetElementObject['image']) {

}
