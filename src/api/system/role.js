import request from '@/utils/http'



export function getRoleList(params) {
    return request({
        url: '/admin/sec/role/page',
        method: 'get',
        params
    })
}


