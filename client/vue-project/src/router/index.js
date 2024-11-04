import { createRouter, createWebHistory } from 'vue-router'
import ArticlesView from '../views/ArticlesView.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import ProfileView from '../views/ProfileView.vue'
import ClientsView from '../views/ClientsView.vue'
import HomeView from '@/views/HomeView.vue'
import CartView from '@/views/CartView.vue'
import BonReductionView from '@/views/BonReductionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    }
    ,
    {
      path: '/myProfile',
      name: 'profile',
      component: ProfileView
    }
    ,
    {
      path: '/clients',
      name: 'clients',
      component: ClientsView
    }
    ,
    {
      path: '/cart',
      name: 'panier',
      component: CartView
    }
    ,
    {
      path: '/GestionBonReduction',
      name: 'GestionBonReduction',
      component: BonReductionView
    }
  ]
})

export default router
