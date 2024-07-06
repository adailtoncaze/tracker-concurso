<template>
    <div class="container mx-auto py-8 px-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Desempenho do Concurso</h1>
  
      <!-- Feedback de Salvar -->
      <div v-if="mensagem" :class="{'text-green-500': sucesso, 'text-red-500': !sucesso}" class="mb-4">
        {{ mensagem }}
      </div>
  
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Mestre -->
        <div class="col-span-1 md:col-span-1">
          <div class="bg-white p-4 border rounded shadow">
            <h2 class="text-lg font-bold mb-4">Resumo do Desempenho</h2>
            <form @submit.prevent="salvarResumo">
              <div class="grid grid-cols-2 gap-4">
                <div class="mb-4 col-span-2">
                  <label class="block text-gray-700">Pontuação Total:</label>
                  <input v-model="desempenho.pontuacao_total" type="number" class="mt-1 block w-full border rounded px-3 py-2"/>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700">Acertos:</label>
                  <input v-model="desempenho.acertos" type="number" class="mt-1 block w-full border rounded px-3 py-2"/>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700">Erros:</label>
                  <input v-model="desempenho.erros" type="number" class="mt-1 block w-full border rounded px-3 py-2"/>
                </div>
                <div class="col-span-2">
                  <label class="block text-gray-700">Percentual de Acertos:</label>
                  <input :value="calcularPercentualAcertos()" type="text" readonly class="mt-1 block w-full border rounded px-3 py-2 bg-gray-100"/>
                </div>
                <div class="col-span-2">
                  <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Salvar Resumo</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { supabase } from '../main';
  
  export default {
    name: 'DesempenhoConcurso',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const desempenho = ref({
        concurso_id: route.params.id,
        pontuacao_total: 0,
        acertos: 0,
        erros: 0,
      });
      const mensagem = ref('');
      const sucesso = ref(false);
  
      const salvarResumo = async () => {
        desempenho.value.percentual_acertos = calcularPercentualAcertos();
        try {
          const { data, error } = await supabase.from('desempenho').insert([desempenho.value]);
          if (error) {
            throw new Error('Erro ao salvar resumo do desempenho: ' + error.message);
          }
          
          if (data && data.length > 0 && data[0].id) {
            mensagem.value = 'Resumo do desempenho salvo com sucesso!';
            sucesso.value = true;
            
            // Obter o ID do desempenho salvo
            const desempenhoId = data[0].id;
            
            // Redirecionar para a página de detalhes de matérias, passando o ID do desempenho salvo
            router.push({ name: 'DetalhesMaterias', params: { id: desempenhoId } });
          } else {
            throw new Error('ID do desempenho salvo não encontrado.');
          }
        } catch (err) {
          mensagem.value = err.message;
          sucesso.value = false;
        }
      };
  
      const calcularPercentualAcertos = () => {
        if (desempenho.value.acertos + desempenho.value.erros === 0) return 0;
        return ((desempenho.value.acertos / (desempenho.value.acertos + desempenho.value.erros)) * 100).toFixed(2);
      };
  
      return {
        desempenho,
        salvarResumo,
        calcularPercentualAcertos,
        mensagem,
        sucesso,
      };
    },
  };
  </script>
  
  <style>
  /* Estilos opcionais conforme necessário */
  </style>
  