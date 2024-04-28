// import './assets/main.css'
import 'normalize.css'
import '@/assets/style/index.scss'
import '@/assets/global.css'
// element样式缺失
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-message-box.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

// 图标注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 全局注册
import {globalRegeist} from './global'
import setupMenu from './global/setupMenu'
import {listFresh} from './service/school/fresh'
import directiveImagePreviewer from 'vue3-directive-image-previewer'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
// 解决刷新以后路由丢失
await setupMenu()
app.use(router)
app.use(globalRegeist)
app.use(directiveImagePreviewer.components.install)
app.directive('directiveImagePreviewer', directiveImagePreviewer.directive.vDirectiveImagePreviewer)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
