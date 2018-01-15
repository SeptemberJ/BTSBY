import Vue from 'vue'
import Vuex from 'vuex'
import "babel-polyfill"
import * as types from "./types.js"
import * as Storage from "../util/storage.js";
import {setCookie,getCookie} from '../util/utils'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // token:localStorage.getItem("user_token"),//登录token
    userInfo:{
        username:localStorage.getItem("user_name"),
        member_id:localStorage.getItem("member_id"),
        register_type:localStorage.getItem("register_type"),
        // useravatar:localStorage.getItem("user_avatar"),
    },
    MessageCount:11,
    HRMenuCur:'我的订单',
    ifLogined:getCookie('btsby_cookie')?true : false,
    // ifLogined:(localStorage.getItem("member_id"))?true : false,
    loading:false,
    activeRoute:'首页', //导航显示路由名字
    newsKind:'1',
    newsPage:1,
    isMobile:'',
    ifAddOrMin:false,   //是否显示增减员Modal框
    ifReadExcel:false,  //是否显示导入Modal框
    ifDisMission:false, //是否显示离职人员Modal框
    toAddMember:false,  //是否显示新增人员Modal框
    PeripheryTab_cur:1, //手机端tab索引值
    toast:{
        ifShow:false, //显示
        text:'', //提示文字
    },
    tips:{
        ifShow:false, //显示
        text:'', //提示文字
    },
    confirm:{
        // ifShow:false, //显示
        // text:'', //提示文字
        confirmSureFn:'', //确定后执行的函数
        title: '提示',
        contentHtml: '确定该操作?',
        ok: '确定',
        cancel: '取消'
    },
    snackbarText:''
    
    
    
    },
    // 公共
    // comm: {
    //   toastText:'',
    //   loading: false,
    //   login: {
    //     memberId: '',
    //     userData: ''
    //   },
    //   indexConf: {
    //     isLogoblock: true, // 是否显示底部
    //     isToastMsg: false, // 是否显示底部
    //     isFooter: false, // 是否显示底部
    //     isSearch: true, // 是否显示搜索
    //     isBack: false,  // 是否显示返回
    //     isShare: false, // 是否显示分享
    //     title: '', // 标题
    //     isToast:true
    //   }
    // }
  
  mutations:{
    [types.ROUTE_CHANGE](state,data){
      state.activeRoute = data.activeRoute
    },
    [types.MESSAGECOUNT_CHANGE](state,data){
      state.MessageCount = data.messageCount
    },
    [types.TOAST_TOGGLE](state,data){
      if(state.toast.ifShow){
        return false
    }else{
        state.toast.ifShow = true
        state.toast.text = data.text
        setTimeout(()=>{
        state.toast.ifShow = false
        },1000)
      }
    },
    [types.TIPS_TOGGLE](state,data){
        state.tips.ifShow = (data.type=='close')?false:true
        state.tips.text = data.text
    },
    [types.CONFIRM_TOGGLE](state,data){
      state.confirm.ifShow =! state.confirm.ifShow
      state.confirm.text = data.text
    },
    // [types.CONFIRM_SUREFN](state,data){
    //   // state.confirm.confirmSureFn = data.Fn
    // },
    [types.CONFIRM](state,data){
      state.confirm.contentHtml = data.text
      state.confirm.confirmSureFn = data.fn
    },
    [types.SNACKBAR](state,data){
      state.snackbarText = data.text
    }

    // /*
    //  * 评论回复
    //  * @param name 回复的用户名
    //  * */
    // reply: (state, data) => {
    //   if (data.name === state.reply.name && state.reply.isComment && data.commentId === state.reply.commentId) {
    //     state.reply.isComment = false
    //   } else {
    //     state.reply.name = data.name
    //     state.reply.commentId = data.commentId
    //     state.reply.isComment = true
    //   }
    // },
    // /*
    //  * loading的显示
    //  * */
    // isLoading: (state, status) => {
    //   state.comm.loading = false
    // },

    // /*
    //  * 修改header的信息
    //  *
    //  * */
    // changeIndexConf: (state, data) => {
    //   Object.assign(state.comm.indexConf, data)
    // },
    // isLogin: (state,data) => {
    //   localStorage.setItem('memberId',data.memberId)
    //   localStorage.setItem('userMsg',JSON.stringify(data))
    //   state.comm.login.memberId = localStorage.getItem('memberId')
    //   state.comm.login.userData = JSON.parse(localStorage.getItem('userMsg'))
    // },
    // logout: (state,data) => {
    //   localStorage.removeItem('memberId')
    //   localStorage.removeItem('userMsg')
    //   state.comm.login.memberId = ''
    //   state.comm.login.userData = ''
    // }
  },
//   actions: {
//     //Toast消息
//     show: (state,text) => {
//       store.state.comm.toastText=text;
//       store.state.comm.indexConf.isToastMsg=true;
//       const willHideTimeout = setTimeout(()=> {
//       store.state.comm.indexConf.isToastMsg=false;
//     }, 2000);
//     clearTimeout(this.willHideTimeout);
//     },
//     //加入购物车
//     addCartOne: (state,msg) => {

//       if(!msg.found){
//         store.state.cart.carts.push(msg.eCart);
//       }else{
//         const CART = JSON.parse(localStorage['carts']);
//         var exit = false;
//         for(let i=0;i<CART.length;i++){
//           if(CART[i].id==msg.eCart.id){
//             CART[i].amount++;
//             exit = true;
//             break
//           }else{
//             exit = false;
//           }
//         }
//        if(exit){
//          store.state.cart.carts=CART;
//        }else{
//          store.state.cart.carts.push(msg.eCart);
//        }
//   }
//       store.state.cart.sumAmount+=1;
//       Storage.set('carts', store.state.cart.carts);
//       Storage.set('cart', store.state.cart.sumAmount);
//       store.state.cart.sumAmount=Storage.get('cart');
//     },
//     //Del
//     Del:(state,id) => {
//     const CART = JSON.parse(localStorage['carts']);
//     for(let i=0;i<CART.length;i++) {
//       if (CART[i].id == id) {
//         store.state.cart.sumAmount-=CART[i].amount ;
//         CART.splice(i,1);
//         break
//       }
//     }
//     store.state.cart.carts=CART;
//     Storage.set('carts', store.state.cart.carts);
//     Storage.set('cart', store.state.cart.sumAmount);
//     store.state.cart.sumAmount=Storage.get('cart');
// },
//     //清空购物车
//     clearCart: (state) => {
//       store.state.cart.sumAmount=0;
//       store.state.cart.carts.length=0;
//       delete localStorage['cart'];
//       delete localStorage['carts'];

//       // alert(typeof Storage.get('cart'));
//     }
//   },
  getter: {

  }
})
export default store







