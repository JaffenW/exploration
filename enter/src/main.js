import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.css'
import '@/assets/css/reset.css'
import 'element-plus/dist/index.css'

document.documentElement.setAttribute('data-theme', 'default')

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
