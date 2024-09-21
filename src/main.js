import "bootstrap/dist/css/bootstrap.css"
import './assets/dashboard.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBook, faPerson, faList, faHouse } from '@fortawesome/free-solid-svg-icons';

library.add(faBook, faPerson, faList, faHouse);

import BaseLayout from './components/base/BaseLayout.vue';
import HeaderLayout from './components/base/HeaderLayout.vue';
import MenuLayout from './components/base/MenuLayout.vue';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('base-layout', BaseLayout);
app.component('header-layout', HeaderLayout);
app.component('menu-layout', MenuLayout);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia())
app.use(router)

app.mount('#app')
import "bootstrap/dist/js/bootstrap.js"
//import "./assets/dashboard.js"
