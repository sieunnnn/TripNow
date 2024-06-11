import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axiosInstance from './axios';
import 'flatpickr/dist/flatpickr.min.css';
import './assets/styles/flatpickr-custom.css';
import Toast from './components/toast/Toast.vue';


const app = createApp(App);
app.config.globalProperties.$axios = axiosInstance;
app.component('Toast', Toast);
app.use(router);

app.mount('#app');
