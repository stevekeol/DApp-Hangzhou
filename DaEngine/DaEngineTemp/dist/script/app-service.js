define("config.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
"use strict";

/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "14592619.qcloud.la";

var config = {

    // 下面的地址配合云端 Server 工作
    host: host,

    // 登录地址，用于建立会话
    loginUrl: "https://" + host + "/login",

    // 测试的请求地址，用于测试会话
    requestUrl: "https://" + host + "/testRequest",

    // 用code换取openId
    openIdUrl: "https://" + host + "/openid",

    // 测试的信道服务接口
    tunnelUrl: "https://" + host + "/tunnel",

    // 生成支付订单的接口
    paymentUrl: "https://" + host + "/payment",

    // 发送模板消息接口
    templateMessageUrl: "https://" + host + "/templateMessage",

    // 上传文件接口
    uploadFileUrl: "https://" + host + "/upload",

    // 下载示例图片接口
    downloadExampleUrl: "https://" + host + "/static/weapp.jpg"
};

module.exports = config;
});;define("page/API/pages/canvas/example.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
'use strict';

var example = {};

example.rotate = function (context) {
  context.beginPath();
  context.rotate(10 * Math.PI / 180);
  context.rect(225, 75, 20, 10);
  context.fill();
};

example.scale = function (context) {
  context.beginPath();
  context.rect(25, 25, 50, 50);
  context.stroke();

  context.scale(2, 2);

  context.beginPath();
  context.rect(25, 25, 50, 50);
  context.stroke();
};

example.reset = function (context) {
  context.beginPath();

  context.setFillStyle('#000000');
  context.setStrokeStyle('#000000');
  context.setFontSize(10);

  context.setShadow(0, 0, 0, 'rgba(0, 0, 0, 0)');

  context.setLineCap('butt');
  context.setLineJoin('miter');
  context.setLineWidth(1);
  context.setMiterLimit(10);
};

example.translate = function (context) {
  context.beginPath();
  context.rect(10, 10, 100, 50);
  context.fill();

  context.translate(70, 70);

  context.beginPath();
  context.fill();
};

example.save = function (context) {
  context.beginPath();
  context.setStrokeStyle('#00ff00');
  context.save();

  context.scale(2, 2);
  context.setStrokeStyle('#ff0000');
  context.rect(0, 0, 100, 100);
  context.stroke();
  context.restore();

  context.rect(0, 0, 50, 50);
  context.stroke();
};

example.restore = function (context) {
  [3, 2, 1].forEach(function (item) {
    context.beginPath();
    context.save();
    context.scale(item, item);
    context.rect(10, 10, 100, 100);
    context.stroke();
    context.restore();
  });
};

example.drawImage = function (context) {
  context.drawImage('/image/wechat.png', 0, 0);
};

example.fillText = function (context) {
  context.setStrokeStyle('#ff0000');

  context.beginPath();
  context.moveTo(0, 10);
  context.lineTo(300, 10);
  context.stroke();

  // context.save()
  // context.scale(1.5, 1.5)
  // context.translate(20, 20)
  context.setFontSize(10);
  context.fillText('Hello World', 0, 30);
  context.setFontSize(20);
  context.fillText('Hello World', 100, 30);

  // context.restore()

  context.beginPath();
  context.moveTo(0, 30);
  context.lineTo(300, 30);
  context.stroke();
};

example.fill = function (context) {
  context.beginPath();
  context.rect(20, 20, 150, 100);
  context.setStrokeStyle('#00ff00');
  context.fill();
};

example.stroke = function (context) {
  context.beginPath();
  context.moveTo(20, 20);
  context.lineTo(20, 100);
  context.lineTo(70, 100);
  context.setStrokeStyle('#00ff00');
  context.stroke();
};

example.clearRect = function (context) {
  context.setFillStyle('#ff0000');
  context.beginPath();
  context.rect(0, 0, 300, 150);
  context.fill();
  context.clearRect(20, 20, 100, 50);
};

example.beginPath = function (context) {
  context.beginPath();
  context.setLineWidth(5);
  context.setStrokeStyle('#ff0000');
  context.moveTo(0, 75);
  context.lineTo(250, 75);
  context.stroke();

  context.beginPath();
  context.setStrokeStyle('#0000ff');
  context.moveTo(50, 0);
  context.lineTo(150, 130);
  context.stroke();
};

example.closePath = function (context) {
  context.beginPath();
  context.moveTo(20, 20);
  context.lineTo(20, 100);
  context.lineTo(70, 100);
  context.closePath();
  context.stroke();
};

example.moveTo = function (context) {
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(300, 150);
  context.stroke();
};

example.lineTo = function (context) {
  context.beginPath();
  context.moveTo(20, 20);
  context.lineTo(20, 100);
  context.lineTo(70, 100);
  context.stroke();
};

example.rect = function (context) {
  context.beginPath();
  context.rect(20, 20, 150, 100);
  context.stroke();
};

example.arc = function (context) {
  context.beginPath();
  context.arc(75, 75, 50, 0, Math.PI * 2, true);
  context.moveTo(110, 75);
  context.arc(75, 75, 35, 0, Math.PI, false);
  context.moveTo(65, 65);
  context.arc(60, 65, 5, 0, Math.PI * 2, true);
  context.moveTo(95, 65);
  context.arc(90, 65, 5, 0, Math.PI * 2, true);
  context.stroke();
};

example.quadraticCurveTo = function (context) {
  context.beginPath();
  context.moveTo(20, 20);
  context.quadraticCurveTo(20, 100, 200, 20);
  context.stroke();
};

example.bezierCurveTo = function (context) {
  context.beginPath();
  context.moveTo(20, 20);
  context.bezierCurveTo(20, 100, 200, 100, 200, 20);
  context.stroke();
};

example.setFillStyle = function (context) {
  ['#fef957', 'rgb(242,159,63)', 'rgb(242,117,63)', '#e87e51'].forEach(function (item, index) {
    context.setFillStyle(item);
    context.beginPath();
    context.rect(0 + 75 * index, 0, 50, 50);
    context.fill();
  });
};

example.setStrokeStyle = function (context) {
  ['#fef957', 'rgb(242,159,63)', 'rgb(242,117,63)', '#e87e51'].forEach(function (item, index) {
    context.setStrokeStyle(item);
    context.beginPath();
    context.rect(0 + 75 * index, 0, 50, 50);
    context.stroke();
  });
};

example.setGlobalAlpha = function (context) {
  context.setFillStyle('#000000');
  [1, 0.5, 0.1].forEach(function (item, index) {
    context.setGlobalAlpha(item);
    context.beginPath();
    context.rect(0 + 75 * index, 0, 50, 50);
    context.fill();
  });
};

example.setShadow = function (context) {
  context.beginPath();
  context.setShadow(10, 10, 10, 'rgba(0, 0, 0, 199)');
  context.rect(10, 10, 100, 100);
  context.fill();
};

example.setFontSize = function (context) {
  [10, 20, 30, 40].forEach(function (item, index) {
    context.setFontSize(item);
    context.fillText('Hello, world', 20, 20 + 40 * index);
  });
};

example.setLineCap = function (context) {
  context.setLineWidth(10);
  ['butt', 'round', 'square'].forEach(function (item, index) {
    context.beginPath();
    context.setLineCap(item);
    context.moveTo(20, 20 + 20 * index);
    context.lineTo(100, 20 + 20 * index);
    context.stroke();
  });
};

example.setLineJoin = function (context) {
  context.setLineWidth(10);
  ['bevel', 'round', 'miter'].forEach(function (item, index) {
    context.beginPath();

    context.setLineJoin(item);
    context.moveTo(20 + 80 * index, 20);
    context.lineTo(100 + 80 * index, 50);
    context.lineTo(20 + 80 * index, 100);
    context.stroke();
  });
};

example.setLineWidth = function (context) {
  [2, 4, 6, 8, 10].forEach(function (item, index) {
    context.beginPath();
    context.setLineWidth(item);
    context.moveTo(20, 20 + 20 * index);
    context.lineTo(100, 20 + 20 * index);
    context.stroke();
  });
};

example.setMiterLimit = function (context) {
  context.setLineWidth(4);

  [2, 4, 6, 8, 10].forEach(function (item, index) {
    context.beginPath();
    context.setMiterLimit(item);
    context.moveTo(20 + 80 * index, 20);
    context.lineTo(100 + 80 * index, 50);
    context.lineTo(20 + 80 * index, 100);
    context.stroke();
  });
};

module.exports = example;
});;define("page/API/pages/custom-service/custom-service.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
"use strict";

Page({});
});;define("page/API/pages/sendMessage/sendMessage.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
"use strict";

Page({});
});;define("util/util.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
'use strict';

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time;
  }

  var hour = parseInt(time / 3600);
  time = time % 3600;
  var minute = parseInt(time / 60);
  time = time % 60;
  var second = time;

  return [hour, minute, second].map(function (n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }).join(':');
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
  }

  longitude = longitude.toFixed(2);
  latitude = latitude.toFixed(2);

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  };
}

