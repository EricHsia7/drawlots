import { documentQuerySelector, elementQuerySelector } from '../../tools/query-selector';
import { displayElement, hideElement, pushPageHistory, revokePageHistory } from '../index';

const setEditorField = documentQuerySelector('.css_set_editor_field');
const setEditorBodyElement = elementQuerySelector(setEditorField, '.css_set_editor_body');

export function openSetEditor(): void {
  pushPageHistory('SetEditor');
  displayElement(setEditorField);
  // closePreviousPage();
}

export function closeSetEditor(): void {
  revokePageHistory('SetEditor');
  hideElement(setEditorField);
  // openPreviousPage();
}
