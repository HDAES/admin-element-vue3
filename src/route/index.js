import { createRouter,createWebHistory} from "vue-router";
import Layout from '@/layout'

const routes = [
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
        path: '/index',
        component: Layout,
        redirect: 'index',
        children: [
          {
            path: 'index',
            component: (resolve) => require(['@/pages/index'], resolve),
            name: 'Index',
            meta: { title: '首页', icon: 'dashboard', affix: true }
          }
        ]
    },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: ()=>import('@/pages/notFound') 
    },
]


export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})