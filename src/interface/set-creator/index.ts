import { createSet } from '../../data/sets/index';
import { documentQuerySelector, elementQuerySelector } from '../../tools/query-selector';
import { openSet } from '../set/index';

const setCreatorField = documentQuerySelector('.css_set_creator_field');
const setCreatorBodyElement = elementQuerySelector(setCreatorField, '.css_set_creator_body');
const setCreatorGroups = elementQuerySelector(setCreatorBodyElement, '.css_set_creator_groups');
const nameInputElement = elementQuerySelector(setCreatorGroups, '.css_set_creator_group[name="set-name"] .css_set_creator_group_body input');

function initializeSetCreator(): void {
  nameInputElement.innerText = '';
}

export function openSetCreator(): void {
  setCreatorField.setAttribute('displayed', 'true');
  initializeSetCreator();
}

export function closeSetCreator(): void {
  setCreatorField.setAttribute('displayed', 'false');
}

export function createFormulatedSet(): void {
  const name = String(nameInputElement.innerText);
  createSet(name).then((result) => {
    openSet();
  });
}