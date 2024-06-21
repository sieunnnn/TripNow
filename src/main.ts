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
import pinia from "./store";
import naive from "naive-ui";

import "vuestic-ui/css";

const app = createApp(App);

app.config.globalProperties.$axios = axiosInstance;

library.add(
    fas, far
)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia);
app.use(router);
app.use(naive);
app.use(createVuestic());

app.mount('#app');
