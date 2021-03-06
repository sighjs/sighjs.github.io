/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

exports.__esModule = true;
exports.shouldVisit = shouldVisit;
exports.Scopable = Scopable;
exports.VariableDeclaration = VariableDeclaration;

var _import = require("../../../messages");

var messages = _interopRequireWildcard(_import);

var _import2 = require("../../../types");

var t = _interopRequireWildcard(_import2);

function shouldVisit(node) {
  return t.isVariableDeclaration(node, { kind: "const" }) || t.isImportDeclaration(node);
}

var visitor = {
  enter: function enter(node, parent, scope, state) {
    if (this.isAssignmentExpression() || this.isUpdateExpression()) {
      var ids = this.getBindingIdentifiers();

      for (var name in ids) {
        var id = ids[name];

        var constant = state.constants[name];

        // no constant exists
        if (!constant) continue;

        var constantIdentifier = constant.identifier;

        // check if the assignment id matches the constant declaration id
        // if it does then it was the id used to initially declare the
        // constant so we can just ignore it
        if (id === constantIdentifier) continue;

        // check if there's been a local binding that shadows this constant
        if (!scope.bindingIdentifierEquals(name, constantIdentifier)) continue;

        throw state.file.errorWithNode(id, messages.get("readOnly", name));
      }
    } else if (this.isScope()) {
      this.skip();
    }
  }
};

function Scopable(node, parent, scope, file) {
  this.traverse(visitor, {
    constants: scope.getAllBindingsOfKind("const", "module"),
    file: file
  });
}

function VariableDeclaration(node) {
  if (node.kind === "const") node.kind = "let";
}