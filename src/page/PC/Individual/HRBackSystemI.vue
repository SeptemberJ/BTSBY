<template>
<div id="HRBackSystemI" class="layout">\
        <div class="layout-content">
            <Row>
                <Col span="5">
                  <SideBar v-on:SideMenu-click="listenFromSideMenu"></SideBar>
                </Col>
                <Col span="19" style="border-left: 1px solid #ddd;">
                    <div class="layout-content-main">
                      <Myorder v-if="curMneu == '我的订单'"></Myorder>
                      <BasicInfo v-if="curMneu == '基本资料'"></BasicInfo>
                      <InsuredInfo v-if="curMneu == '参保资料'"></InsuredInfo>
                      <AccountSafe v-if="curMneu == '账号安全'"></AccountSafe>
                      <ToPay v-if="curMneu == '购买社保'"></ToPay>
                     
                    </div>
                </Col>
            </Row>
        </div>
    </div>
 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import SideBar from '../../../components/PC/Individual/SideBar.vue'
import Myorder from '../../../components/PC/Individual/Myorder.vue'
import BasicInfo from '../../../components/PC/Individual/BasicInfo.vue'
import InsuredInfo from '../../../components/PC/Individual/InsuredInfo.vue'
import AccountSafe from '../../../components/PC/Individual/AccountSafe.vue'
import ToPay from '../../../components/PC/Individual/ToPay.vue'
export default {
  data() {
  return {
    curMneu:'我的订单'
    
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
    
  },
  watch:{
  },
  components: {
      SideBar,
      Myorder,
      BasicInfo,
      InsuredInfo,
      AccountSafe,
      ToPay

  },
  methods: {
    listenFromSideMenu(MENU){
        this.curMneu = MENU
      }
   
    },
};
</script>
<style lang="scss" scoped>
#HRBackSystemI{
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 100%;
        display: block;
        margin: 15px;
        border-radius: 4px;
    }
    .layout-content-main{
        min-height: 800px;
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
}
</style>