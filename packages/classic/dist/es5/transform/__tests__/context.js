'use strict';var _immutable=require("immutable");var Subsystem=_interopRequireWildcard(require("../../subsystem"));var Kernel=_interopRequireWildcard(require("../../kernel"));var _=_interopRequireDefault(require(".."));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}var app=Subsystem.create(function(){return{name:'app'};});describe('Context passed to transformers',function(){var data={kind:'root',value:'test'};var transf=jest.fn();transf.mockImplementation(function(e){return e;});app.transform.register('root',transf);var kernel=Kernel.create([_.default,app],data,{});test('the context object passed to the transformer is available to transformer fns',function(){var transformer=kernel.subsystems.transform.buildTransformer();var context={uri:'urn:example'};transformer((0,_immutable.fromJS)(data),context);expect(transf).toHaveBeenCalled();expect(transf.mock.calls[0][1]).toEqual(context);});});