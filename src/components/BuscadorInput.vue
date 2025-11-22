<template>
  <div class="relative flex items-center max-w-full gap-2">
    <input v-model="busqueda" id="buscador" class="flex-1 min-w-0 p-2 bg-white border rounded-lg border-slate-300 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1 h-9" placeholder="Burcar" type="text" name="buscador" autocomplete="off" />
    <label for="buscador" class="grid place-items-center bg-indigo-400 rounded-lg h-9 w-9 text-lg cursor-pointer hover:opacity-50 active:scale-95 transition-all duration-300">
      <i class="fi-rr-search text-white grid place-items-center"></i>
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const busqueda = ref('');
const emits = defineEmits(['buscar']);

watch(() => busqueda.value, (nuevoValor) => {
  emits('buscar', nuevoValor);
});
</script>