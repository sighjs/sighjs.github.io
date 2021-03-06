/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

exports.__esModule = true;
exports.manipulateOptions = manipulateOptions;
exports.ObjectExpression = ObjectExpression;
// https://github.com/sebmarkbage/ecmascript-rest-spread

var _import = require("../../../types");

var t = _interopRequireWildcard(_import);

var metadata = {
  stage: 1
};

exports.metadata = metadata;

function manipulateOptions(opts) {
  if (opts.whitelist) opts.whitelist.push("es6.destructuring");
}

var hasSpread = function hasSpread(node) {
  for (var i = 0; i < node.properties.length; i++) {
    if (t.isSpreadProperty(node.properties[i])) {
      return true;
    }
  }
  return false;
};

function ObjectExpression(node, parent, scope, file) {
  if (!hasSpread(node)) return;

  var args = [];
  var props = [];

  var push = function push() {
    if (!props.length) return;
    args.push(t.objectExpression(props));
    props = [];
  };

  for (var i = 0; i < node.properties.length; i++) {
    var prop = node.properties[i];
    if (t.isSpreadProperty(prop)) {
      push();
      args.push(prop.argument);
    } else {
      props.push(prop);
    }
  }

  push();

  if (!t.isObjectExpression(args[0])) {
    args.unshift(t.objectExpression([]));
  }

  return t.callExpression(file.addHelper("extends"), args);
}