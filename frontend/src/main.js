import './assets/main.css';
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@vueuse/head';
import { useSeoStore } from '@/stores/seo';

import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';

//directives
import draggable from './directives/draggable.js';
import followCursor from './directives/followCursor';
import accordion from './directives/accordion';
//

const app = createApp(App);

app.use(createPinia());
app.use(createHead());
app.use(router);
app.use(PrimeVue);
app.directive('draggable', draggable);
app.directive('follow-cursor', followCursor);
app.directive('accordion', accordion);

const seoStore = useSeoStore();

seoStore.loadSeo().then(() => {
    app.mount('#app');
});
