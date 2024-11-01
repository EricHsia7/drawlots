import { closeLibrary, openLibrary } from './library/index';
import { closeSetCreator, openSetCreator } from './set-creator/index';

export interface GeneratedElement {
  element: HTMLElement;
  id: string | null;
}

export interface FieldSize {
  width: number;
  height: number;
}

type Page = 'Library' | 'Set' | 'SetCreator' | 'SetEditor' | 'DrawResult';

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
        break;
      case 'SetCreator':
        openSetCreator();
        break;
      default:
        break;
    }
  }
}

export function displayElement(element: HTMLElement): void {
  element.setAttribute('displayed', 'true');
}

export function fadeOutElement(element: HTMLElement): void {
  element.setAttribute('displayed', 'false');
}
