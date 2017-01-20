import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import BuyTickets from '../components/buy/BuyTickets.vue'
import Validate from '../components/buy/Validate.vue'
import TicketsLists from '../components/buy/TicketsLists.vue'
import BuySuccess from '../components/buy/Success.vue'

import GetTickets from '../components/get/GetTickets.vue'
import GetMenu from '../components/get/GetMenu.vue'
import Code from '../components/get/Code.vue'
import IdCard from '../components/get/IdCard.vue'
import TwoBarCode from '../components/get/TwoBarCode.vue'
import GetSuccess from '../components/get/Success.vue'


Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/buytickets', redirect: '/buytickets/validate' },
    { path: '/gettickets', redirect: '/gettickets/getmenu' },
    {
        name: 'home', 
        path: '/home', 
        component: Home,
    },
    { 
        name: 'buytickets', 
        path: '/buytickets', 
        component: BuyTickets,
        children: [
            {
                name: 'validate', 
                path: 'validate',
                component: Validate
            },
            {
                name: 'ticketslists',
                path: 'ticketslists',
                component: TicketsLists
            },
            {
                name: 'buysuccess',
                path: 'buysuccess',
                component: BuySuccess
            }
        ]
    },
    { 
        name: 'gettickets', 
        path: '/gettickets', 
        component: GetTickets,
        children: [
            {
                name: 'getmenu',
                path: 'getmenu',
                component: GetMenu
            },
            {
                name: 'code',
                path: 'code',
                component: Code
            },
            {
                name: 'idcard',
                path: 'idcard',
                component: IdCard
            },
            {
                name: 'twobarcode',
                path: 'twobarcode',
                component: TwoBarCode
            },
            {
                name: 'getsuccess',
                path: 'getsuccess',
                component: GetSuccess
            }
        ]
    }
]

const router = new VueRouter({
    // mode: 'history',
    routes
});

export default router
