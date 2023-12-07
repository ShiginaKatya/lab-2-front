import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue';
import ClientPage from '../views/ClientPage.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      // {
      //   path: '/login',
      //   name: 'login',
      //   component: LoginView
      // },
      { path: '/', component: LoginPage },
      { path: '/client', component: ClientPage },
    
    ]})

export default router