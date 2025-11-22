<template>
	<div class="relative flex h-full">
		<div @click="ocultarSidebar" class="top-0 start-0 w-full h-full backdrop-blur-xs bg-black/10 z-80 lg:hidden" :class="sidebarOculto ? 'hidden' : 'fixed'"></div>
		<aside :class="[sidebarOculto ? '-translate-x-[250px]' : 'translate-x-0', sidebarMinimizado ? 'lg:w-[72px]' : 'lg:w-60']" class="absolute z-90 w-60 h-full flex flex-col gap-5 bg-white border-e border-slate-300 shadow-lg duration-300 ease-in-out lg:relative lg:translate-x-0 lg:h-auto lg:shadow-none">
		<div class="flex items-center justify-between p-4 text-xl font-bold">
			<div class="flex items-center gap-3.5 overflow-hidden">
				<i class="fi-rr-cube text-2xl grid place-items-center text-white bg-radial-[at_25%_25%] from-indigo-400 to-violet-400 p-1.5 rounded-lg"></i>
				<span class="overflow-hidden">Sistema</span>
			</div>
			<button @click="ocultarSidebar" type="button" class="flex items-center justify-center w-10 h-10 duration-300 ease-in-out border-transparent rounded-lg cursor-pointer border hover:bg-slate-50 hover:border-slate-300 lg:hidden">
				<i class="fi-rr-sidebar text-xl grid place-items-center"></i>
			</button>
		</div>
		<ul class="flex flex-col gap-1 text-sm px-4 pb-2.5 text-slate-500">
			<li class="flex items-center group" v-for="(opcion, index) in opciones" :key="index">
				<router-link :to="opcion.ruta" @click="ocultarSidebar" class="relative flex items-center w-full h-full gap-3.5 p-2 duration-300 ease-in-out rounded-lg cursor-pointer router-link border border-transparent" exact-active-class="router-link--active">
					<i :class="opcion.icono" class="grid place-items-center text-xl"></i>
					<span class="overflow-hidden">{{ opcion.nombre }}</span>
				</router-link>
				<div v-if="sidebarMinimizado" class="shadow-md origin-left absolute z-60 start-20 rounded-md bg-indigo-700 text-sm px-3 py-2 text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 pointer-events-none ease-in-out duration-300 scale-85">
					{{ opcion.nombre }}
				</div>
			</li>
		</ul>
		</aside>
	</div>
</template>

<script setup>
const props = defineProps({
	sidebarOculto: Boolean,
	sidebarMinimizado: Boolean,
});

const emit = defineEmits(['ocultar-sidebar']);
const ocultarSidebar = () => {
	emit('ocultar-sidebar');
}

let opciones = [
	{ nombre: "Inicio", icono: "fi-rr-chart-simple-horizontal", ruta: "/inicio" },
	{ nombre: "Productos", icono: "fi-rr-box-open-full", ruta: "/productos" },
	{ nombre: "Categorías", icono: "fi-rr-layers", ruta: "/categorias" },
	{ nombre: "Usuarios", icono: "fi-rr-user", ruta: "/usuarios" },
];

const { rol } = JSON.parse(localStorage.getItem('usuario'));
if (rol === 'Usuario') {
	opciones = opciones.filter(opcion => opcion.nombre !== 'Usuarios');
}
</script>