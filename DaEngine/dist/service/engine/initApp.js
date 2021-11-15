import utils from '../../common/utils';
import initPage from './initPage';
import * as reportRealtimeAction from './logReport';
import Reporter from '../../common/reporter';
window.Reporter = Reporter; // ts中挂载全局变量的最佳实践是什么？
var events = ['onLaunch', 'onShow', 'onHide', 'onUnlaunch'];
var firstRender = true;
var isSysEvent = function (key) {
    // // 判断是否为app 事件
    // for (var index = 0; index < events.length; ++index) {
    //   if (events[index] === key) {
    //     return true
    //   }
    // }
    // return false
    return !~events.indexOf(key) ? true : false;
};
var isGetCurrentPage = function (key) {
    return key === 'getCurrentPage';
};
var appClass = /** @class */ (function () {
    function appClass(appObj) {
        var self = this;
        events.forEach(function (eventKey) {
            // 给app绑定事件
            var tempFun = function () {
                var eventFun = (appObj[eventKey] || utils.noop).bind(this);
                utils.info('App: ' + eventKey + ' have been invoked');
                try {
                    eventFun.apply(this, arguments);
                }
                catch (t) {
                    Reporter.thirdErrorReport({
                        error: t,
                        extend: 'App catch error in lifeCycleMethod ' + eventKey + ' function'
                    });
                }
            };
            self[eventKey] = tempFun.bind(self);
        });
        var bindApp = function (attrKey) {
            // 给app绑定其它方法与属性
            isGetCurrentPage(attrKey)
                ? utils.warn('关键字保护', "App's " + attrKey + ' is write-protected')
                : isSysEvent(attrKey) ||
                    (Object.prototype.toString.call(appObj[attrKey]) ===
                        '[object Function]'
                        ? (self[attrKey] = function () {
                            var method;
                            try {
                                method = appObj[attrKey].apply(this, arguments);
                            }
                            catch (t) {
                                Reporter.thirdErrorReport({
                                    error: t,
                                    extend: 'App catch error in  ' + attrKey + ' function'
                                });
                            }
                            return method;
                        }.bind(self))
                        : (self[attrKey] = appObj[attrKey]));
        };
        for (var attrKey in appObj) {
            bindApp(attrKey);
        }
        this.onError && Reporter.registerErrorListener(this.onError);
        this.onLaunch && this.onLaunch();
        reportRealtimeAction.triggerAnalytics('launch', null, '小程序启动');
        var hide = function () {
            // hide
            var pages = initPage.getCurrentPages();
            pages.length && pages[pages.length - 1].onHide();
            this.onHide();
            reportRealtimeAction.triggerAnalytics('background', null, '小程序转到后台');
        };
        var show = function () {
            // show
            this.onShow();
            if (firstRender) {
                firstRender = false;
            }
            else {
                var pages = initPage.getCurrentPages();
                pages.length &&
                    (pages[pages.length - 1].onShow(),
                        reportRealtimeAction.triggerAnalytics('foreground', null, '小程序转到前台'));
            }
        };
        wx.onAppEnterBackground(hide.bind(this));
        wx.onAppEnterForeground(show.bind(this));
    }
    appClass.prototype.getCurrentPage = function () {
        utils.warn('将被废弃', 'App.getCurrentPage is deprecated, please use getCurrentPages. [It will be removed in 2016.11]');
        var currentPage = initPage.getCurrentPage();
        if (currentPage) {
            return currentPage.page;
        }
    };
    return appClass;
}());
var tempObj;
export var appHolder = Reporter.surroundThirdByTryCatch(function (appObj) {
    tempObj = new appClass(appObj);
}, 'create app instance');
export var getApp = function () {
    return tempObj;
};
// export default { appHolder, getApp }
