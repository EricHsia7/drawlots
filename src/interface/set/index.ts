import { SetObject } from '../../data/sets/index';
import { addRippleTo } from '../../tools/index';
import { documentQuerySelector, elementQuerySelector } from '../../tools/query-selector';
import { closePreviousPage, fadeInElement, fadeOutElement, openPreviousPage, pushPageHistory, revokePageHistory } from '../index';

const setField = documentQuerySelector('.css_set_field');
const setHeadElement = elementQuerySelector(setField, '.css_set_head');
const setHeadLeftButtonElement = elementQuerySelector(setHeadElement, '.css_set_button_left');
const setHeadRightButtonElement = elementQuerySelector(setHeadElement, '.css_set_button_right');

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

export function initializeSetRipple(): void {
  addRippleTo(setHeadLeftButtonElement);
  addRippleTo(setHeadRightButtonElement);
}
