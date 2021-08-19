import {router} from './route'
import { getToken } from '@/utils/auth'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import layout from '@/layout'
NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach((to, from, next) =>{
    NProgress.start()
    if(getToken()){
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        }else{
            const userStore = useUserStore()
            if(userStore.roles.length == 0){
                try {
                    const permissionStore = usePermissionStore()
                    userStore.GetInfo().then(res =>{
                        permissionStore.GenerateRoutes().then(accessRoutes =>{
                            accessRoutes.forEach(item =>{
                                router.addRoute(item)
                            })
                           
                            //console.log(router.getRoutes())
                            next({ ...to, replace: true })
                        })
                    })
                }catch (error) {
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }else{
                next()
            }
            
            
        }
    }else{
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        }else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() =>{
    NProgress.done()
})