import Vue from 'vue'
import VueResource from 'vue-resource'
import {QueryString} from './utils.js'
Vue.use(VueResource)
// let dev = 'http://222.45.42.120:9112/'
let dev = 'http://192.168.1.66:8080/'
let q = QueryString.parse()
export default Vue.resource(dev + 'collegereunion/moment/addMoment', {}, {
  postUpload: {method: 'post'}
}, {headers: {Token: q.Token}})
