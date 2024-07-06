<template>
  <div class="detalhes-concurso">
    <h1>Detalhes do Concurso</h1>
    <form @submit.prevent="atualizarConcurso">
      <div>
        <label for="nome">Nome:</label>
        <input type="text" v-model="concurso.nome" required />
      </div>
      <div>
        <label for="orgao">Órgão:</label>
        <input type="text" v-model="concurso.orgao" required />
      </div>
      <div>
        <label for="dataProva">Data da Prova:</label>
        <input type="date" v-model="concurso.data_prova" required />
      </div>
      <div>
        <label for="dataInscricaoInicio">Data de Início da Inscrição:</label>
        <input type="date" v-model="concurso.data_inscricao_inicio" required />
      </div>
      <div>
        <label for="dataInscricaoFim">Data de Fim da Inscrição:</label>
        <input type="date" v-model="concurso.data_inscricao_fim" required />
      </div>
      <div>
        <label for="status">Status:</label>
        <select v-model="concurso.status">
          <option value="realizado">Realizado</option>
          <option value="a_realizar">A Realizar</option>
        </select>
      </div>
      <div>
        <label for="localProva">Local da Prova:</label>
        <input type="text" v-model="concurso.local_prova" required />
      </div>
      <div>
        <label for="observacoes">Observações:</label>
        <textarea v-model="concurso.observacoes"></textarea>
      </div>
      <button type="submit">Atualizar</button>
      <button @click="deletarConcurso">Deletar</button>
    </form>
  </div>
</template>

<script>
import { supabase } from '../supabase'

export default {
  data() {
    return {
      concurso: {}
    }
  },
  async created() {
    const { id } = this.$route.params
    const { data: concurso, error } = await supabase
      .from('concursos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      alert('Erro ao buscar concurso: ' + error.message)
    } else {
      this.concurso = concurso
    }
  },
  methods: {
    async atualizarConcurso() {
      const { id } = this.$route.params
      const { error } = await supabase
        .from('concursos')
        .update(this.concurso)
        .eq('id', id)

      if (error) {
        alert('Erro ao atualizar concurso: ' + error.message)
      } else {
        alert('Concurso atualizado com sucesso!')
      }
    },
    async deletarConcurso() {
      const { id } = this.$route.params
      const { error } = await supabase
        .from('concursos')
        .delete()
        .eq('id', id)

      if (error) {
        alert('Erro ao deletar concurso: ' + error.message)
      } else {
        alert('Concurso deletado com sucesso!')
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.detalhes-concurso {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
