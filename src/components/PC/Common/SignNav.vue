<template>
 <div class="layout">
        <Menu mode="horizontal" :active-name="activeRoute" @on-select="tabChange">
            <div class="layout-logo" @click="ToIndex"></div>
            <div class="layout-nav">
                <MenuItem name="个人注册">
                    个人注册
                </MenuItem>
                <MenuItem name="企业注册">
                    企业注册
                </MenuItem>
            </div>
        </Menu>
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
    
  
  },
  computed: {
    activeRoute(){
      return this.$store.state.activeRoute
    }
    
  },
  watch:{
  },
  methods: {
    tabChange(event){
        this.$router.push({name:event});
    }, 
    ToIndex(){
        this.$router.push({name:'首页'})
    }
  }
};
</script>
<style lang="scss" scoped>
.layout{
        border: 0px solid #d7dde4;
        background: #fff;
    }
    .layout-logo{
        width: 220px;
        height: 60px;
        float: left;
        position: relative;
        top: 0px;
        left: 20px;
        background: url('http://sbyun.com/skins2/images/logo.png');
        background-size: contain;
        background-repeat: no-repeat;
    }
    .layout-nav{
        width:auto;
        height:50px;
        margin: 0 auto;
        margin-left: 300px;
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
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
</style>