import { documentQuerySelector, elementQuerySelector, elementQuerySelectorAll } from '../../tools/query-selector';
import { listSets, SetObject } from '../../data/sets/index';
import { getElement } from '../../data/elements/index';
import { addRippleTo, generateIdentifier } from '../../tools/index';
import { FieldSize, GeneratedElement } from '../index';
import { getImage } from '../../data/images/index';

let previousSets = [];

const libraryField = documentQuerySelector('.css_library_field');
const libraryBodyElement = elementQuerySelector(libraryField, '.css_library_body');
const librarySetsElement = elementQuerySelector(libraryBodyElement, '.css_library_sets');
const libraryHeadElement = elementQuerySelector(libraryField, '.css_library_head');
const leftButtonElement = elementQuerySelector(libraryHeadElement, '.css_library_button_left');
const rightButtonElement = elementQuerySelector(libraryHeadElement, '.css_library_button_right');

function queryLibraryFieldSize(): FieldSize {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

export function resizeLibraryField(): void {
  const size = queryLibraryFieldSize();
  const padding = 7.5;
  let setWidth = 0;
  let setHeight = 250;
  if (size.width < 500) {
    setWidth = size.width - padding * 2;
  } else {
    setWidth = Math.floor((size.width - padding * 2) / Math.floor((size.width - padding * 2) / 300));
  }
  libraryField.style.setProperty('--d-cssvar-set-width', `${setWidth}px`);
  libraryField.style.setProperty('--d-cssvar-set-height', `${setHeight}px`);
}

function generateSetElement(): GeneratedElement {
  const id = generateIdentifier('s');
  const element = document.createElement('div');
  element.classList.add('css_library_set');
  element.id = id;
  element.innerHTML = `<div class="css_library_set_thumbnail"></div><div class="css_library_set_name"></div>`;
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
      thisThumbnailElement.innerText = 'Empty Set';
    }
  }

  function updateName(element: HTMLElement, set: SetObject): void {
    elementQuerySelector(element, '.css_library_set_name').innerText = set.name;
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
      addRippleTo(elementQuerySelector(librarySetsElement, `.css_library_set#${thisSetElement.id}`));
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
      updateThumbnail(thisSetElement, thisSetObject, skeletonScreen);
      updateName(thisSetElement, thisSetObject, skeletonScreen);
      updateOnclick(thisSetElement, thisSetObject, skeletonScreen);
      updateSkeletonScreen(thisSetElement, skeletonScreen);
    } else {
      if (!(previousSets[i] === thisSetObject)) {
        updateThumbnail(thisSetElement, thisSetObject, skeletonScreen);
        updateName(thisSetElement, thisSetObject, skeletonScreen);
        updateOnclick(thisSetElement, thisSetObject, skeletonScreen);
        updateSkeletonScreen(thisSetElement, skeletonScreen);
      }
    }
  }
}

function setUpLibraryFieldSkeletonScreen() {
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

export function initializeLibraryRipple(): void {
  addRippleTo(leftButtonElement);
  addRippleTo(rightButtonElement);
}
