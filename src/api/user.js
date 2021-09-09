import request from '@/utils/http'


// 登录方法
export function postLogin(data) {
  return request({
    url: '/oauth2/admin/login',
    method: 'post',
    data
  })
}

//登出
export function postLoginOut(data) {
  return request({
    url: '/admin/sec/user/logout',
    method: 'post',
    data
  })
}


export function getPermissionTree() {
  return request({
    url: '/admin/sec/permission/tree',
    method: 'get'
  })
}

export function getUserList(params) {
  return request({
    url: '/api/manage/user/list',
    method: 'get',
    params
  })
}
