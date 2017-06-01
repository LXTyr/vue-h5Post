import Vue from 'vue'

Vue.directive('autofocus', {
  inserted: function (el, { value }) {
    el.focus()
  },
  unbind: function (el) {
  }
})
