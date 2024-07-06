<template>
    <div class="estatisticas">
      <h1>Estatísticas de Desempenho</h1>
      <div v-if="desempenho.length">
        <div v-for="item in desempenho" :key="item.id" class="desempenho-item">
          <h2>{{ item.concurso.nome }} - {{ item.area }}</h2>
          <p>Total de Questões: {{ item.total_questoes }}</p>
          <p>Acertos: {{ item.acertos }}</p>
          <p>Erros: {{ item.erros }}</p>
        </div>
      </div>
      <p v-else>Nenhum desempenho registrado.</p>
    </div>
  </template>
  
  <script>
  import { supabase } from '../supabase'
  
  export default {
    name: "estatisticas-concurso",
    data() {
      return {
        desempenho: []
      }
    },
    async created() {
      const { data, error } = await supabase
        .from('desempenho')
        .select('*, concurso:concursos(nome)')
      
      if (error) {
        alert('Erro ao buscar desempenho: ' + error.message)
      } else {
        this.desempenho = data
      }
    }
  }
  </script>
  
  <style scoped>
  .estatisticas {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  .desempenho-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  </style>
  