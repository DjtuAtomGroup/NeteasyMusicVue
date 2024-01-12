import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import QrcodeVue from "qrcode.vue";
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(QrcodeVue)
app.mount('#app')
