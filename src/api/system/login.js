import request from '@/utils/http'


//得到验证码: https://yapi.xujiaji.com/project/27/interface/api/113
export function getVerifyCode() {
    return request({
        url: '/admin/sec/user/verifyCode',
        method: 'get'
    })
}


//管理员登录: https://yapi.xujiaji.com/project/27/interface/api/119
export function putUserLogin(data) {
    return request({
        url: '/admin/sec/user/login',
        method: 'put',
        data
    })
}

//管理员信息: https://yapi.xujiaji.com/project/27/interface/api/125
export function getUserInfo() {
    return request({
        url: '/admin/sec/user/info',
        method: 'get'
    })
}

