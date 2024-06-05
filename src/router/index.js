// Importo le funzioni di Vue Router
import {createRouter, createWebHistory} from 'vue-router';

// Importo le mie pagine
import DashboardPage from '../pages/DashboardPage.vue';
import SettingsPage from '../pages/SettingsPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

// Definisco le rotte
export default createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: DashboardPage, name: 'dashboard'},
        {path: '/settings', component: SettingsPage, name: 'settings'},

        {path: '/not-found', component: NotFoundPage, name:'not-found'},
        {path: '/:pathMatch(.*)*', redirect: 'not-found'}
    ]
});