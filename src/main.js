import { createApp } from 'vue'
import '@/assets/styles/index.scss'
import { router } from './route'
import Element from '@/core/demand-loading'
import SvgIcon from '@/components/BaseSvgIcon'
import App from './App.vue'
import I18n from "@/locales";
import { store } from './store'
import './permission'

const app = createApp(App)

app.component('svg-icon', SvgIcon)

app.use(Element)
app.use(router)
app.use(I18n)
app.use(store)
app.mount('#app')
