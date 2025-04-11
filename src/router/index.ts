import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  { path: '/', component: () => import('@/views/HomeView.vue') },
  { path: '/about', component: () => import('@/views/AboutView.vue') },
  { path: '/experience', component: () => import('@/views/ExperiencieView.vue') },
  { path: '/contact', component: () => import('@/views/ContactView.vue') },
  { path: '/projects', component: () => import('@/views/ProyectsView.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
