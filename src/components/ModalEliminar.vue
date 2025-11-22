<template>
  <transition name="backdrop">
    <div v-if="mostrar" @click="cerrarModal" class="fixed top-0 left-0 w-full h-full backdrop-blur-xs bg-black/10 z-110"></div>
  </transition>
  <transition name="fade">
    <div v-if="mostrar" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col flex p-5 gap-3 m-auto bg-white border rounded-lg w-[400px] max-w-[90%] max-h-[80%] border-slate-300 text-slate-600 z-120">
      <div class="flex w-full">
        <div class="flex flex-col items-center justify-center w-full gap-3">
          <div class="grid w-12 h-12 text-red-400 bg-red-100 rounded-md place-items-center">
            <i class="fi-rr-triangle-warning text-3xl grid place-items-center"></i>
          </div>
          <span class="font-bold">Eliminar {{ titulo }}</span>
        </div>
        <button @click="cerrarModal" type="button" class="absolute grid w-10 h-10 text-xl transition-all duration-300 ease-in-out border border-transparent rounded-full cursor-pointer right-2 top-2 justify-self-end place-content-center hover:bg-slate-50 hover:border-slate-300 group">
          <i class="fi-sr-cross-small grid place-content-center"></i>
          <div class="absolute transition-all origin-right right-11 rounded-md bg-slate-600 scale-85 text-[0.8rem] px-3 py-2 text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 pointer-events-none ease-in-out duration-200 shadow-sm">
            <span>Cerrar</span>
            <i class="fi-sr-caret-right absolute grid text-lg -right-2.5 top-1/4 place-items-center text-slate-600"></i>
          </div>
        </button>
      </div>
      <div class="rounded-lg bg-slate-50">
        <p class="p-4 text-sm text-center text-slate-600">¿Estás seguro de que deseas eliminar este registro?</p>
      </div>
      <div class="flex items-center justify-center gap-5 text-sm">
        <button @click="cerrarModal" type="button" class="px-4 duration-200 bg-white border rounded-lg cursor-pointer border-slate-300 h-9 hover:opacity-50 text-slate-600 active:scale-95">Cancelar</button>
        <button @click="eliminar" type="button" class="px-4 duration-200 bg-red-400 rounded-lg cursor-pointer h-9 text-red-50 hover:bg-red-300 active:scale-95">Eliminar</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  titulo: String,
});

defineExpose({
  mostrarModal
});

const emits = defineEmits(['eliminar']);
const eliminar = () => {
  emits('eliminar');
  cerrarModal();
};

const mostrar = ref(false);
function mostrarModal() {
  mostrar.value = true;
  window.addEventListener('keydown', keydownEnter);
}

function cerrarModal() {
  mostrar.value = false;
  window.removeEventListener('keydown', keydownEnter);
}

function keydownEnter(event) {
  if (event.key === 'Escape') {
    cerrarModal();
  }
}
</script>