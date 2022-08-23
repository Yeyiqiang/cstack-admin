
import { defineComponent,ref,Ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import classes from './start.module.scss'

export default defineComponent({
    
    setup(){
        const percentage:Ref<number> = ref(0)
        const customColor:Ref<string> = ref('#409eff')
        const router = useRouter()
        onMounted(() => {
            const timer = setInterval(() => {
                percentage.value = (percentage.value % 100) + 10
                if(percentage.value==100){
                    clearInterval(timer)
                    router.replace('/login')
                }
            }, 500)
        })
        return ()=>{
            return <div class={classes.start}>
                <el-progress class={classes['progress-style']} percentage={percentage.value} color={customColor.value} />
                <div>初始化中...</div>
            </div>
        }
    }
})