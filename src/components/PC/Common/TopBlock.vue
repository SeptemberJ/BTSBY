<template>
  <div id="TopBlock" class="layout-ceiling" v-if="activeRoute!='个人注册' && activeRoute!='企业注册' && activeRoute!='找回密码'">
      <div class="layout-ceiling-main">
          <Row type="flex" justify="space-around">
              <Col span="11">
                <Button type="text" v-if="!ifLogined" @click="ToLogin">登录</Button>
                <Button type="text" v-if="!ifLogined" @click="ToSign">注册</Button>
                <Button type="text" v-if="ifLogined" @click="">{{UserName}}</Button>
                <Button type="text" v-if="ifLogined" @click="GoMessage" style="cursor:pointer;">
                  <Badge :count="MessageCount">
                      <Icon type="ios-bell-outline" size="22"></Icon>
                  </Badge>
                </Button>
                <Button type="text" v-if="ifLogined" @click="Logout"><Icon type="power" size="18"></Icon> 退出</Button>
              </Col>
              <Col span="11" class="ContRight">
                <Button type="text" v-if="ifLogined && activeRoute!='HR管理后台(个人)'  && activeRoute!='HR管理后台(企业)' " @click="GoHR">HR管理后台</Button>
                <Button type="text" v-if="activeRoute=='HR管理后台(个人)'  || activeRoute=='HR管理后台(企业)' " @click="GoIndex"><Icon type="home" size="18"></Icon></Button>
                <!-- <Button type="text"  @click="GoNews">社保资讯</Button> -->
                <Button type="text" v-if="activeRoute!='HR管理后台(个人)'  && activeRoute!='HR管理后台(企业)'" ><Icon type="ios-telephone"></Icon> 021-3100-7227</Button>
                
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
    
  
  },
  created() {
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
    },
    MessageCount(){

      return this.$store.state.MessageCount
    },
  },
  watch:{
  },
  methods: {
    GoMessage(){
      this.GoHR()
      this.$store.state.HRMenuCur = '消息通知'
    },
    GoIndex(){
      this.$router.push({name:'首页'});
    },
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