<template>
  <div id="TopBlock" class="layout-ceiling" v-if="activeRoute!='个人注册' && activeRoute!='企业注册'">
      <div class="layout-ceiling-main">
          <Row type="flex" justify="space-around">
              <Col span="11">
                <Button type="text" v-if="ifLogined?false:true" @click="ToLogin">登录</Button>
                <Button type="text" v-if="ifLogined?false:true" @click="ToSign">注册</Button>
                <Button type="text" v-if="ifLogined?true:false" @click="ToLogin">{{UserName}}</Button>
                <Button type="text" v-if="ifLogined?true:false" @click="Logout"><Icon type="power"></Icon> 退出</Button>
              </Col>
              <Col span="11" class="ContRight">
                <Button type="text" v-if="ifLogined?true:false" @click="GoHR">HR管理后台</Button>
                <Button type="text" @click="GoNews">社保资讯</Button>
                <Icon type="ios-telephone"></Icon> 021-3100-7227
              </Col>
          </Row>
      </div>
  </div>
       
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {clearCookie} from '../../../util/utils'
export default {
  data() {
  return {
  }
  },
  mounted: function(){
    //获取导航菜单
    // axios.get(PRE_URL+'static/json/Navbar.json'
    //     ).then((res)=> {
    //       this.navbarInfo = res.data.navbar
    //   }).catch((error)=> {
    //     console.log(error)
    //   })
    
  
  },
  computed: {
    isMobile(){
      return this.$store.state.isMobile
    },
    activeRoute(){
      return this.$store.state.activeRoute
    },
    UserName(){
      return this.$store.state.userInfo.username
    },
    ifLogined(){
      return this.$store.state.ifLogined
    }
  },
  watch:{
  },
  methods: {
    GoHR(){
      if(this.$store.state.userInfo.register_type == '0'){
        this.$router.push({name:'HR管理后台(个人)'});
      }else{
        this.$router.push({name:'HR管理后台(企业)'});
      }
      
    },
    GoNews(){
      this.$router.push({name:'社保资讯'});
    },
    ToLogin(){
      this.$router.push({name:'登录'});
    },
    ToSign(){
      this.$router.push({name:'个人注册'});
    },
    Logout(){
       localStorage.clear();
       this.$store.state.userInfo.username = ''
       this.$store.state.userInfo.member_id = ''
       this.$store.state.ifLogined = false
       this.$router.push({name:'登录'})
       clearCookie('btsby_cookie')
    },
  }
};
</script>
<style lang="scss" scoped>
#TopBlock{
  .ContRight{
    text-align: right;
  }
}
</style>