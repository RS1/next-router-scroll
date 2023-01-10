"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupRouter = exports.setupHistory = void 0;

var _wrap2 = _interopRequireDefault(require("lodash/wrap"));

var _router = _interopRequireDefault(require("next/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const symbol = Symbol('@moxy/next-router-scroll');

const createKey = () => Math.random().toString(36).substr(2, 8);

const setupHistory = () => {
  if (history[symbol]) {
    return;
  }

  history.pushState = (0, _wrap2.default)(history.pushState, (pushState, state, title, url) => {
    /* istanbul ignore else*/
    if (state) {
      var _history$state;

      if (((_history$state = history.state) === null || _history$state === void 0 ? void 0 : _history$state.as) !== url) {
        state.locationKey = createKey();
        location.key = state.locationKey;
      } else {
        state.locationKey = location.key;
      }
    }

    pushState.call(history, state, title, url);
  });
  history.replaceState = (0, _wrap2.default)(history.replaceState, (replaceState, state, title, url) => {
    /* istanbul ignore else*/
    if (state) {
      var _history$state2;

      if (((_history$state2 = history.state) === null || _history$state2 === void 0 ? void 0 : _history$state2.as) !== url) {
        state.locationKey = createKey();
        location.key = state.locationKey;
      } else {
        state.locationKey = location.key;
      }
    }

    replaceState.call(history, state, title, url);
  });
  Object.defineProperty(history, symbol, {
    value: true
  });
};

exports.setupHistory = setupHistory;

const setupRouter = () => {
  if (_router.default[symbol]) {
    return;
  }

  _router.default.beforePopState = (0, _wrap2.default)(_router.default.beforePopState, (beforePopState, fn) => {
    fn = (0, _wrap2.default)(fn, (fn, state) => {
      location.key = state.locationKey;
      return fn(state);
    });
    return beforePopState.call(_router.default, fn);
  });

  _router.default.beforePopState(() => true);

  Object.defineProperty(_router.default, symbol, {
    value: true
  });
};

exports.setupRouter = setupRouter;