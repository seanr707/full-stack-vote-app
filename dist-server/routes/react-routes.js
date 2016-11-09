'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comp = exports.reactReducer = exports.reactRoutes = undefined;

require('babel-register');

var _routes = require('../../src/routes');

var _routes2 = _interopRequireDefault(_routes);

var _reducers = require('../../src/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _components = require('../../src/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reactRoutes = exports.reactRoutes = _routes2.default;
var reactReducer = exports.reactReducer = _reducers2.default;
var Comp = exports.Comp = _components.Main;