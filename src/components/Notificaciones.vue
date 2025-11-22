<template>
  <div class="fixed z-100 bottom-6 right-6">
    <transition-group name="notificacion" tag="div">
      <div v-for="notificacion in notificaciones" :key="notificacion.id" class="flex items-center justify-between gap-2 p-2 my-2 text-sm bg-white border rounded-lg shadow-sm border-slate-300 text-slate-600">
        <div v-if="notificacion.tipo === 'exito'" class="grid text-lg rounded-md w-7 h-7 text-emerald-500 bg-emerald-200 place-items-center">
          <i class="grid place-items-center fi-sr-check-circle"></i>
        </div>
        <div v-else class="grid text-lg text-red-400 bg-red-200 rounded-md w-7 h-7 place-items-center">
          <i class="grid fi-sr-times-hexagon place-items-center"></i>
        </div>
        <span>{{ notificacion.mensaje }}</span>
        <button @click.stop="removerNotificacion(notificacion.id)" type="button" class="grid text-xl transition-all duration-300 ease-in-out border border-transparent rounded-lg cursor-pointer w-7 h-7 top-2 right-2 justify-self-end place-content-center hover:bg-slate-50 hover:border-slate-300 text-slate-400">
          <i class="grid fi-sr-cross-small place-content-center"></i>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const notificaciones = ref([]);

function agregarNotificacion(tipo, mensaje) {
  const id = Date.now();
  notificaciones.value.push({ id, tipo, mensaje });
  setTimeout(() => {
    removerNotificacion(id);
  }, 5000)
}

function removerNotificacion(id) {
  notificaciones.value = notificaciones.value.filter(notificacion => notificacion.id !== id)
}

defineExpose({
  agregarNotificacion
});
</script>