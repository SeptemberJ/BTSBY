<template>
  <div class="com-app" v-bind:class="{ MOBILE: isMobile, PC: !isMobile }">
    <div class="layout">
      <TopBlock v-if="!isMobile"></TopBlock>
      <NavBar v-if="!isMobile"></NavBar>
      <!-- <Carousel></Carousel> -->
        <div>
          <transition>
            <router-view class="child-view"></router-view>
          </transition>
        </div>
        <div class="layout-copy"  v-if="!isMobile">
            <FooterPart></FooterPart>
        </div>
        <FooterPartM v-if="isMobile"></FooterPartM>
    </div>

    <Affix v-if="!isMobile"></Affix>
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
          top: 42,
          duration: 1.5
      });
      
    },
    computed: {
      isMobile(){
        return this.$store.state.isMobile
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
