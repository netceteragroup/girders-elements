'use strict';var _immutable=_interopRequireDefault(require("immutable"));var R=_interopRequireWildcard(require("ramda"));var skeleZip=_interopRequireWildcard(require(".."));var zippa=_interopRequireWildcard(require("zippa"));var _data=require("../../data");function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var elementZipper=skeleZip.elementZipper;var app={kind:['test','app'],name:'App',children:{kind:['test','nav','tabs'],name:'Tabs',tabs:[{kind:'scene',name:'First Tab',content:[{kind:'header',name:'Header in First Tab'},{kind:'text',name:'Text One in First Tab'},{kind:'text',name:'Text Two in First Tab'},{kind:'image',name:'Image in First Tab',uri:'image-uri'}]},{kind:['scene'],name:'Second Tab',main:[{kind:['header'],name:'Header in Second Tab Main'},{kind:['text'],name:'Text One in Second Tab Main'},{kind:['text'],name:'Text Two in Second Tab Main'},{kind:['image'],name:'Image in Second Tab Main',uri:'image-uri'}],sidebar:{kind:'overlay',name:'Sidebar in Second Tab',content:[{kind:['overlay','header'],name:'Header in Second Tab Sidebar'},{kind:['overlay','text'],name:'Text One in Second Tab Sidebar'},{kind:['overlay','text'],name:'Text Two in Second Tab Sidebar'},{kind:['overlay','image'],name:'Image in Second Tab Sidebar',uri:'image-uri'}]}}]}};var tabs=_immutable.default.fromJS(app).getIn(['children']);var zipperFor=function zipperFor(_ref){var app=_ref.app,zip=_ref.zip;return elementZipper({defaultChildPositions:['children','content','tabs','main','sidebar'],makeZipperOverride:zip.makeZipper})(_immutable.default.fromJS(app));};var test_down=function test_down(zip,zipperName){var testName='zip.down';test(zipperName+": "+testName+", first .down should get to @@skele/child-collection",function(){var result=(0,_data.flow)({app:app,zip:zip},zipperFor,zip.down,zip.value);expect(result.get('kind')).toEqual('@@skele/child-collection');});test(zipperName+": "+testName+", twice .down from root should take us to tabs",function(){var result=(0,_data.flow)({app:app,zip:zip},zipperFor,zip.down,zip.down,zip.value);expect(result).toEqual(tabs);});var headerInFirstTab=_immutable.default.fromJS({kind:'header',name:'Header in First Tab'});test(zipperName+": "+testName+", twice down from firstTab should take us to the Header (remember child-collection) ",function(){var firstTab=_immutable.default.fromJS(app).getIn(['children','tabs']).first();var result=(0,_data.flow)({app:firstTab,zip:zip},zipperFor,zip.down,zip.down,zip.value);expect(result).toEqual(_immutable.default.fromJS(headerInFirstTab));});test(zipperName+": "+testName+", 6x down from root should take us to the Header (remember child-collection) ",function(){var result=(0,_data.flow)({app:app,zip:zip},zipperFor,zip.down,zip.down,zip.down,zip.down,zip.down,zip.down,zip.value);expect(result).toEqual(_immutable.default.fromJS(headerInFirstTab));});test(zipperName+": "+testName+", headerFirstTab (no children) .down should return undefined",function(){var result=(0,_data.flow)({app:headerInFirstTab,zip:zip},zipperFor,zip.down);expect(result==null).toBeTruthy();});test(zipperName+": "+testName+", .down of undefined should throw error",function(){expect(function(){zip.down(undefined);}).toThrow();});};var test_right=function test_right(zip,zipperName){var testName='zip.right';test(zipperName+": "+testName+", .right form the root should be null",function(){var result=(0,_data.flow)({app:app,zip:zip},zipperFor,zip.right);expect(result).toEqual(null);});test(zipperName+": "+testName+", .right form the first tab should be the second",function(){var firstTab=(0,_data.flow)({app:tabs,zip:zip},zipperFor,zip.down,zip.down);var secondTab={kind:['scene'],name:'Second Tab',main:[{kind:['header'],name:'Header in Second Tab Main'},{kind:['text'],name:'Text One in Second Tab Main'},{kind:['text'],name:'Text Two in Second Tab Main'},{kind:['image'],name:'Image in Second Tab Main',uri:'image-uri'}],sidebar:{kind:'overlay',name:'Sidebar in Second Tab',content:[{kind:['overlay','header'],name:'Header in Second Tab Sidebar'},{kind:['overlay','text'],name:'Text One in Second Tab Sidebar'},{kind:['overlay','text'],name:'Text Two in Second Tab Sidebar'},{kind:['overlay','image'],name:'Image in Second Tab Sidebar',uri:'image-uri'}]}};var result=(0,_data.flow)(firstTab,zip.right,zip.value);expect(result).toEqual(_immutable.default.fromJS(secondTab));});test(zipperName+": "+testName+", .right form the second tab should be null",function(){var secondTab=(0,_data.flow)({app:tabs,zip:zip},zipperFor,zip.down,zip.down,zip.right);expect(zip.right(secondTab)).toEqual(null);});};var test_up=function test_up(zip,zipperName){var testName='zip.up';test(zipperName+": "+testName+", what goes down must come up",function(){var down=(0,_data.flow)({app:app,zip:zip},zipperFor,zip.down);var up=(0,_data.flow)(down,zip.up,zip.value);expect(up).toEqual(_immutable.default.fromJS(app));});test(zipperName+": "+testName+", what goes down x3 must come up x3",function(){var down=(0,_data.flow)({app:app,zip:zip},zipperFor,zip.down,zip.down,zip.down);var up=(0,_data.flow)(down,zip.up,zip.up,zip.up,zip.value);expect(up).toEqual(_immutable.default.fromJS(app));});test(zipperName+": "+testName+", .up form the root should be null",function(){var result=(0,_data.flow)({app:app,zip:zip},zipperFor,zip.up);expect(result).toEqual(null);});};var test_edit=function test_edit(zip,zipperName){var modify=function modify(el){return el.set('name','modified');};test(zipperName+": zip.up observes and reflects the change that zip.edit does",function(){var tabsValue=_immutable.default.fromJS(app).getIn(['children']);var tabsValueModified=modify(tabsValue);var tabs=(0,_data.flow)({app:app,zip:zip},zipperFor,zip.down,zip.down);var tabsEdited=zip.edit(modify,tabs);var result=(0,_data.flow)(tabsEdited,zip.up,zip.down,zip.value);expect(result).toEqual(tabsValueModified);});test(zipperName+": zip.edit, path.changed should be true for edited zipper",function(){var headerInFirstTab=zipperFor({app:{kind:'header',name:'Header in First Tab'},zip:zip});var result=zip.edit(modify,headerInFirstTab);if(result.path.isChanged!=null){expect(result.path.isChanged).toBeTruthy();}else{expect(result.path.changed).toBeTruthy();}});};describe('zipper',function(){var zippers=[{name:'Skele Zip',zip:skeleZip},{name:'Zippa Zip',zip:zippa}];zippers.forEach(function(zipper){return R.juxt([test_down,test_right,test_up,test_edit])(zipper.zip,zipper.name);});});