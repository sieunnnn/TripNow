import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SignupPage from '../pages/authentication/SignupPage.vue';
import LoginPage from "../pages/authentication/LoginPage.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/signup',
        name: 'Signup',
        component: SignupPage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
