import { initializeLibrary, resizeLibraryField } from './interface/library/index';
import { storeImage } from './data/images/index';
import { addElementToSet, createSet } from './data/sets/index';
import { createElement } from './data/elements/index';
import { loadCSS } from './interface/lazy-css';
import { initializeNavigationBar } from './interface/navigation-bar/index';
import { getImageColors } from './tools/image';
import { predictTextColor } from './tools/colors';

import './interface/theme.css';
import './interface/index.css';
import './interface/icons/index.css';

import './interface/library/field.css';
import './interface/library/body.css';
import './interface/library/title.css';
import './interface/library/sets.css';

import './interface/set/field.css';
import './interface/set/body.css';

import './interface/add-element/field.css';

import './interface/add-text-element/field.css';

import './interface/add-number-element/field.css';

import './interface/add-image-element/field.css';

import './interface/navigation-bar/index.css';

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
      initializeNavigationBar();
      initializeLibrary();
    }
  },
  secondlyInitialize: function () {
    if (!drawlots_secondly_initialized) {
      drawlots_secondly_initialized = true;
      loadCSS('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap', 'noto_sans_tc');
      loadCSS('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200', 'material_symbols');
    }
  },
  sets: {},
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
    getImageColors,
    predictTextColor
  }
};

export default window.drawlots;
