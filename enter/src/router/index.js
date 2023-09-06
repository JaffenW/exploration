import { createRouter, createWebHistory } from 'vue-router'
import Webcome from '@/views/common/welcome'
import Layout from '@/views/common/layout'
import System from '@/views/manage/system.vue'
import Menu from '@/views/manage/menu.vue'
import Login from '@/views/common/login'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        meta: {
          title: '欢迎您'
        },
        component: Webcome
      }
    ]
  },
  {
    path: '/manage',
    name: 'manage',
    component: Layout,
    children: [
      {
        path: '/system',
        name: 'system',
        meta: {
          title: '系统管理'
        },
        component: System
      },
      {
        path: '/menu',
        name: 'menu',
        meta: {
          title: '菜单管理'
        },
        component: Menu
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '用户管理'
        },
        component: import('@/views/manage/user')
      },
      {
        path: '/roles',
        name: 'roles',
        meta: {
          title: '角色管理'
        },
        component: import('@/views/manage/roles')
      },
      {
        path: '/authority',
        name: 'authority',
        meta: {
          title: '资源授权'
        },
        component: import('@/views/manage/authority')
      },
      {
        path: '/mould',
        name: 'mould',
        meta: {
          title: '模板配置'
        },
        component: import('@/views/manage/mould')
      },
      {
        path: '/resource',
        name: 'resource',
        meta: {
          title: '资源配置'
        },
        component: import('@/views/manage/resource')
      }
    ]
  },
  {
    path: '/shape',
    name: 'shape',
    component: Layout,
    children: [
      {
        path: 'bionicButton',
        name: 'bionicButtom',
        meta: {
          title: '拟态框'
        },
        component: import('@/views/shape/bionic-button')
      },
      {
        path: 'shadow',
        name: 'shadow',
        meta: {
          title: '阴影'
        },
        component: import('@/views/shape/shadow')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: Login
  },
  {
    path: '/updatePassword',
    name: 'updatePassword',
    meta: {
      title: '修改密码'
    },
    component: import('@/views/common/update-password')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
