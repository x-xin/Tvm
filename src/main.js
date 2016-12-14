// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

import Home from './components/Home.vue'
import BuyTickets from './components/buy/BuyTickets.vue'
import Validate from './components/buy/Validate.vue'
import TicketsLists from './components/buy/TicketsLists.vue'

import GetTickets from './components/get/GetTickets.vue'
import GetMenu from './components/get/GetMenu.vue'
import Code from './components/get/Code.vue'
import IdCard from './components/get/IdCard.vue'
import TwoBarCode from './components/get/TwoBarCode.vue'

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
            }
        ]
    }
]

const router = new VueRouter({
    // mode: 'history',
    routes
});

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
