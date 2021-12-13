import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('../views/home.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
