let matches = (function () {
  return document.documentElement.matches ||
    document.documentElement.webkitMatchesSelector ||
    document.documentElement.mozMatchesSelector ||
    document.documentElement.oMatchesSelector ||
    document.documentElement.msMatchesSelector
})()

let getParents = (function () {
  function parent (cls, ele) {
    if (!matches.call(ele, cls)) {
      return parent(cls, ele.parentNode)
    } else {
      return ele
    }
  }

  return function (cls) {
    return parent(cls, this)
  }
})()

export { matches, getParents }
