/*****************************************************
 * 
 * amd(Asynchronous Module Definition)，即异步模块加载机制
 *
 * @TODO
 * 1. 运行中，首页面就会报错： "Error: module config is not defined"
 * 
 ****************************************************/
// import 

interface Imodule {
  status: Flag,
  factory: Function,
  exports?: Object // 该模块假如已经被require过，则该属性上挂载对应的模块代码，以节省重复计算的开销
}

/**
 * 在全局对象window上挂载require和define
 */
declare global {
  interface Window {
    require: Function,
    define: Function
  }
}

/**
 * defined: 该模块已经被定义，但尚未导入；
 * required: 该模块已经被导入内存中（当然是已被定义了）；
 */
enum Flag {
  defined = 1,
  required
};

let moduleMap: Map<String,  Imodule> = new Map();

/**
 * 定义一个模块
 * @type {[type]}
 */
const define = (path: String, fun: Function): void => {
  moduleMap.set(path, {
    status: Flag.defined,
    factory: fun
  })
}

/**
 * 引入一个模块
 * @type {[type]}
 */
const require = (path: string): Object | undefined => {
  // 当使用诸如require('config')而非require('config.js')时的兜底处理
  path = /\.js$/.test(path) ? path : `${path}.js`;
  const moduleObj = moduleMap.get(path);
  if (!moduleObj) throw new Error(`module ${path} is not defined`);

  if (moduleObj.status === Flag.defined) {
    let factoryFun = moduleObj.factory;
    let module = {
      exports: {}
    }
    let exports;
    if (factoryFun) {
      exports = factoryFun(getRequireFun(path), module, module.exports)
    }

    moduleObj.exports = module.exports || exports;
    moduleObj.status = Flag.required;
  }
  // 当该模块已经被require过，则直接返回
  return moduleObj.exports;
}

/**
 * 辅助函数：取出路径前缀
 * @type {[type]}
 */
const getPathPrefix = (path: String): String => {
  const res = path.match(/(.*)\/([^\/]+)?$/);
  return res && res[1] ? res[1] : './';
}

/**
 * 给出一个路径，取出该路径下对应的函数代码体
 * @type {[type]}
 */
const getRequireFun = (pathname: String) => {
  return (path: String) => {
    if (typeof path !== 'string') {
      throw new Error('require args must be a string')
    }
    let floderArr = []
    let folders: string[] = (getPathPrefix(pathname) + '/' + path).split('/')
    let pathLength = folders.length
    for (let i = 0; i < pathLength; ++i) {
      let folder = folders[i]
      if (folder != '' && folder != '.') {
        if (folder == '..') {
          if (floderArr.length == 0) {
            throw new Error("can't find module : " + path)
          }
          floderArr.pop()
        } else {
          i + 1 < pathLength && folders[i + 1] == '..'
            ? i++
            : floderArr.push(folder)
        }
      }
    }
    try {
      let _pathname = floderArr.join('/')
      if (!/\.js$/.test(_pathname)) {
        pathname += '.js' //@TODO tofixed
      }
      return require(_pathname)
    } catch (e) {
      throw e
    }
  }
}


export { require, define }

window.define = define;
(window as Window).require = require;

// da.version = {
//   updateTime: '2021-11-11 10:00',
//   info: 'Demo 验证',
//   version: "0.20211111.1"
// }