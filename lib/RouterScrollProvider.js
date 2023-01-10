"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _link = _interopRequireDefault(require("next/link"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _context = _interopRequireDefault(require("./context"));

var _scrollBehavior = _interopRequireDefault(require("./scroll-behavior"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Provider = _context.default.Provider;

const useDisableNextLinkScroll = disableNextLinkScroll => {
  const originalDefaultPropsRef = (0, _react.useRef)(_link.default.defaultProps);
  const appliedDisableScroll = (0, _react.useRef)(false);

  if (!appliedDisableScroll.current && disableNextLinkScroll) {
    _link.default.defaultProps = { ..._link.default.defaultProps,
      scroll: false
    };
  }

  (0, _react.useEffect)(() => {
    if (!disableNextLinkScroll) {
      return;
    }

    const originalDefaultProps = originalDefaultPropsRef.current;
    return () => {
      _link.default.defaultProps = originalDefaultProps;
    };
  }, [disableNextLinkScroll]);
};

const useScrollBehavior = shouldUpdateScroll => {
  // Create NextScrollBehavior instance once.
  const shouldUpdateScrollRef = (0, _react.useRef)();
  const scrollBehaviorRef = (0, _react.useRef)();
  shouldUpdateScrollRef.current = shouldUpdateScroll;

  if (!scrollBehaviorRef.current) {
    scrollBehaviorRef.current = new _scrollBehavior.default((...args) => shouldUpdateScrollRef.current(...args));
  } // Destroy NextScrollBehavior instance when unmonting.


  (0, _react.useEffect)(() => () => scrollBehaviorRef.current.stop(), []);
  return scrollBehaviorRef.current;
};

const ScrollBehaviorProvider = ({
  disableNextLinkScroll,
  shouldUpdateScroll,
  children
}) => {
  // Disable next <Link> scroll or not.
  useDisableNextLinkScroll(disableNextLinkScroll); // Get the scroll behavior, creating it just once.

  const scrollBehavior = useScrollBehavior(shouldUpdateScroll); // Create facade to use as the provider value.

  const providerValue = (0, _react.useMemo)(() => ({
    updateScroll: scrollBehavior.updateScroll.bind(scrollBehavior),
    registerElement: scrollBehavior.registerElement.bind(scrollBehavior),
    unregisterElement: scrollBehavior.unregisterElement.bind(scrollBehavior)
  }), [scrollBehavior]);
  return /*#__PURE__*/_react.default.createElement(Provider, {
    value: providerValue
  }, children);
};

ScrollBehaviorProvider.defaultProps = {
  shouldUpdateScroll: () => true,
  disableNextLinkScroll: true
};
ScrollBehaviorProvider.propTypes = {
  disableNextLinkScroll: _propTypes.default.bool,
  shouldUpdateScroll: _propTypes.default.func,
  children: _propTypes.default.node
};
var _default = ScrollBehaviorProvider;
exports.default = _default;
module.exports = exports.default;