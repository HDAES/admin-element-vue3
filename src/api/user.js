import request from '@/utils/http'


// 登录方法
export function postLogin(data) {
    return request({
      url: '/oauth2/admin/login',
      method: 'post',
      data
    })
  }