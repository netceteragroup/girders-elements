'use strict';

import * as _ui from './ui';
import read from './read';
import * as _transform from './transform';
import * as data from './data';
import * as zip from './zip';

import update from './update';
import Engine from './engine/engine';


const ui = {
  register: _ui.register,
  reset: _ui.reset,
  forElement: _ui.forElement,
  forElements: _ui.forElements
};

const transform = {
  register: _transform.register,
  reset: _transform.reset,
  get: _transform.get,
  apply: _transform.apply
}

export {
  ui,
  read,
  update,
  transform,
  data,
  Engine,
  zip
}

export default {
  ui,
  read,
  update,
  transform,
  data,
  Engine,
  zip
}
