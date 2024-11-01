import { ImageSetElementObject, TextSetElementObject } from '../../data/elements/index';
import { getImage } from '../../data/images/index';
import { drawFromSet, SetObject } from '../../data/sets/index';
import { getColorPack } from '../../tools/colors';
import { addRippleTo, generateIdentifier } from '../../tools/index';
import { documentQuerySelector, elementQuerySelector } from '../../tools/query-selector';
import { displayElement, hideElement, FieldSize, GeneratedElement, pushPageHistory, revokePageHistory } from '../index';

const drawResultField = documentQuerySelector('.css_draw_result_field');
const drawResultBodyElement = elementQuerySelector(drawResultField, '.css_draw_result_body');
const drawResultHeadElement = elementQuerySelector(drawResultField, '.css_draw_result_head');
const drawResultLeftButtonElement = elementQuerySelector(drawResultHeadElement, '.css_draw_result_button_left');

function queryDrawResultFieldSize(): FieldSize {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

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

async function generateImageElement(imageSetElementObject: ImageSetElementObject): Promise<GeneratedElement> {
  const imageHash = imageSetElementObject.image;
  const imageObject = await getImage(imageHash);
  const size = queryDrawResultFieldSize();
  const padding = 15;
  const boxWidth = size.width - padding * 2;
  const boxHeight = size.height - 55 - padding * 2;
  const imageWidth = imageObject.width;
  const imageHeight = imageObject.height;
  let width = 0;
  let height = 0;
  if (boxHeight >= boxWidth) {
    if (imageWidth >= imageHeight) {
      width = boxWidth;
      height = width * (imageHeight / imageWidth);
    } else {
      height = boxWidth;
      width = height * (imageWidth / imageHeight);
    }
  } else {
    if (imageWidth <= imageHeight) {
      height = boxHeight;
      width = height * (imageWidth / imageHeight);
    } else {
      width = boxWidth;
      height = (width * imageHeight) / imageWidth;
    }
  }
  const id = generateIdentifier();
  const element = document.createElement('div');
  element.classList.add('css_draw_result_image');
  element.id = id;
  element.innerHTML = `<img src="${imageObject.blobURL}" width="${width}px" height="${height}px">`;
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
      element = await generateImageElement(result);
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
  displayElement(drawResultField);
  initializeDrawResult(setID);
  // closePreviousPage();
}

export function closeDrawResult(): void {
  revokePageHistory('DrawResult');
  hideElement(drawResultField);
  // openPreviousPage();
}

export function initializeDrawResultRipple(): void {
  addRippleTo(drawResultLeftButtonElement, 'var(--d-draw-result-text)');
}
