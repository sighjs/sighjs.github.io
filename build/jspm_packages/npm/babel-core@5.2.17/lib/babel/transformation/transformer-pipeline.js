/* */ 
"format cjs";
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

exports.__esModule = true;

var _Transformer = require("./transformer");

var _Transformer2 = _interopRequireDefault(_Transformer);

var _normalizeAst = require("../helpers/normalize-ast");

var _normalizeAst2 = _interopRequireDefault(_normalizeAst);

var _assign = require("lodash/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _object = require("../helpers/object");

var _object2 = _interopRequireDefault(_object);

var _File = require("./file");

var _File2 = _interopRequireDefault(_File);

var TransformerPipeline = (function () {
  function TransformerPipeline() {
    _classCallCheck(this, TransformerPipeline);

    this.transformers = _object2["default"]();
    this.namespaces = _object2["default"]();
    this.deprecated = _object2["default"]();
    this.aliases = _object2["default"]();
    this.filters = [];
  }

  TransformerPipeline.prototype.addTransformers = function addTransformers(transformers) {
    for (var key in transformers) {
      this.addTransformer(key, transformers[key]);
    }
    return this;
  };

  TransformerPipeline.prototype.addTransformer = function addTransformer(key, transformer) {
    if (this.transformers[key]) throw new Error(); // todo: error

    var namespace = key.split(".")[0];
    this.namespaces[namespace] = this.namespaces[namespace] || [];
    this.namespaces[namespace].push(key);
    this.namespaces[key] = namespace;

    this.transformers[key] = new _Transformer2["default"](key, transformer);
  };

  TransformerPipeline.prototype.addAliases = function addAliases(names) {
    _assign2["default"](this.aliases, names);
    return this;
  };

  TransformerPipeline.prototype.addDeprecated = function addDeprecated(names) {
    _assign2["default"](this.deprecated, names);
    return this;
  };

  TransformerPipeline.prototype.addFilter = function addFilter(filter) {
    this.filters.push(filter);
    return this;
  };

  TransformerPipeline.prototype.canTransform = function canTransform(transformer, fileOpts) {
    if (transformer.metadata.plugin) return true;

    var _arr = this.filters;
    for (var _i = 0; _i < _arr.length; _i++) {
      var filter = _arr[_i];
      var result = filter(transformer, fileOpts);
      if (result != null) return result;
    }

    return true;
  };

  TransformerPipeline.prototype.transform = function transform(code, opts) {
    var file = new _File2["default"](opts, this);
    return file.wrap(code, function () {
      file.addCode(code, true);
    });
  };

  TransformerPipeline.prototype.transformFromAst = function transformFromAst(ast, code, opts) {
    ast = _normalizeAst2["default"](ast);

    var file = new _File2["default"](opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.addAst(ast);
    });
  };

  TransformerPipeline.prototype._ensureTransformerNames = function _ensureTransformerNames(type, rawKeys) {
    var keys = [];

    for (var i = 0; i < rawKeys.length; i++) {
      var key = rawKeys[i];

      var deprecatedKey = this.deprecated[key];
      var aliasKey = this.aliases[key];
      if (aliasKey) {
        keys.push(aliasKey);
      } else if (deprecatedKey) {
        // deprecated key, remap it to the new one
        console.error("[BABEL] The transformer " + key + " has been renamed to " + deprecatedKey);
        rawKeys.push(deprecatedKey);
      } else if (this.transformers[key]) {
        // valid key
        keys.push(key);
      } else if (this.namespaces[key]) {
        // namespace, append all transformers within this namespace
        keys = keys.concat(this.namespaces[key]);
      } else {
        // invalid key
        throw new ReferenceError("Unknown transformer " + key + " specified in " + type);
      }
    }

    return keys;
  };

  return TransformerPipeline;
})();

exports["default"] = TransformerPipeline;
module.exports = exports["default"];