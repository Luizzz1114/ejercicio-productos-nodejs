<template>
  <div ref="wrapper" class="relative">
    <button @click="toggle" type="button" :class="mostrar ? 'bg-slate-100' : 'bg-white'" class="relative grid w-8 h-8 duration-200 rounded-lg cursor-pointer place-items-center active:scale-95 hover:opacity-50 hover:border-slate-300 border border-transparent">
      <i class="fi-rr-menu-dots grid text-lg text-stale-500 place-items-center"></i>
    </button>
    <transition name="fade">   
      <div ref="popover" v-if="mostrar" class="absolute top-0 z-50 text-sm origin-top-right bg-white border rounded-lg shadow-md border-slate-300 right-10">
        <ul class="flex flex-col justify-center p-0.5 gap-y-1 w-28">
          <li v-if="origen !== 'Usuarios'">
            <button type="button" @click="$emit('ver')" class="w-full h-full rounded-md px-2 py-0.5 cursor-pointer text-start hover:bg-slate-100 active:scale-95 transition-all duration-300 ease-in-out">Detalles</button>
          </li>
          <li>
            <button type="button" @click="$emit('actualizar')" class="w-full h-full rounded-md px-2 py-0.5 cursor-pointer text-start hover:bg-slate-100 active:scale-95 transition-all duration-300 ease-in-out">Actualizar</button>
          </li>
          <li>
            <button type="button" @click="$emit('eliminar')" class="w-full h-full rounded-md px-2 py-0.5 cursor-pointer text-start text-red-400 hover:bg-red-100 active:scale-95 transition-all duration-300 ease-in-out">Eliminar</button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, inject } from 'vue';

const mostrar = ref(false);
const wrapper = ref(null);
const origen = inject('origen', '');

function toggle() {
  mostrar.value = !mostrar.value;
}

function handleClickOutside(event) {
  if (wrapper.value && !wrapper.value.contains(event.target)) {
    mostrar.value = false;
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));
</script>