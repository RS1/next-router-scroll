import _wrap from "lodash/wrap";
import Router from 'next/router';
const symbol = Symbol('@moxy/next-router-scroll');

const createKey = () => Math.random().toString(36).substr(2, 8);

export const setupHistory = () => {
  if (history[symbol]) {
    return;
  }

  history.pushState = _wrap(history.pushState, (pushState, state, title, url) => {
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
  history.replaceState = _wrap(history.replaceState, (replaceState, state, title, url) => {
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
export const setupRouter = () => {
  if (Router[symbol]) {
    return;
  }

  Router.beforePopState = _wrap(Router.beforePopState, (beforePopState, fn) => {
    fn = _wrap(fn, (fn, state) => {
      location.key = state.locationKey;
      return fn(state);
    });
    return beforePopState.call(Router, fn);
  });
  Router.beforePopState(() => true);
  Object.defineProperty(Router, symbol, {
    value: true
  });
};