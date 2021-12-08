// import utils from '../../common/utils'
// import initPage from './initPage'
// import * as reportRealtimeAction from './logReport'
// import Reporter from '../../common/reporter';
// window.Reporter = Reporter; // ts中挂载全局变量的最佳实践是什么？
// const events = ['onLaunch', 'onShow', 'onHide', 'onUnlaunch'];
// var firstRender = true
// var isSysEvent = function (key) {
//   // // 判断是否为app 事件
//   // for (var index = 0; index < events.length; ++index) {
//   //   if (events[index] === key) {
//   //     return true
//   //   }
//   // }
//   // return false
//   return !~events.indexOf(key) ? true : false;
// }
// var isGetCurrentPage = function (key) {
//   return key === 'getCurrentPage'
// }
// class appClass {
//   constructor (appObj) {
//     var self = this
//     events.forEach(function (eventKey) {
//       // 给app绑定事件
//       var tempFun = function () {
//         var eventFun = (appObj[eventKey] || utils.noop).bind(this)
//         utils.info('App: ' + eventKey + ' have been invoked')
//         try {
//           eventFun.apply(this, arguments)
//         } catch (t) {
//           Reporter.thirdErrorReport({
//             error: t,
//             extend:
//               'App catch error in lifeCycleMethod ' + eventKey + ' function'
//           })
//         }
//       }
//       self[eventKey] = tempFun.bind(self)
//     })
//     var bindApp = function (attrKey) {
//       // 给app绑定其它方法与属性
//       isGetCurrentPage(attrKey)
//         ? utils.warn('关键字保护', "App's " + attrKey + ' is write-protected')
//         : isSysEvent(attrKey) ||
//           (Object.prototype.toString.call(appObj[attrKey]) ===
//           '[object Function]'
//             ? (self[attrKey] = function () {
//               var method
//               try {
//                 method = appObj[attrKey].apply(this, arguments)
//               } catch (t) {
//                 Reporter.thirdErrorReport({
//                   error: t,
//                   extend: 'App catch error in  ' + attrKey + ' function'
//                 })
//               }
//               return method
//             }.bind(self))
//             : (self[attrKey] = appObj[attrKey]))
//     }
//     for (var attrKey in appObj) {
//       bindApp(attrKey)
//     }
//     this.onError && Reporter.registerErrorListener(this.onError)
//     this.onLaunch && this.onLaunch()
//     reportRealtimeAction.triggerAnalytics('launch', null, '小程序启动')
//     var hide = function () {
//       // hide
//       var pages = initPage.getCurrentPages()
//       pages.length && pages[pages.length - 1].onHide()
//       this.onHide()
//       reportRealtimeAction.triggerAnalytics('background', null, '小程序转到后台')
//     }
//     var show = function () {
//       // show
//       this.onShow()
//       if (firstRender) {
//         firstRender = false
//       } else {
//         var pages = initPage.getCurrentPages()
//         pages.length &&
//           (pages[pages.length - 1].onShow(),
//             reportRealtimeAction.triggerAnalytics('foreground', null, '小程序转到前台'))
//       }
//     }
//     wx.onAppEnterBackground(hide.bind(this))
//     wx.onAppEnterForeground(show.bind(this))
//   }
//   getCurrentPage () {
//     utils.warn(
//       '将被废弃',
//       'App.getCurrentPage is deprecated, please use getCurrentPages. [It will be removed in 2016.11]'
//     )
//     var currentPage = initPage.getCurrentPage()
//     if (currentPage) {
//       return currentPage.page
//     }
//   }
// }
// var tempObj
// export const appHolder = Reporter.surroundThirdByTryCatch(function (appObj) {
//   tempObj = new appClass(appObj)
// }, 'create app instance')
// export const getApp = function () {
//   return tempObj
// }
// // export default { appHolder, getApp }
// -----------------------------------------
import { getCurrentPages } from './initPage';
import { reportRealtimeAction } from './logReport';
import utils from '../../common/utils';
var App = /** @class */ (function () {
    function App(appObj) {
        var _a, _b, _c, _d;
        this.firstRender = true;
        /**
         * 将App应用配置中的生命周期函数挂载在应用实例上；
         */
        (_a = appObj.onLaunch, this.onLaunch = _a === void 0 ? function () { } : _a, _b = appObj.onShow, this.onShow = _b === void 0 ? function () { } : _b, _c = appObj.onHide, this.onHide = _c === void 0 ? function () { } : _c, _d = appObj.onUnlaunch, this.onUnlaunch = _d === void 0 ? function () { } : _d);
        utils.info('App: ' + 'onLaunch/onShow/onHide/onUnlaunch' + ' have been invoked');
        // @TODO 需要吗？
        // this.onLaunch();
        // this.onShow();
        // // this.onHide();
        // // this.onUnlaunch();
        // 将其它方法和属性挂载在app上
        function bindApp(attrKey) {
            (Object.prototype.toString.call(appObj[attrKey]) === '[object Function]'
                ? (self[attrKey] = function () {
                    var method;
                    try {
                        method = appObj[attrKey].apply(this, arguments);
                    }
                    catch (t) {
                        // Reporter.thirdErrorReport({
                        //   error: t,
                        //   extend: 'App catch error in  ' + attrKey + ' function'
                        // })
                    }
                    return method;
                }.bind(self))
                : (self[attrKey] = appObj[attrKey]));
        }
        for (var attrKey in appObj) {
            bindApp(attrKey);
        }
        // @TODO 需要吗?
        // this.onError && Reporter.registerErrorListener(this.onError)
        // this.onLaunch && this.onLaunch()
        reportRealtimeAction('launch', null, '小程序启动');
        function hide() {
            var pages = getCurrentPages();
            // 页面隐藏，再app隐藏？
            pages.length && pages[pages.length - 1].onHide();
            this.onHide();
            reportRealtimeAction('background', null, '小程序转到后台');
        }
        function show() {
            this.onShow();
            if (this.firstRender) {
                this.firstRender = false;
            }
            else {
                var pages = getCurrentPages();
                pages.length && (pages[pages.length - 1].onShow(), reportRealtimeAction('foreground', null, '小程序转到前台'));
            }
        }
        // 位置是否正确？
        wx.onAppEnterBackground(hide());
        wx.onAppEnterForeground(show());
    }
    return App;
}());
var tempObj;
export var appHolder = Reporter.surroundThirdByTryCatch(function (appObj) {
    tempObj = new App(appObj);
}, 'create app instance');
export var getApp = function () {
    return tempObj;
};
