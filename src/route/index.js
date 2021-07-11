import { createRouter,createWebHashHistory} from "vue-router";
import layout from '@/layout'

const routes = [
    {
        path: '/redirect',
        component: layout,
        children: [
            {
              path: ':pathMatch(.*)*',
              component: () => import('@/pages/redirect')
            }
        ]
    },
    {
        path: '/', redirect: '/home'
    },{
        path: "/home",
        name: "home",
        component: () => import('@/pages/home')
    },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: ()=>import('@/pages/notFound') 
    },
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})