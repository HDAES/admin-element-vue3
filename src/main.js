import { createApp } from 'vue'
import '@/assets/styles/index.scss'
import { router } from './route'
import Element from '@/core/demand-loading'
import App from './App.vue'
import './permission'


const app = createApp(App)

app.use(Element)
app.use(router)
app.mount('#app')
