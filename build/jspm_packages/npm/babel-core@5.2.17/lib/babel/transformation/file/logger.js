/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

exports.__esModule = true;

var _import = require("../../util");

var util = _interopRequireWildcard(_import);

var Logger = (function () {
  function Logger(file, filename) {
    _classCallCheck(this, Logger);

    this.filename = filename;
    this.file = file;
  }

  Logger.prototype._buildMessage = function _buildMessage(msg) {
    var parts = "[BABEL] " + this.filename;
    if (msg) parts += ": " + msg;
    return parts;
  };

  Logger.prototype.error = function error(msg) {
    var Constructor = arguments[1] === undefined ? Error : arguments[1];

    throw new Constructor(this._buildMessage(msg));
  };

  Logger.prototype.deprecate = function deprecate(msg) {
    if (!this.file.opts.suppressDeprecationMessages) {
      console.error(this._buildMessage(msg));
    }
  };

  Logger.prototype.debug = function debug(msg) {
    util.debug(this._buildMessage(msg));
  };

  Logger.prototype.deopt = function deopt(node, msg) {
    util.debug(this._buildMessage(msg));
  };

  return Logger;
})();

exports["default"] = Logger;
module.exports = exports["default"];