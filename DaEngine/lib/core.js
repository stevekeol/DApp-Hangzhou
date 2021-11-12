'use strict'
const fs = require('fs')
// const path = require('path')
const loadConfig = require('./config')
const util = require('./util')
const cache = require('./cache')
const parser = require('./parser')
const version = require('../package.json').version
const builder = require('./builder')

function escape (x) {
  return x
}

// function noext (str) {
//   return str.replace(/\.\w+$/, '')
// }

function loadFile (p, throwErr = true) {
  if (/\.wxss$/.test(p)) throwErr = false
  return new Promise((resolve, reject) => {
    fs.stat(`./${p}`, (err, stats) => {
      if (err) {
        if (throwErr) return reject(new Error(`file ${p} not found`))
        return resolve('')
      }
      if (stats && stats.isFile()) {
        let content = cache.get(p)
        if (content) {
          return resolve(content)
        } else {
          return parser(`${p}`).then(resolve, reject)
        }
      } else {
        return resolve('')
      }
    })
  })
}

// 获取填充了模板字段(topBar,tabbar)的index.html
// 疑问：这个时候仍旧只是空白的index.html，还是pages[0]填充的index.html?
exports.getIndex = async function () {
  let [config, rootFn] = await Promise.all([
    loadConfig(),
    util.loadTemplate('index') // loadTemplate()返回的是函数？
  ])
  let pageConfig = await util.loadJSONfiles(config.pages)
  config['window'].pages = pageConfig
  let tabBar = config.tabBar || {}
  let topBar = tabBar.position == 'top'
  return rootFn(
    {
      config: JSON.stringify(config),
      root: config.root,
      // ip: util.getIp(),
      topBar: topBar,
      tabbarList: tabBar.list,
      tabStyle:
        `background-color: ${tabBar.backgroundColor}; border-color: ${tabBar.borderStyle}; height: ` +
        (topBar ? 47 : 56) +
        'px;',
      tabLabelColor: tabBar.color,
      tabLabelSelectedColor: tabBar.selectedColor,
      version
    },
    {},
    escape
  )
}

// 获取所有JS代码
exports.getServiceJs = async function () {
  return builder.load()
}

// 获取某个page所需的 html ,css, js文件
exports.getPage = async function (path) {
  return Promise.all([
    loadFile(path + '.wxml'),
    loadFile(path + '.wxss'),
    builder.buildPage(path + '.js')
  ])
}

exports.getAppWxss = async function (path) {
  return loadFile(path + '.wxss')
}
