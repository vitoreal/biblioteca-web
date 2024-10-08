import { createRouter, createWebHistory } from 'vue-router'

// Assunto
import ListarAssuntoView from '../views/assunto/ListarAssuntoView.vue'
import CadastrarAssuntoView from '../views/assunto/CadastrarAssuntoView.vue'
import EditarAssuntoView from '@/views/assunto/EditarAssuntoView.vue'

// Autor
import ListarAutorView from '@/views/autor/ListarAutorView.vue'
import CadastrarAutorView from '@/views/autor/CadastrarAutorView.vue'
import EditarAutorView from '@/views/autor/EditarAutorView.vue'

// Livro
import ListarLivroView from '@/views/livros/ListarLivroView.vue'
import CadastrarLivroView from '@/views/livros/CadastrarLivroView.vue'
import EditarLivroView from '@/views/livros/EditarLivroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ListarLivroView
    },
    { path: '/livro', name: 'LivroPage',
      children: [
        { path: '', name: 'ListarLivroView', component: ListarLivroView, },
        { path: 'cadastrar', name: 'CadastrarLivroView', component: CadastrarLivroView, },
        { path: 'editar/:id', name: 'EditarLivroView', component: EditarLivroView, },
      ]
    },
    { path: '/autor', name: 'AutorPage',
      children: [
        { path: '', name: 'ListarAutorView', component: ListarAutorView, },
        { path: 'cadastrar', name: 'CadastrarAutorView', component: CadastrarAutorView, },
        { path: 'editar/:id', name: 'EditarAutorView', component: EditarAutorView, },
      ]
    },
    { path: '/assunto', name: 'AssuntoPage',
      children: [
        { path: '', name: 'ListarAssuntoView', component: ListarAssuntoView, },
        { path: 'cadastrar', name: 'CadastrarAssuntoView', component: CadastrarAssuntoView, },
        { path: 'editar/:id', name: 'EditarAssuntoView', component: EditarAssuntoView, },
      ]
    },
  ]
})

export default router
