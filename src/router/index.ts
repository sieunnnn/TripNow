import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import SignupPage from '../pages/authentication/SignupPage.vue';
import LoginPage from "../pages/authentication/LoginPage.vue";
import SocialCallback from "../pages/authentication/SocialCallback.vue";
import Layout from '../layout/Layout.vue';
import PlannerList from "../pages/planner/PlannerList.vue";
import PlannerDetail from "../pages/planner/PlannerSearch.vue";
import PlannerSearch from "../pages/planner/PlannerSearch.vue";

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
        component: Layout,
        children: [
            {
                path: '/planners',
                component: PlannerList
            },
            {
                path: 'planners/1',
                name: 'PlannerDetail',
                component: PlannerDetail
            },
            {
                path: 'planners/search',
                name: 'PlannerSearch',
                component: PlannerSearch
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;