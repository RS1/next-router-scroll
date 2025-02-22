"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _useRouterScroll = _interopRequireDefault(require("./use-router-scroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const withRouterScroll = WrappedComponent => {
  const WithRouterScroll = (0, _react.forwardRef)((props, ref) => {
    const routerScroll = (0, _useRouterScroll.default)();
    return /*#__PURE__*/_react.default.createElement(WrappedComponent, Object.assign({
      ref: ref
    }, props, {
      routerScroll: routerScroll
    }));
  });
  WithRouterScroll.displayName = `withRouterScroll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  (0, _hoistNonReactStatics.default)(WithRouterScroll, WrappedComponent);
  return WithRouterScroll;
};

var _default = withRouterScroll;
exports.default = _default;
module.exports = exports.default;