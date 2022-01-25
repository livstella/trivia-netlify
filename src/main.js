import { createApp } from 'vue';
import App from './App.vue';
//Import router
import store from './store.js'
import router from './router.js';
import vClickOutside from "click-outside-vue3"

createApp(App)
    .use(vClickOutside)
    .use(store)
    .use(router)
    .mount('#app')
