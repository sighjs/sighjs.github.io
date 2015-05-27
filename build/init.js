define('init', ['exports', 'highlightjs', 'marked', 'lodash', './utils', './menu', './slides'], function (exports, _highlightjs, _marked, _lodash, _utils, _menu, _slides) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

  var _highlightjs2 = _interopRequireDefault(_highlightjs);

  var _marked2 = _interopRequireDefault(_marked);

  var _2 = _interopRequireDefault(_lodash);

  // livereload
  var js = document.createElement('script');
  js.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1';
  document.body.appendChild(js);

  function translateMarkdown() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _utils.all)('[data-markdown]')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var node = _step.value;
        var markdown = node.innerHTML;

        markdown = markdown.replace(/^\n+/, '');
        if (/^ +/.test(markdown)) {
          var nonWsMatch = /[^ ]/.exec(markdown);
          var repl = new RegExp('^ {' + nonWsMatch.index + '}');

          if (nonWsMatch) markdown = markdown.split('\n').map(function (line) {
            return line.replace(repl, '');
          }).join('\n');
        }

        node.innerHTML = (0, _marked2['default'])(markdown);
        node.removeAttribute('data-markdown');
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
  }

  function initEffects() {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _utils.all)('[data-marquee]')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var node = _step2.value;
        var marquee = node.dataset.marquee;

        var _ref = marquee ? marquee.split(':') : [];

        var _ref2 = _slicedToArray(_ref, 3);

        var _ref2$0 = _ref2[0];
        var first = _ref2$0 === undefined ? '-100px' : _ref2$0;
        var _ref2$1 = _ref2[1];
        var second = _ref2$1 === undefined ? '100px' : _ref2$1;
        var _ref2$2 = _ref2[2];
        var duration = _ref2$2 === undefined ? 1000 : _ref2$2;

        if (node.animate) node.animate([{ left: first }, { left: second }], { duration: duration, direction: 'alternate', iterations: 9999999 });
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = (0, _utils.all)('[data-blink]')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var node = _step3.value;

        if (node.animate) node.animate([{ opacity: '0' }, { opacity: '1' }], {
          duration: node.dataset.blink || 400,
          direction: 'alternate',
          iterations: 9999999,
          easing: 'step-middle'
        });
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  function showWarningToUnsupportedBrowser() {
    var div = document.createElement('div');
    if (!div.animate) (0, _utils.one)('.intro .warning').style.display = 'block';
  }

  function runImports() {
    var links = (0, _utils.all)('link[rel="import"]');
    links.forEach(function (link) {
      if (!link['import']) {
        // TODO: load using ajax for browsers that don't support html5 imports
        return;
      }

      var nodes = (0, _utils.all)(link['import'], 'body >*');
      nodes.forEach(function (node) {
        link.parentNode.insertBefore(node, link);
      });
    });
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();else if (document.documentElement.msRequestFullscreen) document.documentElement.msRequestFullscreen();else if (document.documentElement.mozRequestFullScreen) document.documentElement.mozRequestFullScreen();else if (document.documentElement.webkitRequestFullscreen) document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();else if (document.msExitFullscreen) document.msExitFullscreen();else if (document.mozCancelFullScreen) document.mozCancelFullScreen();else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
  }

  function init() {
    _marked2['default'].setOptions({
      highlight: function highlight(code) {
        // to avoid double escaping
        code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        return _highlightjs2['default'].highlight('javascript', code).value;
      }
    });

    showWarningToUnsupportedBrowser();
    runImports();
    translateMarkdown();
    initEffects();
    (0, _slides.init)();
    (0, _menu.initMenu)();

    window.addEventListener('keydown', function (event) {
      if (event.keyCode === 39) (0, _slides.changeSlide)(1);else if (event.keyCode === 37) (0, _slides.changeSlide)(-1);else if (event.keyCode === 70) toggleFullScreen();

      (0, _menu.highlightActiveMenuItem)();
    });

    (0, _utils.one)('body').className = '';
  }

  if (document.readyState == 'complete' || document.readyState == 'loaded') init();else document.addEventListener('DOMContentLoaded', init);
});
//# sourceMappingURL=init.js.map