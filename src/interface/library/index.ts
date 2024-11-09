import { documentQuerySelector, elementQuerySelector, elementQuerySelectorAll } from '../../tools/query-selector';
import { listSets, SetObject } from '../../data/sets/index';
import { getElement } from '../../data/elements/index';
import { generateIdentifier } from '../../tools/index';
import { displayElement, hideElement, GeneratedElement } from '../index';
import { getImage } from '../../data/images/index';

let previousSets = [];

const libraryField = documentQuerySelector('.css_library_field');
const libraryBodyElement = elementQuerySelector(libraryField, '.css_library_body');
const librarySetsElement = elementQuerySelector(libraryBodyElement, '.css_library_sets');
const libraryHeadElement = elementQuerySelector(libraryField, '.css_library_head');
const leftButtonElement = elementQuerySelector(libraryHeadElement, '.css_library_button_left');
const rightButtonElement = elementQuerySelector(libraryHeadElement, '.css_library_button_right');

export function openLibrary(): void {
  displayElement(libraryField);
  refreshLibrary();
}

export function closeLibrary(): void {
  hideElement(libraryField);
}

function generateSetElement(): GeneratedElement {
  const id = generateIdentifier('s');
  const element = document.createElement('div');
  element.classList.add('css_library_set');
  element.id = id;
  element.innerHTML = `<div class="css_library_set_thumbnail"></div><div class="css_library_set_name"></div><div class="css_library_set_description"></div>`;
  element.setAttribute('onclick', `drawlots.sets.openSet('')`);
  return {
    id: id,
    element: element
  };
}

function updateLibraryField(sets: Array<SetObject>, skeletonScreen: boolean): void {
  function updateThumbnail(element: HTMLElement, set: SetObject): void {
    const thisThumbnailElement = elementQuerySelector(element, '.css_library_set_thumbnail');
    if (set.elements.length > 0) {
      const thumbnailElementID = set.elements[set.thumbnail];
      getElement(thumbnailElementID).then((thumbnailElementObject) => {
        switch (thumbnailElementObject.type) {
          case 'text':
            thisThumbnailElement.innerText = thumbnailElementObject.text;
            break;
          case 'image':
            getImage(thumbnailElementObject.image).then((imageObject) => {
              thisThumbnailElement.innerHTML = `<img src="${imageObject.blobURL}">`;
            });
            break;
          case 'number':
            thisThumbnailElement.innerText = String(thumbnailElementObject.number);
            break;
          default:
            break;
        }
      });
    } else {
      thisThumbnailElement.innerText = 'Empty';
    }
  }

  function updateName(element: HTMLElement, set: SetObject): void {
    elementQuerySelector(element, '.css_library_set_name').innerText = set.name;
  }

  function updateDescription(element: HTMLElement, set: SetObject): void {
    const len = set.elements.length;
    elementQuerySelector(element, '.css_library_set_description').innerText = `${len > 0 ? len : 'No'} element${len > 1 ? 's' : ''}`;
  }

  function updateOnclick(element: HTMLElement, set: SetObject): void {
    element.setAttribute('onclick', `drawlots.sets.openSet('${set.id}')`);
  }

  function updateSkeletonScreen(element: HTMLElement, skeletonScreen: boolean): void {
    element.setAttribute('skeleton-screen', skeletonScreen);
  }

  const setsQuantity = sets.length;

  const currentSetSeatQuantity = elementQuerySelectorAll(librarySetsElement, '.css_library_set').length;
  const capacity = currentSetSeatQuantity - setsQuantity;
  if (capacity < 0) {
    for (let i = 0; i < Math.abs(capacity); i++) {
      const thisSetElement = generateSetElement();
      librarySetsElement.appendChild(thisSetElement.element);
    }
  } else {
    for (let i = 0; i < Math.abs(capacity); i++) {
      const setIndex = currentSetSeatQuantity - 1 - i;
      elementQuerySelectorAll(librarySetsElement, '.css_library_set')[setIndex].remove();
    }
  }

  for (let i = 0; i < setsQuantity; i++) {
    const thisSetObject = sets[i];
    const thisSetElement = elementQuerySelectorAll(librarySetsElement, '.css_library_set')[i];
    if (previousSets.length < setsQuantity) {
      updateThumbnail(thisSetElement, thisSetObject);
      updateName(thisSetElement, thisSetObject);
      updateDescription(thisSetElement, thisSetObject);
      updateOnclick(thisSetElement, thisSetObject);
      updateSkeletonScreen(thisSetElement, skeletonScreen);
    } else {
      if (!(previousSets[i] === thisSetObject)) {
        updateThumbnail(thisSetElement, thisSetObject);
        updateName(thisSetElement, thisSetObject);
        updateDescription(thisSetElement, thisSetObject);
        updateOnclick(thisSetElement, thisSetObject);
        updateSkeletonScreen(thisSetElement, skeletonScreen);
      }
    }
  }
  previousSets = sets;
}

function setUpLibraryFieldSkeletonScreen(): void {
  const defaultSetsQuantity = 10;
  let sets: Array<SetObject> = [];
  for (let i = 0; i < defaultSetsQuantity; i++) {
    sets.push({
      id: '',
      name: '',
      thumbnail: 0,
      elements: []
    });
  }
  updateLibraryField(sets, true);
}

export async function initializeLibrary(): void {
  setUpLibraryFieldSkeletonScreen();
  const sets = await listSets();
  updateLibraryField(sets, false);
}

export async function refreshLibrary(): void {
  const sets = await listSets();
  updateLibraryField(sets, false);
}
