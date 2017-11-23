<template>
    <div>
       <Menu active-name="1-1" width="auto" :open-names="[1]">
            <Submenu v-for="(Menu,MenuIdx) in SideMenu" :name="MenuIdx+1">
                <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                     {{Menu.Fmenu}}
                </template>
                <MenuItem  v-for="(Smenu,SmenuIdx) in Menu.Smenu" :name="(MenuIdx+1)+'-'+(SmenuIdx+1)"><span @click="OnSideMenu(Smenu)">{{Smenu}}</span></MenuItem>
            </Submenu>
        </Menu> 
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  data() {
  return {
    SideMenu:[
       {'Fmenu':'社保服务','Smenu':['我的订单','购买社保','投保记录','交易账单','消息通知','增值服务','增值服务订单']},
       {'Fmenu':'账户管理','Smenu':['我的账户','基本资料','参保资料','账号安全']},
    ],
    
  }
  },
  mounted: function(){
    
  
  },
  computed: {
    
  },
  watch:{
  },
  methods: {
    OnSideMenu(Smenu){
      this.$emit('SideMenu-click',Smenu)
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
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
}
</style>