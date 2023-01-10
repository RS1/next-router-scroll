"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DOMStateStorage = require("history/lib/DOMStateStorage");

/* istanbul ignore file */
const STATE_KEY_PREFIX = '@@scroll|';

class StateStorage {
  read(location, key) {
    return (0, _DOMStateStorage.readState)(this.getStateKey(location, key));
  }

  save(location, key, value) {
    (0, _DOMStateStorage.saveState)(this.getStateKey(location, key), value);
  }

  getStateKey(location, key) {
    var _location$key;

    const locationKey = (_location$key = location.key) !== null && _location$key !== void 0 ? _location$key : '_default';
    const stateKeyBase = `${STATE_KEY_PREFIX}${locationKey}`;
    return key == null ? stateKeyBase : `${stateKeyBase}|${key}`;
  }

}

exports.default = StateStorage;
module.exports = exports.default;