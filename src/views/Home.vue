<template>
  <div class="flex flex-col h-screen">
    <!-- Barra de título -->
    <div class="py-4 border-b sticky top-0 bg-btn-new">
      <div class="container mx-auto">
        <img src="../assets/logo2.svg" alt="Tracker Logo" class="h-12">
      </div>
    </div>
    
    <!-- Seção de botões -->
<div class="container mx-auto mt-8 px-4 sm:px-0 md:px-4">
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
    <div class="w-full sm:w-auto">
      <div class="flex flex-wrap rounded-md shadow-sm" role="group">
        <button
          class="flex-grow sm:flex-grow-0 px-4 py-2 text-sm font-medium border border-btn-filter rounded-s-lg hover:bg-btn-filter hover:text-white focus:outline-none"
          :class="{ 'bg-btn-filter text-white': selectedFilter === 'all', 'text-gray-900': selectedFilter !== 'all' }"
          @click="filterConcursos('all')">
          Todos
        </button>
        <button
          class="flex-grow sm:flex-grow-0 px-4 py-2 text-sm font-medium border-t border-b border-btn-filter hover:bg-btn-filter hover:text-white focus:outline-none"
          :class="{ 'bg-btn-filter text-white': selectedFilter === 'realizado', 'text-gray-900': selectedFilter !== 'realizado' }"
          @click="filterConcursos('realizado')">
          Realizado
        </button>
        <button
          class="flex-grow sm:flex-grow-0 px-4 py-2 text-sm font-medium border border-btn-filter rounded-e-lg hover:bg-btn-filter hover:text-white focus:outline-none"
          :class="{ 'bg-btn-filter text-white': selectedFilter === 'a_realizar', 'text-gray-900': selectedFilter !== 'a_realizar' }"
          @click="filterConcursos('a_realizar')">
          A Realizar
        </button>
      </div>
    </div>
    <div class="w-full sm:w-auto">
      <button class="w-full sm:w-auto bg-btn-new text-white px-4 py-2 rounded hover:bg-green-600 items-center"
        @click="openSidebar">
        <i class="fas fa-swatchbook mr-2"></i>
        Novo Concurso
      </button>
    </div>
  </div>
