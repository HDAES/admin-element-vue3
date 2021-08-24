import {router} from './route'
import { getToken } from '@/utils/auth'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
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
                            accessRoutes.forEach(route =>{
                                router.addRoute(route)
                            })
                            next({ ...to, replace: true })
                            router.addRoute({ 
                                path: '/:pathMatch(.*)*', 
                                name: 'NotFound', 
                                component: ()=>import('@/pages/notFound') 
                            })
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