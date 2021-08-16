
export const routes = [{
    path: '/system',
    redirect: "noRedirect",
    name: 'System',
    component: "Layout",
    meta: {
        title: '系统管理',
        icon: 'el-icon-phone',
        noCache: false, 
        link: null
    },
    children:[{
        path: 'role',
        name: 'Role',
        component: "system/role/index",
        meta: {
            title: '角色管理',
            icon: 'el-icon-phone',
            noCache: false, 
            link: null
        },
    },{
        path: 'user',
        name: 'User',
        component: "system/user/index",
        meta: {
            title: '管理员列表',
            icon: 'el-icon-phone',
            noCache: false, 
            link: null
        },
    },{
        path: 'menu',
        name: 'Menu',
        component: "system/menu/index",
        meta: {
            title: '权限管理',
            icon: 'el-icon-phone',
            noCache: false, 
            link: null
        },
    }]
},{
    path: '/user',
    redirect: "noRedirect",
    name: 'Uset',
    component: "Layout",
    meta: {
        title: '用户管理',
        icon: 'el-icon-pie-chart',
        noCache: false, 
        link: null
    },
    children:[{
        path: 'index',
        name: 'userCenter',
        component: "user/index",
        meta: {
            title: '用户中心',
            icon: 'el-icon-pie-chart',
            noCache: false, 
            link: null
        },
    }]
}]