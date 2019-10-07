'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.childrenAt=exports.children=void 0;var R=_interopRequireWildcard(require("ramda"));var _immutable=_interopRequireDefault(require("immutable"));var zip=_interopRequireWildcard(require("../impl"));var _select=require("../select");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}var children=function children(loc){return childrenAt(null,loc);};exports.children=children;var childrenAt=R.curry(function(key,loc){return _immutable.default.Seq(_childrenAt(key,loc));});exports.childrenAt=childrenAt;var _childrenAt=regeneratorRuntime.mark(function _childrenAt(key,loc){var childLoc,child,currentChild,_child,_currentChild;return regeneratorRuntime.wrap(function _childrenAt$(_context){while(1){switch(_context.prev=_context.next){case 0:childLoc=zip.down(loc);if(!(childLoc!=null)){_context.next=35;break;}child=zip.node(childLoc);if(!(R.isNil(key)||(0,_select.isStringArray)(key)&&R.contains(child.get('propertyName'),key)||R.is(String)(key)&&child.get('propertyName')===key)){_context.next=17;break;}if(!child.get('isSingle')){_context.next=9;break;}_context.next=7;return zip.down(childLoc);case 7:_context.next=17;break;case 9:currentChild=zip.down(childLoc);_context.next=12;return currentChild;case 12:if(!((currentChild=zip.right(currentChild))!=null)){_context.next=17;break;}_context.next=15;return currentChild;case 15:_context.next=12;break;case 17:if(!((childLoc=zip.right(childLoc))!=null)){_context.next=35;break;}_child=zip.node(childLoc);if(!(R.isNil(key)||(0,_select.isStringArray)(key)&&R.contains(_child.get('propertyName'),key)||R.is(String)(key)&&_child.get('propertyName')===key)){_context.next=33;break;}if(!_child.get('isSingle')){_context.next=25;break;}_context.next=23;return zip.down(childLoc);case 23:_context.next=33;break;case 25:_currentChild=zip.down(childLoc);_context.next=28;return _currentChild;case 28:if(!((_currentChild=zip.right(_currentChild))!=null)){_context.next=33;break;}_context.next=31;return _currentChild;case 31:_context.next=28;break;case 33:_context.next=17;break;case 35:case"end":return _context.stop();}}},_childrenAt,this);});