import { createApp } from 'vue'
import vant from 'vant'
import App from './App.vue'
import '@/assets/styles/index.scss'
import 'vant/lib/index.css'

createApp(App).use(vant).mount('#app')
