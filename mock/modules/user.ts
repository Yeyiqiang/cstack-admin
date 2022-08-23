
import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess,resultError,responseError } from '../resultType'

function createUserList(){
    return [
        {
            username:'admin',
            password:'123456',
            roles:'admin',
            realName:'张三',
            token:'000111222333444555',
            id:'1'
        },
        {
            username:'editor',
            password:'123456',
            roles:'editor',
            realName:'李四',
            token:'000111222333444666',
            id:'2'
        },
    ]
}

export default [
    {
        url: '/api/login',
        timeout: 200,
        method: 'post',
        response: ({ body }) => {
            try{
                const { username, password } = body
                const checkUser = createUserList().find(
                    (item) => item.username === username && password === item.password
                )
                if (!checkUser) {
                    return resultError('用户名或密码错误！')
                }
                const { id, username: _username, token, realName, roles } = checkUser
                return resultSuccess({
                    id,
                    username: _username,
                    token,
                    realName,
                    roles,
                })
            }catch(err){
                return responseError(err)
            }
        },
    },
    {
        url: '/api/getUser',
        timeout: 200,
        method: 'get',
        response: ({ body }) => {
            try{
                const { username, password } = body
                const checkUser = createUserList().find(
                    (item) => item.username === username && password === item.password
                )
                if (!checkUser) {
                    return resultError('用户名或密码错误！')
                }
                const { id, username: _username, token, realName, roles } = checkUser
                return resultSuccess({
                    id,
                    username: _username,
                })
            }catch(err){
                return responseError(err)
            }
        },
    }
] as MockMethod[]