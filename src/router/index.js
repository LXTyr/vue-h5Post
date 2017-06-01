import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import Success from '@/pages/Success'
import BindPage from '@/pages/BindPage'
import BindPage2 from '@/pages/BindPage2'
import BindSuccess from '@/pages/BindSuccess'
import MyInfo from '@/pages/MyInfo'
import MyDetail2003 from '@/pages/MyDetail2003'
import MyDetail2007 from '@/pages/MyDetail2007'
import UserRoutes from './user'
Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'index',
    component: App
  },
  {
    path: '/success',
    name: 'success',
    component: Success
  },
  {
    path: '/bind',
    name: 'bind',
    component: BindPage
  },
  {
    path: '/bind2',
    name: 'bind2',
    component: BindPage2
  },
  {
    path: '/bind-success',
    name: 'bindSuccess',
    component: BindSuccess
  },
  {
    path: '/myinfo',
    name: 'myInfo',
    component: MyInfo
  },
  {
    path: '/detail-2003',
    name: 'detail2003',
    component: MyDetail2003
  },
  {
    path: '/detail2007',
    name: 'detail2007',
    component: MyDetail2007
  }
]

routes = routes.concat(UserRoutes)
routes.push({
  path: '/**',
  name: 'unknown',
  redirect: '/'
})

export default new Router({
  routes: routes
})
