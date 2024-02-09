import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import LocationSelector from './components/LocationSelector.vue'
import CartPage from  "./pages/CartPage.vue"

const routes = [
  { path: '/', component: LocationSelector },
  { path: '/cart', name: 'cart', component: CartPage },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
