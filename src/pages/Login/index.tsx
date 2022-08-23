
import { defineComponent } from 'vue'
import { userLogin } from '../../api/login'

export const Login = defineComponent({
    setup(){
        function ToLogin(){
            userLogin({username:'admin',password:'123456'}).then((res:any)=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }
        return ()=>{
            return <div onClick={ToLogin}>this is Login page</div>
        }
    }
})