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
