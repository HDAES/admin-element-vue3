import request from '@/utils/http'

//权限-角色管理共 (6) 个 https://yapi.xujiaji.com/project/27/interface/api/cat_17

//角色列表
export function getRoleList(params) {
    return request({
        url: '/admin/sec/role/page',
        method: 'get',
        params
    })
}

//所有角色
export function getAllRoleList() {
    return request({
        url: '/admin/sec/role/all',
        method: 'get',
    })
}


//角色添加 
export function postRoleAdd(data) {
    return request({
        url: '/admin/sec/role/add',
        method: 'post',
        data
    })
}

//角色删除
export function deleteRole(params) {
    return request({
        url: '/admin/sec/role',
        method: 'DELETE',
        params
    })
}

//角色编辑
export function putRole(data) {
    return request({
        url: '/admin/sec/role/edit',
        method: 'put',
        data
    })
}

//为角色设置权限
export function putPermission(data) {
    return request({
        url: '/admin/sec/role/set/permission',
        method: 'put',
        data
    })
}
