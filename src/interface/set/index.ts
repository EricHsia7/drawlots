import { getSet, SetObject } from '../../data/sets/index';
import { documentQuerySelector, elementQuerySelector } from '../../tools/query-selector';
import { closePreviousPage, displayElement, hideElement, openPreviousPage, pushPageHistory, revokePageHistory } from '../index';

const setField = documentQuerySelector('.css_set_field');
const setBody = elementQuerySelector(setField, '.css_set_body');
const drawFromSetCapsuleElement = elementQuerySelector(setBody, '.css_draw_from_set_capsule');
const drawFromSetElement = elementQuerySelector(drawFromSetCapsuleElement, '.css_draw_from_set');
const drawOptionsElement = elementQuerySelector(drawFromSetCapsuleElement, '.css_draw_options');
const setHeadElement = elementQuerySelector(setField, '.css_set_head');
const setHeadLeftButtonElement = elementQuerySelector(setHeadElement, '.css_set_button_left');
const setHeadRightButtonElement = elementQuerySelector(setHeadElement, '.css_set_button_right');
const setHeadTitleElement = elementQuerySelector(setHeadElement, '.css_set_title');

export function openSet(setID: SetObject['id']): void {
  pushPageHistory('Set');
  displayElement(setField);
  initializeSet(setID);
  closePreviousPage();
}

export function closeSet(): void {
  // revokePageHistory('Set');
  hideElement(setField);
  openPreviousPage();
}

async function initializeSet(setID: SetObject['id']): void {
  const set = await getSet(setID);
  setHeadTitleElement.innerText = set.name;
  drawFromSetElement.setAttribute('onclick', `drawlots.drawResult.openDrawResult('${setID}')`);
  setHeadRightButtonElement.setAttribute('onclick', `drawlots.sets.openSetEditor('${setID}')`);
}
