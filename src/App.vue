<template>
  <div class="com-app" v-bind:class="{ MOBILE: isMobile, PC: !isMobile }">
    <div class="layout">
      <TopBlock v-if="!isMobile"></TopBlock>
      <NavBar v-if="!isMobile"></NavBar>
      <!-- <Carousel></Carousel> -->
        <div class="ChildsBlock">
          <transition>
            <router-view class="child-view"></router-view>
          </transition>
        </div>
        <!-- <div class="layout-copy marginT_10"> -->
        <FooterPart   v-if="!isMobile"></FooterPart>
        <!-- </div> -->
        <FooterPartM v-if="isMobile"></FooterPartM>
    </div>

    <Affix v-if="!isMobile && activeRoute!='HR管理后台(个人)' && activeRoute!='HR管理后台(企业)' && activeRoute!='登录' && activeRoute!='个人注册' && activeRoute!='企业注册'"></Affix>
  </div>
</template>
<script>
import TopBlock from 'components/PC/Common/TopBlock'
import NavBar from 'components/PC/Common/NavBar'
import Carousel from 'components/PC/Common/Carousel'
import FooterPart from 'components/PC/Common/FooterPart'
import Affix from 'components/PC/Common/Affix'
import FooterPartM from 'components/Mobile/FooterPartM'
  export default{
    data: function () {
      return {
        // transitionName: 'slide-left',
      }
    },
    mounted: function () {
      
    },
    created: function () {
      this.$Message.config({
          top: 82,
          duration: 1.5
      });
      
    },
    computed: {
      isMobile(){
        return this.$store.state.isMobile
      },
      activeRoute(){
        return this.$store.state.activeRoute
       }
      
    },
    watch: {
      
    },
    components: {
      TopBlock,
      NavBar,
      Carousel,
      FooterPart,
      FooterPartM,
      Affix
      

    },
    methods: {
     

    }
  }
</script>
<style lang="scss">
.com-app{
  width: 100%;
  height: auto;
  .ChildsBlock{
    width: 100%;
  }
  .layout{
        border: 0px solid #d7dde4;
        background: #fff;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        min-height: 100%;
    }
    .layout-header{
        height: 50px;
        margin: 0 auto;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);

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
    .ivu-affix{
      width: 100px !important;
    }
}
.PC{
  min-width: 1280px;
  margin: 0 auto;
}
.MOBILE{
  width: 100%;
  margin: 0 auto;
}

</style>
