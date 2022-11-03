
import { userLogin } from '../../api/login'
import classes from './login.module.scss'

export const Login = defineComponent({
    setup(){
        const userInfo = reactive({
            username:'admin',
            password:''
        })
        function ToLogin(){
            userLogin({
                username: userInfo.username,
                password: userInfo.password
            }).then((res:any)=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }
        return ()=>{
            return <div class={classes['user-form']}>
                <el-card class="flex">
                    <el-form model={userInfo} class="flex column">
                        <el-form-item label="用户名" labelWidth="80px">
                            <el-input v-model={userInfo.username} placeholder="请输入用户名" />
                        </el-form-item>
                        <el-form-item label="密码" labelWidth="80px">
                            <el-input type="password" v-model={userInfo.password} placeholder="请输入密码" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" onClick={ToLogin}>登 录</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
        }
    }
})