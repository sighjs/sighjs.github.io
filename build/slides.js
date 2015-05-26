define('slides', ['exports', './utils', './array-of-arrays'], function (exports, _utils, _arrayOfArrays) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.activateSlide = activateSlide;
  exports.changeSlide = changeSlide;
  exports.activeIndex = activeIndex;
  exports.init = init;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _ArrayOfArrays = _interopRequireDefault(_arrayOfArrays);

  // the class names of all slides in order
  var allSlides = [];
  exports.allSlides = allSlides;
  // name of active slide
  var activeSlide;

  // activations within slide
  var sequences;
  var sequenceIdx;

  function activateSlide(name) {
    if (activeSlide) (0, _utils.one)('.' + activeSlide).style.display = 'none';

    activeSlide = name;
    window.localStorage.setItem('active', name);
    var slide = (0, _utils.one)('.' + name);
    slide.style.display = '';

    sequenceIdx = 0;
    sequences = new _ArrayOfArrays['default']();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _utils.all)(slide, '[data-seq]')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var seqNode = _step.value;

        var seqs = parseSequence(seqNode);
        seqNode.style.display = 'none';

        seqs.forEach(function (seq) {
          sequences.add(seq.idx, { type: seq.type, node: seqNode });
        });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    activateSequence(true);
  }

  function parseSequence(node) {
    var seqs = [];
    var seqDescs = node.dataset.seq.split('-');

    // format: "number"
    if (seqDescs.length === 1) {
      seqs.push({ idx: seqDescs[0] || 0, type: 'once' });
    } else {
      seqs.push({ idx: seqDescs[0] || 0, type: 'on' });

      // if not format "number-"
      if (seqDescs[1] !== undefined) seqs.push({ idx: seqDescs[1], type: 'off' });
    }

    return seqs;
  }

  // activates sequences at sequenceIdx
  function activateSequence(activate) {
    if (activate && sequenceIdx > 0) {
      // deactivate 'once' items from previous index
      var prevSeqs = sequences.get(sequenceIdx - 1);
      if (prevSeqs) {
        prevSeqs.forEach(function (_ref) {
          var type = _ref.type;
          var node = _ref.node;

          if (type === 'once') node.style.display = 'none';
        });
      }
    }

    var seqs = sequences.get(sequenceIdx);
    if (seqs) seqs.forEach(function (_ref2) {
      var type = _ref2.type;
      var node = _ref2.node;

      if (!activate && type === 'off' || activate && (type === 'on' || type === 'once')) node.style.display = '';else node.style.display = 'none';
    });
  }

  /**
   * Go forwards or backwards a slide.
   * @param {Number} offset Must be -1 or 1
   */

  function changeSlide(offset) {
    var nextSequence = sequenceIdx + offset;
    if (offset > 0 && nextSequence < sequences.length) {
      ++sequenceIdx;
      activateSequence(true);
    } else if (offset < 0 && nextSequence >= 0) {
      activateSequence(false);
      --sequenceIdx;
    } else {
      var activeIdx = allSlides.indexOf(activeSlide);
      activeIdx += offset;
      if (activeIdx >= 0 && activeIdx < allSlides.length) activateSlide(allSlides[activeIdx]);
    }
  }

  function activeIndex() {
    return allSlides.indexOf(activeSlide);
  }

  function init() {
    var parentSelector = arguments[0] === undefined ? 'body' : arguments[0];

    var sections = (0, _utils.all)('' + parentSelector + '>section');
    exports.allSlides = allSlides = sections.map(function (node) {
      return node.className.split(' ')[0];
    });

    sections.forEach(function (section) {
      section.style.display = 'none';
    });
    activateSlide(window.localStorage.getItem('active') || 'intro');
  }
});
//# sourceMappingURL=slides.js.map