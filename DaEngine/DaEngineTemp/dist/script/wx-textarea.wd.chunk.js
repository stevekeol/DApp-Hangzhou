"use strict";
(self["webpackChunkDaEngine"] = self["webpackChunkDaEngine"] || []).push([[235],{

/***/ 8453:
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// wx-textarea in dev tool
exports["default"] = !function () {
  window.exparser.registerElement({
    is: 'wx-textarea',
    behaviors: ['wx-base', 'wx-data-Component'],
    template: '<div id="wrapped">\n      <div id="placeholder" parse-text-content>\n        {{placeholder}}\n      </div>\n      <textarea id="textarea" maxlength$="{{_getMaxlength(maxlength)}}" ></textarea>\n      <div id="compute" class="compute"></div>\n      <div id="stylecompute" class$="{{_getPlaceholderClass(placeholderClass)}}" style$="{{_getPlaceholderStyle(placeholderStyle)}}" ></div>\n    </div>\n    ',
    properties: {
      value: {
        type: String,
        value: '',
        public: !0,
        coerce: 'defaultValueChange'
      },
      maxlength: {
        type: Number,
        value: 140,
        public: !0,
        observer: 'maxlengthChanged'
      },
      placeholder: {
        type: String,
        value: '',
        public: !0
      },
      hidden: {
        type: Boolean,
        value: !1,
        public: !0
      },
      disabled: {
        type: Boolean,
        value: !1,
        public: !0
      },
      focus: {
        type: Number,
        value: 0,
        public: !0,
        coerce: 'focusChanged'
      },
      autoFocus: {
        type: Boolean,
        value: !1,
        public: !0
      },
      placeholderClass: {
        type: String,
        value: 'textarea-placeholder',
        observer: '_getComputePlaceholderStyle',
        public: !0
      },
      placeholderStyle: {
        type: String,
        value: '',
        observer: '_getComputePlaceholderStyle',
        public: !0
      },
      autoHeight: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: 'autoHeightChanged'
      },
      bindinput: {
        type: String,
        value: '',
        public: !0
      }
    },
    listeners: {
      'textarea.input': 'onTextAreaInput',
      'textarea.focus': 'onTextAreaFocus',
      'textarea.blur': 'onTextAreaBlur'
    },
    resetFormData: function resetFormData() {
      this.$.textarea.value = '';
      this.value = '';
    },
    getFormData: function getFormData(cb) {
      var self = this;
      this.value = this.$.textarea.value;
      setTimeout(function () {
        typeof cb === 'function' && cb(self.value);
      }, 0);
    },
    couldFocus: function couldFocus(focus) {
      var self = this;
      if (this.__attached) {
        if (!this._keyboardShow && focus) {
          this.disabled || window.requestAnimationFrame(function () {
            self.$.textarea.focus();
          });
        } else {
          this._keyboardShow && !focus && this.$.textarea.blur();
        }
      }
    },
    focusChanged: function focusChanged(focus, t) {
      this.couldFocus(Boolean(focus));
      return focus;
    },
    attached: function attached() {
      var self = this;
      this.__attached = !0;
      this.__scale = 750 / window.innerWidth;
      this.getComputedStyle();
      this.checkRows(this.value);
      this.__updateTextArea = this.updateTextArea.bind(this);
      document.addEventListener('pageReRender', this.__updateTextArea);
      this.__routeDoneId = exparser.addListenerToElement(document, 'routeDone', function () {
        self.checkAutoFocus();
      });
      this.checkPlaceholderStyle(this.value);
    },
    checkAutoFocus: function checkAutoFocus() {
      if (!this.__autoFocused) {
        this.__autoFocused = !0;
        this.couldFocus(this.autoFocus || this.focus);
      }
    },
    detached: function detached() {
      document.removeEventListener('pageReRender', this.__updateTextArea);
      exparser.removeListenerFromElement(document, 'routeDone', this.__routeDoneId);
    },
    getHexColor: function getHexColor(colorValue) {
      try {
        var colorNums;
        var decimal;
        var hexValue = function () {
          if (colorValue.indexOf('#') >= 0) {
            return {
              v: colorValue
            };
          }
          colorNums = colorValue.match(/\d+/g);
          var ret = [];
          colorNums.map(function (num, idx) {
            if (idx < 3) {
              var decNum = parseInt(num);
              decNum = decNum > 9 ? decNum.toString(16) : '0' + decNum;
              ret.push(decNum);
            }
          });

          if (colorNums.length > 3) {
            decimal = parseFloat(colorNums.slice(3).join('.'));
            if (decimal == 0) {
              ret.push('00');
            } else {
              if (decimal >= 1) {
                ret.push('ff');
              } else {
                decimal = parseInt(255 * decimal);
                if (decimal = decimal > 9) {
                  decimal.toString(16);
                } else {
                  '0' + decimal;
                }
                ret.push(decimal);
              }
            }
          }
          return {
            v: '#' + ret.join('')
          };
        }();
        if ((typeof hexValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(hexValue)) === 'object') return hexValue.v;
      } catch (e) {
        return '';
      }
    },
    getComputedStyle: function getComputedStyle() {
      var self = this;
      window.requestAnimationFrame(function () {
        var selfStyle = window.getComputedStyle(self.$$);
        var selfSizeInfo = self.$$.getBoundingClientRect();
        var lrSize = ['Left', 'Right'].map(function (side) {
          return parseFloat(selfStyle['border' + side + 'Width']) + parseFloat(selfStyle['padding' + side]);
        });
        var tbSize = ['Top', 'Bottom'].map(function (side) {
          return parseFloat(selfStyle['border' + side + 'Width']) + parseFloat(selfStyle['padding' + side]);
        });
        var textarea = self.$.textarea;
        textarea.style.width = selfSizeInfo.width - lrSize[0] - lrSize[1] + 'px';
        textarea.style.height = selfSizeInfo.height - tbSize[0] - tbSize[1] + 'px';
        console.log(selfSizeInfo.height - tbSize[0] - tbSize[1] + 'px');
        textarea.style.fontWeight = selfStyle.fontWeight;
        textarea.style.fontSize = selfStyle.fontSize || '16px';
        textarea.style.color = selfStyle.color;
        self.$.compute.style.fontSize = selfStyle.fontSize || '16px';
        self.$.compute.style.width = textarea.style.width;
        self.$.placeholder.style.width = textarea.style.width;
        self.$.placeholder.style.height = textarea.style.height;
        self.disabled ? textarea.setAttribute('disabled', !0) : textarea.removeAttribute('disabled');
      });
    },
    getCurrentRows: function getCurrentRows(txt) {
      var computedStyle = window.getComputedStyle(this.$.compute);
      var lineHeight = 1.2 * (parseFloat(computedStyle.fontSize) || 16);
      this.$.compute.innerText = txt;
      this.$.compute.appendChild(document.createElement('br'));
      return {
        height: Math.max(this.$.compute.scrollHeight, lineHeight),
        heightRpx: this.__scale * this.$.compute.scrollHeight,
        lineHeight: lineHeight,
        lineCount: Math.ceil(this.$.compute.scrollHeight / lineHeight)
      };
    },
    onTextAreaInput: function onTextAreaInput(event) {
      this.value = event.target.value;
      if (this.bindinput) {
        var target = {
          id: this.$$.id,
          dataset: this.dataset,
          offsetTop: this.$$.offsetTop,
          offsetLeft: this.$$.offsetLeft
        };
        WeixinJSBridge.publish('SPECIAL_PAGE_EVENT', {
          eventName: this.bindinput,
          ext: {
            setKeyboardValue: !1
          },
          data: {
            data: {
              type: 'input',
              timestamp: Date.now(),
              detail: {
                value: event.target.value
              },
              target: target,
              currentTarget: target,
              touches: []
            },
            eventName: this.bindinput
          }
        });
      }
      return !1;
    },
    onTextAreaFocus: function onTextAreaFocus(e) {
      this._keyboardShow = !0;
      this.triggerEvent('focus', {
        value: this.value
      });
    },
    onTextAreaBlur: function onTextAreaBlur(e) {
      this._keyboardShow = !1;
      this.triggerEvent('blur', {
        value: this.value
      });
    },
    updateTextArea: function updateTextArea() {
      this.checkAutoFocus();
      this.getComputedStyle();
      this.autoHeightChanged(this.autoHeight);
    },
    hiddenChanged: function hiddenChanged(isHidden, t) {
      this.$$.style.display = isHidden ? 'none' : '';
    },
    _getPlaceholderStyle: function _getPlaceholderStyle(placeholderStyle) {
      return placeholderStyle + ';display:none;';
    },
    _getComputePlaceholderStyle: function _getComputePlaceholderStyle() {
      var stylecomputeEle = this.$.stylecompute,
          computedStyle = window.getComputedStyle(stylecomputeEle),
          fontWight = parseInt(computedStyle.fontWeight);
      isNaN(fontWight) ? fontWight = computedStyle.fontWeight : fontWight < 500 ? fontWight = 'normal' : fontWight >= 500 && (fontWight = 'bold');
      this.placeholderStyle && this.placeholderStyle.split(';');
      var placeHolder = this.$.placeholder;
      placeHolder.style.position = 'absolute';
      placeHolder.style.fontSize = (parseFloat(computedStyle.fontSize) || 16) + 'px';
      placeHolder.style.fontWeight = fontWight;
      placeHolder.style.color = this.getHexColor(computedStyle.color);
    },
    defaultValueChange: function defaultValueChange(val) {
      this.maxlength > 0 && val.length > this.maxlength && (val = val.slice(0, this.maxlength));
      this.checkPlaceholderStyle(val);
      this.$.textarea.value = val;
      this.__attached && this.checkRows(val);
      return val;
    },
    autoHeightChanged: function autoHeightChanged(changed) {
      if (changed) {
        var rows = this.getCurrentRows(this.value);
        var height = rows.height < rows.lineHeight ? rows.lineHeight : rows.height;
        this.$$.style.height = height + 'px';
        this.getComputedStyle();
      }
    },
    checkRows: function checkRows(txt) {
      var rowsInfo = this.getCurrentRows(txt);
      if (this.lastRows != rowsInfo.lineCount) {
        this.lastRows = rowsInfo.lineCount;
        if (this.autoHeight) {
          var height = rowsInfo.height < rowsInfo.lineHeight ? rowsInfo.lineHeight : rowsInfo.height;
          this.$$.style.height = height + 'px';
          this.getComputedStyle();
        }
        this.triggerEvent('linechange', rowsInfo);
      }
    },
    checkPlaceholderStyle: function checkPlaceholderStyle(hasPlaceHolder) {
      if (hasPlaceHolder) {
        this.$.placeholder.style.display = 'none';
      } else {
        this._getComputePlaceholderStyle();
        this.$.placeholder.style.display = '';
      }
    },
    _getPlaceholderClass: function _getPlaceholderClass(cls) {
      return 'textarea-placeholder ' + cls;
    },
    _getMaxlength: function _getMaxlength(len) {
      return len <= 0 ? -1 : len;
    },
    maxlengthChanged: function maxlengthChanged(len) {
      len > 0 && this.value.length > len && (this.value = this.value.slice(0, len));
    }
  });
}();
module.exports = exports['default'];

/***/ })

}]);