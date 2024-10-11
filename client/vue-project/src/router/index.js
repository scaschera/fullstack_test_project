import { createRouter, createWebHistory } from 'vue-router'
import ArticlesView from '../views/ArticlesView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
