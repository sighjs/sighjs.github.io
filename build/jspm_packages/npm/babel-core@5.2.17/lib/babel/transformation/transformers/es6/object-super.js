/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

exports.__esModule = true;
exports.ObjectExpression = ObjectExpression;

var _ReplaceSupers = require("../../helpers/replace-supers");

var _ReplaceSupers2 = _interopRequireDefault(_ReplaceSupers);

var _import = require("../../../types");

var t = _interopRequireWildcard(_import);

var shouldVisit = t.isSuper;

exports.shouldVisit = shouldVisit;
function Property(path, node, scope, getObjectRef, file) {
  if (!node.method) return;

  var value = node.value;
  var thisExpr = scope.generateUidIdentifier("this");

  var replaceSupers = new _ReplaceSupers2["default"]({
    topLevelThisReference: thisExpr,
    getObjectRef: getObjectRef,
    methodNode: node,
    methodPath: path,
    isStatic: true,
    scope: scope,
    file: file
  });

  replaceSupers.replace();

  if (replaceSupers.hasSuper) {
    value.body.body.unshift(t.variableDeclaration("var", [t.variableDeclarator(thisExpr, t.thisExpression())]));
  }
}

function ObjectExpression(node, parent, scope, file) {
  var objectRef;
  var getObjectRef = function getObjectRef() {
    return objectRef = objectRef || scope.generateUidIdentifier("obj");
  };

  var propPaths = this.get("properties");
  for (var i = 0; i < node.properties.length; i++) {
    Property(propPaths[i], node.properties[i], scope, getObjectRef, file);
  }

  if (objectRef) {
    scope.push({ id: objectRef });
    return t.assignmentExpression("=", objectRef, node);
  }
}