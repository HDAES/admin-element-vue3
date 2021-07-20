import { defineStore } from 'pinia'
import { routes } from '@/route/routes'
import Layout from '@/layout'
export const usePermissionStore = defineStore({
  id: 'permission',
  state: () =>({
    routes,
    sidebarRouters: []
  }),
  getters: {
    getSidebarRouters(){
      return this.sidebarRouters
    }
  },
  actions: {
    setSidebarRouters(sidebarRouters) {
      this.sidebarRouters = sidebarRouters
    },
    // 生成路由
    GenerateRoutes(){
        return new Promise(resolve => {
          const sdata = JSON.parse(JSON.stringify(routes))
          const rdata = JSON.parse(JSON.stringify(routes))

          const myRoutes = filterAsyncRouter(sdata, false, true)
          const sidebarRoutes = filterAsyncRouter(rdata)
          console.log(sidebarRoutes)
          this.setSidebarRouters(sidebarRoutes)
          resolve(myRoutes)
        })
    }
  }
})

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
    return asyncRouterMap.filter(route => {
        if (type && route.children) {
          route.children = filterChildren(route.children)
        }
        if (route.component) {
            // Layout ParentView 组件特殊处理
            if (route.component === 'Layout') {
                route.component = Layout   
            }else if(route.component === 'ParentView'){

            }else{
              route.component = loadView(route.component)
              
            }
        }

        if (route.children != null && route.children && route.children.length) {
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
            if (c.children && c.children.length) {
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