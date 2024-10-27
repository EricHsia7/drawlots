import { initializeLibrary, resizeLibraryField } from './interface/library/index';
import { storeImage } from './data/images/index';
import { createSet } from './data/sets/index';

import './interface/theme.css';
import './interface/index.css';

import './interface/library/field.css';
import './interface/library/body.css';
import './interface/library/sets.css';

let drawlots_initialized = false;

window.drawlots = {
  initialize: function () {
    if (!drawlots_initialized) {
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
    createSet
  }
};

export default window.drawlots;
