<template>
  <transition name="backdrop">
    <div v-if="mostrar" @click="cerrarModal" class="fixed top-0 left-0 w-full h-full backdrop-blur-xs bg-black/10 z-110"></div>
  </transition>
  <transition name="modal">
    <div v-if="mostrar" class="fixed top-0 end-0 flex-col flex bg-white border-s w-[700px] max-w-[90%] h-full border-slate-300 text-slate-600 z-120">
      <div class="flex items-center justify-between w-full gap-3 p-3 border-b border-b-slate-300">
        <div class="flex items-center gap-3">
          <div class="grid text-lg text-indigo-500 bg-indigo-100 rounded-md w-9 h-9 place-items-center">
            <i class="grid fi-rr-user place-items-center"></i>
          </div>
          <span class="font-bold text-md">Registrar usuario</span>
        </div>
        <button @click="cerrarModal" type="button" class="absolute grid w-10 h-10 text-xl transition-all duration-300 ease-in-out border border-transparent rounded-full cursor-pointer right-2 justify-self-end place-content-center hover:bg-slate-50 hover:border-slate-300 group">
          <i class="grid fi-sr-cross-small place-content-center"></i>
          <div class="absolute transition-all origin-right right-11 rounded-md bg-slate-600 scale-85 text-[0.8rem] px-3 py-2 text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 pointer-events-none ease-in-out duration-200 shadow-sm">
            <span>Cerrar</span>
            <i class="absolute grid text-lg -right-2.5 top-1/4 fi-sr-caret-right place-items-center text-slate-600"></i>
          </div>
        </button>
      </div>
      <form @submit.prevent="registrar" class="flex flex-col justify-between h-full overflow-hidden text-sm">
        <div class="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-x-10 gap-y-5 w-full items-start overflow-y-auto p-5">
          <div class="flex flex-col justify-center gap-1">
            <label for="nombre">Nombre de usuario <span class="text-red-500">*</span></label>
            <input v-model="usuario.nombre" @input="validarUsuario(usuario, errores, 'nombre')" id="nombre" type="text" class="p-2 bg-white border rounded-lg border-slate-300 placeholder:text-slate-400 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1 focus:border-indigo-400" autocomplete="off" placeholder="Nombre de usuario" maxlength="50" inputmode="text">
            <span class="text-xs text-red-400">{{ errores.nombre }}</span>
          </div>
          <div class="relative flex flex-col justify-center gap-1">
            <label for="rol">Rol <span class="text-red-500">*</span></label>
            <select v-model="usuario.rol" @change="validarUsuario(usuario, errores, 'rol')" id="rol" class="p-2 bg-white border rounded-lg appearance-none cursor-pointer border-slate-300 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1 focus:border-indigo-400">
              <option value="" disabled selected hidden>Seleccione</option>
              <option value="Administrador">Administrador</option>
              <option value="Usuario">Usuario</option>
            </select>
            <i class="absolute grid pointer-events-none top-9 fi-rr-angle-small-down place-items-center right-2 text-slate-400"></i>
            <span class="text-xs text-red-400">{{ errores.rol }}</span>
          </div>
          <div class="flex flex-col justify-center gap-1">
            <label for="correo">Correo electrónico <span class="text-red-500">*</span></label>
            <input v-model="usuario.correo" @input="validarUsuario(usuario, errores, 'correo')" id="correo" type="text" class="p-2 bg-white border rounded-lg border-slate-300 placeholder:text-slate-400 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1 focus:border-indigo-400" autocomplete="off" placeholder="Correo eletrónico" maxlength="50" inputmode="text">
            <span class="text-xs text-red-400">{{ errores.correo }}</span>
          </div>
          <div class="flex flex-col justify-center gap-1">
            <label for="contrasena">Contraseña</label>
            <div class="relative flex items-center">
              <input v-model="usuario.contrasena" @input="validarUsuario(usuario, errores, 'contrasena')" id="contrasena" :type="tipoInput" class="w-full p-2 bg-white border rounded-lg border-slate-300 placeholder:text-slate-400 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1 focus:border-indigo-400" placeholder="Contraseña" autocomplete="off" maxlength="50" inputmode="text">
              <div class="relative group">
                <button @click="mostrarContrasena" type="button" class="absolute grid text-lg cursor-pointer place-items-center text-slate-400 right-3 -top-2">
                  <i :class="['grid place-items-center', iconoContrasena ? 'fi-rr-eye grid' : 'fi-rr-eye-crossed']"></i>
                </button>
                <div class="absolute -right-3.5 -top-12 transition-all origin-bottom rounded-md bg-slate-600 scale-85 text-[0.8rem] px-3 py-2 text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 pointer-events-none ease-in-out duration-200 shadow-sm">
                  <span>{{ iconoContrasena ? 'Mostrar' : 'Ocultar' }}</span>
                    <i class="absolute left-1/2 -translate-x-1/2 -bottom-4.5 text-lg fi-rr-caret-down text-slate-600"></i>
                </div>
              </div>
            </div>
            <span class="text-xs text-red-400">{{ errores.contrasena }}</span>
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
import { validarUsuario, validarFormulario } from '../../utils/usuarios.validaciones.js';

const usuario = ref({ nombre: '', correo: '', contrasena: '', rol: '' });
const errores = ref({});
const mostrar = ref(false);
const emits = defineEmits(['registrar']);

const iconoContrasena = ref(true);
const tipoInput = ref('password');

const mostrarContrasena = () => {
  iconoContrasena.value = !iconoContrasena.value;
  tipoInput.value = tipoInput.value === 'password' ? 'text' : 'password';
}

function mostrarModal() {
  window.addEventListener('keydown', keydownEnter);
  mostrar.value = true;
}

function cerrarModal() {
  window.removeEventListener('keydown', keydownEnter);
  mostrar.value = false;
  usuario.value = { nombre: '', correo: '', contrasena: '', rol: '' };
  errores.value = {};
}

function keydownEnter(event) {
  if (event.key === 'Escape') {
    cerrarModal();
  }
}

function registrar() {
  if (validarFormulario(usuario.value, errores.value)) {
    emits('registrar', usuario.value);
    cerrarModal();
  }
}

defineExpose({ mostrarModal });
</script>