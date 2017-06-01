import Vue from 'vue'
import VueResource from 'vue-resource'
import {QueryString} from './utils.js'
Vue.use(VueResource)
// let dev = 'http://222.45.42.120:9112/'
let dev = 'http://116.62.167.112/'
let q = QueryString.parse()
export default Vue.resource(dev + 'collegereunion/webEnrol/getPreEnrols', {}, {
  getClass: {method: 'get', url: dev + 'collegereunion/webClass/getClassList'},
  getTime: {method: 'get', url: dev + 'collegereunion/webEnrol/getPreEnrolTimeList'},
  postData: {method: 'post', url: dev + 'collegereunion/webEnrol/savePreEnrol'},
  getName: {method: 'post', url: dev + 'collegereunion/webEnrol/checkName'},
  getCode: {method: 'post', url: dev + 'collegereunion/webUser/getCode'},
  postBind: {method: 'post', url: dev + 'collegereunion/webUser/bindUser'},
  postPhone: {method: 'post', url: dev + 'collegereunion/webUser/checkPhone'},
  postId: {method: 'post', url: dev + 'collegereunion/webUser/checkUser'},
  getUser: {method: 'get', url: dev + 'collegereunion/webUser/getUser'}
}, {headers: {Token: q.Token}, emulateJSON: true})
