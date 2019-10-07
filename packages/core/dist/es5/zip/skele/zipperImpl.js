'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _zip=require("../../zip");var _immutable=require("immutable");var _data=require("../../data");var isBranch=function isBranch(element){if((0,_data.isOfKind)('@@skele/child-collection',element)){return true;}var positions=(0,_data.childPositions)(element);return positions!=null&&!positions.isEmpty();};var getChildren=function getChildren(element){if((0,_data.isOfKind)('@@skele/child-collection',element)){return element.get('children').toArray();}var positions=(0,_data.childPositions)(element);var children=positions.reduce(function(children,p){return element.get(p)?children.push(makeChildCollection(p,element.get(p))):children;},(0,_immutable.List)()).toArray();return children;};var makeChildCollection=function makeChildCollection(p,children){return(0,_immutable.Map)({kind:'@@skele/child-collection',propertyName:p,isSingle:!_immutable.Iterable.isIndexed(children),children:(0,_data.asList)(children)});};var makeNode=function makeNode(element,children){if((0,_data.isOfKind)('@@skele/child-collection',element)){return element.set('children',(0,_immutable.List)(children));}return children.reduce(function(el,childColl){return el.set(childColl.get('propertyName'),singleChild(childColl)?childColl.getIn(['children',0]):childColl.get('children'));},element);};var singleChild=function singleChild(childColl){return childColl.get('isSingle')&&childColl.get('children').count()===1;};var _default=_zip.zipper.bind(undefined,isBranch,getChildren,makeNode);exports.default=_default;