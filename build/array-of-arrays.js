define("array-of-arrays", ["exports", "module"], function (exports, module) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var _default = (function () {
    var _class = function _default() {
      _classCallCheck(this, _class);

      this.array = [];
    };

    _createClass(_class, [{
      key: "add",
      value: function add(key, item) {
        var existing = this.array[key];
        if (existing) existing.push(item);else this.array[key] = [item];
      }
    }, {
      key: "get",
      value: function get(key) {
        return this.array[key];
      }
    }, {
      key: "length",
      get: function () {
        return this.array.length;
      }
    }]);

    return _class;
  })();

  module.exports = _default;
});
//# sourceMappingURL=array-of-arrays.js.map