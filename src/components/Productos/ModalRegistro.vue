<template>
  <transition name="backdrop">
    <div v-if="mostrar" @click="cerrarModal" class="fixed top-0 left-0 w-full h-full backdrop-blur-xs bg-black/10 z-90"></div>
  </transition>
  <transition name="modal">
    <div v-if="mostrar" class="fixed top-0 end-0 flex flex-col bg-white border-s w-[700px] max-w-[90%] h-full border-slate-300 text-slate-600 z-100">
      <div class="flex items-center justify-between w-full gap-3 p-3 border-b border-b-slate-300">
        <div class="flex items-center gap-3">
          <div class="grid text-lg text-indigo-500 bg-indigo-100 rounded-md w-9 h-9 place-items-center">
            <i class="grid fi-rr-box-open-full place-items-center"></i>
          </div>
          <span class="font-bold text-md">Registrar producto</span>
        </div>
        <button @click="cerrarModal" type="button" class="absolute grid w-10 h-10 text-xl transition-all duration-300 ease-in-out border border-transparent rounded-full cursor-pointer right-2 justify-self-end place-content-center hover:bg-slate-50 hover:border-slate-300 group">
          <i class="fi-sr-cross-small grid place-content-center"></i>
          <div class="absolute transition-all origin-right right-11 rounded-md bg-slate-600 scale-85 text-[0.8rem] px-3 py-2 text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 pointer-events-none ease-in-out duration-200 shadow-sm">
            <span>Cerrar</span>
            <i class="fi-sr-caret-right absolute grid text-lg -right-2.5 top-1/4 place-items-center text-slate-600"></i>
          </div>
        </button>
      </div>
      <form @submit.prevent="registrar" class="flex flex-col justify-between h-full overflow-hidden text-sm">
        <div class="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-x-10 gap-y-5 w-full items-start overflow-y-auto p-5">
          <div class="flex flex-col justify-center gap-1">
            <label for="nombre">Nombre <span class="text-red-500">*</span></label>
            <input v-model="producto.nombre" @input="validarProducto(producto, errores, 'nombre')" id="nombre" type="text" class="p-2 bg-white border rounded-lg border-slate-300 placeholder:text-slate-400 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1" autocomplete="off" placeholder="Nombre del producto" maxlength="50" inputmode="text">
            <span class="text-xs text-red-400">{{ errores.nombre }}</span>
          </div>
          <div class="relative flex flex-col justify-center gap-1">
            <label for="categoria">Categoría <span class="text-red-500">*</span></label>
            <select v-model="producto.categoria_id" @change="validarProducto(producto, errores, 'categoria_id')" id="categoria" class="p-2 bg-white border rounded-lg appearance-none cursor-pointer border-slate-300 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1">
              <option value="" disabled selected hidden>Seleccione</option>
              <option v-for="(categoria, index) in categorias" :key="index" :value="categoria.id">{{ categoria.nombre }}</option>
            </select>
            <i class="absolute grid pointer-events-none top-9 fi-rr-angle-small-down place-items-center right-2 text-slate-400"></i>
            <span class="text-xs text-red-400">{{ errores.categoria }}</span>
          </div>
          <div class="relative flex flex-col justify-center gap-1">
            <label for="precio">Precio <span class="text-red-500">*</span></label>
            <input v-model="producto.precio" @input="validarProducto(producto, errores, 'precio')" id="precio" type="text" class="text-right p-2 bg-white border rounded-lg border-slate-300 placeholder:text-slate-400 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1" autocomplete="off" placeholder="0.00" maxlength="13" inputmode="decimal">
            <span class="text-xs text-red-400">{{  errores.precio }}</span>
          </div>
          <div class="flex flex-col justify-center gap-1">
            <label for="stock">Stock <span class="text-red-500">*</span></label>
            <input v-model="producto.stock" @input="validarProducto(producto, errores, 'stock')" id="stock" type="text" class="text-right p-2 bg-white border rounded-lg border-slate-300 placeholder:text-slate-400 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1" autocomplete="off" placeholder="0" maxlength="6" inputmode="numeric">
            <span class="text-xs text-red-400">{{ errores.stock }}</span>
          </div>
          <div class="flex flex-col justify-center col-span-1 gap-1 sm:col-span-2">
            <label for="descripcion">Descripción</label>
            <textarea v-model="producto.descripcion" id="descripcion" class="h-24 p-2 bg-white border rounded-lg resize-none border-slate-300 placeholder:text-slate-400 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1" autocomplete="off" placeholder="Descripcion del producto" maxlength="150" inputmode="text"></textarea>
            <span class="text-xs text-red-400">{{ errores.descripcion }}</span>
          </div>
        </div>
        <div class="flex items-center justify-end w-full gap-5 p-3 text-sm border-t border-slate-300">
          <button @click="cerrarModal" type="button" class="px-4 duration-200 bg-white border rounded-lg cursor-pointer border-slate-300 h-9 hover:opacity-50 text-slate-600 active:scale-95">Cancelar</button>
          <button type="submit" class="px-4 duration-300 bg-indigo-400 rounded-lg cursor-pointer text-indigo-50 hover:bg-indigo-300 h-9 active:scale-95">Registrar</button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';
import { validarProducto, validarFormulario } from '../../utils/productos.validaciones.js';

const producto = ref({ nombre: '', categoria_id: '', precio: '', stock: '', descripcion: '' });
const errores = ref({});
const mostrar = ref(false);
const emits = defineEmits(['registrar']);
defineProps({
  categorias: Object,
});

function mostrarModal() {
  window.addEventListener('keydown', keydownEnter);
  mostrar.value = true;
}

function cerrarModal() {
  window.removeEventListener('keydown', keydownEnter);
  mostrar.value = false;
  producto.value = { nombre: '', categoria_id: '', precio: '', stock: '', descripcion: '' };
  errores.value = {};
}

function keydownEnter(event) {
  if (event.key === 'Escape') {
    cerrarModal();
  }
}

function registrar() {
  if (validarFormulario(producto.value, errores.value)) {
    emits('registrar', producto.value);
    cerrarModal();
  }
}

defineExpose({ mostrarModal });
</script>