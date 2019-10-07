'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var R=_interopRequireWildcard(require("ramda"));var _immutable=require("immutable");var _react=_interopRequireDefault(require("react"));var _invariant=_interopRequireDefault(require("invariant"));var _core=require("@skele/core");var _ElementView=_interopRequireDefault(require("./ElementView"));var _classes=require("../impl/classes");var SubSystem=_interopRequireWildcard(require("../subsystem"));var _jsxFileName="/Users/lukaskurucz/Git/skele/packages/classic/src/ui/index.js";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var Registry=_core.registry.Registry,chainRegistries=_core.registry.chainRegistries,memoize=_core.registry.memoize;var warning=_core.log.warning;var registryAttribute='@@skele/_uiRegistry';SubSystem.extend(function(){var _ui;var registry=new Registry();return{ui:(_ui={},_defineProperty(_ui,registryAttribute,registry),_defineProperty(_ui,"register",function register(kind,Component){(0,_invariant.default)(_core.data.isElementRef(kind),'You must provide a valid element reference to register');(0,_invariant.default)(Component!=null&&((0,_classes.isSubclassOf)(Component,_react.default.Component)||typeof Component==='function'),'You must provide a react component class or a pure-function component');registry.register(kind,(0,_ElementView.default)(kind,Component));}),_defineProperty(_ui,"reset",function reset(){}),_ui)};});var _default=SubSystem.create(function(system){var runtime={registry:getCombinedRegistry(system.subsystemSequence),system:system,uiFor:function uiFor(element){var reactKey=arguments.length>1&&arguments[1]!==undefined?arguments[1]:undefined;return system.subsystems.ui.uiFor(element,reactKey);}};var _forElement=forElement(runtime);var _forElements=forElements(_forElement);return{name:'ui',uiFor:function uiFor(element){var reactKey=arguments.length>1&&arguments[1]!==undefined?arguments[1]:undefined;if(_immutable.Iterable.isIndexed(element)){var ui=_forElements(element);return ui;}return _forElement(element,reactKey);}};});exports.default=_default;var forElement=function forElement(runtime){var registry=runtime.registry;var componentFor=memoize(function(kind){var C=registry.get(kind);if(C!=null)return C(runtime);warning("Couldn't find the following kind(s) within the registry: ["+_core.data.canonical(kind)+"]");return null;});return function(element){var reactKey=arguments.length>1&&arguments[1]!==undefined?arguments[1]:undefined;if(element==null){return null;}(0,_invariant.default)(_core.data.isElement(element),'You provided something other than an element for ui lookup');(0,_invariant.default)(element._keyPath!=null,'The current implementation requires a Cursor to be passed in. This may be removed in the future');var kind=_core.data.kindOf(element);var Component=componentFor(kind);if(Component){return _react.default.createElement(Component,{element:element,key:reactKey,__source:{fileName:_jsxFileName,lineNumber:112}});}};};var forElements=R.curry(function(elementBuilder,elementSeq){return elementSeq.map(elementBuilder).filter(function(ui){return!!ui;});});var getRegistry=R.path(['ui',registryAttribute]);var getCombinedRegistry=R.pipe(R.map(getRegistry),R.reject(R.isNil),chainRegistries);