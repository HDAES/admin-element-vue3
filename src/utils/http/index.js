import axios from 'axios'
import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import { setSign } from './sign'

import { useUserStore } from '@/store/modules/user'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: process.env.VUE_APP_BASE_API,
    // 超时
    timeout: 10000
})
// request拦截器
service.interceptors.request.use(config => {

    const timestamp = new Date().getTime()

    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
        config.headers['Authorization'] =  getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    config.headers['version'] = '1.0.0'
    config.headers['timestamp'] = timestamp
    config.headers['sign'] = setSign(config,timestamp)
    return config
}, error => {
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response =>{
    const code = response.data.code;

    if(code == 200){
        if(response.data.data){
            return response.data.data
        }else{
            ElMessage.success(response.data.message || '操作成功')
            return response.data
        }
        
    }else if(code == 201 || code == 403){
        ElMessage.error(response.data.message || '未知错误')
        return Promise.reject(new Error(response.data.message))
    }else if(code == 4014){
        ElMessage.error(response.data.message || '未知错误')
        return Promise.reject(new Error(response.data.message))
    }else if(code == 401){
        ElMessage.error(response.data.message || '未知错误')
        // useUserStore().loginOut().then(res =>{
        //     location.href = '/login';
        // })
    }else if(code == 404){
        ElMessage.error(response.data.message || '未知错误')
        return Promise.reject(new Error(response.data.message))
    }else if(code == 5003){
        ElMessage.error(response.data.message || '未知错误')

        useUserStore().loginOut().then(res =>{
            location.href = '/login';
        })
    }
},error => {
    let { message } = error;
    if (message == "Network Error") {
        message = "后端接口连接异常"; 
    }else if(message.includes("timeout")){
        message = "系统接口请求超时";
    }else if(message.includes("Request failed with status code")){
        message = "系统接口" + message.substr(message.length - 3) + "异常";
    }

    ElMessage({
        type: 'error',
        message,
        duration: 5000
    })

    return Promise.reject(error)
})

export default service