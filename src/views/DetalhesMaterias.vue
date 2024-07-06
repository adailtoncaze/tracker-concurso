<template>
    <div class="container mx-auto py-8 px-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Desempenho por Matéria</h1>
  
      <!-- Feedback de Salvar -->
      <div v-if="mensagem" :class="{'text-green-500': sucesso, 'text-red-500': !sucesso}" class="mb-4">
        {{ mensagem }}
      </div>
  
      <div class="bg-white p-4 border rounded shadow">
        <h2 class="text-lg font-bold mb-4">Adicionar Desempenho por Matéria</h2>
        <form @submit.prevent="adicionarMateria">
          <div class="grid grid-cols-2 gap-4">
            <div class="mb-4">
              <label class="block text-gray-700">Matéria:</label>
              <input v-model="novaMateria.materia" type="text" class="mt-1 block w-full border rounded px-3 py-2"/>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Acertos:</label>
              <input v-model="novaMateria.acertos" type="number" class="mt-1 block w-full border rounded px-3 py-2"/>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Erros:</label>
              <input v-model="novaMateria.erros" type="number" class="mt-1 block w-full border rounded px-3 py-2"/>
            </div>
            <div class="col-span-2">
              <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">Adicionar Matéria</button>
            </div>
          </div>
        </form>
      </div>
  
      <div v-if="desempenhoMaterias.length > 0" class="bg-white p-4 border rounded shadow mt-4">
        <h2 class="text-lg font-bold mb-4">Desempenho por Matéria</h2>
        <div v-for="(materia, index) in desempenhoMaterias" :key="index" class="mb-4 p-4 border rounded shadow">
          <div class="flex justify-between">
            <div>
              <p class="font-semibold text-gray-700">{{ materia.materia }}</p>
              <p>Acertos: {{ materia.acertos }}</p>
              <p>Erros: {{ materia.erros }}</p>
            </div>
            <div>
              <button @click="removerMateria(index)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remover</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-gray-500">Nenhuma matéria adicionada.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { supabase } from '../main';
  
  export default {
    name: 'DetalhesMaterias',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const desempenhoId = route.params.id;
      const desempenhoMaterias = ref([]);
      const novaMateria = ref({
        materia: '',
        acertos: 0,
        erros: 0,
      });
      const mensagem = ref('');
      const sucesso = ref(false);
  
      const adicionarMateria = async () => {
        const materiaParaSalvar = {
          ...novaMateria.value,
          concurso_id: desempenhoId
        };
        const { data, error } = await supabase.from('desempenho_materias').insert([materiaParaSalvar]);
        if (error) {
          mensagem.value = 'Erro ao salvar desempenho por matéria: ' + error.message;
          sucesso.value = false;
        } else {
          mensagem.value = 'Desempenho por matéria adicionado com sucesso!';
          sucesso.value = true;
          desempenhoMaterias.value.push(materiaParaSalvar);
          limparFormulario();
        }
      };
  
      const removerMateria = async (index) => {
        const materiaParaRemover = desempenhoMaterias.value[index];
        const { error } = await supabase.from('desempenho_materias').delete().eq('id', materiaParaRemover.id);
        if (error) {
          mensagem.value = 'Erro ao remover desempenho por matéria: ' + error.message;
          sucesso.value = false;
        } else {
          mensagem.value = 'Desempenho por matéria removido com sucesso!';
          sucesso.value = true;
          desempenhoMaterias.value.splice(index, 1);
        }
      };
  
      const limparFormulario = () => {
        novaMateria.value.materia = '';
        novaMateria.value.acertos = 0;
        novaMateria.value.erros = 0;
      };
  
      return {
        desempenhoMaterias,
        novaMateria,
        adicionarMateria,
        removerMateria,
        mensagem,
        sucesso,
      };
    },
  };
  </script>
  
  <style>
  /* Estilos opcionais conforme necessário */
  </style>
  