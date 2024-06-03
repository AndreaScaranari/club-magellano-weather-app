// Importo le funzioni di Vue Router
import {createRouter, createWebHistory} from 'vue-router';

// Importo le mie pagine
import DashboardPage from '../pages/DashboardPage.vue';
import SettingsPage from '../pages/SettingsPage.vue';

// Definisco le rotte
export default createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: DashboardPage},
        {path: '/settings', component: SettingsPage},
        {path: '/:pathMatch(.*)*', redirect: '/'}
    ]
});