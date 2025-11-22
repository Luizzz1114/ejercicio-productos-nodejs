import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import Inicio from '../views/Inicio.vue';
import Productos from '../views/Productos.vue';
import Categorias from '../views/Categorias.vue';
import Usuarios from '../views/Usuarios.vue';
import Login from '../views/Login.vue';

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login,
		meta: { autenticado: false }
	},
	{
		path: '/inicio',
		name: 'MainLayout',
		component: MainLayout,
		meta: { autenticado: true },
		children: [
			{
				path: '',
				name: 'Inicio',
				component: Inicio
			},
			{
				path: '/productos',
				name: 'Productos',
				component: Productos
			},
			{
				path: '/categorias',
				name: 'Categorias',
				component: Categorias
			},
			{
				path: '/usuarios',
				name: 'Usuarios',
				component: Usuarios,
				meta: { administrador: true }
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	const usuario = JSON.parse(localStorage.getItem('usuario'));
	if (to.meta.autenticado && !usuario.autenticado) {
		return next('/');
	}
	if (to.path === '/' && usuario && usuario.autenticado) {
		return next('/inicio');
	}
	if (to.meta.administrador && usuario.rol !== 'Administrador') {
		return next('/inicio');
	}
	next();
});

export default router;