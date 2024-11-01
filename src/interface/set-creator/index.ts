import { createSet } from '../../data/sets/index';
import { documentQuerySelector, elementQuerySelector } from '../../tools/query-selector';
import { closePreviousPage, fadeInElement, fadeOutElement, openPreviousPage, pushPageHistory } from '../index';
import { openSet } from '../set/index';

const setCreatorField = documentQuerySelector('.css_set_creator_field');
const setCreatorBodyElement = elementQuerySelector(setCreatorField, '.css_set_creator_body');
const setCreatorGroupsElement = elementQuerySelector(setCreatorBodyElement, '.css_set_creator_groups');
const nameInputElement = elementQuerySelector(setCreatorGroupsElement, '.css_set_creator_group[group="set-name"] .css_set_creator_group_body input');

const setCreatorHeadElement = elementQuerySelector(setCreatorField, '.css_set_creator_head');
const setCreatorHeadLeftButtonElement = elementQuerySelector(setCreatorHeadElement, '.css_set_creator_button_left');
const setCreatorHeadRightButtonElement = elementQuerySelector(setCreatorHeadElement, '.css_set_creator_button_right');

function initializeSetCreator(): void {
  nameInputElement.value = '';
}

export function openSetCreator(): void {
  pushPageHistory('SetCreator');
  fadeInElement(setCreatorField);
  initializeSetCreator();
  closePreviousPage();
}

export function closeSetCreator(): void {
  // revokePageHistory('SetCreator');
  fadeOutElement(setCreatorField);
  openPreviousPage();
}

export function createFormulatedSet(): void {
  const name = String(nameInputElement.value);
  createSet(name).then((result) => {
    closeSetCreator();
    openSet(result);
  });
}
