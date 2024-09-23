import "bootstrap/dist/css/bootstrap.css"
import './assets/dashboard.css'
import './assets/form-styles.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBook, faPerson, faList, faHouse, faFileImport } from '@fortawesome/free-solid-svg-icons';
import Notifications from '@kyvg/vue3-notification'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Pagination from 'v-pagination-3';

import './axios'; // axios.js - responsavel por setar a url da api

import BaseLayout from './components/base/BaseLayout.vue';
import HeaderLayout from './components/base/HeaderLayout.vue';
import MenuLayout from './components/base/MenuLayout.vue';

library.add(faBook, faPerson, faList, faHouse, faFileImport);


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('base-layout', BaseLayout);
app.component('header-layout', HeaderLayout);
app.component('menu-layout', MenuLayout);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('pagination', Pagination);

app.use(createPinia())
app.use(router)
app.use(Notifications)
app.use(VueAxios, axios)

app.mount('#app')
import "bootstrap/dist/js/bootstrap.js"
