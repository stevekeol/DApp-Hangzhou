webpackJsonp([22],{

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = window.exparser.registerElement({
  is: 'wx-action-sheet-cancel',
  template: '\n    <div class="wx-action-sheet-middle" id="middle"></div>\n    <div class="wx-action-sheet-cancel" id="cancel">\n      <slot></slot>\n    </div>\n  ',
  properties: {},
  listeners: {
    'middle.tap': 'handleMiddleTap',
    'cancel.tap': 'handleCancelTap'
  },
  behaviors: ['wx-base'],
  handleMiddleTap: function handleMiddleTap(e) {
    return !1;
  },
  handleCancelTap: function handleCancelTap(e) {
    this.triggerEvent('actionSheetCancel', void 0, {
      bubbles: !0
    });
  }
});

/***/ })

});