import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// @ts-ignore
import SignupPage from '../pages/authentication/SignupPage.vue';
// @ts-ignore
import LoginPage from "../pages/authentication/LoginPage.vue";
// @ts-ignore
import SocialCallback from "../pages/authentication/SocialCallback.vue";
import Layout from '../layout/Layout.vue';

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
    {
        path: '/oauth/callback',
        name: 'SocialLogin',
        component: SocialCallback
    },
    {
        path: '/',
        name: 'Layout',
        component: Layout
        // children: [
        //     {
        //         path: '',
        //         component: MultipleComponents
        //     }
        // ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;