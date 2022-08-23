
import axios, { AxiosRequestConfig } from 'axios'
import { ResponseType } from './types'
/* 引入状态码文件 */
import { statusMessage } from './status'

const instance = axios.create({
    baseURL: '/api'
})

/* http response 拦截器 */
instance.interceptors.response.use(
	response => {
        /* 请求已发出，但是在2xx的范围 */
        return response;
	},
	error => {
        /* 非2xx的范围 传入响应码，匹配响应码对应信息 */
		statusMessage(error.response.status);           
		return Promise.reject(error.response.data);
	}
);

/* 封装 GET POST 请求并导出 */
const request = <T = any>(config: AxiosRequestConfig): Promise<ResponseType<T>> =>{
	return new Promise(async (resolve,reject)=>{
        const { data } = await instance.request<ResponseType<T>>(config)
        if(data.code === 0){
            resolve(data)
        }else{
            reject(data)
        }
    })
}

export default request