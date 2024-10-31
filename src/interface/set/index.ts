import { SetObject } from '../../data/sets/index';
import { documentQuerySelector } from '../../tools/query-selector';
import { closePreviousPage, openPreviousPage, pushPageHistory, revokePageHistory } from '../index';

const setField = documentQuerySelector('.css_set_field');

export function openSet(setID: SetObject['id']): void {
  pushPageHistory('Set');
  setField.setAttribute('displayed', 'true');
  closePreviousPage();
}

export function closeSet(): void {
  // revokePageHistory('Set');
  setField.setAttribute('displayed', 'false');
  openPreviousPage();
}
