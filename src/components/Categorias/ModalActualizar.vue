<template>
  <transition name="backdrop">
    <div v-if="mostrar" @click="cerrarModal" class="fixed top-0 left-0 w-full h-full backdrop-blur-xs bg-black/10 z-90"></div>
  </transition>
  <transition name="modal">
    <div v-if="mostrar" class="fixed top-0 end-0 flex-col flex bg-white border-s w-[700px] max-w-[90%] h-full border-slate-300 text-slate-600 z-100">
      <div class="flex items-center justify-between w-full gap-3 p-3 border-b border-b-slate-300">
        <div class="flex items-center gap-3">
          <div class="grid text-lg text-indigo-500 bg-indigo-100 rounded-md w-9 h-9 place-items-center">
            <i class="fi-rr-layers grid place-items-center"></i>
          </div>
          <span class="font-bold text-md">Actualizar categoría</span>
        </div>
        <button @click="cerrarModal" type="button" class="absolute grid w-10 h-10 text-xl transition-all duration-300 ease-in-out border border-transparent rounded-full cursor-pointer right-2 justify-self-end place-content-center hover:bg-slate-50 hover:border-slate-300 group">
          <i class="grid fi-sr-cross-small place-content-center"></i>
          <div class="absolute transition-all origin-right right-11 rounded-md bg-slate-600 scale-85 text-[0.8rem] px-3 py-2 text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 pointer-events-none ease-in-out duration-200 shadow-sm">
            <span>Cerrar</span>
            <i class="absolute grid text-lg -right-2.5 top-1/4 fi-sr-caret-right place-items-center text-slate-600"></i>
          </div>
        </button>
      </div>
      <form @submit.prevent="actualizar" class="flex flex-col overflow-hidden text-sm h-full">
        <div class="bg-slate-100 border border-slate-300 rounded-lg  m-5 mb-0 p-1 flex items-center justify-between gap-2">
          <button @click="pagina = 1" type="button" :class="['px-2 py-1.5 rounded-md w-full border border-[#0000]', pagina === 1 ? 'border-slate-300 bg-white' : 'cursor-pointer text-slate-400']">General</button>
          <button @click="pagina = 2" type="button" :class="['px-2 py-1.5 rounded-md w-full border border-[#0000]', pagina === 2 ? 'border-slate-300 bg-white' : 'cursor-pointer text-slate-400']">Personalización</button>
        </div>
        <div :class="['grid-cols-1 gap-y-5 w-full items-start overflow-y-auto p-5', pagina === 1 ? 'grid' : 'hidden']">
          <div class="flex flex-col justify-center gap-1">
            <label for="nombre">Nombre <span class="text-red-500">*</span></label>
            <input v-model="categoria.nombre" @input="validarCategoria(categoria, errores, 'nombre')" id="nombre" type="text" class="p-2 bg-white border rounded-lg border-slate-300 placeholder:text-slate-400 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1" autocomplete="off" placeholder="Nombre de la categoría" maxlength="50" inputmode="text">
            <span class="text-xs text-red-400">{{ errores.nombre }}</span>
          </div>
          <div class="flex flex-col justify-center col-span-1 gap-1 sm:col-span-2">
            <label for="descripcion">Descripción</label>
            <textarea v-model="categoria.descripcion" id="descripcion" class="h-24 p-2 bg-white border rounded-lg resize-none border-slate-300 placeholder:text-slate-400 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1" autocomplete="off" placeholder="Descripcion de la categoría" maxlength="150" inputmode="text"></textarea>
            <span class="text-xs text-red-400">{{ errores.descripcion }}</span>
          </div>
        </div>
        <div :class="['flex-col gap-y-5 overflow-y-auto p-5', pagina === 2 ? 'flex' : 'hidden' ]">
          <div class="grid grid-cols-1 gap-1 w-full items-start">
            <span>Icono de la categoría <span class="text-red-500">*</span></span>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 w-full items-start sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
              <div v-for="(icono, index) in iconos" :key="index" class="w-full">
                <input v-model="categoria.icono" :value="icono.nombre" name="icono" type="radio" :id="`icono-${index}`" class="hidden peer">
                <label :for="`icono-${index}`" class="w-full flex items-center justify-between rounded-lg border border-slate-300 bg-slate-50 p-2 cursor-pointer active:scale-95 transition-all duration-200 outline-1 outline-transparent peer-checked:outline-indigo-400 peer-checked:border-indigo-400">
                  <div class="flex items-center gap-3">
                    <i :class="[icono.icono, 'grid place-items-center text-lg']"></i>
                    <span class="hidden sm:block">{{ icono.nombre }}</span>
                  </div>
                  <i class="fi-rr-check text-lg grid place-items-center text-indigo-500 transition-opacity duration-200" :class="categoria.icono === icono.nombre ? 'opacity-100' : 'opacity-0'"></i>
                </label>
              </div>
            </div>
            <span class="text-xs text-red-400">{{ errores.icono }}</span>
          </div>
          <div class="grid grid-cols-1 gap-1 w-full items-start">
            <span>Color de la categoría <span class="text-red-500">*</span></span>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 w-full items-start sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
              <div v-for="(color, index) in colores" :key="index" class="w-full">
                <input v-model="categoria.color" :value="color.nombre" name="color" type="radio" :id="`color-${index}`" class="hidden peer">
                <label :for="`color-${index}`" class="w-full flex items-center justify-between rounded-lg border border-slate-300 bg-slate-50 p-2 cursor-pointer active:scale-95 transition-all duration-200 outline-1 outline-transparent peer-checked:outline-indigo-400 peer-checked:border-indigo-400">
                  <div class="flex items-center gap-3">
                    <span :class="[color.clase, 'p-2 rounded-sm']"></span>
                    <span class="hidden sm:block">{{ color.nombre }}</span>
                  </div>
                  <i class="fi-rr-check text-lg grid place-items-center text-indigo-500 transition-opacity duration-200" :class="categoria.color === color.nombre ? 'opacity-100' : 'opacity-0'"></i>
                </label>
              </div>
            </div>
            <span class="text-xs text-red-400">{{ errores.color }}</span>
          </div>
        </div>
        <div class="flex items-center justify-end w-full gap-5 p-3 text-sm border-t border-slate-300 mt-auto">
          <button v-if="pagina === 1" @click="cerrarModal" type="button" class="px-4 duration-200 bg-white border rounded-lg cursor-pointer border-slate-300 h-9 hover:opacity-50 text-slate-600 active:scale-95">Cancelar</button>
          <button v-if="pagina === 2" @click="pagina = 1" type="button" class="px-4 duration-200 bg-white border rounded-lg cursor-pointer border-slate-300 h-9 hover:opacity-50 text-slate-600 active:scale-95">Anterior</button>
          <button v-if="pagina === 1" @click="pagina = 2" type="button" class="px-4 duration-300 bg-indigo-400 rounded-lg cursor-pointer text-indigo-50 hover:bg-indigo-300 h-9 active:scale-95 disabled:opacity-50">Siguiente</button>
          <button v-if="pagina === 2" type="submit" class="px-4 duration-300 bg-indigo-400 rounded-lg cursor-pointer text-indigo-50 hover:bg-indigo-300 h-9 active:scale-95">Actualizar</button>
        </div>
      </form>
    </div>
  </transition>
