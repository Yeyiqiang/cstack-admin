
import App from './App'
import { createApp } from 'vue'
import { setRouters } from './router'
import ElementPlus from 'element-plus'
import './style.css'
import 'element-plus/dist/index.css'

async function run(){
        
    const app = createApp(App)

    app.use(ElementPlus)
    
    await setRouters(app)
    
    app.mount('#app')
}

run()