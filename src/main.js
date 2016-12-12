// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

import Home from './components/Home.vue'
import BuyTickets from './components/BuyTickets.vue'
import GetTickets from './components/GetTickets.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/home' },
    {
        name: 'home', 
        path: '/home', 
        component: Home
    },
    { 
        name: 'buytickets', 
        path: '/buytickets', 
        component: BuyTickets 
    },
    { 
        name: 'gettickets', 
        path: '/gettickets', 
        component: BuyTickets 
    }
]

const router = new VueRouter({
    mode: 'history',
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
