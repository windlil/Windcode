import { createApp } from 'vue'
import { Dialog } from 'vant'
import App from './App.vue'
import '@/assets/styles/index.scss'
import 'vant/lib/index.css'
import pinia from '@/store/index'

const app = createApp(App)
app.use(pinia)
app.use(Dialog)
app.mount('#app')
