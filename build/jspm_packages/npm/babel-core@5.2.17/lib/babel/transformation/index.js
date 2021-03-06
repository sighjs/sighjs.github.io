/* */ 
"format cjs";
"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } };

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

exports.__esModule = true;

var _Pipeline = require("./transformer-pipeline");

var _Pipeline2 = _interopRequireDefault(_Pipeline);

//

var _transformers = require("./transformers");

var _transformers2 = _interopRequireDefault(_transformers);

//

var _deprecated = require("./transformers/deprecated");

var _deprecated2 = _interopRequireDefault(_deprecated);

//

var _aliases = require("./transformers/aliases");

var _aliases2 = _interopRequireDefault(_aliases);

//

var _import = require("./transformers/filters");

var filters = _interopRequireWildcard(_import);

var pipeline = new _Pipeline2["default"]();
pipeline.addTransformers(_transformers2["default"]);
pipeline.addDeprecated(_deprecated2["default"]);
pipeline.addAliases(_aliases2["default"]);
pipeline.addFilter(filters.internal);
pipeline.addFilter(filters.blacklist);
pipeline.addFilter(filters.whitelist);
pipeline.addFilter(filters.stage);
pipeline.addFilter(filters.optional);

//

var transform = pipeline.transform.bind(pipeline);
transform.fromAst = pipeline.transformFromAst.bind(pipeline);
transform.pipeline = pipeline;
exports["default"] = transform;
module.exports = exports["default"];