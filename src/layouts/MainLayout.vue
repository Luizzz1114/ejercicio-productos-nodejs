<template>
	<div class="flex w-dvw h-dvh bg-slate-50 bg-[radial-gradient(circle_2px,var(--color-indigo-100)_100%,transparent_0)] bg-size-[30px_30px]">
		<Sidebar :sidebarOculto="sidebarOculto" :sidebarMinimizado="sidebarMinimizado" @ocultar-sidebar="ocultarSidebar" />
		<div class="flex flex-col w-full h-full">
			<Header @ocultar-sidebar="ocultarSidebar" @minimizar-sidebar="minimizarSidebar" />
			<main class="flex flex-col p-4 overflow-auto">
				<router-view />
			</main>
		</div>
	</div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import { ref } from 'vue';

const sidebarOculto = ref(true);
const sidebarMinimizado = ref(false);

const ocultarSidebar = () => {
	sidebarOculto.value = !sidebarOculto.value;
}

const minimizarSidebar = () => {
	sidebarMinimizado.value = !sidebarMinimizado.value;
}
</script>