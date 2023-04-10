/*
 * @Author: LYM
 * @Date: 2022-05-12 08:53:30
 * @LastEditors: LYM
 * @LastEditTime: 2022-11-16 13:42:32
 * @Description: main  config
 */
import { createApp } from 'vue'
import App from './App.vue'
import piniaPersist from 'pinia-plugin-persist'
import pinia from '@/store/store'
import router from './router'
import VueDOMPurifyHTML from 'vue-dompurify-html' // xss攻击

const app = createApp(App)

pinia.use(piniaPersist)

app.use(router).use(createPinia()).use(VueDOMPurifyHTML).mount('#app')
