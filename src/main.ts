// @ts-ignore
import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createVuestic } from "vuestic-ui";

// @ts-ignore
import App from './App.vue';
import router from './router';
import axiosInstance from './axios';
// @ts-ignore
import Toast from './components/toast/Toast.vue';
// @ts-ignore
import pinia from "./store";
import naive from "naive-ui";

import "vuestic-ui/css";
import 'flatpickr/dist/flatpickr.min.css';
import './assets/styles/flatpickr-custom.css';

const app = createApp(App);

app.config.globalProperties.$axios = axiosInstance;

library.add(
    fas, far
)

app.component('Toast', Toast);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router);
app.use(naive);
app.use(createVuestic());
app.mount('#app');