</template>


<script setup>
import { ref } from 'vue';
import { validarCategoria, validarFormulario } from '../../utils/categorias.validaciones.js';

const iconos = [
  { nombre: 'Celular', icono: 'fi-rr-mobile-notch' },
  { nombre: 'Computador', icono: 'fi-rr-computer' },
  { nombre: 'Herramienta', icono: 'fi-rr-tools' },
  { nombre: 'Juegos', icono: 'fi-rr-gamepad' },
  { nombre: 'Mouse', icono: 'fi-rr-computer-mouse' },
  { nombre: 'Paleta', icono: 'fi-rr-palette' },
];

const colores = [
  { nombre: 'Verde', clase: 'bg-emerald-300' },
  { nombre: 'Azul Cielo', clase: 'bg-sky-300' },
  { nombre: 'Azul', clase: 'bg-blue-300' },
  { nombre: 'Índigo', clase: 'bg-indigo-300' },
  { nombre: 'Morado', clase: 'bg-violet-300' },
  { nombre: 'Rojo', clase: 'bg-rose-300' },
];

const pagina = ref(1);
const props = defineProps({ categoria: Object });
const errores = ref({});
const mostrar = ref(false);
const emits = defineEmits(['actualizar']);

function mostrarModal() {
  window.addEventListener('keydown', keydownEnter);
  mostrar.value = true;
}

function cerrarModal() {
  window.removeEventListener('keydown', keydownEnter);
  mostrar.value = false;
  errores.value = {};
  pagina.value = 1;
}

function keydownEnter(event) {
  if (event.key === 'Escape') {
    cerrarModal();
  }
}

const actualizar = () => {
  if(validarFormulario(props.categoria, errores.value)) {
    emits('actualizar', props.categoria);
    cerrarModal();
  }
}

defineExpose({ mostrarModal });
</script>