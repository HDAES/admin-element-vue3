import request from '@/utils/http'
//https://yapi.xujiaji.com/project/27/interface/api/cat_18

//角色列表
export function getUserList(params) {
    return request({
        url: '/admin/sec/user/page',
        method: 'get',
        params
    })
}

//管理员添加
export function postUserAdd(data) {
    return request({
        url: '/admin/sec/user/add',
        method: 'post',
        data
    })
}

//管理员删除
export function deleteUser(params) {
    return request({
        url: '/admin/sec/user',
        method: 'delete',
        params
    })
}
