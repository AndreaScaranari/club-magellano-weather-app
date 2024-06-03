import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudSun, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCloudSun, faGear)

// Create app
createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount('#app')