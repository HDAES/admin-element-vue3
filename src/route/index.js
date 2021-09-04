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