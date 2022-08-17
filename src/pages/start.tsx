
import { defineComponent } from 'vue'
import classes from './index.module.scss'
import { RouterView } from 'vue-router'

export const Start = defineComponent({
    setup(){
        return ()=>{
            return <div>
                start page
            </div>
        }
    }
})