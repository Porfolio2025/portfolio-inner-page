import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // Asegúrate de que la ruta es la correcta

const app = createApp(App)
app.use(router)  // Aquí se registra el router
app.mount('#app')

