/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

exports.__esModule = true;
exports.manipulateOptions = manipulateOptions;

var _remapAsyncToGenerator = require("../../helpers/remap-async-to-generator");

var _remapAsyncToGenerator2 = _interopRequireDefault(_remapAsyncToGenerator);

var _import = require("../../../types");

var t = _interopRequireWildcard(_import);

function manipulateOptions(opts) {
  opts.optional.push("es7.asyncFunctions");
  opts.blacklist.push("regenerator");
}

var metadata = {
  optional: true
};

exports.metadata = metadata;
exports.Function = function (node, parent, scope, file) {
  if (!node.async || node.generator) return;

  return _remapAsyncToGenerator2["default"](node, t.memberExpression(file.addImport("bluebird", null, "absolute"), t.identifier("coroutine")), scope);
};