
import request from './index'
import { User,ResponseType } from './types'

export const userLogin = (params:Object): Promise<ResponseType<any>> =>{
    return request<User>({
        url: '/login',
        method: 'post',
        data: params
    })
}

export const getUser = (params:Object): Promise<ResponseType<any>> =>{
    return request<User>({
        url: '/getUser',
        method: 'get',
        data: params
    })
}