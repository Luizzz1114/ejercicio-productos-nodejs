<template>
  <transition name="backdrop">
    <div v-if="mostrar" @click="cerrarModal" class="fixed top-0 left-0 w-full h-full backdrop-blur-xs bg-black/10 z-110"></div>
  </transition>
  <transition name="fade">
    <div v-if="mostrar" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col flex bg-white border rounded-lg w-[350px] max-w-[90%] max-h-[80%]  border-slate-300 text-slate-600 z-120">
      <div class="flex items-center justify-between w-full gap-3 px-3 py-3 border-b border-b-slate-300">
        <div class="flex items-center gap-3">
          <div class="grid text-lg text-indigo-500 bg-indigo-100 rounded-md w-9 h-9 place-items-center">
            <i class="grid fi-rr-box-open-full place-items-center"></i>
          </div>
          <span class="font-bold text-md">Producto</span>
        </div>
        <button @click="cerrarModal" type="button" class="absolute grid w-10 h-10 text-xl transition-all duration-300 ease-in-out border border-transparent rounded-full cursor-pointer right-2 justify-self-end place-content-center hover:bg-slate-50 hover:border-slate-300 group">
          <i class="grid fi-sr-cross-small place-content-center"></i>
          <div class="absolute transition-all origin-right right-11 rounded-md bg-slate-600 scale-85 text-[0.8rem] px-3 py-2 text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 pointer-events-none ease-in-out duration-200 shadow-sm">
            <span>Cerrar</span>
            <i class="absolute grid text-lg -right-2.5 top-1/4 fi-sr-caret-right place-items-center text-slate-600"></i>
          </div>
        </button>
      </div>
      <div class="flex flex-col h-full gap-2 p-3 overflow-hidden">
        <div class="grid h-full grid-rows-2 gap-3 px-3 pt-3 overflow-y-auto border rounded-lg bg-slate-50 border-slate-300">
          <div class="grid text-6xl rounded-lg bg-slate-300 place-content-center text-slate-50">
            <i :class="['grid place-items-center', iconos[producto.icono]]"></i>
          </div>
          <div class="flex flex-col h-full">
            <span class="font-bold text-md">{{ producto.nombre }}</span>
            <span class="flex items-center gap-2 text-sm text-slate-400">
              <i :class="['grid place-items-center', iconos[producto.icono]]"></i>
              {{ producto.categoria }}
            </span>
            <span class="text-xs text-slate-400 wrap-anywhere text-balance">{{ producto.descripcion }}</span>
            <div class="grid h-full grid-cols-2 gap-2 pb-3 mt-2">
              <div class="flex flex-col items-center justify-center p-4 bg-indigo-400 rounded-lg">
                <span class="text-sm text-indigo-100">Precio</span>
                <span class="font-bold text-md text-indigo-50">$ {{ producto.precio }}</span>
              </div>
              <div class="flex flex-col items-center justify-center p-4 bg-white border rounded-lg border-slate-300">
                <span class="text-sm text-slate-400">En stock</span>
                <span class="font-bold text-md">{{ producto.stock }} U.</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center text-xs text-slate-400">
          <div class="flex items-center gap-2">
            <span>Creado:</span>
            <div class="flex items-center gap-1">
              <i class="grid fi-rr-calendar place-items-center"></i>
              <span>{{ producto.creado_fecha ? producto.creado_fecha : '--/--/----' }}</span>
            </div>
            <div class="flex items-center gap-1">
              <i class="grid fi-rr-watch place-items-center"></i>
              <span>{{ producto.creado_hora ? producto.creado_hora : '--:--:--' }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span>Actualizado:</span>
            <div class="flex items-center gap-1">
              <i class="grid fi-rr-calendar place-items-center"></i>
              <span>{{ producto.actualizado_fecha ? producto.actualizado_fecha : '--/--/----' }}</span>
            </div>
            <div class="flex items-center gap-1">
              <i class="grid fi-rr-watch place-items-center"></i>
              <span>{{ producto.actualizado_hora ? producto.actualizado_hora : '--:--:--' }}</span>
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
  producto: Object,
});

defineExpose({
  mostrarModal
});

const iconos = {
  Audífonos: 'fi-rr-headphones',
  Celular: 'fi-rr-mobile-notch',
  Computador: 'fi-rr-computer',
  Fuego: 'fi-rr-flame',
  Herramienta: 'fi-rr-tools',
  Internet: 'fi-rr-globe',
  Juegos: 'fi-rr-gamepad',
  Mouse: 'fi-rr-computer-mouse',
  Paleta: 'fi-rr-palette'
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