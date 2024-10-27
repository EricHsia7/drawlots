import { addRippleTo } from '../../tools/index';
import { documentQuerySelector, elementQuerySelectorAll } from '../../tools/query-selector';

const navigationBarElement = documentQuerySelector('.css_navigation_bar');
const buttonElements = elementQuerySelectorAll(navigationBarElement, '.css_navigation_button');

export function initializeNavigationBar() {
  for (const buttonElement of buttonElements) {
    addRippleTo(buttonElement);
  }
}
