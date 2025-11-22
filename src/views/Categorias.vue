<template>
	<div class="flex flex-col p-1 pt-0 overflow-hidden bg-white rounded-xl border border-slate-300">
    <div class="flex items-center gap-3 p-4">
      <div class="grid place-items-center w-8 h-8 text-lg text-indigo-500 bg-indigo-100 rounded-md">
        <i class="fi-rr-layers grid place-items-center"></i>
      </div>
      <span class="font-bold">Categorías de produtos</span>
    </div>
    <div class="flex flex-col gap-3 p-4 overflow-hidden bg-indigo-50 rounded-lg">
      <div class="flex flex-wrap-reverse gap-3 justify-between text-sm">
        <BuscadorInput @buscar="recibirBusqueda" />
        <BotonRegistrar @click="mostrarModalRegistrar" />
      </div>
      <Tabla :columnas="columnas" :data="categorias" :busqueda="busqueda" @ver="mostrarModalVer" @actualizar="mostrarModalActualizar" @eliminar="mostrarModalEliminar" />
    </div>
    <ModalRegistro ref="modalRegistro"  @registrar="crear" />
    <ModalVer ref="modalVer" :categoria="categoria" />
    <ModalActualizar ref="modalActualizar" :categoria="categoria" @actualizar="actualizar" />
    <ModalEliminar ref="modalEliminar" :titulo="'categoría'" @eliminar="eliminar"  />
	</div>
  <Notificaciones ref="notificacion" />
</template>

<script setup>
import Tabla from '../components/Tabla.vue';
import BuscadorInput from '../components/BuscadorInput.vue';
import BotonRegistrar from '../components/BotonRegistrar.vue';
import ModalRegistro from '../components/Categorias/ModalRegistro.vue';
import ModalVer from '../components/Categorias/ModalVer.vue';
import ModalActualizar from '../components/Categorias/ModalActualizar.vue';
import ModalEliminar from '../components/ModalEliminar.vue';
import Notificaciones from '../components/Notificaciones.vue';
import categoriasService from '../services/categorias.service.js';
import { useBreadCrumbsStore } from '../store/breadCrumbs.js';
import { ref, onMounted } from 'vue';

useBreadCrumbsStore().setBreadCrumbs([{ nombre: 'Categorías', ruta: '/categorias' }]);

// --- NOTIFICACIONES
const notificacion = ref(null);
function mostrarNotificacion(tipo, mensaje) {
  notificacion.value.agregarNotificacion(tipo, mensaje);
}

// --- BUSQUEDA
const busqueda = ref('');

function recibirBusqueda(valor) {
  console.log(valor);
  busqueda.value = valor;
}

// --- COLUMNAS DE LA TABLA
const columnas = [
  { nombre: 'Nombre', field: 'nombre' },
  { nombre: 'Ícono y color', field: 'color' },
];

// --- REGISTRO
const modalRegistro = ref(null);
function mostrarModalRegistrar() {
  modalRegistro.value.mostrarModal();
}

// --- VER
const modalVer = ref(null);
async function mostrarModalVer(id) {
  categoria.value = await leer(id);
  if (categoria.value) {
    modalVer.value.mostrarModal();
  }
}

// --- ACTUALIZAR
const modalActualizar = ref(null);
async function mostrarModalActualizar(id) {
  categoria.value = await leer(id);
  if (categoria.value) {
    modalActualizar.value.mostrarModal();
  }
}

// --- ELIMINAR
const modalEliminar = ref(null);
function mostrarModalEliminar(id) {
  idCategoria.value = id;
  modalEliminar.value.mostrarModal();
}

// --- CRUD
const categorias = ref([]);
const categoria = ref({});
const idCategoria = ref('');

async function listar() {
  try {
    categorias.value = await categoriasService.listar();
  } catch (error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }
}

async function crear(categoria) {
  try {
    const respuesta = await categoriasService.crear(categoria);
    mostrarNotificacion('exito', respuesta.mensaje);
  } catch(error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }
  listar();
}

async function leer(id) {
  try {
    const resultado = await categoriasService.leer(id);
    return resultado;
  } catch(error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }  
}

async function actualizar(categoria) {
  try {
    const respuesta = await categoriasService.actualizar(categoria);
    mostrarNotificacion('exito', respuesta.mensaje);
  } catch(error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }
  listar();
}

async function eliminar() {
  try {
    if (idCategoria) {
      const respuesta = await categoriasService.eliminar(idCategoria.value);
      mostrarNotificacion('exito', respuesta.mensaje);
    }
  } catch (error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }
  listar();
}

onMounted(() => {
  listar();
});
</script>