module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation
};
});;define("vendor/qcloud-weapp-client-sdk/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
'use strict';

var constants = require('./lib/constants');
var login = require('./lib/login');
var Session = require('./lib/session');
var request = require('./lib/request');
var Tunnel = require('./lib/tunnel');

var _exports = module.exports = {
    login: login.login,
    setLoginUrl: login.setLoginUrl,
    LoginError: login.LoginError,

    clearSession: Session.clear,

    request: request.request,
    RequestError: request.RequestError,

    Tunnel: Tunnel
};

// 导出错误类型码
Object.keys(constants).forEach(function (key) {
    if (key.indexOf('ERR_') === 0) {
        _exports[key] = constants[key];
    }
});
});;define("vendor/qcloud-weapp-client-sdk/lib/constants.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
'use strict';

module.exports = {
    WX_HEADER_CODE: 'X-WX-Code',
    WX_HEADER_ENCRYPTED_DATA: 'X-WX-Encrypted-Data',
    WX_HEADER_IV: 'X-WX-IV',
    WX_HEADER_ID: 'X-WX-Id',
    WX_HEADER_SKEY: 'X-WX-Skey',

    WX_SESSION_MAGIC_ID: 'F2C224D4-2BCE-4C64-AF9F-A6D872000D1A',

    ERR_INVALID_PARAMS: 'ERR_INVALID_PARAMS',

    ERR_WX_LOGIN_FAILED: 'ERR_WX_LOGIN_FAILED',
    ERR_WX_GET_USER_INFO: 'ERR_WX_GET_USER_INFO',
    ERR_LOGIN_TIMEOUT: 'ERR_LOGIN_TIMEOUT',
    ERR_LOGIN_FAILED: 'ERR_LOGIN_FAILED',
    ERR_LOGIN_SESSION_NOT_RECEIVED: 'ERR_LOGIN_MISSING_SESSION',

    ERR_INVALID_SESSION: 'ERR_INVALID_SESSION',
    ERR_CHECK_LOGIN_FAILED: 'ERR_CHECK_LOGIN_FAILED'
};
});;define("vendor/qcloud-weapp-client-sdk/lib/login.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
'use strict';

var utils = require('./utils');
var constants = require('./constants');
var Session = require('./session');

/***
 * @class
 * 表示登录过程中发生的异常
 */
var LoginError = function () {
    function LoginError(type, message) {
        Error.call(this, message);
        this.type = type;
        this.message = message;
    }

    LoginError.prototype = new Error();
    LoginError.prototype.constructor = LoginError;

    return LoginError;
}();

/**
 * 微信登录，获取 code 和 encryptData
 */
var getWxLoginResult = function getLoginCode(callback) {
    wx.login({
        success: function success(loginResult) {
            wx.getUserInfo({
                success: function success(userResult) {
                    callback(null, {
                        code: loginResult.code,
                        encryptedData: userResult.encryptedData,
                        iv: userResult.iv,
                        userInfo: userResult.userInfo
                    });
                },

                fail: function fail(userError) {
                    var error = new LoginError(constants.ERR_WX_GET_USER_INFO, '获取微信用户信息失败，请检查网络状态');
                    error.detail = userError;
                    callback(error, null);
                }
            });
        },

        fail: function fail(loginError) {
            var error = new LoginError(constants.ERR_WX_LOGIN_FAILED, '微信登录失败，请检查网络状态');
            error.detail = loginError;
            callback(error, null);
        }
    });
};

var noop = function noop() {};
var defaultOptions = {
    method: 'GET',
    success: noop,
    fail: noop,
    loginUrl: null
};

/**
 * @method
 * 进行服务器登录，以获得登录会话
 *
 * @param {Object} options 登录配置
 * @param {string} options.loginUrl 登录使用的 URL，服务器应该在这个 URL 上处理登录请求
 * @param {string} [options.method] 请求使用的 HTTP 方法，默认为 "GET"
 * @param {Function} options.success(userInfo) 登录成功后的回调函数，参数 userInfo 微信用户信息
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
var login = function login(options) {
    options = utils.extend({}, defaultOptions, options);

    if (!defaultOptions.loginUrl) {
        options.fail(new LoginError(constants.ERR_INVALID_PARAMS, '登录错误：缺少登录地址，请通过 setLoginUrl() 方法设置登录地址'));
        return;
    }

    var doLogin = function doLogin() {
        return getWxLoginResult(function (wxLoginError, wxLoginResult) {
            if (wxLoginError) {
                options.fail(wxLoginError);
                return;
            }

            var userInfo = wxLoginResult.userInfo;

            // 构造请求头，包含 code、encryptedData 和 iv
            var code = wxLoginResult.code;
            var encryptedData = wxLoginResult.encryptedData;
            var iv = wxLoginResult.iv;
            var header = {};

            header[constants.WX_HEADER_CODE] = code;
            header[constants.WX_HEADER_ENCRYPTED_DATA] = encryptedData;
            header[constants.WX_HEADER_IV] = iv;

            // 请求服务器登录地址，获得会话信息
            wx.request({
                url: options.loginUrl,
                header: header,
                method: options.method,
                data: options.data,

                success: function success(result) {
                    var data = result.data;

                    // 成功地响应会话信息
                    if (data && data[constants.WX_SESSION_MAGIC_ID]) {
                        if (data.session) {
                            data.session.userInfo = userInfo;
                            Session.set(data.session);
                            options.success(userInfo);
                        } else {
                            var errorMessage = '登录失败(' + data.error + ')：' + (data.message || '未知错误');
                            var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, errorMessage);
                            options.fail(noSessionError);
                        }

                        // 没有正确响应会话信息
                    } else {
                        var errorMessage = '登录请求没有包含会话响应，请确保服务器处理 `' + options.loginUrl + '` 的时候正确使用了 SDK 输出登录结果';
                        var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, errorMessage);
                        options.fail(noSessionError);
                    }
                },

                // 响应错误
                fail: function fail(loginResponseError) {
                    var error = new LoginError(constants.ERR_LOGIN_FAILED, '登录失败，可能是网络错误或者服务器发生异常');
                    options.fail(error);
                }
            });
        });
    };

    var session = Session.get();
    if (session) {
        wx.checkSession({
            success: function success() {
                options.success(session.userInfo);
            },

            fail: function fail() {
                Session.clear();
                doLogin();
            }
        });
    } else {
        doLogin();
    }
};

var setLoginUrl = function setLoginUrl(loginUrl) {
    defaultOptions.loginUrl = loginUrl;
};

module.exports = {
    LoginError: LoginError,
    login: login,
    setLoginUrl: setLoginUrl
};
});;define("vendor/qcloud-weapp-client-sdk/lib/request.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var constants = require('./constants');
var utils = require('./utils');
var Session = require('./session');
var loginLib = require('./login');

var noop = function noop() {};

var buildAuthHeader = function buildAuthHeader(session) {
    var header = {};

    if (session && session.id && session.skey) {
        header[constants.WX_HEADER_ID] = session.id;
        header[constants.WX_HEADER_SKEY] = session.skey;
    }

    return header;
};

/***
 * @class
 * 表示请求过程中发生的异常
 */
var RequestError = function () {
    function RequestError(type, message) {
        Error.call(this, message);
        this.type = type;
        this.message = message;
    }

    RequestError.prototype = new Error();
    RequestError.prototype.constructor = RequestError;

    return RequestError;
}();

function request(options) {
    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
        var message = '请求传参应为 object 类型，但实际传了 ' + (typeof options === 'undefined' ? 'undefined' : _typeof(options)) + ' 类型';
        throw new RequestError(constants.ERR_INVALID_PARAMS, message);
    }

    var requireLogin = options.login;
    var success = options.success || noop;
    var fail = options.fail || noop;
    var complete = options.complete || noop;
    var originHeader = options.header || {};

    // 成功回调
    var callSuccess = function callSuccess() {
        success.apply(null, arguments);
        complete.apply(null, arguments);
    };

    // 失败回调
    var callFail = function callFail(error) {
        fail.call(null, error);
        complete.call(null, error);
    };

    // 是否已经进行过重试
    var hasRetried = false;

    if (requireLogin) {
        doRequestWithLogin();
    } else {
        doRequest();
    }

    // 登录后再请求
    function doRequestWithLogin() {
        loginLib.login({ success: doRequest, fail: callFail });
    }

    // 实际进行请求的方法
    function doRequest() {
        var authHeader = buildAuthHeader(Session.get());

        wx.request(utils.extend({}, options, {
            header: utils.extend({}, originHeader, authHeader),

            success: function success(response) {
                var data = response.data;

                // 如果响应的数据里面包含 SDK Magic ID，表示被服务端 SDK 处理过，此时一定包含登录态失败的信息
                if (data && data[constants.WX_SESSION_MAGIC_ID]) {
                    // 清除登录态
                    Session.clear();

                    var error, message;
                    if (data.error === constants.ERR_INVALID_SESSION) {
                        // 如果是登录态无效，并且还没重试过，会尝试登录后刷新凭据重新请求
                        if (!hasRetried) {
                            hasRetried = true;
                            doRequestWithLogin();
                            return;
                        }

                        message = '登录态已过期';
                        error = new RequestError(data.error, message);
                    } else {
                        message = '鉴权服务器检查登录态发生错误(' + (data.error || 'OTHER') + ')：' + (data.message || '未知错误');
                        error = new RequestError(constants.ERR_CHECK_LOGIN_FAILED, message);
                    }

                    callFail(error);
                    return;
                }

                callSuccess.apply(null, arguments);
            },

            fail: callFail,
            complete: noop
        }));
    };
};

