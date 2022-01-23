import { createApp } from 'vue';
import App from './App.vue';
//Import router
import router from '/router.js';

createApp(App)
    .use(router)
    .mount('#app')
