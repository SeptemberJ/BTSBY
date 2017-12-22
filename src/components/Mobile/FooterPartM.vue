<template>
  <div class="FooterPartM">
    <Menu mode="horizontal" :theme="theme1" :active-name="FMenu" @on-select="ChangeMenu">
          <MenuItem name="0">
              <Icon type="home" :size='24'></Icon>
              <span class="BlockSpan">首页</span>
          </MenuItem>
          <MenuItem name="1">
              <Icon type="card" :size='24'></Icon>
              <span class="BlockSpan">缴社保</span>
          </MenuItem>
          <MenuItem name="2">
              <Icon type="search" :size='24'></Icon>
              <span class="BlockSpan">查社保</span>
          </MenuItem>
          <MenuItem name="3">
              <Icon type="android-person" :size='24'></Icon>
              <span class="BlockSpan">我的</span>
          </MenuItem>
    </Menu>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
  export default{
    data: function () {
      return {
        theme1: 'primary',
      }
    },
    mounted: function () {
      
    },
    created() {
      
    },
    computed: {
      FMenu(){
        switch(this.$store.state.activeRoute){
          case '首页':
          return '0'
          break
          case '社保计算器':
          return '0'
          break
          case '社保周边':
          return '0'
          break
          case '详情':
          return '0'
          break
          case '为何购买社保':
          return '0'
          break
          case '如何在线购买':
          return '0'
          break
          case '社保服务介绍':
          return '0'
          break
          case '参保信息':
          return '1'
          break
          case '缴纳社保':
          return '1'
          break
          case '查社保':
          return '2'
          break
          default:
          return '3'
          break
        }
      }
      
    },
    watch: {
      
    },
    components: {
      

    },
    methods: {
      ChangeMenu(Menu){
        switch(Menu){
          case '0':
          this.$router.push({name:'首页'})
          break
          case '1':
          this.$router.push({name:'参保信息'})
          break
          case '2':
          this.$router.push({name:'查社保'})
          break
          case '3':
          this.$router.push({name:'我的'})
          break
        }

      }
    }
  }
</script>
<style lang="scss">
.FooterPartM{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  .BlockSpan{
  }
  .ivu-menu {
    display: flex;
    justify-content:center;
  }
  .ivu-menu-horizontal{
    height: auto;
    line-height: 30px;
  }
  .ivu-menu-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    flex-grow: 1;
    text-align: center;
  }
  .ivu-menu-item>i {
    margin-right: 0px !important;
    margin-top: 10px;
}
}
</style>