// @ts-ignore
import { createApp } from 'vue';
// @ts-ignore
import App from './App.vue';
import router from './router';
import axiosInstance from './axios';
// @ts-ignore
import Toast from './components/toast/Toast.vue';
import pinia from "./store";

import 'flatpickr/dist/flatpickr.min.css';
import './assets/styles/flatpickr-custom.css';

const app = createApp(App);

app.config.globalProperties.$axios = axiosInstance;
app.component('Toast', Toast);
app.use(router);
app.use(pinia);

app.mount('#app');
