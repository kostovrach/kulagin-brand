import './assets/main.css';
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import AnimateOnScroll from 'primevue/animateonscroll';
import draggable from './directives/draggable.js';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.directive('animateonscroll', AnimateOnScroll);
app.directive('draggable', draggable);

app.mount('#app');
