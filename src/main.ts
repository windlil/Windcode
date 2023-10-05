import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/index.scss'
import 'vant/lib/index.css'
import pinia from '@/store/index'

createApp(App).use(pinia).mount('#app')
