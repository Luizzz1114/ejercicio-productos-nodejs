<template>
	<div class="flex flex-col p-1 pt-0 overflow-hidden bg-white rounded-xl border border-slate-300">
    <div class="flex items-center gap-3 p-4">
      <div class="grid place-items-center w-8 h-8 text-lg text-indigo-500 bg-indigo-100 rounded-md ">
        <i class="fi-rr-box-open-full grid place-items-center"></i>
      </div>
      <span class="font-bold">Productos</span>
    </div>
    <div class="flex flex-col gap-3 p-4 overflow-hidden bg-indigo-50 rounded-lg">
      <div class="flex flex-wrap-reverse gap-3 justify-between text-sm">
        <BuscadorInput @buscar="recibirBusqueda" />
        <BotonRegistrar @click="mostrarModalRegistrar" />
      </div>
      <Tabla :columnas="columnas" :data="productos" :busqueda="busqueda"  @ver="mostrarModalVer" @actualizar="mostrarModalActualizar" @eliminar="mostrarModalEliminar" />
    </div>
    <ModalRegistro ref="modalRegistro" :categorias="categorias" @registrar="crear" />
    <ModalVer ref="modalVer" :producto="producto" />
    <ModalActualizar ref="modalActualizar" :categorias="categorias" :producto="producto" @actualizar="actualizar" />
    <ModalEliminar ref="modalEliminar" :titulo="'producto'" @eliminar="eliminar"  />
	</div>
  <Notificaciones ref="notificacion" />
</template>

<script setup>
import Tabla from '../components/Tabla.vue';
import BuscadorInput from '../components/BuscadorInput.vue';
import BotonRegistrar from '../components/BotonRegistrar.vue';
import ModalRegistro from '../components/Productos/ModalRegistro.vue';
import ModalVer from '../components/Productos/ModalVer.vue';
import ModalActualizar from '../components/Productos/ModalActualizar.vue';
import ModalEliminar from '../components/ModalEliminar.vue';
import Notificaciones from '../components/Notificaciones.vue';
import { ref, onMounted } from 'vue';
import productoService from '../services/productos.service.js';
import categoriasServices from '../services/categorias.service.js';
import { useBreadCrumbsStore } from '../store/breadCrumbs.js';

const breadCrumbsStore = useBreadCrumbsStore();
breadCrumbsStore.setBreadCrumbs([{ nombre: 'Productos', ruta: '/productos' }]);

// --- NOTIFICACIONES
const notificacion = ref(null);
function mostrarNotificacion(tipo, mensaje) {
  notificacion.value.agregarNotificacion(tipo, mensaje);
}

// --- CONFIG DE LA TABLA
const columnas = [
  { nombre: 'Nombre', field: 'nombre' },
  { nombre: 'Precio', field: 'precio' },
  { nombre: 'Stock', field: 'stock' },
  { nombre: 'Categoría', field: 'categoria' },
];

const busqueda = ref('');
function recibirBusqueda(valor) {
  console.log(valor);
  busqueda.value = valor;
}

// --- EVENTOS DE MODALES
const modalVer = ref(null);
async function mostrarModalVer(id) {
  producto.value = await leer(id);
  if (producto.value) {
    modalVer.value.mostrarModal();
  }
}

const modalRegistro = ref(null);
function mostrarModalRegistrar() {
  modalRegistro.value.mostrarModal();
}

const modalActualizar = ref(null);
async function mostrarModalActualizar(id) {
  producto.value = await leer(id);
  if (producto.value) {
    modalActualizar.value.mostrarModal();
  }
}

const modalEliminar = ref(null);
function mostrarModalEliminar(id) {
  idProducto.value = id;
  modalEliminar.value.mostrarModal();
}

// --- CRUD
const productos = ref([]);
const producto = ref({});
const idProducto = ref('');
const categorias = ref([]);

async function listar() {
  try {
    productos.value = await productoService.listar();
  } catch (error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }
}

async function crear(producto) {
  try {
    const respuesta = await productoService.crear(producto);
    mostrarNotificacion('exito', respuesta.mensaje);
  } catch(error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }
  listar();
}

async function leer(id) {
  try {
    const resultado = await productoService.leer(id);
    return resultado;
  } catch(error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }  
}

async function actualizar(producto) {
  try {
    const respuesta = await productoService.actualizar(producto);
    mostrarNotificacion('exito', respuesta.mensaje);
  } catch(error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }
  listar();
}

async function eliminar() {
  try {
    if (idProducto) {
      const respuesta = await productoService.eliminar(idProducto.value);
      mostrarNotificacion('exito', respuesta.mensaje);
    }
  } catch (error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }
  listar();
}

async function cargarCategorias() {
  try {
    categorias.value = await categoriasServices.listar();
  } catch (error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }
}

onMounted(() => {
  listar();
  cargarCategorias();
});
</script>