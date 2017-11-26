import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/store'
import App from '../app'
import Index from '../page/Index/Index'
import Login from '../page/PC/Common/Login'
import Sign from '../page/PC/Common/Sign'
import Individual from '../page/PC/Common/Individual'
import Enterprise from '../page/PC/Common/Enterprise'
import News from '../page/PC/Common/News'
import AboutUs from '../page/PC/Common/AboutUs'
import HRBackSystemI from '../page/PC/Individual/HRBackSystemI'
import {deviceInfo} from "../util/device"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    children: [
    {path: '/Index', name: '首页', component: Index},
    {path: '/Login', name: '登录', component: Login},
    {path: '/Sign', name: '注册', component: Sign},
    {path: '/Individual', name: '个人保', component: Individual},
    {path: '/Enterprise', name: '企业保', component: Enterprise},
    {path: '/News', name: '社保资讯', component: News},
    {path: '/AboutUs', name: '关于我们', component: AboutUs},

    
    
    {path: '/HRBackSystemI', name: 'HR管理后台(个人)', component: HRBackSystemI},
      {path:'*', redirect: '/Index'}
      // {path: '/article/:id', name: 'article', component: Article},
    ]
  }
]
const router = new VueRouter({
  routes: routes, // short for routes: routes
  //linkActiveClass: 'active',  // router-link的选中状态的class，也有一个默认的值
  saveScrollPosition: true ,//记住页面的滚动位置 html5模式适用
  //mode: 'history',
  //ashbang: false,
  history: true
})
//登录控制
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (localStorage.getItem("user_token")) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/Login',
            })
        }
    }
    else {
        next();
    }
})
//导航显示当前路由名称
router.afterEach((to, from, next) => {
  var ISMobile = deviceInfo()
  Store.state.activeRoute=to.name;
  Store.state.isMobile=ISMobile;
  document.title = to.name;
  Store.commit('ROUTE_CHANGE',{activeRoute: to.name})
      
})
export default router
