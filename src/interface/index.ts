import { closeLibrary, openLibrary } from './library/index';
import { closeSetCreator, openSetCreator } from './set-creator/index';
import { closeSet, openSet } from './set/index';

export interface GeneratedElement {
  element: HTMLElement;
  id: string | null;
}

export interface FieldSize {
  width: number;
  height: number;
}

type Page = 'Library' | 'Set' | 'SetCreator' | 'DrawResult';

let pageHistory: Array<Page> = ['Library'];

export function pushPageHistory(page: Page): void {
  const pageHistoryLength = pageHistory.length;
  const lastPage = pageHistory[pageHistoryLength - 1];
  if (!(lastPage === page)) {
    pageHistory.push(page);
  }
}

export function revokePageHistory(page: Page): void {
  if (pageHistory.indexOf(page) > -1) {
    const pageHistoryLength = pageHistory.length;
    if (pageHistory[pageHistoryLength - 1] === page) {
      pageHistory.pop();
    }
  }
}

export function closePreviousPage(): void {
  const pageHistoryLength = pageHistory.length;
  if (pageHistoryLength > 1) {
    const previousPage = pageHistory[pageHistoryLength - 2];
    switch (previousPage) {
      case 'Library':
        closeLibrary();
        break;
      case 'Set':
        closeSet();
        break;
      case 'SetCreator':
        closeSetCreator();
        break;
      default:
        break;
    }
  }
}

export function openPreviousPage(): void {
  const pageHistoryLength = pageHistory.length;
  if (pageHistoryLength > 1) {
    const previousPage = pageHistory[pageHistoryLength - 2];
    pageHistory.pop();
    switch (previousPage) {
      case 'Library':
        openLibrary();
        break;
      case 'Set':
        openSet();
        break;
      case 'SetCreator':
        openSetCreator();
        break;
      default:
        break;
    }
  }
}

export function fadeInElement(element: HTMLElement): void {
  const displayed = element.getAttribute('displayed');
  const inPreparation = element.classList.contains('css_transition_fade_in_preparation');
  if (displayed === 'false' && !inPreparation) {
    element.addEventListener('animationend', function () {
      element.setAttribute('displayed', 'true');
      element.classList.remove('css_transition_fade_in_preparation');
      element.classList.remove('css_transition_fade_in');
    });
    element.classList.add('css_transition_fade_in_preparation');
    setTimeout(() => {
      element.classList.add('css_transition_fade_in');
    }, 1);
  }
}

export function fadeOutElement(element: HTMLElement): void {
  const displayed = element.getAttribute('displayed');
  const inPreparation = element.classList.contains('css_transition_fade_out_preparation');
  if (displayed === 'true' && !inPreparation) {
    element.addEventListener('animationend', function () {
      element.setAttribute('displayed', 'false');
      element.classList.remove('css_transition_fade_out_preparation');
      element.classList.remove('css_transition_fade_out');
    });
    element.classList.add('css_transition_fade_out_preparation');
    setTimeout(() => {
      element.classList.add('css_transition_fade_out');
    }, 1);
  }
}
