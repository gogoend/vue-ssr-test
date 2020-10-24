import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/components/Index'
import Detail from '@/components/Detail'

Vue.use(VueRouter)

export default function createRouter() {
    return new  VueRouter({
        mode:'history',
        routers: [
            {path:'/', components: Index},
            {path:'/detail', components: Detail}
        ]
    })
}