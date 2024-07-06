<template>
    <div class="lista-concursos">
      <h1>Concursos</h1>
      <router-link to="/cadastro">Cadastrar Novo Concurso</router-link>
      <ul v-if="concursos.length">
        <li v-for="concurso in concursos" :key="concurso.id">
          <router-link :to="'/concurso/' + concurso.id">
            {{ concurso.nome }} - {{ concurso.orgao }} - {{ concurso.data_prova }}
          </router-link>
        </li>
      </ul>
      <p v-else>Nenhum concurso cadastrado.</p>
    </div>
  </template>
  
  <script>
  import { supabase } from '../supabase'
  
  export default {
    name: "lista-concursos",
    data() {
      return {
        concursos: []
      }
    },
    async created() {
      const { data, error } = await supabase
        .from('concursos')
        .select('*')
  
      if (error) {
        alert('Erro ao buscar concursos: ' + error.message)
      } else {
        this.concursos = data
      }
    }
  }
  </script>
  
  <style scoped>
  .lista-concursos {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  </style>
  