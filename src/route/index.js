import { createRouter,createWebHistory, createWebHashHistory} from "vue-router";
import Layout from '@/layout'

export const routes = [
    {
        path: '/redirect',
        component: Layout,
        children: [
            {
              path: ':pathMatch(.*)*',
              component: () => import('@/pages/redirect')
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import('@/pages/login')
    },
    {
        path: '',
        component: Layout,
        redirect: 'index',
        children: [
          {
            path: 'index',
            component: () => import('@/pages/index'),
            name: 'Index',
            meta: { title: '首页', icon: 'dashboard', affix: true }
          }
        ]
    },
    // { 
    //     path: '/:pathMatch(.*)*', 
    //     name: 'NotFound', 
    //     component: ()=>import('@/pages/notFound') 
    // },
]


export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})