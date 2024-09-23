import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListarAssuntoView from '../views/assunto/ListarAssuntoView.vue'
import CadastrarAssuntoView from '../views/assunto/CadastrarAssuntoView.vue'

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
    { path: '/assunto', name: 'AssuntoPage',
      children: [
        { path: '', name: 'ListarAssuntoPage', component: ListarAssuntoView, },
        { path: 'cadastrar', name: 'CadastrarAssuntoPage', component: CadastrarAssuntoView, },
      ]
    },
  ]
})

export default router
