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

type Page = 'Library' | 'Set' | 'SetCreator';

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
