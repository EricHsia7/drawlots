import { TextSetElementObject } from '../../data/elements/index';
import { drawFromSet, SetObject } from '../../data/sets/index';
import { getColorPack } from '../../tools/colors';
import { addRippleTo, generateIdentifier } from '../../tools/index';
import { documentQuerySelector, elementQuerySelector } from '../../tools/query-selector';
import { fadeInElement, fadeOutElement, GeneratedElement, pushPageHistory, revokePageHistory } from '../index';

const drawResultField = documentQuerySelector('.css_draw_result_field');
const drawResultBodyElement = elementQuerySelector(drawResultField, '.css_draw_result_body');
const drawResultHeadElement = elementQuerySelector(drawResultField, '.css_draw_result_head');
const drawResultLeftButtonElement = elementQuerySelector(drawResultHeadElement, '.css_draw_result_button_left');

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
  const colorPack = getColorPack(result.color);
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
  drawResultField.style.setProperty('--d-draw-result-background', colorPack.background);
  drawResultField.style.setProperty('--d-draw-result-text', colorPack.text);
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

export function initializeDrawResultRipple(): void {
  addRippleTo(drawResultLeftButtonElement);
}
