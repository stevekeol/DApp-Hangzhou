webpackJsonp([3],{

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// wx-switch
exports.default = window.exparser.registerElement({
  is: 'wx-switch',
  template: '\n    <div class="wx-switch-wrapper">\n      <div hidden$="{{!isSwitch(type)}}" id="switchInput" type="checkbox" class="wx-switch-input" class.wx-switch-input-checked="{{checked}}" class.wx-switch-input-disabled="{{disabled}}" style.background-color="{{color}}" style.border-color="{{_getSwitchBorderColor(checked,color)}}"></div>\n      <div hidden$="{{!isCheckbox(type)}}" id="checkboxInput" type="checkbox" class="wx-checkbox-input" class.wx-checkbox-input-checked="{{checked}}" class.wx-checkbox-input-disabled="{{disabled}}" style.color="{{color}}"></div>\n    </div>\n  ',
  properties: {
    checked: {
      type: Boolean,
      value: !1,
      public: !0
    },
    type: {
      type: String,
      value: 'switch',
      public: !0
    },
    color: {
      type: String,
      value: '#04BE02',
      public: !0
    }
  },
  behaviors: ['wx-base', 'wx-label-target', 'wx-disabled', 'wx-data-Component'],
  listeners: {
    'switchInput.tap': 'onInputChange',
    'checkboxInput.tap': 'onInputChange'
  },
  _getSwitchBorderColor: function _getSwitchBorderColor(checked, color) {
    return checked ? color : '';
  },
  handleLabelTap: function handleLabelTap() {
    this.disabled || (this.checked = !this.checked);
  },
  onInputChange: function onInputChange(e) {
    this.checked = !this.checked;
    return this.disabled ? void (this.checked = !this.checked) : void this.triggerEvent('change', {
      value: this.checked
    });
  },
  isSwitch: function isSwitch(type) {
    return type !== 'checkbox';
  },
  isCheckbox: function isCheckbox(type) {
    return type === 'checkbox';
  },
  getFormData: function getFormData() {
    return this.checked;
  },
  resetFormData: function resetFormData() {
    this.checked = !1;
  }
});

/***/ })

});