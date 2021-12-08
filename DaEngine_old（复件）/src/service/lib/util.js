import qs from 'querystring'
import emitter from 'emitter'
let Bus = null

let id = 0
export function uid () {
  return id++
}

export function getBus () {
  if (!Bus) {
    Bus = new emitter()
  }
  return Bus
}

export function once (el, name, listener) {
  let fn = function (e) {
    el.removeEventListener(name, fn, false)
    listener.call(el, e)
  }
  el.addEventListener(name, fn, false)
}

export function normalize (p) {
  return p.replace(/\.html/, '').replace(/^\.?\//, '')
}

export function createFrame (id, src, hidden, parent = document.body) {
  let el = document.createElement('iframe')
  el.setAttribute('src', src)
  el.setAttribute('id', id)
  el.setAttribute('seamless', 'seamless')
  el.setAttribute(
    'sandbox',
    'allow-scripts allow-same-origin allow-forms allow-modals'
  )
  el.setAttribute('frameborder', '0')
  el.setAttribute('width', hidden ? '0' : '100%')
  el.setAttribute('height', hidden ? '0' : '100%')
  if (hidden) {
    el.setAttribute('style', 'width:0;height:0;border:0; display:none;')
  }
  parent.appendChild(el)
  return el
}

export function createWebview (id, parent = document.body) {
  let el = document.createElement('iframe')
  let hidden = true
  // el.setAttribute('src', src) // 即没有src的iframe就是一个webview
  el.setAttribute('id', id)
  el.setAttribute('seamless', 'seamless')
  el.setAttribute(
    'sandbox',
    'allow-scripts allow-same-origin allow-forms allow-modals'
  )
  el.setAttribute('frameborder', '0')
  el.setAttribute('width', hidden ? '0' : '100%')
  el.setAttribute('height', hidden ? '0' : '100%')
  if (hidden) {
    el.setAttribute('style', 'width:0;height:0;border:0; display:none;')
  }
  parent.appendChild(el)
  return el
}

export function updateWebView (id, src) {
  let el = document.querySelector('#' + id)
  let hidden = false
  el.setAttribute('src', src)
  // el.setAttribute('id', id)
  // el.setAttribute('seamless', 'seamless')
  // el.setAttribute(
  //   'sandbox',
  //   'allow-scripts allow-same-origin allow-forms allow-modals'
  // )
  // el.setAttribute('frameborder', '0')
  el.setAttribute('width', hidden ? '0' : '100%')
  el.setAttribute('height', hidden ? '0' : '100%')
  // if (hidden) {
  //   el.setAttribute('style', 'width:0;height:0;border:0; display:none;')
  // }
  el.setAttribute('style', '')
  return el
}

export function parsePath (path) {
  let parts = path.split(/\?/)
  return {
    path: parts[0],
    query: qs.parse(parts[1])
  }
}

export function validPath (p) {
  // 是否是有效页面地址
  let pages = window.__wxConfig__.pages
  let { path } = parsePath(p)
  return pages.indexOf(path) !== -1
}

export function isTabbar (url) {
  let list = window.__wxConfig__.tabBar && window.__wxConfig__.tabBar.list
  if (!list) return
  let pages = list.map(o => o.pagePath)
  return pages.indexOf(url) !== -1
}

export function reload () {
  location.reload()
}

export function navigateHome () {
  let home = `${location.protocol}//${location.host}${location.pathname}`
  if (typeof location.replace === 'function') {
    location.replace(home)
  } else if (typeof history.replaceState === 'function') {
    window.history.replaceState({}, '', home)
    location.reload()
  } else {
    location.hash = '#'
    location.reload()
  }
}

export function dataURItoBlob (dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1])

  // separate out the mime component
  var mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  // write the ArrayBuffer to a blob, and you're done
  var bb = new Blob([ab], { type: mimeString })
  return URL.createObjectURL(bb)
}

export function range (n, start = 0, suffix = '') {
  const arr = []
  for (let i = start; i <= n; i++) {
    arr.push(i < 10 ? `0${i}${suffix}` : `${i}${suffix}`)
  }
  return arr
}

export function toNumber (arr) {
  if (Array.isArray(arr)) return arr.map(n => Number(n))
  if (typeof arr === 'string') return Number(arr)
  return arr
}
