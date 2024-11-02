import { SetObject } from '../../data/sets/index';
import { documentQuerySelector } from '../../tools/query-selector';
import { displayElement, hideElement, pushPageHistory, revokePageHistory } from '../index';

const elementCreatorField = documentQuerySelector('.css_element_creator_field');

export function openElementCreator(setID: SetObject['id']): void {
  pushPageHistory('ElementCreator');
  displayElement(elementCreatorField);
  // closePreviousPage();
}

export function closeElementCreator(): void {
  revokePageHistory('ElementCreator');
  hideElement(elementCreatorField);
  // openPreviousPage();
}
