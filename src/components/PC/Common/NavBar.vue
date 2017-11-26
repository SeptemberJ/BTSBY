<template>
 <div class="layout">
        <Menu mode="horizontal" :active-name="activeRoute" @on-select="tabChange">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <MenuItem name="首页">
                    首页
                </MenuItem>
                <MenuItem name="个人保">
                    个人保
                </MenuItem>
                <MenuItem name="企业保">
                    企业保
                </MenuItem>
                <MenuItem name="社保资讯">
                    社保资讯
                </MenuItem>
                <MenuItem name="关于我们">
                    关于我们
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
    //获取导航菜单
    // axios.get(PRE_URL+'static/json/Navbar.json'
    //     ).then((res)=> {
    //       this.navbarInfo = res.data.navbar
    //   }).catch((error)=> {
    //     console.log(error)
    //   })
    
  
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
        height: 75px;
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
        height:100%;
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