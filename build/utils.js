define("utils", ["exports"], function (exports) {
  // polyfills
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
  NodeList.prototype.map = [].map;
  NodeList.prototype.forEach = [].forEach;

  // utils
  var all = function all(node, sel) {
    return sel ? node.querySelectorAll(sel) : document.querySelectorAll(node);
  };
  exports.all = all;
  var one = function one(node, sel) {
    return sel ? node.querySelector(sel) : document.querySelector(node);
  };
  exports.one = one;
});
//# sourceMappingURL=utils.js.map