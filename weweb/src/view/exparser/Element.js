import * as EventManager from './EventManager'
import Observer from './Observer'

const Element = function () {}
Element.prototype = Object.create(Object.prototype, {
  constructor: {
    value: Element,
    writable: true,
    configurable: true
  }
})

let componentSystem = null
Element._setCompnentSystem = function (componentSys) {
  componentSystem = componentSys
}
Element.initialize = function (ele) {
  ele.__attached = false
  ele.parentNode = null
  ele.childNodes = []
  ele.__slotParent = null
  ele.__slotChildren = ele.childNodes
  ele.__subtreeObserversCount = 0
}

const attachedElement = function (ele) {
  if (!ele.parentNode || ele.parentNode.__attached) {
    let setAttachedRecursively = function (ele) {
      ele.__attached = !0
      ele.shadowRoot instanceof Element &&
      setAttachedRecursively(ele.shadowRoot)
      let childNodes = ele.childNodes
      if (childNodes) {
        for (let idx = 0; idx < childNodes.length; idx++) {
          setAttachedRecursively(childNodes[idx])
        }
      }
    }
    setAttachedRecursively(ele)

    let callAttachedLifeTimeFuncRecursively = function (ele) {
      ele.__lifeTimeFuncs && componentSystem._callLifeTimeFuncs(ele, 'attached')
      ele.shadowRoot instanceof Element &&
      callAttachedLifeTimeFuncRecursively(ele.shadowRoot)
      let childNodes = ele.childNodes
      if (childNodes) {
        for (let idx = 0; idx < childNodes.length; idx++) {
          callAttachedLifeTimeFuncRecursively(childNodes[idx])
        }
      }
    }
    callAttachedLifeTimeFuncRecursively(ele)
  }
}
const detachedElement = function (ele) {
  if (ele.__attached) {
    const detachRecursively = function (ele) {
      ele.__attached = !1
      ele.shadowRoot instanceof Element && detachRecursively(ele.shadowRoot)
      let childNodes = ele.childNodes
      if (childNodes) {
        for (let idx = 0; idx < childNodes.length; idx++) {
          detachRecursively(childNodes[idx])
        }
      }
    }
    detachRecursively(ele)

    const callLifeTimeFuncRecursively = function (ele) {
      ele.__lifeTimeFuncs && componentSystem._callLifeTimeFuncs(ele, 'detached')
      ele.shadowRoot instanceof Element &&
      callLifeTimeFuncRecursively(ele.shadowRoot)
      let childNodes = ele.childNodes
      if (childNodes) {
        for (let idx = 0; idx < childNodes.length; idx++) {
          callLifeTimeFuncRecursively(childNodes[idx])
        }
      }
    }
    callLifeTimeFuncRecursively(ele)
  }
}
const childObserver = function (ele, observerName, targetNode) {
  if (
    (ele.__childObservers && !ele.__childObservers.empty) ||
    ele.__subtreeObserversCount
  ) {
    let opt = null
    if (observerName === 'add') {
      opt = {
        type: 'childList',
        target: ele,
        addedNodes: [targetNode]
      }
    } else {
      opt = {
        type: 'childList',
        target: ele,
        removedNodes: [targetNode]
      }
    }
    Observer._callObservers(ele, '__childObservers', opt)
  }
}
const attachShadowRoot = function (componentObj,
                                   newNode,
                                   oldNode,
                                   isRemoveOldNode) {
  // 增、删、改节点
  let copyOfOriginalElement = componentObj
  // 找dom根节点
  if (copyOfOriginalElement instanceof Element) {
    for (; copyOfOriginalElement.__virtual;) {
      let slotParent = copyOfOriginalElement.__slotParent
      if (!slotParent) {
        return
      }
      if (newNode && !oldNode) {
        // 为插入新节点做铺垫
        let oldNodeIdx = slotParent.__slotChildren.indexOf(
          copyOfOriginalElement
        )
        oldNode = slotParent.__slotChildren[oldNodeIdx + 1]
      }
      copyOfOriginalElement = slotParent
    }
    copyOfOriginalElement instanceof Element &&
    (copyOfOriginalElement = copyOfOriginalElement.__domElement)
  }

  let newDomEle = null
  if (newNode) {
    // 找newNode的dom节点
    if (newNode.__virtual) {
      let fragment = document.createDocumentFragment()
      let appendDomElement = function (ele) {
        for (
          let slotChildIdx = 0;
          slotChildIdx < ele.__slotChildren.length;
          slotChildIdx++
        ) {
          let slotChild = ele.__slotChildren[slotChildIdx]
          slotChild.__virtual
            ? appendDomElement(slotChild)
            : fragment.appendChild(slotChild.__domElement)
        }
      }
      appendDomElement(newNode)
      newDomEle = fragment
    } else {
      newDomEle = newNode.__domElement
    }
  }

  let oldDomEle = null
  if (oldNode) {
    if (oldNode.__virtual) {
      let oldParentNode = componentObj
      let oldNodeIdx = 0
      if (isRemoveOldNode) {
        let removeDomElement = function (ele) {
          for (
            let slotChildIdx = 0;
            slotChildIdx < ele.__slotChildren.length;
            slotChildIdx++
          ) {
            let slotChild = ele.__slotChildren[slotChildIdx]
            slotChild.__virtual
              ? removeDomElement(slotChild)
              : copyOfOriginalElement.removeChild(slotChild.__domElement)
          }
        }
        removeDomElement(oldNode)
        isRemoveOldNode = !1
        oldNodeIdx = componentObj.__slotChildren.indexOf(oldNode) + 1
      } else {
        oldParentNode = oldNode.__slotParent
        oldNodeIdx = oldParentNode.__slotChildren.indexOf(oldNode)
      }
      if (newNode) {
        let findNonVirtualNode = function (ele, idx) {
          for (; idx < ele.__slotChildren.length; idx++) {
            let slotChild = ele.__slotChildren[idx]
            if (!slotChild.__virtual) {
              return slotChild
            }
            let childNode = findNonVirtualNode(slotChild, 0)
            if (childNode) {
              return childNode
            }
          }
        }
        oldNode = null
        let curOldParentNode = oldParentNode
        for (
          ;
          (oldNode = findNonVirtualNode(curOldParentNode, oldNodeIdx)),
          !oldNode && curOldParentNode.__virtual;
          curOldParentNode = curOldParentNode.__slotParent
        ) {
          oldNodeIdx =
            curOldParentNode.__slotParent.__slotChildren.indexOf(
              curOldParentNode
            ) + 1
        }
        oldNode && (oldDomEle = oldNode.__domElement) // ??是否存在的!oldNode 但nOrigParentNode.__virtual为false?
      }
    } else {
      oldDomEle = oldNode.__domElement
    }
  }

  if (isRemoveOldNode) {
    newDomEle
      ? copyOfOriginalElement.replaceChild(newDomEle, oldDomEle)
      : copyOfOriginalElement.removeChild(oldDomEle)
  } else {
    newDomEle &&
    (oldDomEle
      ? copyOfOriginalElement.insertBefore(newDomEle, oldDomEle)
      : copyOfOriginalElement.appendChild(newDomEle))
  }
}
const updateSubtree = function (ele, newNode, oldNode, willRemoveOldNode) {
  let oldNodeIndex = -1

  if (oldNode) {
    oldNodeIndex = ele.childNodes.indexOf(oldNode)
    if (oldNodeIndex < 0) {
      return false
    }
  }

  if (willRemoveOldNode) {
    if (newNode === oldNode) {
      willRemoveOldNode = !1
    } else {
      if (ele.__subtreeObserversCount) {
        Observer._updateSubtreeCaches(oldNode, -ele.__subtreeObserversCount)
      }
      oldNode.parentNode = null
      oldNode.__slotParent = null
    }
  }

  let parentNode = null
  let originalParentNode = ele
  ele.__slots && (originalParentNode = ele.__slots[''])

  if (newNode) {
    parentNode = newNode.parentNode
    newNode.parentNode = ele
    newNode.__slotParent = originalParentNode
    let subtreeObserversCount = ele.__subtreeObserversCount
    if (parentNode) {
      let originalIndexOfNewNode = parentNode.childNodes.indexOf(newNode)
      parentNode.childNodes.splice(originalIndexOfNewNode, 1)
      parentNode === ele &&
      originalIndexOfNewNode < oldNodeIndex &&
      oldNodeIndex--
      subtreeObserversCount -= parentNode.__subtreeObserversCount
    }
    subtreeObserversCount &&
    Observer._updateSubtreeCaches(newNode, subtreeObserversCount)
  }
  attachShadowRoot(originalParentNode, newNode, oldNode, willRemoveOldNode)
  oldNodeIndex === -1 && (oldNodeIndex = ele.childNodes.length)
  if (newNode) {
    ele.childNodes.splice(oldNodeIndex, willRemoveOldNode ? 1 : 0, newNode)
  } else {
    ele.childNodes.splice(oldNodeIndex, willRemoveOldNode ? 1 : 0)
  }
  if (willRemoveOldNode) {
    detachedElement(oldNode)
    childObserver(ele, 'remove', oldNode)
  }

  if (newNode) {
    if (parentNode) {
      detachedElement(newNode)
      childObserver(parentNode, 'remove', newNode)
    }
    attachedElement(newNode)
    childObserver(ele, 'add', newNode)
  }

  return true
}
const childHandle = function (element, newNode, oldNode, willRemoveOldNode) {
  let retNode = willRemoveOldNode ? oldNode : newNode
  let isDone = updateSubtree(element, newNode, oldNode, willRemoveOldNode)
  return isDone ? retNode : null
}

