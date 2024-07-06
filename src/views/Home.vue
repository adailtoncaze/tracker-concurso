<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Barra de título -->
    <div class="border-b">
      <div class="container mx-auto py-4 px-8">
        <h1 class="text-2xl font-bold text-btn-filter">Tracker - Rastreador de Concurso Público</h1>
      </div>
    </div>

    <!-- Seção de botões -->
    <div class="bg-white border-b">
      <div class="container mx-auto py-4 px-8 flex justify-between">
        <div class="space-x-4">
          <div class="inline-flex rounded-md shadow-sm" role="group">
            <button
              class="px-4 py-2 text-sm font-medium border border-btn-filter rounded-s-lg hover:bg-btn-filter hover:text-white focus:outline-none"
              :class="{ 'bg-btn-filter text-white': selectedFilter === 'all', 'text-gray-900': selectedFilter !== 'all' }"
              @click="filterConcursos('all')">
              Todos
            </button>
            <button type="button"
              class="px-4 py-2 text-sm font-medium border-t border-b border-btn-filter hover:bg-btn-filter hover:text-white focus:outline-none"
              :class="{ 'bg-btn-filter text-white': selectedFilter === 'realizado', 'text-gray-900': selectedFilter !== 'realizado' }"
              @click="filterConcursos('realizado')">
              Realizado
            </button>
            <button type="button"
              class="px-4 py-2 text-sm font-medium border border-btn-filter rounded-e-lg hover:bg-btn-filter hover:text-white focus:outline-none"
              :class="{ 'bg-btn-filter text-white': selectedFilter === 'a_realizar', 'text-gray-900': selectedFilter !== 'a_realizar' }"
              @click="filterConcursos('a_realizar')">
              A Realizar
            </button>
          </div>
        </div>
        <div>
          <button class="bg-btn-new text-white px-4 py-2 rounded hover:bg-green-700 inline-flex items-center"
            @click="openSidebar">
            <i class="fas fa-swatchbook mr-2"></i>
            Cadastrar Concurso
          </button>

        </div>
      </div>
    </div>

    <!-- Seção de cards -->
    <div class="container mx-auto py-8 px-8">
      <div v-if="filteredConcursos.length > 0" class="mb-8">
        <div class="grid grid-cols-2 gap-8">
          <router-link :to="`/concurso/${concurso.id}`" v-for="(concurso, index) in filteredConcursos" :key="index"
            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="../assets/images/Exams-bro.png" :alt="concurso.cargo" />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-btn-filter-dark">{{ concurso.orgao }}</h5>
              <h5 class="mb-2 text-xl font-bold tracking-tight text-btn-filter">{{ concurso.cargo }}</h5>
              <p class="text-gray-600 mt-8">
                <span class="text-sm">Status:</span> <span :class="{
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': concurso.status === 'realizado',
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300': concurso.status === 'a_realizar'
                }" class="text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                  {{ concurso.status === 'realizado' ? 'Realizado' : 'A Realizar' }}
                </span>
              </p>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-gray-500">Nenhum concurso encontrado.</p>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="relative min-h-screen bg-gray-50">
      <!-- Overlay -->
      <div v-if="isSidebarOpen" class="fixed inset-0 bg-black opacity-50 z-40" @click="closeSidebar"></div>

      <!-- Formulário de Cadastro -->
      <transition name="slide">
        <div v-if="isSidebarOpen" class="fixed inset-y-0 right-0 bg-white shadow-xl w-1/3 z-50 p-4">
          <div class="bg-gray-100">
            <h2 class="text-center text-btn-filter p-4 text-2xl font-bold mb-4">Cadastrar Concurso</h2>
          </div>

          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label class="block text-gray-700">Órgão</label>
              <input v-model="concurso.orgao" type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-btn-filter"
                required>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Cargo</label>
              <input v-model="concurso.cargo" type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-btn-filter"
                required>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Número de Vagas</label>
              <input v-model="concurso.numero_vaga" type="number"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-btn-filter"
                required>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Banca</label>
              <input v-model="concurso.banca" type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-btn-filter"
                required>
            </div>
            <div class="flex flex-wrap -mx-4">
              <!-- Campo Status -->
              <div class="w-full md:w-1/2 px-4 mb-4">
                <label class="block text-gray-700">Status</label>
                <select v-model="concurso.status"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-btn-filter"
                  required>
                  <option value="a_realizar">A Realizar</option>
                  <option value="realizado">Realizado</option>
                </select>
              </div>

              <!-- Campo Data da Prova -->
              <div class="w-full md:w-1/2 px-4 mb-4">
                <label class="block text-gray-700">Data da Prova</label>
                <input v-model="concurso.data_prova" type="date"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-btn-filter"
                  required>
              </div>
            </div>
            <div class="flex justify-end mt-6">
              <button type="submit" class="bg-btn-new text-white px-4 py-2 rounded hover:bg-green-700">
                <i class="fas fa-check-double mr-2"></i>
                Salvar
              </button>
              <button type="button" class="ml-2 bg-btn-filter text-white px-4 py-2 rounded hover:bg-btn-filter-dark"
                @click="closeSidebar">
                <i class="fas fa-circle-left mr-2"></i>
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
        console.error('Erro ao salvar concurso:', error.message);
        return;
      }
      closeSidebar();
      resetForm();
      loadConcursos();
      toast.success('Concurso cadastrado com sucesso!');
    };

    const resetForm = () => {
      concurso.value = {
        orgao: '',
        cargo: '',
        numero_vaga: '',
        banca: '',
        status: 'a_realizar',
        data_prova: ''
      };
    };

    const loadConcursos = async () => {
      const { data, error } = await supabase.from('concursos').select('*').order('data_prova', { ascending: true });
      if (error) {
        console.error('Erro ao buscar concursos:', error.message);
        return;
      }
      concursos.value = data;
      filterConcursos(selectedFilter.value);
    };

    const filterConcursos = (filter) => {
      selectedFilter.value = filter;
      if (filter === 'all') {
        filteredConcursos.value = concursos.value;
      } else if (filter === 'realizado') {
        filteredConcursos.value = concursos.value.filter(concurso => concurso.status === 'realizado');
      } else if (filter === 'a_realizar') {
        filteredConcursos.value = concursos.value.filter(concurso => concurso.status === 'a_realizar');
      }
    };

    onMounted(async () => {
      await loadConcursos();
    });

    return {
      filteredConcursos,
      selectedFilter,
      openSidebar,
      isSidebarOpen,
      concurso,
      closeSidebar,
      submitForm,
      filterConcursos  // Certifique-se de incluir filterConcursos no retorno do setup()
    };
  },
};
</script>


<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