module.exports = {
    RequestError: RequestError,
    request: request
};
});;define("vendor/qcloud-weapp-client-sdk/lib/session.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
'use strict';

var constants = require('./constants');
var SESSION_KEY = 'weapp_session_' + constants.WX_SESSION_MAGIC_ID;

var Session = {
    get: function get() {
        return wx.getStorageSync(SESSION_KEY) || null;
    },

    set: function set(session) {
        wx.setStorageSync(SESSION_KEY, session);
    },

    clear: function clear() {
        wx.removeStorageSync(SESSION_KEY);
    }
};

module.exports = Session;
});;define("vendor/qcloud-weapp-client-sdk/lib/tunnel.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
'use strict';

var requestLib = require('./request');
var wxTunnel = require('./wxTunnel');

/**
 * 当前打开的信道，同一时间只能有一个信道打开
 */
var currentTunnel = null;

// 信道状态枚举
var STATUS_CLOSED = Tunnel.STATUS_CLOSED = 'CLOSED';
var STATUS_CONNECTING = Tunnel.STATUS_CONNECTING = 'CONNECTING';
var STATUS_ACTIVE = Tunnel.STATUS_ACTIVE = 'ACTIVE';
var STATUS_RECONNECTING = Tunnel.STATUS_RECONNECTING = 'RECONNECTING';

// 错误类型枚举
var ERR_CONNECT_SERVICE = Tunnel.ERR_CONNECT_SERVICE = 1001;
var ERR_CONNECT_SOCKET = Tunnel.ERR_CONNECT_SOCKET = 1002;
var ERR_RECONNECT = Tunnel.ERR_RECONNECT = 2001;
var ERR_SOCKET_ERROR = Tunnel.ERR_SOCKET_ERROR = 3001;

// 包类型枚举
var PACKET_TYPE_MESSAGE = 'message';
var PACKET_TYPE_PING = 'ping';
var PACKET_TYPE_PONG = 'pong';
var PACKET_TYPE_TIMEOUT = 'timeout';
var PACKET_TYPE_CLOSE = 'close';

// 断线重连最多尝试 5 次
var DEFAULT_MAX_RECONNECT_TRY_TIMES = 5;

// 每次重连前，等待时间的增量值
var DEFAULT_RECONNECT_TIME_INCREASE = 1000;

function Tunnel(serviceUrl) {
    if (currentTunnel && currentTunnel.status !== STATUS_CLOSED) {
        throw new Error('当前有未关闭的信道，请先关闭之前的信道，再打开新信道');
    }

    currentTunnel = this;

    // 等确认微信小程序全面支持 ES6 就不用那么麻烦了
    var me = this;

    //=========================================================================
    // 暴露实例状态以及方法
    //=========================================================================
    this.serviceUrl = serviceUrl;
    this.socketUrl = null;
    this.status = null;

    this.open = openConnect;
    this.on = registerEventHandler;
    this.emit = emitMessagePacket;
    this.close = close;

    this.isClosed = isClosed;
    this.isConnecting = isConnecting;
    this.isActive = isActive;
    this.isReconnecting = isReconnecting;

    //=========================================================================
    // 信道状态处理，状态说明：
    //   closed       - 已关闭
    //   connecting   - 首次连接
    //   active       - 当前信道已经在工作
    //   reconnecting - 断线重连中
    //=========================================================================
    function isClosed() {
        return me.status === STATUS_CLOSED;
    }
    function isConnecting() {
        return me.status === STATUS_CONNECTING;
    }
    function isActive() {
        return me.status === STATUS_ACTIVE;
    }
    function isReconnecting() {
        return me.status === STATUS_RECONNECTING;
    }

    function setStatus(status) {
        var lastStatus = me.status;
        if (lastStatus !== status) {
            me.status = status;
        }
    }

    // 初始为关闭状态
    setStatus(STATUS_CLOSED);

    //=========================================================================
    // 信道事件处理机制
    // 信道事件包括：
    //   connect      - 连接已建立
    //   close        - 连接被关闭（包括主动关闭和被动关闭）
    //   reconnecting - 开始重连
    //   reconnect    - 重连成功
    //   error        - 发生错误，其中包括连接失败、重连失败、解包失败等等
    //   [message]    - 信道服务器发送过来的其它事件类型，如果事件类型和上面内置的事件类型冲突，将在事件类型前面添加前缀 `@`
    //=========================================================================
    var preservedEventTypes = 'connect,close,reconnecting,reconnect,error'.split(',');
    var eventHandlers = [];

    /**
     * 注册消息处理函数
     * @param {string} messageType 支持内置消息类型（"connect"|"close"|"reconnecting"|"reconnect"|"error"）以及业务消息类型
     */
    function registerEventHandler(eventType, eventHandler) {
        if (typeof eventHandler === 'function') {
            eventHandlers.push([eventType, eventHandler]);
        }
    }

    /**
     * 派发事件，通知所有处理函数进行处理
     */
    function dispatchEvent(eventType, eventPayload) {
        eventHandlers.forEach(function (handler) {
            var handleType = handler[0];
            var handleFn = handler[1];

            if (handleType === '*') {
                handleFn(eventType, eventPayload);
            } else if (handleType === eventType) {
                handleFn(eventPayload);
            }
        });
    }

    /**
     * 派发事件，事件类型和系统保留冲突的，事件名会自动加上 '@' 前缀
     */
    function dispatchEscapedEvent(eventType, eventPayload) {
        if (preservedEventTypes.indexOf(eventType) > -1) {
            eventType = '@' + eventType;
        }

        dispatchEvent(eventType, eventPayload);
    }

    //=========================================================================
    // 信道连接控制
    //=========================================================================
    var isFirstConnection = true;
    var isOpening = false;

    /**
     * 连接信道服务器，获取 WebSocket 连接地址，获取地址成功后，开始进行 WebSocket 连接
     */
    function openConnect() {
        if (isOpening) return;
        isOpening = true;

        // 只有关闭状态才会重新进入准备中
        setStatus(isFirstConnection ? STATUS_CONNECTING : STATUS_RECONNECTING);

        requestLib.request({
            url: serviceUrl,
            method: 'GET',
            success: function success(response) {
                if (+response.statusCode === 200 && response.data && response.data.url) {
                    openSocket(me.socketUrl = response.data.url);
                } else {
                    dispatchConnectServiceError(response);
                }
            },
            fail: dispatchConnectServiceError,
            complete: function complete() {
                return isOpening = false;
            }
        });

        function dispatchConnectServiceError(detail) {
            if (isFirstConnection) {
                setStatus(STATUS_CLOSED);

                dispatchEvent('error', {
                    code: ERR_CONNECT_SERVICE,
                    message: '连接信道服务失败，网络错误或者信道服务没有正确响应',
                    detail: detail || null
                });
            } else {
                startReconnect(detail);
            }
        }
    }

    /**
     * 打开 WebSocket 连接，打开后，注册微信的 Socket 处理方法
     */
    function openSocket(url) {
        wxTunnel.listen({
            onOpen: handleSocketOpen,
            onMessage: handleSocketMessage,
            onClose: handleSocketClose,
            onError: handleSocketError
        });

        wx.connectSocket({ url: url });
        isFirstConnection = false;
    }

    //=========================================================================
    // 处理消息通讯
    //
    // packet           - 数据包，序列化形式为 `${type}` 或者 `${type}:${content}`
    // packet.type      - 包类型，包括 message, ping, pong, close
    // packet.content?  - 当包类型为 message 的时候，会附带 message 数据
    //
    // message          - 消息体，会使用 JSON 序列化后作为 packet.content
    // message.type     - 消息类型，表示业务消息类型
    // message.content? - 消息实体，可以为任意类型，表示消息的附带数据，也可以为空
    //
    // 数据包示例：
    //  - 'ping' 表示 Ping 数据包
    //  - 'message:{"type":"speak","content":"hello"}' 表示一个打招呼的数据包
    //=========================================================================

    // 连接还没成功建立的时候，需要发送的包会先存放到队列里
    var queuedPackets = [];

    /**
     * WebSocket 打开之后，更新状态，同时发送所有遗留的数据包
     */
    function handleSocketOpen() {
        /* istanbul ignore else */
        if (isConnecting()) {
            dispatchEvent('connect');
        } else if (isReconnecting()) {
            dispatchEvent('reconnect');
            resetReconnectionContext();
        }

        setStatus(STATUS_ACTIVE);
        emitQueuedPackets();
        nextPing();
    }

    /**
     * 收到 WebSocket 数据包，交给处理函数
     */
    function handleSocketMessage(message) {
        resolvePacket(message.data);
    }

    /**
     * 发送数据包，如果信道没有激活，将先存放队列
     */
    function emitPacket(packet) {
        if (isActive()) {
            sendPacket(packet);
        } else {
            queuedPackets.push(packet);
        }
    }

    /**
     * 数据包推送到信道
     */
    function sendPacket(packet) {
        var encodedPacket = [packet.type];

        if (packet.content) {
            encodedPacket.push(JSON.stringify(packet.content));
        }

        wx.sendSocketMessage({
            data: encodedPacket.join(':'),
            fail: handleSocketError
        });
    }

    function emitQueuedPackets() {
        queuedPackets.forEach(emitPacket);

        // empty queued packets
        queuedPackets.length = 0;
    }

    /**
     * 发送消息包
     */
    function emitMessagePacket(messageType, messageContent) {
        var packet = {
            type: PACKET_TYPE_MESSAGE,
            content: {
                type: messageType,
                content: messageContent
            }
        };

        emitPacket(packet);
    }

    /**
     * 发送 Ping 包
     */
    function emitPingPacket() {
        emitPacket({ type: PACKET_TYPE_PING });
    }

    /**
     * 发送关闭包
     */
    function emitClosePacket() {
        emitPacket({ type: PACKET_TYPE_CLOSE });
    }

    /**
     * 解析并处理从信道接收到的包
     */
    function resolvePacket(raw) {
        var packetParts = raw.split(':');
        var packetType = packetParts.shift();
        var packetContent = packetParts.join(':') || null;
        var packet = { type: packetType };

        if (packetContent) {
            try {
                packet.content = JSON.parse(packetContent);
            } catch (e) {}
        }

        switch (packet.type) {
            case PACKET_TYPE_MESSAGE:
                handleMessagePacket(packet);
                break;
            case PACKET_TYPE_PONG:
                handlePongPacket(packet);
                break;
            case PACKET_TYPE_TIMEOUT:
                handleTimeoutPacket(packet);
                break;
            case PACKET_TYPE_CLOSE:
                handleClosePacket(packet);
                break;
            default:
                handleUnknownPacket(packet);
                break;
        }
    }

    /**
     * 收到消息包，直接 dispatch 给处理函数
     */
    function handleMessagePacket(packet) {
        var message = packet.content;
        dispatchEscapedEvent(message.type, message.content);
    }

    //=========================================================================
    // 心跳、断开与重连处理
    //=========================================================================

    /**
     * Ping-Pong 心跳检测超时控制，这个值有两个作用：
     *   1. 表示收到服务器的 Pong 相应之后，过多久再发下一次 Ping
     *   2. 如果 Ping 发送之后，超过这个时间还没收到 Pong，断开与服务器的连接
     * 该值将在与信道服务器建立连接后被更新
     */
    var pingPongTimeout = 15000;
    var pingTimer = 0;
    var pongTimer = 0;

    /**
     * 信道服务器返回 Ping-Pong 控制超时时间
     */
    function handleTimeoutPacket(packet) {
        var timeout = packet.content * 1000;
        /* istanbul ignore else */
        if (!isNaN(timeout)) {
            pingPongTimeout = timeout;
            ping();
        }
    }

    /**
     * 收到服务器 Pong 响应，定时发送下一个 Ping
     */
    function handlePongPacket(packet) {
        nextPing();
    }

    /**
     * 发送下一个 Ping 包
     */
    function nextPing() {
        clearTimeout(pingTimer);
        clearTimeout(pongTimer);
        pingTimer = setTimeout(ping, pingPongTimeout);
    }

    /**
     * 发送 Ping，等待 Pong
     */
    function ping() {
        /* istanbul ignore else */
        if (isActive()) {
            emitPingPacket();

            // 超时没有响应，关闭信道
            pongTimer = setTimeout(handlePongTimeout, pingPongTimeout);
        }
    }

    /**
     * Pong 超时没有响应，信道可能已经不可用，需要断开重连
     */
    function handlePongTimeout() {
        startReconnect('服务器已失去响应');
    }

    // 已经重连失败的次数
    var reconnectTryTimes = 0;

    // 最多允许失败次数
    var maxReconnectTryTimes = Tunnel.MAX_RECONNECT_TRY_TIMES || DEFAULT_MAX_RECONNECT_TRY_TIMES;

    // 重连前等待的时间
    var waitBeforeReconnect = 0;

    // 重连前等待时间增量
    var reconnectTimeIncrease = Tunnel.RECONNECT_TIME_INCREASE || DEFAULT_RECONNECT_TIME_INCREASE;

    var reconnectTimer = 0;

    function startReconnect(lastError) {
        if (reconnectTryTimes >= maxReconnectTryTimes) {
            close();

            dispatchEvent('error', {
                code: ERR_RECONNECT,
                message: '重连失败',
                detail: lastError
            });
        } else {
            wx.closeSocket();
            waitBeforeReconnect += reconnectTimeIncrease;
            setStatus(STATUS_RECONNECTING);
            reconnectTimer = setTimeout(doReconnect, waitBeforeReconnect);
        }

        if (reconnectTryTimes === 0) {
            dispatchEvent('reconnecting');
        }

        reconnectTryTimes += 1;
    }

    function doReconnect() {
        openConnect();
    }

    function resetReconnectionContext() {
        reconnectTryTimes = 0;
        waitBeforeReconnect = 0;
    }

    /**
     * 收到服务器的关闭请求
     */
    function handleClosePacket(packet) {
        close();
    }

    function handleUnknownPacket(packet) {
        // throw away
    }

    var isClosing = false;

    /**
     * 收到 WebSocket 断开的消息，处理断开逻辑
     */
    function handleSocketClose() {
        /* istanbul ignore if */
        if (isClosing) return;

        /* istanbul ignore else */
        if (isActive()) {
            // 意外断开的情况，进行重连
            startReconnect('链接已断开');
        }
    }

    function close() {
        isClosing = true;
        closeSocket();
        setStatus(STATUS_CLOSED);
        resetReconnectionContext();
        isFirstConnection = false;
        clearTimeout(pingTimer);
        clearTimeout(pongTimer);
        clearTimeout(reconnectTimer);
        dispatchEvent('close');
        isClosing = false;
    }

    function closeSocket(emitClose) {
        if (isActive() && emitClose !== false) {
            emitClosePacket();
        }

        wx.closeSocket();
    }

    //=========================================================================
    // 错误处理
    //=========================================================================

    /**
     * 错误处理
     */
    function handleSocketError(detail) {
        switch (me.status) {
            case Tunnel.STATUS_CONNECTING:
                dispatchEvent('error', {
                    code: ERR_SOCKET_ERROR,
                    message: '连接信道失败，网络错误或者信道服务不可用',
                    detail: detail
                });
                break;
        }
    }
}

module.exports = Tunnel;
});;define("vendor/qcloud-weapp-client-sdk/lib/utils.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
"use strict";

/**
 * 拓展对象
 */
exports.extend = function extend(target) {
    var sources = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < sources.length; i += 1) {
        var source = sources[i];
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
};
});;define("vendor/qcloud-weapp-client-sdk/lib/wxTunnel.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
"use strict";

/* istanbul ignore next */
var noop = function noop() {
    return void 0;
};

var onOpen = void 0,
    onClose = void 0,
    onMessage = void 0,
    onError = void 0;

/* istanbul ignore next */
function listen(listener) {
    if (listener) {
        onOpen = listener.onOpen;
        onClose = listener.onClose;
        onMessage = listener.onMessage;
        onError = listener.onError;
    } else {
        onOpen = noop;
        onClose = noop;
        onMessage = noop;
        onError = noop;
    }
}

/* istanbul ignore next */
function bind() {
    wx.onSocketOpen(function (result) {
        return onOpen(result);
    });
    wx.onSocketClose(function (result) {
        return onClose(result);
    });
    wx.onSocketMessage(function (result) {
        return onMessage(result);
    });
    wx.onSocketError(function (error) {
        return onError(error);
    });
}

listen(null);
bind();

module.exports = { listen: listen };
});;define("app.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,ServiceJSBridge,Reporter){
'use strict';

var openIdUrl = require('./config').openIdUrl;

App({
  onLaunch: function onLaunch() {
    console.log('App Launch');
    var getItLatter = function getItLatter() {
      return new Promise(function (resolve, reject) {
        console.log(55555);
        setTimeout(function () {
          resolve(6666);
        }, 2000);
      });
    };
    getItLatter().then(function (res) {
      return console.log(res);
    });
  },
  onShow: function onShow() {
    console.log('App Show');
  },
  onHide: function onHide() {
    console.log('App Hide');
  },
  globalData: {
    hasLogin: false,
    openid: null
  },
  // lazy loading openid
  getUserOpenId: function getUserOpenId(callback) {
    var self = this;

    if (self.globalData.openid) {
      callback(null, self.globalData.openid);
    } else {
      wx.login({
        success: function success(data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function success(res) {
              console.log('拉取openid成功', res);
              self.globalData.openid = res.data.openid;
              callback(null, self.globalData.openid);
            },
            fail: function fail(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res);
              callback(res);
            }
          });
        },
        fail: function fail(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err);
          callback(err);
        }
      });
    }
  }
});
});require("app.js")