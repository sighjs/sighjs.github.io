/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

exports.__esModule = true;
exports.Property = Property;

var _import = require("../../../types");

var t = _interopRequireWildcard(_import);

function Property(node) {
  var key = node.key;
  if (!node.computed && t.isIdentifier(key) && !t.isValidIdentifier(key.name)) {
    // default: "bar" -> "default": "bar"
    node.key = t.literal(key.name);
  }
}