<template>
  <div class="flex flex-col p-1 pt-0 overflow-hidden bg-white rounded-xl border border-slate-300">
    <div class="flex items-center gap-3 p-4">
      <div class="grid place-items-center w-8 h-8 text-lg text-indigo-500 bg-indigo-100 rounded-md">
        <i class="fi-rr-user grid place-items-center"></i>
      </div>
      <span class="font-bold">Usuarios</span>
    </div>
    <div class="flex flex-col gap-3 p-4 overflow-hidden bg-indigo-50 rounded-lg">
      <div class="flex flex-wrap-reverse gap-3 justify-between text-sm">
        <BuscadorInput @buscar="recibirBusqueda" />
        <BotonRegistrar @click="mostrarModalRegistrar" />
      </div>
      <Tabla :columnas="columnas" :data="usuarios" :busqueda="busqueda" @actualizar="mostrarModalActualizar" @eliminar="mostrarModalEliminar" />
    </div>
    <ModalRegistro ref="modalRegistro" @registrar="crear" />
    <ModalActualizar ref="modalActualizar" :usuario="usuario" @actualizar="actualizar" />
    <ModalEliminar ref="modalEliminar" :titulo="'usuario'" @eliminar="eliminar" />
  </div>
  <Notificaciones ref="notificacion" />
</template>

<script setup>
import Tabla from '../components/Tabla.vue';
import BuscadorInput from '../components/BuscadorInput.vue';
import BotonRegistrar from '../components/BotonRegistrar.vue';
import ModalRegistro from '../components/Usuarios/ModalRegistro.vue';
import ModalActualizar from '../components/Usuarios/ModalActualizar.vue';
import ModalEliminar from '../components/ModalEliminar.vue';
import Notificaciones from '../components/Notificaciones.vue';
import { ref, computed, onMounted, provide, reactive } from 'vue';
import usuariosService from '../services/usuarios.service.js';
import { useBreadCrumbsStore } from '../store/breadCrumbs.js';

const breadCrumbsStore = useBreadCrumbsStore();
breadCrumbsStore.setBreadCrumbs([{ nombre: 'Usuarios', ruta: '/usuarios' }]);

// --- NOTIFICACIONES
const notificacion = ref(null);
function mostrarNotificacion(tipo, mensaje) {
  notificacion.value.agregarNotificacion(tipo, mensaje);
}

// --- CONFIG DE LA TABLA
provide('origen', 'Usuarios');

const columnas = [
  { nombre: 'Usuario', field: 'nombre' },
  { nombre: 'Email', field: 'correo' },
  { nombre: 'Rol', field: 'rol' },
  { nombre: 'Creación', field: 'creado' },
  { nombre: 'Última actualización', field: 'actualizado' }
];

const busqueda = ref('');
function recibirBusqueda(valor) {
  console.log(valor);
  busqueda.value = valor;
}

// --- EVENTOS DE MODALES
const modalRegistro = ref(null);
function mostrarModalRegistrar() {
  modalRegistro.value.mostrarModal();
}

const modalActualizar = ref(null);
async function mostrarModalActualizar(id) {
  const data = await leer(id);
  if (data) {
    Object.assign(usuario, data);
    modalActualizar.value.mostrarModal();
  }
}

const modalEliminar = ref(null);
function mostrarModalEliminar(id) {
  idUsuario.value = id;
  modalEliminar.value.mostrarModal();
}

// --- CRUD
const usuarios = ref([]);
const idUsuario = ref(null);
const usuario = reactive({
  id: null,
  nombre: '',
  correo: '',
  rol: '',
  contrasena: ''
});

async function listar() {
  try {
    usuarios.value = await usuariosService.listar();
  } catch (error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }
}

async function crear(usuario) {
  try {
    const respuesta = await usuariosService.crear(usuario);
    mostrarNotificacion('exito', respuesta.mensaje);
  } catch(error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }
  listar();
}

async function leer(id) {
  try {
    const resultado = await usuariosService.leer(id);
    return resultado;
  } catch(error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }  
}

async function actualizar(usuario) {
  try {
    const respuesta = await usuariosService.actualizar(usuario);
    mostrarNotificacion('exito', respuesta.mensaje);
  } catch(error) {
    console.error(`Error: STATUS ${error.statusCode}`);
    mostrarNotificacion('error', error.mensaje);
  }
  listar();
}

async function eliminar() {
  try {
    if (idUsuario.value) {
      const respuesta = await usuariosService.eliminar(idUsuario.value);
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