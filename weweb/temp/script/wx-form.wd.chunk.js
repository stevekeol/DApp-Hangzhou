webpackJsonp([16],{

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(5);

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// wx-form
exports.default = window.exparser.registerElement({
  is: 'wx-form',
  template: '\n    <span id="wrapper"><slot></slot></span>\n  ',
  behaviors: ['wx-base'],
  properties: {
    reportSubmit: {
      type: Boolean,
      value: !1,
      public: !0
    }
  },
  listeners: {
    'this.formSubmit': 'submitHandler',
    'this.formReset': 'resetHandler'
  },
  resetDfs: function resetDfs(element) {
    if (element.childNodes) {
      for (var i = 0; i < element.childNodes.length; ++i) {
        var curChild = element.childNodes[i];
        curChild instanceof exparser.Element && (curChild.hasBehavior('wx-data-Component') && curChild.resetFormData(), this.resetDfs(curChild));
      }
    }
  },
  getFormData: function getFormData(form, fn) {
    return form.name && form.hasBehavior('wx-data-Component') ? form.__domElement.tagName === 'WX-INPUT' || form.__domElement.tagName === 'WX-PICKER' || form.__domElement.tagName === 'WX-TEXTAREA' ? form.getFormData(function (e) {
      fn(e);
    }) : fn(form.getFormData()) : fn();
  },
  asyncDfs: function asyncDfs(element, fn) {
    var self = this,
        resFn = function resFn() {
      typeof fn === 'function' && fn();
      fn = void 0;
    };
    if (!element.childNodes) {
      return resFn();
    }
    for (var length = element.childNodes.length, i = 0; i < element.childNodes.length; ++i) {
      var curChild = element.childNodes[i];
      curChild instanceof exparser.Element ? !function (form) {
        self.getFormData(form, function (val) {
          typeof val !== 'undefined' && (self._data[form.name] = val);
          self.asyncDfs(form, function () {
            --length == 0 && resFn();
          });
        });
      }(curChild) : --length;
    }
    length == 0 && resFn();
  },
  submitHandler: function submitHandler(event) {
    var self = this,
        _target = {
      id: event.target.__domElement.id,
      dataset: event.target.dataset,
      offsetTop: event.target.__domElement.offsetTop,
      offsetLeft: event.target.__domElement.offsetLeft
    };
    this._data = (0, _create2.default)(null);
    this.asyncDfs(this, function () {
      self.reportSubmit ? self.triggerEvent('submit', {
        value: self._data,
        formId: 'the formId is subscribe mock one',
        target: _target
      }) : self.triggerEvent('submit', { value: self._data, target: _target });
    });
    return !1;
  },
  resetHandler: function resetHandler(event) {
    var _target = {
      id: event.target.__domElement.id,
      dataset: event.target.dataset,
      offsetTop: event.target.__domElement.offsetTop,
      offsetLeft: event.target.__domElement.offsetLeft
    };
    this._data = (0, _create2.default)(null);
    this.resetDfs(this);
    this.triggerEvent('reset', { target: _target });
    return !1;
  }
});

/***/ })

});