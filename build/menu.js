define('menu', ['exports', './utils', './slides'], function (exports, _utils, _slides) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.highlightActiveMenuItem = highlightActiveMenuItem;
  exports.initMenu = initMenu;

  function highlightActiveMenuItem() {
    var listItems = (0, _utils.all)('aside ul li');
    var activateIdx = (0, _slides.activeIndex)();

    listItems.forEach(function (li, idx) {
      li.className = idx === activateIdx ? 'active' : '';
    });

    var aside = (0, _utils.one)('aside');
    aside.scrollTop = activateIdx / (listItems.length - 1) * (aside.scrollHeight - aside.clientHeight);
  }

  function initMenu() {
    var slideUl = (0, _utils.one)('aside ul');
    _slides.allSlides.forEach(function (slide) {
      var li = document.createElement('li');
      li.innerHTML = slide.replace(/-/g, ' ');
      slideUl.appendChild(li);

      li.onclick = function () {
        (0, _slides.activateSlide)(slide);
        highlightActiveMenuItem();
      };
    });

    highlightActiveMenuItem();
  }
});
//# sourceMappingURL=menu.js.map