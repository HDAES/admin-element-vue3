import { defineStore } from 'pinia'
import { getPermissionUser } from '@/api/system/menu'
import Layout from '@/layout'
export const usePermissionStore = defineStore({
  id: 'permission',
  state: () =>({
    sidebarRouters: []
  }),
  getters: {
    getSidebarRouters(){
      return this.sidebarRouters
    }
  },
  actions: {
    setSidebarRouters(sidebarRouters) {
      // 顶部导航菜单默认添加统计报表栏指向首页
      const index = [{
        path: 'index',
        meta: { title: '首页', icon: 'el-icon-s-home'}
      }]
      this.sidebarRouters = [...index,...sidebarRouters]
    },
    // 生成路由
    GenerateRoutes(){
        return new Promise(resolve => {
          getPermissionUser().then(res =>{
            const sdata = JSON.parse(JSON.stringify(res))
            const rdata = JSON.parse(JSON.stringify(res))

            const myRoutes = filterAsyncRouter(sdata, false, true)
            const sidebarRoutes = filterAsyncRouter(rdata)
            
            this.setSidebarRouters(sidebarRoutes)

            resolve(myRoutes)
          })
        })
    }
  }
})



// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
    return asyncRouterMap.filter(route => {
        // if (type && route.children ) {
        //   route.children = filterChildren(route.children)
        // }
        if (route.component) {
            // Layout ParentView 组件特殊处理
            if (route.component === 'Layout') {
                route.component = Layout   
            }else if(route.component === 'ParentView'){

            }else{
              route.component = loadView(route.component)
              
            }
        }

        if (route.children != null && route.children && route.children.length &&  route.type == 0) {
            route.children = filterAsyncRouter(route.children, route, type)
        }else {
            delete route['children']
            delete route['redirect']
        }

        return true
    })
}


function filterChildren(childrenMap, lastRouter = false) {
    var children = []
    childrenMap.forEach((el, index) => {
      if (el.children && el.children.length) {
        if (el.component === 'ParentView') {
          el.children.forEach(c => {
            c.path = el.path + '/' + c.path
            if (c.children && c.children.length && c.type == 2) {
              children = children.concat(filterChildren(c.children, c))
              return
            }
            children.push(c)
          })
          return
        }
      }
      if (lastRouter) {
        el.path = lastRouter.path + '/' + el.path
      }
      children = children.concat(el)
    })
    return children
  }

  
export const loadView = (view) => { // 路由懒加载
    return () => import(`@/pages/${view}`)
  }