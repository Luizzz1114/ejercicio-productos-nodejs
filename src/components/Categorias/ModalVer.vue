<template>
  <transition name="backdrop">
    <div v-if="mostrar" @click="cerrarModal" class="fixed top-0 left-0 w-full h-full backdrop-blur-xs bg-black/10 z-110"></div>
  </transition>
  <transition name="fade">
    <div v-if="mostrar" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col flex bg-white border rounded-lg w-[350px] max-w-[90%] max-h-[80%]  border-slate-300 text-slate-600 z-120">
      <div class="flex items-center justify-between w-full gap-3 px-3 py-3 border-b border-b-slate-300">
        <div class="flex items-center gap-3">
          <div class="grid text-lg text-indigo-500 bg-indigo-100 rounded-md w-9 h-9 place-items-center">
            <i class="grid fi-rr-category place-items-center"></i>
          </div>
          <span class="font-bold text-md">Categoría</span>
        </div>
        <button @click="cerrarModal" type="button" class="absolute grid w-10 h-10 text-xl transition-all duration-300 ease-in-out border border-transparent rounded-full cursor-pointer right-2 justify-self-end place-content-center hover:bg-slate-50 hover:border-slate-300 group">
          <i class="grid fi-sr-cross-small place-content-center"></i>
          <div class="absolute transition-all origin-right right-11 rounded-md bg-slate-600 scale-85 text-[0.8rem] px-3 py-2 text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 pointer-events-none ease-in-out duration-200 shadow-sm">
            <span>Cerrar</span>
            <i class="absolute grid text-lg -right-2.5 top-1/4 fi-sr-caret-right place-items-center text-slate-600"></i>
          </div>
        </button>
      </div>
      <div class="flex flex-col gap-2 p-2">
        <div class="flex gap-4">
          <i :class="['grid place-items-center min-h-20 min-w-20 text-4xl rounded-lg place-content-center ', colores[categoria.color], iconos[categoria.icono]]"></i>
          <div class="flex flex-col">
            <span class="font-bold">{{ categoria.nombre  }}</span>
            <span class="text-[0.85rem]">Icono: {{ categoria.icono }}</span>
            <span class="text-[0.85rem]">Color: {{ categoria.color }}</span>
            <span class="pb-2 text-xs text-slate-400 wrap-anywhere text-balance">{{ categoria.descripcion || 'No se proporcionó descripción.' }}</span>
          </div>
        </div>
        <div class="flex flex-col justify-center text-xs text-slate-400">
          <div class="flex items-center gap-2">
            <span>Creado:</span>
            <div class="flex items-center gap-1">
              <i class="grid fi-rr-calendar place-items-center"></i>
              <span>{{ categoria.creado_fecha ? categoria.creado_fecha : '--/--/----' }}</span>
            </div>
            <div class="flex items-center gap-1">
              <i class="grid fi-rr-watch place-items-center"></i>
              <span>{{ categoria.creado_hora ? categoria.creado_hora : '--:--:--' }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span>Actualizado:</span>
            <div class="flex items-center gap-1">
              <i class="grid fi-rr-calendar place-items-center"></i>
              <span>{{ categoria.actualizado_fecha ? categoria.actualizado_fecha : '--/--/----' }}</span>
            </div>
            <div class="flex items-center gap-1">
              <i class="grid fi-rr-watch place-items-center"></i>
              <span>{{ categoria.actualizado_hora ? categoria.actualizado_hora : '--:--:--' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  categoria: Object,
});

defineExpose({
  mostrarModal
});

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

const iconos = {
  Celular: 'fi-rr-mobile-notch',
  Computador: 'fi-rr-computer',
  Herramienta: 'fi-rr-tools',
  Juegos: 'fi-rr-gamepad',
  Mouse: 'fi-rr-computer-mouse',
  Paleta: 'fi-rr-palette'
};

const colores = {
  Verde: 'bg-emerald-100 text-emerald-500',
  'Azul Cielo': 'bg-sky-100 text-sky-500',
  Azul: 'bg-blue-100 text-blue-500',
  Índigo: 'bg-indigo-100 text-indigo-500',
  Morado: 'bg-violet-100 text-violet-500',
  Rojo: 'bg-rose-100 text-rose-500'
};
</script>