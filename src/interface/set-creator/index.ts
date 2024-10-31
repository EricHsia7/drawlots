import { createSet } from '../../data/sets/index';
import { documentQuerySelector, elementQuerySelector } from '../../tools/query-selector';
import { closePreviousPage, openPreviousPage, pushPageHistory, revokePageHistory } from '../index';
import { openSet } from '../set/index';

const setCreatorField = documentQuerySelector('.css_set_creator_field');
const setCreatorBodyElement = elementQuerySelector(setCreatorField, '.css_set_creator_body');
const setCreatorGroupsElement = elementQuerySelector(setCreatorBodyElement, '.css_set_creator_groups');
const nameInputElement = elementQuerySelector(setCreatorGroupsElement, '.css_set_creator_group[group="set-name"] .css_set_creator_group_body input');

function initializeSetCreator(): void {
  nameInputElement.value = '';
}

export function openSetCreator(): void {
  pushPageHistory('SetCreator');
  setCreatorField.setAttribute('displayed', 'true');
  initializeSetCreator();
  closePreviousPage();
}

export function closeSetCreator(): void {
  // revokePageHistory('SetCreator');
  setCreatorField.setAttribute('displayed', 'false');
  openPreviousPage();
}

export function createFormulatedSet(): void {
  const name = String(nameInputElement.value);
  createSet(name).then((result) => {
    closeSetCreator();
    openSet(result);
  });
}
