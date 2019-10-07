'use strict';var _immutable=require("immutable");var SubSystem=_interopRequireWildcard(require("../../subsystem"));var Kernel=_interopRequireWildcard(require("../../kernel"));var propNames=_interopRequireWildcard(require("../../propNames"));var _core=require("@skele/core");var _=_interopRequireDefault(require(".."));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var app=SubSystem.create(function(){return{name:'app'};});var enhance=app.enhance;describe('Enhancers',function(){var _appState;var appState=(_appState={kind:'document'},_defineProperty(_appState,propNames.children,'children'),_defineProperty(_appState,"data",1),_defineProperty(_appState,"value",1),_defineProperty(_appState,"items",[1,2,3]),_defineProperty(_appState,"children",[{kind:'teaser',data:10,value:10},{kind:'teaser',data:20,value:20}]),_appState);enhance.register('document',function _callee(el,context){return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return regeneratorRuntime.awrap(sleep(randomMs(100)));case 2:return _context.abrupt("return",function(el){return el.update('data',function(d){return d+1;});});case 3:case"end":return _context.stop();}}},null,this);});enhance.register('document',function _callee2(el,context){return regeneratorRuntime.async(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return regeneratorRuntime.awrap(sleep(randomMs(100)));case 2:return _context2.abrupt("return",[['teaser',function(el){return el.update('data',function(d){return d+1;});}]]);case 3:case"end":return _context2.stop();}}},null,this);});enhance.register('teaser',function _callee3(el,context){return regeneratorRuntime.async(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.next=2;return regeneratorRuntime.awrap(sleep(randomMs(100)));case 2:return _context3.abrupt("return",function(el){return el.update('data',function(d){return d+1;});});case 3:case"end":return _context3.stop();}}},null,this);});enhance.register(function _callee4(context){return regeneratorRuntime.async(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:_context4.next=2;return regeneratorRuntime.awrap(sleep(randomMs(100)));case 2:return _context4.abrupt("return",[[['teaser'],function(el){return el.update('value',function(v){return v+2;});}]]);case 3:case"end":return _context4.stop();}}},null,this);});enhance.register(function _callee5(context){return regeneratorRuntime.async(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:_context5.next=2;return regeneratorRuntime.awrap(sleep(randomMs(100)));case 2:return _context5.abrupt("return",function(el){return el.update('value',function(v){return v+3;});});case 3:case"end":return _context5.stop();}}},null,this);});test('read dependent enhancers should run only for root element',function _callee6(){var kernel,enhanceHelper,readValue,enhancers,updates,result;return regeneratorRuntime.async(function _callee6$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:kernel=Kernel.create([_.default,app],appState,{});enhanceHelper=kernel.subsystems.enhance.buildEnhanceHelper();readValue=(0,_immutable.fromJS)(appState);enhancers=enhanceHelper.readDependentEnhancers(_core.data.kindOf(readValue));_context6.next=6;return regeneratorRuntime.awrap(enhanceHelper.runEnhancers(readValue,{elementZipper:kernel.elementZipper},enhancers));case 6:updates=_context6.sent;result=enhanceHelper.applyEnhancements(readValue,{elementZipper:kernel.elementZipper},updates);expect(result.get('data')).toEqualI(2);expect(result.getIn(['children',0,'data'])).toEqualI(11);expect(result.getIn(['children',1,'data'])).toEqualI(21);case 11:case"end":return _context6.stop();}}},null,this);});test('read independent enhancers should apply all registered enhancements',function _callee7(){var kernel,enhanceHelper,enhancers,updates,result;return regeneratorRuntime.async(function _callee7$(_context7){while(1){switch(_context7.prev=_context7.next){case 0:kernel=Kernel.create([_.default,app],appState,{});enhanceHelper=kernel.subsystems.enhance.buildEnhanceHelper();enhancers=enhanceHelper.readIndependentEnhancers();_context7.next=5;return regeneratorRuntime.awrap(enhanceHelper.runEnhancers(null,{elementZipper:kernel.elementZipper},enhancers));case 5:updates=_context7.sent;result=enhanceHelper.applyEnhancements((0,_immutable.fromJS)(appState),{elementZipper:kernel.elementZipper},updates);expect(result.get('value')).toEqualI(4);expect(result.getIn(['children',0,'value'])).toEqualI(12);expect(result.getIn(['children',1,'value'])).toEqualI(22);case 10:case"end":return _context7.stop();}}},null,this);});});var sleep=function sleep(ms){return new Promise(function(resolve){return setTimeout(resolve,ms);});};var randomMs=function randomMs(max){return Math.trunc(max*Math.random())+1;};