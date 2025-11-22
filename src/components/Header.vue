<template>
	<header class="relative flex items-center justify-between w-auto p-2 z-60 bg-white border-b border-slate-300">
		<div class="flex items-center gap-3 text-slate-500">
			<button @click="ocultarSidebar" type="button" class="flex items-center justify-center w-10 h-10 duration-300 ease-in-out rounded-lg cursor-pointer border border-transparent hover:bg-slate-50 hover:border-slate-300 lg:hidden">
				<i class="fi-rr-sidebar text-xl grid place-items-center"></i>
			</button>
			<button @click="minimizarSidebar" type="button" class="items-center justify-center hidden w-10 h-10 duration-300 ease-in-out rounded-lg cursor-pointer border border-transparent hover:bg-slate-50 hover:border-slate-300 lg:flex">
				<i class="fi-rr-sidebar text-xl grid place-items-center"></i>
			</button>
			<transition-group name="breadCrumbs" tag="ul" class="flex items-center gap-2 text-sm">
				<li :key="'inicio'" class="flex items-center gap-3 duration-300 ease-in-out hover:opacity-50">
					<router-link :to="'/inicio'">Inicio</router-link>
				</li>
				<li v-for="(item, index) in breadCrumbs" :key="index + item.nombre" class="flex items-center gap-2">
					<i class="fi-rr-angle-small-right grid place-items-center text-lg"></i>
					<router-link :to="item.ruta" class="duration-300 ease-in-out hover:opacity-50 last:pointer-events-none">{{ item.nombre }}</router-link>
				</li>
			</transition-group>
		</div>
		<button ref="botonUsuario" @click="toggleMenu" class="flex items-center justify-center w-10 h-10 gap-2 p-1 duration-300 ease-in-out bg-white rounded-lg cursor-pointer border border-slate-300 hover:bg-indigo-50 hover:border-indigo-300 md:w-auto md:px-2">
			<i class="fi-sr-portrait text-2xl grid place-items-center"></i>
			<div class="hidden flex-col justify-center text-[0.8rem] md:flex">
				<span class="font-bold">{{ nombre }}</span>
			</div>
		</button>
		<transition name="fade">
			<div ref="menuUsuario" v-if="mostrarMenu" class="absolute top-16 right-2 bg-white border rounded-lg border-slate-300 text-sm shadow-sm origin-top-right">
				<div class="border-b border-slate-300 flex items-center p-2.5 gap-2.5 min-w-44">
					<i class="fi-sr-portrait grid place-items-center text-3xl"></i>
					<div class="flex flex-col">
						<span>{{ nombre }}</span>
						<span>{{ rol }}</span>
					</div>
				</div>
				<div class="p-1.5">
					<button @click="logout()" class="w-full flex items-center gap-3 text-red-400 cursor-pointer hover:bg-red-100 rounded-md px-2 py-1 active:scale-95 duration-300 ease-in-out">
						<i class="fi-rr-sign-out-alt grid place-items-center text-lg"></i>
						<span>Cerrar sesión</span>
					</button>
				</div>
			</div>
		</transition>
	</header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useBreadCrumbsStore } from '../store/breadCrumbs.js';
import usuariosService from '../services/usuarios.service.js';

// --- MANEJO DE LOS BREADCRUMBS
const breadCrumbsStore = useBreadCrumbsStore();
const { breadCrumbs } = storeToRefs(breadCrumbsStore);
const { nombre, rol } = JSON.parse(localStorage.getItem('usuario'));

// --- MANEJO DEL SIDEBAR
const emit = defineEmits(['minimizar-sidebar', 'ocultar-sidebar']);

const ocultarSidebar = () => {
	emit('ocultar-sidebar');
}

const minimizarSidebar = () => {
	emit('minimizar-sidebar');
}

// --- MANEJO DEL LOGOUT
const router = useRouter();
const mostrarMenu = ref(false);
const botonUsuario = ref(null);
const menuUsuario = ref(null);

const toggleMenu = () =>{
	mostrarMenu.value = !mostrarMenu.value;
}

const handleClickOutside = (event) => {
	if (botonUsuario.value && !botonUsuario.value.contains(event.target) && menuUsuario.value && !menuUsuario.value.contains(event.target)) {
		mostrarMenu.value = false;
	}
}

onMounted(() => document.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));

async function logout() {
	await usuariosService.logout();
	router.push('/');
}
</script>