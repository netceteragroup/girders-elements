'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _react=_interopRequireDefault(require("react"));var _propTypes=_interopRequireDefault(require("prop-types"));var _jsxFileName="/Users/lukaskurucz/Git/skele/packages/classic/src/core/elements/pure/metaError.js";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function MetaError(_ref){var url=_ref.url,status=_ref.status,message=_ref.message;return _react.default.createElement("div",{__source:{fileName:_jsxFileName,lineNumber:8}},_react.default.createElement("p",{__source:{fileName:_jsxFileName,lineNumber:9}},"Read Error"),_react.default.createElement("p",{__source:{fileName:_jsxFileName,lineNumber:10}},url),_react.default.createElement("p",{__source:{fileName:_jsxFileName,lineNumber:11}},status),_react.default.createElement("p",{__source:{fileName:_jsxFileName,lineNumber:12}},message));}MetaError.propTypes={url:_propTypes.default.string.isRequired,status:_propTypes.default.number.isRequired,message:_propTypes.default.string.isRequired};var _default=MetaError;exports.default=_default;