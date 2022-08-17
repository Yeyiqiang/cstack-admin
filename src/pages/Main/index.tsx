
import { defineComponent } from 'vue'
import classes from './index.module.scss'
import { RouterView } from 'vue-router'

export const Index = defineComponent({
    isRedirect: true,
    setup(){
        return ()=>{
            return <>
                <div class={classes['common-layout']}>
                    <el-container>
                        <el-header>Header</el-header>
                        <el-container>
                            <el-aside width="200px">
                                list
                            </el-aside>
                            <el-container>
                            <el-main>
                                <RouterView></RouterView>
                            </el-main>
                            <el-footer>Footer</el-footer>
                            </el-container>
                        </el-container>
                    </el-container>
                </div>
            </>
        }
    }
})