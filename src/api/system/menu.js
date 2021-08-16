import request from '@/utils/http'

//权限-角色管理共 (6) 个 https://yapi.xujiaji.com/project/27/interface/api/cat_16

//获取权限树
export function getPermissionTree(params) {
    return request({
        url: '/admin/sec/permission/tree',
        method: 'get',
        params
    })
}
