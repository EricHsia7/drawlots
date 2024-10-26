import { storeImage } from './data/images/index';

import './interface/theme.css';
import './interface/index.css';

import './interface/library/field.css';

window.drawlots = {
  initialize: function () {
    console.log('test')
  },
  sets: {},
  test: {
    storeImage
  }
};

export default window.drawlots;
