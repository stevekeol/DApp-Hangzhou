"use strict";
(self["webpackChunkDaEngine"] = self["webpackChunkDaEngine"] || []).push([[399],{

/***/ 4836:
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-radio-group
exports["default"] = window.exparser.registerElement({
  is: 'wx-radio-group',
  template: '\n    <slot></slot>\n  ',
  behaviors: ['wx-base', 'wx-data-Component', 'wx-group'],
  properties: {
    value: {
      type: String
    }
  },
  created: function created() {
    this._selectedItem = null;
  },
  addItem: function addItem(e) {
    e.checked && (this._selectedItem && (this._selectedItem.checked = !1), this.value = e.value, this._selectedItem = e);
  },
  removeItem: function removeItem(e) {
    this._selectedItem === e && (this.value = '', this._selectedItem = null);
  },
  renameItem: function renameItem(e, t) {
    this._selectedItem === e && (this.value = t);
  },
  changed: function changed(e) {
    this._selectedItem === e ? this.removeItem(e) : this.addItem(e);
  }
});
module.exports = exports['default'];

/***/ })

}]);