import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'login',
		component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
	},
	{
		path: '/register',
		name: 'register',
		component: () => import(/* webpackChunkName: "about" */ '../views/register.vue'),
	},
	{
		path: '/index',
		name: 'index',
		component: () => import(/* webpackChunkName: "about" */ '../views/index.vue'),
	},
	{
		path: '/personal',
		name: 'personal',
		component: () => import(/* webpackChunkName: "about" */ '../views/personal.vue'),
	},
	{
		path: '/housecard',
		name: 'housecard',
		component: () => import(/* webpackChunkName: "about" */ '../views/housecard.vue'),
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
