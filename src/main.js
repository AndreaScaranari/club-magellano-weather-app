import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AppLoader from './components/AppLoader.vue';
import router from './router'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudSun, faGear, faChevronDown, faAnglesLeft, faAnglesRight, faDroplet, faDropletSlash, faWind, faGauge, faArrowsDownToLine} from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCloudSun, faGear, faChevronDown, faFacebook, faTwitter, faInstagram, faAnglesLeft, faAnglesRight, faDroplet, faDropletSlash, faWind, faGauge, faArrowsDownToLine)

// Create app
createApp(App)
.component('font-awesome-icon', FontAwesomeIcon, AppLoader)
.use(router)
.mount('#app')
