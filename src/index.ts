import { initializeLibrary, initializeLibraryRipple, resizeLibraryField } from './interface/library/index';
import { storeImage } from './data/images/index';
import { addElementToSet, createSet } from './data/sets/index';
import { createElement } from './data/elements/index';
import { loadCSS } from './interface/lazy-css';
import { getImageColor } from './tools/image';
import { predictTextColor } from './tools/colors';
import { closeSetCreator, createFormulatedSet, initializeSetCreatorRipple, openSetCreator } from './interface/set-creator/index';
import { closeSet, initializeSetRipple, openSet } from './interface/set/index';

import './interface/theme.css';
import './interface/index.css';
import './interface/transition.css';
import './interface/icons/index.css';

import './interface/library/field.css';
import './interface/library/body.css';
import './interface/library/head.css';
import './interface/library/sets.css';

import './interface/set/field.css';
import './interface/set/head.css';
import './interface/set/body.css';

import './interface/set-creator/field.css';
import './interface/set-creator/head.css';
import './interface/set-creator/body.css';
import './interface/set-creator/groups.css';
import './interface/set-creator/set-name.css';

import './interface/add-element/field.css';

import './interface/add-text-element/field.css';

import './interface/add-number-element/field.css';

import './interface/add-image-element/field.css';

let drawlots_initialized = false;
let drawlots_secondly_initialized = false;

window.drawlots = {
  initialize: function () {
    if (!drawlots_initialized) {
      resizeLibraryField();
      window.addEventListener('resize', () => {
        resizeLibraryField();
      });
      if (screen) {
        if (screen.orientation) {
          screen.orientation.addEventListener('change', () => {
            resizeLibraryField();
          });
        }
      }
      // initialize
      initializeLibrary();

      // ripple
      initializeLibraryRipple();
      initializeSetRipple();
      initializeSetCreatorRipple();
    }
  },
  secondlyInitialize: function () {
    if (!drawlots_secondly_initialized) {
      drawlots_secondly_initialized = true;
      loadCSS('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap', 'noto_sans_tc');
      loadCSS('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200', 'material_symbols');
    }
  },
  sets: {
    openSet,
    closeSet,
    openSetCreator,
    closeSetCreator,
    createFormulatedSet
  },
  test: {
    storeImage,
    createSet,
    createElement,
    addElementToSet,
    testElement: function (text) {
      createSet().then((setID) => {
        createElement('text', text).then((elementID) => {
          addElementToSet(setID, elementID);
        });
      });
    },
    getImageColor,
    predictTextColor
  }
};

export default window.drawlots;
