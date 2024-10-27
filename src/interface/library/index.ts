import { documentQuerySelector } from '../../tools/query-selector';
import { SetObject } from '../../data/sets/index';
import { generateIdentifier } from '../../tools/index';

const libraryField = documentQuerySelector('.css_library_field');

function generateSetElement(setObject: SetObject): GeneratedElement {
  const id = generateIdentifier('s');
  const element = document.createElement('div');
  element.classList.add('css_library_set');
  element.id = id;
  element.innerHTML = `<div class="css_library_set_thumbnail">${setObject.thumbnail}</div><div class="css_library_set_name">${setObject.name}</div>`;
  element.setAttribute('onclick', `drawlots.sets.openSet('${setObject.id}')`);
  return {
    id: id,
    element: element
  };
}

function updateLibrary(data: Array<SetObject>): void {
  
}
