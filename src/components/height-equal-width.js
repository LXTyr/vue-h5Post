import Vue from 'vue'

Vue.directive('height-equal-width', {
  inserted: function (el) {
    let itemWidth = el.clientWidth
    el.style.height = itemWidth + 'px'
  }
})
