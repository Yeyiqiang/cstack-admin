
import { defineComponent } from "vue"
import { RouterView } from "vue-router"
import classes from './index.module.scss'

export const Home = defineComponent({
    setup(){
        return ()=>{
            return (
              <div class={classes['common-layout']}>
                home
                <RouterView></RouterView>
              </div>
            )
        }
    }
})
