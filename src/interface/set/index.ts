import { SetObject } from '../../data/sets/index';
import { documentQuerySelector } from '../../tools/query-selector';
import { closePreviousPage, fadeInElement, fadeOutElement, openPreviousPage, pushPageHistory, revokePageHistory } from '../index';

const setField = documentQuerySelector('.css_set_field');

export function openSet(setID: SetObject['id']): void {
  pushPageHistory('Set');
  fadeInElement(setField);
  closePreviousPage();
}

export function closeSet(): void {
  // revokePageHistory('Set');
  fadeOutElement(setField);
  openPreviousPage();
}
