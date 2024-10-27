import { initializeLibrary } from './interface/library/index';
import { storeImage } from './data/images/index';
import { createSet } from './data/sets/index';

import './interface/theme.css';
import './interface/index.css';

import './interface/library/field.css';
import './interface/library/body.css';
import './interface/library/sets.css';

window.drawlots = {
  initialize: function () {
    initializeLibrary();
  },
  sets: {},
  test: {
    storeImage,
    createSet
  }
};

export default window.drawlots;
