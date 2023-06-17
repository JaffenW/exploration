import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/layout/Index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
