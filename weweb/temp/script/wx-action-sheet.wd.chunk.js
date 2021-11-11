webpackJsonp([20],{

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// wx-action-sheet
exports.default = window.exparser.registerElement({
  is: 'wx-action-sheet',
  template: '\n    <div class="wx-action-sheet-mask" id="mask" style.z-index="1000" style="display: none;"></div>\n    <div class="wx-action-sheet" class.wx-action-sheet-show="{{!hidden}}">\n      <div class="wx-action-sheet-menu">\n        <slot></slot>\n      </div>\n    </div>\n  ',
  behaviors: ['wx-base'],
  properties: {
    hidden: {
      type: Boolean,
      value: !0,
      observer: 'hiddenChange',
      public: !0
    }
  },
  listeners: {
    'mask.tap': 'hide',
    'this.actionSheetCancel': 'cancel'
  },
  cancel: function cancel(e) {
    this.hide();
    return !1;
  },
  hide: function hide() {
    this.triggerEvent('change');
  },
  hiddenChange: function hiddenChange(hidd) {
    var mask = this.$.mask;
    if (hidd) {
      setTimeout(function () {
        mask.style.display = 'none';
      }, 300);
      mask.style.backgroundColor = 'rgba(0,0,0,0)';
    } else {
      mask.style.display = 'block';
      mask.focus();
      mask.style.backgroundColor = 'rgba(0,0,0,0.6)';
    }
  }
});

/***/ })

});