</div>

   
    <!-- Seção de cards -->
    <div class="container mx-auto flex-grow overflow-hidden mt-8">
      <div v-if="filteredConcursos.length > 0" class="cards-container mb-8 overflow-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8 mb-8 px-4 sm:px-0 md:px-4">
          <router-link :to="`/concurso/${concurso.id}`" v-for="(concurso, index) in filteredConcursos" :key="index"
            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-stone-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="../assets/images/Exams-bro.png" :alt="concurso.cargo" />
            <div class="flex flex-col justify-between w-full p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-btn-filter-dark">{{ concurso.orgao }}</h5>
              <h5 class="mb-2 text-xl font-bold tracking-tight text-btn-filter">{{ concurso.cargo }}</h5>
              <div class="flex justify-between w-full mt-8">
                <div>
                  <span class="text-sm me-2">Status:</span>
                  <span :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': concurso.status === 'realizado',
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300': concurso.status === 'a_realizar'
                  }" class="text-xs font-medium px-2.5 py-0.5 rounded">
                    {{ concurso.status === 'realizado' ? 'Realizado' : 'A Realizar' }}
                  </span>
                </div>
                <div class="mr-4">
                  <span class="text-sm me-2 text-gray-00"><i class="fas fa-calendar-days"></i></span>
                  <span class="text-sm text-gray-500">{{ new Date(concurso.data_prova).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC'
                  }) }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-gray-500">Nenhum concurso encontrado.</p>
      </div>
    </div>


    <!-- Sidebar -->
    <div class="relative bg-stone-100">
      <!-- Overlay -->
      <div v-if="isSidebarOpen" class="fixed inset-0 bg-black opacity-50 z-40" @click="closeSidebar"></div>

      <!-- Formulário de Cadastro -->
      <transition name="slide">
        <div v-if="isSidebarOpen" class="fixed inset-y-0 right-0 bg-stone-100 shadow-xl w-full md:w-1/2 z-50 p-8">
          <div>
            <h2 class="text-btn-new text-3xl font-medium mb-4">Novo Concurso</h2>
          </div>

          <form @submit.prevent="submitForm">
            <div class="mb-1">
              <label class="block text-gray-700">Órgão</label>
              <input v-model="concurso.orgao" type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-btn-filter"
                required>
            </div>
            <div class="mb-1">
              <label class="block text-gray-700">Cargo</label>
              <input v-model="concurso.cargo" type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-btn-filter"
                required>
            </div>
            <div class="flex flex-wrap -mx-4">
              <div class="w-full md:w-1/2 px-4 mb-1">
                <label class="block text-gray-700">Número de Vagas</label>
                <input v-model="concurso.numero_vaga" type="number"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-btn-filter"
                  required>
              </div>
              <div class="w-full md:w-1/2 px-4 mb-1">
                <label class="block text-gray-700">Banca</label>
                <input v-model="concurso.banca" type="text"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-btn-filter"
                  required>
              </div>
            </div>

            <div class="flex flex-wrap -mx-4">
              <!-- Campo Data da Prova -->
              <div class="w-full md:w-1/2 px-4 mb-1">
                <label class="block text-gray-700">Data da Prova</label>
                <input v-model="concurso.data_prova" type="date"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-btn-filter"
                  required>
              </div>
              <!-- Campo Status -->
              <div class="w-full md:w-1/2 px-4 mb-1">
                <label class="block text-gray-700">Status</label>
                <select v-model="concurso.status"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-btn-filter"
                  required>
                  <option value="a_realizar">A Realizar</option>
                  <option value="realizado">Realizado</option>
                </select>
              </div>
            </div>
            <div class="absolute inset-x-0 bottom-4 flex justify-end px-4">
              <button type="submit" class="bg-btn-new text-white px-4 py-2 rounded hover:bg-green-600">
                <i class="fas fa-check-double mr-2"></i>
                Salvar
              </button>
              <button type="button" class="ml-2 bg-btn-filter text-white px-4 py-2 rounded hover:bg-btn-filter-dark"
                @click="closeSidebar">
                <i class="fas fa-circle-right mr-2"></i>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { supabase } from '../main';
import { useToast } from 'vue-toastification';

export default {
  name: 'HomeConcurso',

  setup() {
    const toast = useToast();
    const isSidebarOpen = ref(false);
    const concursos = ref([]);
    const filteredConcursos = ref([]);
    const selectedFilter = ref('all');
    const concurso = ref({
      orgao: '',
      cargo: '',
      numero_vaga: '',
      banca: '',
      status: 'a_realizar',
      data_prova: ''
    });

    const openSidebar = () => {
      isSidebarOpen.value = true;
    };

    const closeSidebar = () => {
      isSidebarOpen.value = false;
    };

    const submitForm = async () => {
      const { error } = await supabase.from('concursos').insert([concurso.value]);

      if (error) {
        toast.error('Erro ao cadastrar concurso.');
      } else {
        toast.success('Concurso cadastrado com sucesso!');
        fetchConcursos();
        closeSidebar();
        concurso.value = {
          orgao: '',
          cargo: '',
          numero_vaga: '',
          banca: '',
          status: 'a_realizar',
          data_prova: ''
        };
      }
    };

    const fetchConcursos = async () => {
      const { data, error } = await supabase.from('concursos').select('*').order('data_prova');

      if (error) {
        toast.error('Erro ao buscar concursos.');
      } else {
        concursos.value = data;
        filterConcursos(selectedFilter.value);
      }
    };

    const filterConcursos = (filter) => {
      selectedFilter.value = filter;
      if (filter === 'all') {
        filteredConcursos.value = concursos.value;
      } else {
        filteredConcursos.value = concursos.value.filter((concurso) => concurso.status === filter);
      }
    };

    onMounted(() => {
      fetchConcursos();
    });

    return {
      isSidebarOpen,
      concursos,
      filteredConcursos,
      selectedFilter,
      concurso,
      openSidebar,
      closeSidebar,
      submitForm,
      filterConcursos
    };
  }
};
</script>

<style>
.cards-container {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
  overflow-y: scroll;
  height: 100%;
  /* Ensure it takes full height of its container */
}

.cards-container::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}
</style>