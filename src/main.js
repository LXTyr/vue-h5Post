// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'animate.css'
import 'font-awesome-webpack'
import router from './router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import { AlertPlugin, LoadingPlugin } from 'vux'

Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.config.productionTip = false

const FastClick = require('fastclick')
FastClick.attach(document.body)
const store = new Vuex.Store({
  state: {
    direction: 'forward',
    formData: {},
    photoSrc: {},
    userInfo: {},
    title: '',
    action: {},
    shareto: {}
  },
  mutations: {
    changeDirection (state) {
      state.direction = (state.direction === 'forward' ? '' : 'forward')
    },
    appendFormData (state, payload) {
      for (let key in payload) {
        state.formData[key] = payload[key]
      }
    },
    initPhotoSrc (state, payload) {
      for (let key in payload) {
        state.photoSrc[key] = payload[key]
      }
    },
    initUserInfo (state, payload) {
      for (let key in payload) {
        state.userInfo[key] = payload[key]
      }
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    },
    updateTitle (state, payload) {
      state.title = payload
    },
    updateAction (state, payload) {
      state.action = payload
    },
    updateShare (state, payload) {
      state.shareto = payload
    }
  }
})

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<router-view/>'
})
