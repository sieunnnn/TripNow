import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SignupPage from '../pages/authentication/SignupPage.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/signup',
        name: 'Signup',
        component: SignupPage
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
    routes
});

export default router;
