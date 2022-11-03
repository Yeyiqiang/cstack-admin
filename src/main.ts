
import App from './App'
import { createApp } from 'vue'
import { setRouters } from './router'
import { registerComponents } from './components'
import { setupStore } from './store'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import '@/assets/styles/index.scss'
import { setupProdMockServer } from '../mock'

async function run(){
        
    const app = createApp(App)

    /* 配置 store , 类似Vuex 5 */
    setupStore(app)

    // app.use(ElementPlus)
    
    /* 配置路由 */
    await setRouters(app)

    /* 配置mock */
    await setupProdMockServer()

    /* 注册全局组件 */
    registerComponents()
    
    app.mount('#app')
}

run()