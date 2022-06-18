import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, { locale })
for (const name in ElIcons) {
  app.component(name, (ElIcons)[name])
}

// app.use(router) 需放在app.mount('#app')前面
app.mount('#app')
