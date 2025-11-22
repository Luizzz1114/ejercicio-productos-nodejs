<template>
  <div class="flex flex-col overflow-auto text-sm border rounded-lg border-slate-300">
    <table class="w-full">
      <thead class="sticky top-0 z-60 bg-slate-50">
        <tr class="font-bold text-slate-500">
          <th class="p-2">N°</th>
          <th v-for="(columna, index) in columnas" :key="index" class="p-2 text-start">{{ columna.nombre }}</th>
          <th class="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="dataPaginada.length === 0" class="bg-white border-b border-b-slate-200">
          <td :colspan="columnas.length + 2" class="p-2 text-center text-slate-500">No hay registros disponibles</td>
        </tr>
        <tr v-else v-for="(item, index) in dataPaginada" :key="item.id" class="bg-white border-b border-b-slate-200">
          <td class="p-1 text-center">{{ calcularNumeroFila(index) }}</td>
          <td v-for="columna in columnas" :key="columna.nombre" class="py-1.5 px-2">
            <CeldaRender :columna="columna" :item="item" />
          </td>
          <td class="py-1.5 px-2">
            <div class="relative flex items-center justify-center gap-2">
              <BotonTabla @ver="ver(item.id)" @actualizar="actualizar(item.id)" @eliminar="eliminar(item.id)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="sticky bottom-0 left-0 z-40 flex flex-wrap items-center justify-center gap-2 p-2 bg-white border-t border-slate-300 sm:justify-between">
      <div class="hidden items-center gap-1.5 mx-2 sm:flex">
        <span>Mostrando</span>
        <span class="font-bold">{{ dataFiltrada.length === 0 ? '0' : ((paginaActual - 1) * itemsPorPagina + 1) + ' - ' + ((paginaActual - 1) * itemsPorPagina + dataPaginada.length) }} de {{ dataFiltrada.length }}</span>
        <span>registros</span>
      </div>
      <div class="flex items-center gap-2.5">
        <div class="relative items-center hidden sm:flex">
          <i class="absolute grid fi-sr-bars-sort place-items-center top-[30%] left-2.5 pointer-events-none"></i>
          <select v-model.number="itemsPorPagina" name="items-por-pagina" class="px-2 bg-white border rounded-lg appearance-none cursor-pointer ps-8 pe-8 h-9 border-slate-300 sm:block outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <i class="absolute grid pointer-events-none fi-rr-angle-small-down place-items-center right-2 text-slate-400"></i>
        </div>
        <button @click="paginaActual > 1 ? paginaActual-- : paginaActual" :class="['flex border border-transparent items-center justify-center gap-2 px-2.5 h-9 cursor-pointer text-indigo-400 hover:bg-indigo-50 hover:border-indigo-300 rounded-lg duration-200 ease-in-out', { 'text-slate-600 opacity-50 pointer-events-none': paginaActual <= 1 }]">
          <i class="grid place-items-center fi-sr-angle-small-left"></i>
          <span class="hidden md:block">Anterior</span>
        </button>       
        <span class="w-[75px] flex items-center justify-center px-2 bg-white border rounded-lg border-slate-100 h-9">{{ dataFiltrada.length === 0 ? '0' : paginaActual }} de {{ totalPaginas }}</span>
        <button @click="paginaActual < totalPaginas ? paginaActual++ : paginaActual" :class="['flex border border-transparent items-center justify-center gap-2 px-2.5 h-9 cursor-pointer text-indigo-400 hover:bg-indigo-50 hover:border-indigo-300 rounded-lg duration-200 ease-in-out', { 'text-slate-600 opacity-50 pointer-events-none': paginaActual >= totalPaginas }]">
          <span class="hidden md:block">Siguiente</span>
          <i class="grid place-items-center fi-sr-angle-small-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import CeldaRender from './CeldaRender.vue';
import BotonTabla from './BotonTabla.vue';

// -- CONFIGURACIÓN DE TABLA --
const props = defineProps({
  data: Object,
	columnas: Object,
  busqueda: {
    type: String,
    default: '',
  }
});

const itemsPorPagina = ref(10);
const paginaActual = ref(1);
const busqueda = ref('');

function calcularNumeroFila(index) {
  return (paginaActual.value - 1) * itemsPorPagina.value + index + 1;
}

const dataFiltrada = computed(() => {
  if(!props.busqueda) return props.data;
  const busquedaFormateada = props.busqueda.toLowerCase();
  return props.data.filter(item => {
    return props.columnas.some(columna => {
      const valor = item[columna.field];
      return valor && valor.toString().toLowerCase().includes(busquedaFormateada);
    });
  });
});

const totalPaginas = computed(() => {
  return Math.ceil(dataFiltrada.value.length / itemsPorPagina.value);
});

const dataPaginada = computed(() => {
  const inicio = (paginaActual.value - 1) * itemsPorPagina.value;
  const fin = inicio + itemsPorPagina.value;
  return dataFiltrada.value.slice(inicio, fin);
});

watch([itemsPorPagina, busqueda], () => {
  paginaActual.value = 1;
});

// -- EVENTOS CRUD --
const emits = defineEmits(['ver', 'actualizar', 'eliminar']);

const ver = (id) => {
  emits('ver', id);
}

const actualizar = (id) => {
  emits('actualizar', id)
}

const eliminar = (id) => {
  emits('eliminar', id);
}
</script>