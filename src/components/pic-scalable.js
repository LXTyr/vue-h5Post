import touch from 'touchjs'

export let PicScalableDirective = {
  bind: function (el, binding, vnode) {
    touch.on(el, 'tap', function () {
      console.log('tap')
      vnode.context.showDialog = false
    })
  },
  unbind: function (el) {
    // touch.off(el, 'tap', 'img', tapHandler)
  }
}

// function tapHandler () {
//   console.log('tap')
// }
