/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

exports.__esModule = true;
exports.Property = Property;

var _import = require("../../../types");

var t = _interopRequireWildcard(_import);

var metadata = {
  optional: true
};

exports.metadata = metadata;

function Property(node) {
  var key = node.key;
  if (t.isLiteral(key) && t.isValidIdentifier(key.value)) {
    // "foo": "bar" -> foo: "bar"
    node.key = t.identifier(key.value);
    node.computed = false;
  }
}