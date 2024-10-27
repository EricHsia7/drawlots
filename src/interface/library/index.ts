import { documentQuerySelector, elementQuerySelector, elementQuerySelectorAll } from '../../tools/query-selector';
import { listSets, SetObject } from '../../data/sets/index';
import { generateIdentifier } from '../../tools/index';

let previousSets = [];

const libraryField = documentQuerySelector('.css_library_field');

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
    elementQuerySelector(element, '.css_library_set_thumbnail').innerHTML = set.thumbnail;
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

  const currentSetSeatQuantity = elementQuerySelectorAll(libraryField, '.css_library_set').length;
  const capacity = currentSetSeatQuantity - setsQuantity;
  if (capacity < 0) {
    for (let i = 0; i < Math.abs(capacity); i++) {
      const thisSetElement = generateSetElement();
      libraryField.appendChild(thisSetElement.element);
    }
  } else {
    for (let i = 0; i < Math.abs(capacity); i++) {
      const setIndex = currentSetSeatQuantity - 1 - i;
      elementQuerySelectorAll(libraryField, '.css_library_set')[setIndex].remove();
    }
  }

  for (let i = 0; i < setsQuantity; i++) {
    const thisSetObject = sets[i];
    const thisSetElement = elementQuerySelectorAll(libraryField, '.css_library_set')[i];
    if (previousSets.length < setsQuantity) {
      updateThumbnail(thisSetElement, thisSetObject, skeletonScreen);
      updateName(thisSetElement, thisSetObject, skeletonScreen);
      updateOnclick(thisSetElement, thisSetObject, skeletonScreen);
      updateSkeletonScreen(thisSetElement, true);
    } else {
      if (!(previousSets[i] === thisSetObject)) {
        updateThumbnail(thisSetElement, thisSetObject, skeletonScreen);
        updateName(thisSetElement, thisSetObject, skeletonScreen);
        updateOnclick(thisSetElement, thisSetObject, skeletonScreen);
        updateSkeletonScreen(thisSetElement, true);
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
