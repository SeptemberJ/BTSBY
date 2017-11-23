<template>
  <div id="TopBlock" class="layout-ceiling">
      <div class="layout-ceiling-main">
          <Row>
              <Col span="12">
                <Button type="text" v-if="ifLogined?false:true" @click="ToLogin">登录</Button>
                <Button type="text" v-if="ifLogined?false:true" @click="ToSign">注册</Button>
                <Button type="text" v-if="ifLogined?true:false" @click="ToLogin">{{UserName}}</Button>
                <Button type="text" v-if="ifLogined?true:false" @click="Logout"><Icon type="power"></Icon> 退出</Button>
              </Col>
              <Col span="12" class="ContRight">
                <Button type="text" v-if="ifLogined?true:false" @click="GoHR">HR管理后台</Button>
                <Button type="text">社保资讯</Button>
                <Button type="text">帮助</Button>
              </Col>
          </Row>
      </div>
  </div>
       
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
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
      this.$router.push({name:'HR管理后台'});
    },
    ToLogin(){
      this.$router.push({name:'登录'});
    },
    ToSign(){
      this.$router.push({name:'注册'});
    },
    Logout(){
       localStorage.clear();
       this.$store.state.userInfo.username = ''
       this.$store.state.userInfo.member_id = ''
       this.$store.state.ifLogined = false
       this.$router.push({name:'登录'});
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