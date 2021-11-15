/*****************************************************
 *
 * amd(Asynchronous Module Definition)，即异步模块加载机制
 *
 * @TODO
 * 1. "Error: module config is not defined"
 * 2.
 *
 ****************************************************/
// import 
/**
 * defined: 该模块已经被定义，但尚未导入；
 * required: 该模块已经被导入内存中（当然是已被定义了）；
 */
var Flag;
(function (Flag) {
    Flag[Flag["defined"] = 1] = "defined";
    Flag[Flag["required"] = 2] = "required";
})(Flag || (Flag = {}));
;
var moduleMap = new Map();
/**
 * 定义一个模块
 * @type {[type]}
 */
var define = function (path, fun) {
    moduleMap.set(path, {
        status: Flag.defined,
        factory: fun
    });
};
/**
 * 引入一个模块
 * @type {[type]}
 */
var require = function (path) {
    var moduleObj = moduleMap.get(path);
    if (!moduleObj)
        throw new Error("module " + path + " is not defined");
    if (moduleObj.status === Flag.defined) {
        var factoryFun = moduleObj.factory;
        var module_1 = {
            exports: {}
        };
        var exports_1;
        if (factoryFun) {
            exports_1 = factoryFun(getRequireFun(path), module_1, module_1.exports);
        }
        moduleObj.exports = module_1.exports || exports_1;
        moduleObj.status = Flag.required;
    }
    // 当该模块已经被require过，则直接返回
    return moduleObj.exports;
};
/**
 * 辅助函数：取出路径前缀
 * @type {[type]}
 */
var getPathPrefix = function (path) {
    var res = path.match(/(.*)\/([^\/]+)?$/);
    return res && res[1] ? res[1] : './';
};
/**
 *
 * @type {[type]}
 */
var getRequireFun = function (pathname) {
    return function (path) {
        if (typeof path !== 'string') {
            throw new Error('require args must be a string');
        }
        var floderArr = [];
        var folders = (getPathPrefix(pathname) + '/' + path).split('/');
        var pathLength = folders.length;
        for (var i = 0; i < pathLength; ++i) {
            var folder = folders[i];
            if (folder != '' && folder != '.') {
                if (folder == '..') {
                    if (floderArr.length == 0) {
                        throw new Error("can't find module : " + path);
                    }
                    floderArr.pop();
                }
                else {
                    i + 1 < pathLength && folders[i + 1] == '..'
                        ? i++
                        : floderArr.push(folder);
                }
            }
        }
        try {
            var _pathname = floderArr.join('/');
            if (!/\.js$/.test(_pathname)) {
                pathname += '.js'; //@TODO tofixed
            }
            return require(_pathname);
        }
        catch (e) {
            throw e;
        }
    };
};
export { require, define };
window.define = define;
// (window as Window).require = require;
window.require = require;
// da.version = {
//   updateTime: '2021-11-11 10:00',
//   info: 'Demo 验证',
//   version: "0.20211111.1"
// }
