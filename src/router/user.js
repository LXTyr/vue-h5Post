import Vue from 'vue'
import Router from 'vue-router'
import User from '@/pages/user/User'
import Me from '@/pages/user/Me'
import InfoEdit from '@/pages/user/InfoEdit'
import Messages from '@/pages/user/Messages'
import WhoCanRead from '@/pages/user/WhoCanRead'

Vue.use(Router)

export default [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        path: '',
        component: Me
      },
      {
        path: 'new-moment',
        name: 'new',
        component: InfoEdit,
        meta: {}
      },
      {
        path: 'messages',
        name: 'messages',
        component: Messages
      },
      {
        path: 'shareto',
        name: 'shareto',
        component: WhoCanRead
      }
    ]
  }
]
