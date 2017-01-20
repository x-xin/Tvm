import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'  // 导入routers规则

Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    routes
});

export default router
