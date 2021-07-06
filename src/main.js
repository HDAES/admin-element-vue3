import { createApp } from 'vue'


import '@/assets/styles/index.scss'

import Element from '@/core/demand-loading'
import App from './App.vue'

const app = createApp(App)

app.use(Element)
app.mount('#app')
