import { SetObject } from '../../data/sets/index';
import { documentQuerySelector } from '../../tools/query-selector';

const setField = documentQuerySelector('.css_set_field');

export function openSet(setID: SetObject['id']): void {
  setField.setAttribute('displayed', 'true');
}

export function closeSet(): void {
  setField.setAttribute('displayed', 'false');
}
