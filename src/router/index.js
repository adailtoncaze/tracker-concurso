import { createRouter, createWebHistory } from 'vue-router'
import DetalhesConcurso from '../views/DetalhesConcurso.vue'
import Estatisticas from '../views/Estatisticas.vue'
import Desempenho from '../views/DesempenhoConcurso.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },  

  {
    path: '/concurso/:id',
    name: 'DetalhesConcurso',
    component: DetalhesConcurso
  },
  {
    path: '/desempenho/:id',
    name: 'Desempenho',
    component: Desempenho
  },
  {
    path: '/estatisticas',
    name: 'Estatisticas',
    component: Estatisticas
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
