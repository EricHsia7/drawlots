import { initializeLibrary } from './interface/library/index';
import { loadCSS } from './interface/lazy-css';
import { closeSetCreator, createFormulatedSet, openSetCreator } from './interface/set-creator/index';
import { closeSet, openSet } from './interface/set/index';
import { closeDrawResult, openDrawResult } from './interface/draw-result/index';
import { createElement } from './data/elements/index';
import { addElementToSet, createSet } from './data/sets/index';
import { closeSetEditor, openSetEditor } from './interface/set-editor/index';

import './interface/theme.css';
import './interface/index.css';
import './interface/icons/index.css';

import './interface/library/field.css';
import './interface/library/body.css';
import './interface/library/head.css';
import './interface/library/sets.css';

import './interface/set/field.css';
import './interface/set/head.css';
import './interface/set/body.css';
import './interface/set/capsule.css';

import './interface/set-creator/field.css';
import './interface/set-creator/head.css';
import './interface/set-creator/body.css';
import './interface/set-creator/groups.css';
import './interface/set-creator/set-name.css';

import './interface/set-editor/field.css';
import './interface/set-editor/head.css';
import './interface/set-editor/body.css';
import './interface/set-editor/element-objects.css';

import './interface/add-element/field.css';

import './interface/add-text-element/field.css';

import './interface/add-number-element/field.css';

import './interface/add-image-element/field.css';

import './interface/draw-result/field.css';
import './interface/draw-result/head.css';
import './interface/draw-result/body.css';
import './interface/draw-result/text.css';
import './interface/draw-result/image.css';
import './interface/draw-result/number.css';

let drawlots_initialized = false;
let drawlots_secondly_initialized = false;

function initialize(): void {
  if (!drawlots_initialized) {
    window.addEventListener('resize', () => {});
    if (screen) {
      if (screen.orientation) {
        screen.orientation.addEventListener('change', () => {});
      }
    }
    initializeLibrary();
  }
}

function secondlyInitialize(): void {
  if (!drawlots_secondly_initialized) {
    drawlots_secondly_initialized = true;
    loadCSS('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap', 'noto_sans_tc');
    loadCSS('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200', 'material_symbols');
  }
}

window.drawlots = {
  initialize,
  secondlyInitialize,
  sets: {
    openSet,
    closeSet,
    openSetCreator,
    closeSetCreator,
    createFormulatedSet,
    openSetEditor,
    closeSetEditor
  },
  drawResult: {
    openDrawResult,
    closeDrawResult
  },
  test: {
    create: async function () {
      const setID = await createSet('ABC');
      const A = await createElement('text', 'A', { r: 173, g: 217, b: 244 });
      const B = await createElement('text', 'B', { r: 71, g: 108, b: 155 });
      const C = await createElement('text', 'C', { r: 152, g: 68, b: 71 });
      await addElementToSet(setID, A);
      await addElementToSet(setID, B);
      await addElementToSet(setID, C);
    }
  }
};

export default window.drawlots;
