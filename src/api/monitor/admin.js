import request from '@/utils/http'


//在线用户列表: https://yapi.xujiaji.com/project/27/interface/api/35
export function getOnline(params) {
    return request({
        url: '/admin/sec/monitor/online/user',
        method: 'get',
        params
    })
}