Element._attachShadowRoot = function (ele, node) {
  attachShadowRoot(ele, node, null, !1)
}
Element.appendChild = function (ele, newChild) {
  return childHandle(ele, newChild, null, false)
}
Element.insertBefore = function (ele, newNode, refNode) {
  return childHandle(ele, newNode, refNode, false)
}
Element.removeChild = function (ele, removedChild) {
  return childHandle(ele, null, removedChild, true)
}
Element.replaceChild = function (ele, newNode, oldNode) {
  return childHandle(ele, newNode, oldNode, true)
}
Element.replaceDocumentElement = function (ele, oldChild) {
  if (!ele.__attached) {
    oldChild.parentNode.replaceChild(ele.__domElement, oldChild)
    attachedElement(ele)
  }
}

const parseSimpleSelector = function (simpleSelector, relation) {
  // simpleSelector => #a.b
  // primitiveSelector => ["#a", ".b"]
  const primitiveSelector = simpleSelector.match(/^(#[_a-zA-Z][-_a-zA-Z0-9:]*|)((?:\.-?[_a-zA-Z][-_a-zA-Z0-9]*)+|)$/)
  if (!primitiveSelector) return null
  const idSelectors = primitiveSelector[1].slice(1)
  const classSelectors = primitiveSelector[2].split('.')
  classSelectors.shift()
  return idSelectors || classSelectors.length ? {
    id: idSelectors,
    classes: classSelectors,
    relation: relation || ''
  } : null
}

Element.parseSelector = function (selectorStr) {
  // origin => a.b.c, b.c#d {}
  // complex => ["a.b.c>d", "a>b.c#d"]
  // simple => ["a.b.c", ">", "d"]
  const complexSelector = selectorStr.split(',')
  const res = []
  for (let i = 0; i < complexSelector.length; i++) {
    const simpleSelectors = complexSelector[i].split(/( |\t|>)/g)
    const parsedSelector = []
    let relation = ''
    let s = 0
    for (; s < simpleSelectors.length; s++) {
      let simpleSelector = simpleSelectors[s]
      if (simpleSelector && simpleSelector !== ' ' && simpleSelector !== '\t') {
        if (simpleSelector !== '>') {
          let selectorQueryObj = parseSimpleSelector(simpleSelector, relation)
          relation = ''
          if (!selectorQueryObj) break
          parsedSelector.push(selectorQueryObj)
        } else {
          if (relation !== '') break
          relation = 'child'
        }
      }
    }
    s === simpleSelectors.length && parsedSelector.length && res.push(parsedSelector)
  }
  return res.length ? res : null
}

const parseSelector = Element.parseSelector

Element.prototype.appendChild = function (child) {
  return childHandle(this, child, null, false)
}
Element.prototype.insertBefore = function (newChild, targetChild) {
  return childHandle(this, newChild, targetChild, false)
}
Element.prototype.removeChild = function (targetChild) {
  return childHandle(this, null, targetChild, true)
}
Element.prototype.replaceChild = function (newChild, targetChild) {
  return childHandle(this, newChild, targetChild, true)
}
Element.prototype.triggerEvent = function (type, detail, opt) {
  EventManager.triggerEvent(this, type, detail, opt)
}
Element.prototype.addListener = function (eventName, handler) {
  EventManager.addListenerToElement(this, eventName, handler)
}
Element.prototype.removeListener = function (eventName, handler) {
  EventManager.removeListenerFromElement(this, eventName, handler)
}
Element.prototype.hasBehavior = function (behavior) {
  return !!this.__behavior && this.__behavior.hasBehavior(behavior)
}
const x = function (e, t, n, i, o, r) {
    var a = n[i],
      s = !0
    a.id && a.id !== t.__id && (s = !1)
    for (var l = a.classes, c = 0; s && c < l.length; c++) t.classList.contains(l[c]) || (s = !1);
    if (s && 0 === i) return !0
    if (t === e) return !1
    for (var u = o ? t.__wxSlotParent : t.parentNode; u && u.__virtual;) {
      if (u === e) return !1
      u = o ? u.__wxSlotParent : u.parentNode
    }
    return !!u && (s ? x(e, u, n, i - 1, o, '' === a.relation) : !!r && x(e, u, n, i, o, !0))
  },
  C = function (e, t, n, i) {
    if (n.__virtual) return !1
    for (var o = 0; o < e.length; o++) {
      var r = e[o]
      if (x(t, n, r, r.length - 1, i, !1)) return !0
    }
    return !1
  },
  E = function (e, t, n, i, o, r) {
    if (C(t, n, i, o) && (e.push(i), r)) return !0
    for (var a = o ? i.__wxSlotChildren : i.childNodes, l = 0; l < a.length; l++)
      if (a[l] instanceof Element && E(e, t, n, a[l], o, r) && r) return !0
    return !1
  }
Element.prototype.querySelector = function (selector, t) {
  var n = typeof selector === 'object' ? selector : parseSelector(selector)
  if (!n) return null
  var i = []
  E(i, n, this, this, t, !0)
  return i[0] || null
}

export default Element
