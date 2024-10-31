import { TextSetElementObject } from '../../data/elements/index';
import { drawFromSet, SetObject } from '../../data/sets/index';
import { generateIdentifier } from '../../tools/index';
import { documentQuerySelector, elementQuerySelector } from '../../tools/query-selector';
import { closePreviousPage, fadeInElement, fadeOutElement, GeneratedElement, openPreviousPage, pushPageHistory, revokePageHistory } from '../index';

const drawResultField = documentQuerySelector('.css_draw_result_field');
const drawResultBodyElement = elementQuerySelector(drawResultField, '.css_draw_result_body');

function generateTextElement(textSetElementObject: TextSetElementObject): GeneratedElement {
  const id = generateIdentifier();
  const element = document.createElement('div');
  element.classList.add('css_draw_result_text');
  element.innerText = textSetElementObject.text;
  element.id = id;
  return {
    element: element,
    id: id
  };
}

async function initializeDrawResult(setID: SetObject['id']): void {
  const result = await drawFromSet(setID);
  let element = {};
  switch (result.type) {
    case 'text':
      element = generateTextElement(result);
      break;
    case 'image':
      break;
    case 'number':
      break;
    default:
      break;
  }
  drawResultBodyElement.innerHTML = '';
  drawResultBodyElement.appendChild(element.element);
}

export function openDrawResult(setID: SetObject['id']): void {
  pushPageHistory('DrawResult');
  fadeInElement(drawResultField);
  initializeDrawResult(setID);
  // closePreviousPage();
}

export function closeDrawResult(): void {
  revokePageHistory('DrawResult');
  fadeOutElement(drawResultField);
  // openPreviousPage();
}
