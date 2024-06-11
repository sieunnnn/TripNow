import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axiosInstance from './axios';
import 'flatpickr/dist/flatpickr.min.css';
import './assets/styles/flatpickr-custom.css';
import ToastManager, { addToast } from './components/ToastManager.vue';


const app = createApp(App);
app.config.globalProperties.$axios = axiosInstance;
app.component('ToastManager', ToastManager);
app.config.globalProperties.$addToast = addToast;
app.use(router);

app.mount('#app');
