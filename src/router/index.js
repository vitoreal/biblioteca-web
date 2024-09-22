import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AssuntoView from '../views/AssuntoView.vue'
import AutorView from '../views/AutorView.vue'
import LivrosView from '../views/LivrosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/livros',
      name: 'livros',
      component: LivrosView
    },
    {
      path: '/autor',
      name: 'autor',
      component: AutorView
    },
    {
      path: '/assunto',
      name: 'assunto',
      component: AssuntoView
    }
  ]
})

export default router
