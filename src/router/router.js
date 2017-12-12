import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/store'
import App from '../app'
import Index from '../page/Index/Index'
import Login from '../page/PC/Common/Login'
import SignI from '../page/PC/Individual/Sign'
import SignE from '../page/PC/Enterprise/Sign'
import Individual from '../page/PC/Common/Individual'
import Enterprise from '../page/PC/Common/Enterprise'
import News from '../page/PC/Common/News'
import NewsDetail from '../page/PC/Common/NewsDetail'
import AboutUs from '../page/PC/Common/AboutUs'
import HRBackSystemI from '../page/PC/Individual/HRBackSystemI'
import HRBackSystemE from '../page/PC/Enterprise/HRBackSystemE'
import {deviceInfo} from "../util/device"
import {setCookie,getCookie} from '../util/utils'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    children: [
    {path: '/Index', name: '首页', component: Index},
    {path: '/Login', name: '登录', component: Login},
    {path: '/SignI/', name: '个人注册', component: SignI},
    {path: '/SignE/', name: '企业注册', component: SignE},
    {path: '/Individual', name: '个人保', component: Individual},
    {path: '/Enterprise', name: '企业保', component: Enterprise},
    {path: '/News', name: '社保资讯', component: News},
    {path: '/NewsDetail/:id', name: '资讯详情', component: NewsDetail},
    {path: '/AboutUs', name: '关于我们', component: AboutUs,meta: {requireAuth: true},},

    
    
    {path: '/HRBackSystemI', name: 'HR管理后台(个人)', component: HRBackSystemI,meta: {requireAuth: true}},
    {path: '/HRBackSystemE', name: 'HR管理后台(企业)', component: HRBackSystemE,meta: {requireAuth: true}},
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
        if (getCookie('btsby_cookie')) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            localStorage.clear();
            Store.state.userInfo.username = ''
            Store.state.userInfo.member_id = ''
            Store.state.ifLogined = false
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
