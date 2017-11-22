<template>
  <div class="com-app">
    <div class="layout">
      <TopBlock></TopBlock>
      <NavBar></NavBar>
      <!-- <Carousel></Carousel> -->
       
       
        <div>
          <transition>
            <router-view class="child-view"></router-view>
          </transition>
        </div>
        <div class="layout-copy">
            2011-2016 &copy; TalkingData
        </div>
    </div>

    
    
  </div>


</template>
<script>
import TopBlock from 'components/PC/Common/TopBlock'
import NavBar from 'components/PC/Common/NavBar'
import Carousel from 'components/PC/Common/Carousel'
  export default{
    data: function () {
      return {
        // transitionName: 'slide-left',
      }
    },
    mounted: function () {
      
    },
    created: function () {
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      TopBlock,
      NavBar,
      Carousel
      

    },
    methods: {
     

    }
  }
</script>
<style lang="scss">
  .layout{
        border: 0px solid #d7dde4;
        background: #fff;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header{
        height: 60px;
        margin: 0 auto;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);

    }
    .layout-logo{
        width: 220px;
        height: 60px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 0px;
        left: 20px;
       
        
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-ceiling{
        background: #fff;
        padding: 0;
        overflow: hidden;
        border-bottom: 1px solid #ddd;
    }
    .layout-ceiling-main{
       width: 100%;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
</style>
