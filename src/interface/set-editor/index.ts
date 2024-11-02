import { getElement, SetElementObject } from '../../data/elements/index';
import { getImage } from '../../data/images/index';
import { getSet, SetObject } from '../../data/sets/index';
import { generateIdentifier } from '../../tools/index';
import { documentQuerySelector, elementQuerySelector, elementQuerySelectorAll } from '../../tools/query-selector';
import { getIconHTML } from '../icons/index';
import { displayElement, GeneratedElement, hideElement, pushPageHistory, revokePageHistory } from '../index';

let previousElementObjects = [];

const setEditorField = documentQuerySelector('.css_set_editor_field');
const setEditorBodyElement = elementQuerySelector(setEditorField, '.css_set_editor_body');
const setEditorElementObjectsElement = elementQuerySelector(setEditorBodyElement, '.css_set_editor_element_objects');

export function openSetEditor(setID: SetObject['id']): void {
  pushPageHistory('SetEditor');
  displayElement(setEditorField);
  initializeSetEditor(setID);
  // closePreviousPage();
}

export function closeSetEditor(): void {
  revokePageHistory('SetEditor');
  hideElement(setEditorField);
  // openPreviousPage();
}

function generateElementObjectElement(): GeneratedElement {
  const id = generateIdentifier();
  const element = document.createElement('div');
  element.classList.add('css_set_editor_element_object');
  element.id = id;
  element.innerHTML = `<div class="css_set_editor_element_object_thumbnail"></div><div class="css_set_editor_element_object_context"></div><div class="css_set_editor_element_object_options"><span class="css_material_symbols_rounded">more_vert</span></div>`;
  return {
    element: element,
    id: id
  };
}

function updateSetEditorField(elementObjects: Array<SetElementObject>, skeletonScreen: boolean): void {
  function updateThumbnail(element: HTMLElement, elementObject: SetElementObject): void {
    const thisThumbnailElement = elementQuerySelector(element, '.css_set_editor_element_object_thumbnail');
    switch (elementObject.type) {
      case 'text':
        thisThumbnailElement.innerHTML = getIconHTML('notes');
        break;
      case 'number':
        thisThumbnailElement.innerHTML = getIconHTML('numbers');
        break;
      case 'image':
        getImage(elementObject.image).then((result) => {
          thisThumbnailElement.innerHTML = `<img src="${result.blobURL}">`;
        });
        break;
      default:
        break;
    }
  }

  function updateContext(element: HTMLElement, elementObject: SetElementObject): void {
    const contextElement = elementQuerySelector(element, '.css_set_editor_element_object_context');
    switch (elementObject.type) {
      case 'text':
        contextElement.innerText = elementObject.text;
        break;
      case 'number':
        contextElement.innerText = elementObject.number;
        break;
      case 'image':
        contextElement.innerText = 'Image';
        break;
      default:
        break;
    }
  }

  function updateOptions(element: HTMLElement, elementObject: SetElementObject): void {
    element.setAttribute('onclick', `drawlots.sets.openSetEditorElementOptions('${elementObject.id}')`);
  }

  function updateSkeletonScreen(element: HTMLElement, skeletonScreen: boolean): void {
    element.setAttribute('skeleton-screen', skeletonScreen);
  }

  const elementObjectsQuantity = elementObjects.length;

  const currentElementSeatQuantity = elementQuerySelectorAll(setEditorElementObjectsElement, '.css_set_editor_element_object').length;
  const capacity = currentElementSeatQuantity - elementObjectsQuantity;
  if (capacity < 0) {
    for (let i = 0; i < Math.abs(capacity); i++) {
      const thisElementObjectElement = generateElementObjectElement();
      setEditorElementObjectsElement.appendChild(thisElementObjectElement.element);
    }
  } else {
    for (let i = 0; i < Math.abs(capacity); i++) {
      const elementIndex = currentElementSeatQuantity - 1 - i;
      elementQuerySelectorAll(setEditorElementObjectsElement, '.css_set_editor_element_object')[elementIndex].remove();
    }
  }

  for (let i = 0; i < elementObjectsQuantity; i++) {
    const thisElementObject = elementObjects[i];
    const thisElementObjectElement = elementQuerySelectorAll(librarySetsElement, '.css_set_editor_element_object')[i];
    if (previousElementObjects.length < elementObjectsQuantity) {
      updateThumbnail(thisElementObjectElement, thisElementObject);
      updateContext(thisElementObjectElement, thisElementObject);
      updateOptions(thisElementObjectElement, thisElementObject);
      updateSkeletonScreen(thisElementObjectElement, skeletonScreen);
    } else {
      if (!(previousElementObjects[i] === thisElementObject)) {
        updateThumbnail(thisElementObjectElement, thisElementObject);
        updateContext(thisElementObjectElement, thisElementObject);
        updateOptions(thisElementObjectElement, thisElementObject);
        updateSkeletonScreen(thisElementObjectElement, skeletonScreen);
      }
    }
  }
  previousElementObjects = elementObjects;
}

function setUpSetEditorFieldSkeletonScreen(): void {
  const defaultElementsQuantity = 10;
  let elementObjects: Array<SetElementObject> = [];
  for (let i = 0; i < defaultElementsQuantity; i++) {
    elementObjects.push({
      id: '',
      type: 'text',
      text: '',
      color: {
        r: 0,
        g: 0,
        b: 0
      }
    });
  }
  updateSetEditorField(elementObjects, true);
}

async function initializeSetEditor(setID: SetObject['id']): void {
  setUpSetEditorFieldSkeletonScreen();
  const set = await getSet(setID);
  let elementObjects = [];
  for (const elementID of set.elements) {
    const elementObject = await getElement(elementID);
    elementObjects.push(elementObject);
  }
  updateSetEditorField(elementObjects, false);
}
