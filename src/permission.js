import {router} from './route'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login']
router.beforeEach((to, from, next) =>{
    NProgress.start()
    if(getToken()){
        next({ path: '/home' })
        NProgress.done()
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