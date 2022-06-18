import { createRouter, createWebHashHistory } from 'vue-router'
// 导入nprogress
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 定义路由信息数组
const routes = [
  // 首页
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/index.vue')
  },
  // 登录页
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  // 布局页
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('../views/layout.vue'),
    // 二级路由
    children: [
      {
        path: 'role',
        name: 'Role',
        component: () => import('../views/role/Role.vue')
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('../views/admin/Admin.vue')
      },
      {
        path: 'auth',
        name: 'Auth',
        component: () => import('../views/auth/Auth.vue')
      }
    ]
  }
]

// 创建路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 定义路由导航前置守卫
router.beforeEach((to, from, next) => {
  nprogress.start()
  next()
})
// 定义路由导航后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})

export default router
