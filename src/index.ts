import { initializeLibrary, resizeLibraryField } from './interface/library/index';
import { storeImage } from './data/images/index';
import { addElementToSet, createSet } from './data/sets/index';
import { createElement } from './data/elements/index';

import './interface/theme.css';
import './interface/index.css';

import './interface/library/field.css';
import './interface/library/body.css';
import './interface/library/sets.css';

import './interface/set/field.css';

import './interface/add-element/field.css';

import './interface/add-text-element/field.css';

import './interface/add-number-element/field.css';

import './interface/add-image-element/field.css';

import './interface/navigation-bar/index.css';

let drawlots_initialized = false;

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
      initializeLibrary();
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
    }
  }
};

export default window.drawlots;
