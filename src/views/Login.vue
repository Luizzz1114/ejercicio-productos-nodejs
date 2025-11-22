<template>
  <div class="flex justify-end p-2 w-dvw h-dvh bg-linear-to-b to-indigo-200 from-slate-100 lg:gap-2 overflow-hidden">
    <div class="grid place-items-center flex-1 w-0 h-full md:w-auto">
         <img src="../assets/images/Spreadsheets-rafiki.svg" class="w-[700px]">
    </div>
    <div class="flex flex-col w-full h-full bg-white border rounded-xl border-slate-300 md:w-96">
      <div class="flex items-center justify-center w-full gap-3.5 py-4 px-6 font-bold text-lg text-slate-600">
        <i class="fi-rr-cube text-2xl grid place-items-center text-white bg-radial-[at_25%_25%] from-indigo-400 to-violet-400 p-1.5 rounded-lg"></i>
        <span>Sistema</span>
      </div>
      <div class="flex flex-col justify-center items-center h-full p-5 text-sm">
        <span class="mb-10 text-lg font-bold text-center">Iniciar sesión</span>
        <form @submit.prevent="login" class="flex flex-col justify-center gap-5 max-w-full w-[325px]">
          <div class="flex flex-col justify-center gap-1">
            <label for="nombre">Usuario</label>
            <div class="flex items-center">
              <div class="grid w-10 h-full p-2 border place-items-center border-e-0 border-slate-300 bg-slate-100 rounded-s-lg">
                <i class="fi-sr-user grid place-items-center text-lg text-slate-400"></i>
              </div>
              <input v-model="usuario.nombre" id="nombre" type="text" class="w-full p-2 rounded-e-lg bg-white border border-slate-300 placeholder:text-slate-400 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1" autocomplete="off" maxlength="50" inputmode="text">
            </div>
          </div>
          <div class="flex flex-col justify-center gap-1">
            <label for="contrasena">Contraseña</label>
            <div class="relative flex items-center">
              <div class="grid w-10 h-full p-2 border place-items-center border-e-0 border-slate-300 bg-slate-100 rounded-s-lg">
                <i class="fi-sr-lock grid place-items-center text-lg text-slate-400"></i>
              </div>
              <input v-model="usuario.contrasena" id="contrasena" :type="tipoInput" class="w-full p-2 bg-white rounded-e-lg border border-slate-300 placeholder:text-slate-400 outline-0 outline-indigo-400 hover:border-slate-400 focus:outline-1" autocomplete="off" maxlength="50" inputmode="text">
              <div class="relative group">
                <button @click="mostrarContrasena" type="button" class="absolute grid place-items-center text-xl cursor-pointer text-slate-400 right-3 -top-2.5">
                  <i :class="[iconoContrasena ? 'fi-rr-eye' : 'fi-rr-eye-crossed']" class="grid place-items-center"></i>
                </button>
                <div class="absolute -right-3.5 -top-12 rounded-md bg-slate-600 scale-85 text-[0.8rem] px-3 py-2 text-white opacity-0 origin-bottom group-hover:opacity-100 group-hover:scale-100 pointer-events-none ease-in-out duration-200 shadow-sm">
                  <span>{{ iconoContrasena ? 'Mostrar' : 'Ocultar' }}</span>
                    <i class="fi-rr-caret-down absolute left-1/2 -translate-x-1/2 -bottom-4.5 text-lg text-slate-600"></i>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" class="px-4 mt-6 bg-indigo-400 rounded-lg cursor-pointer text-indigo-50 duration-300 hover:bg-indigo-300 h-9 active:scale-95">Ingresar</button>
        </form>
      </div>
    </div>
    <Notificaciones ref="notificacion" />
  </div>
</template>

<script setup>
import Notificaciones from '../components/Notificaciones.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import usuarioService from '../services/usuarios.service';

// --- NOTIFICACIONES
const notificacion = ref(null);
function mostrarNotificacion(tipo, mensaje) {
  notificacion.value.agregarNotificacion(tipo, mensaje);
}

const iconoContrasena = ref(false);
const tipoInput = ref('password');

const mostrarContrasena = () => {
  iconoContrasena.value = !iconoContrasena.value;
  tipoInput.value = tipoInput.value === 'password' ? 'text' : 'password';
}

// --- MANEJO DEL LOGIN
const usuario = ref({ nombre: '', contrasena: '' });
const errorCredenciales = ref(false);
const router = useRouter();

async function login() {
  if (usuario.value.nombre === '' || usuario.value.contrasena === '') {
    mostrarNotificacion('error', 'Complete ambos campos.');
    errorCredenciales.value = true;
    return;
  }
  try {
    const respuesta = await usuarioService.login(usuario.value);
    if (respuesta.ok) {
      router.push('/inicio');
    }
  } catch(error) {
    console.error(`Error: ${error.mensaje}`);
    mostrarNotificacion('error', error.mensaje);

  }
}
</script>