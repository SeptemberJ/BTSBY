<template>
    <Carousel id="Carousel" v-model="value2" loop height="auto">
        <CarouselItem>
            <div class="demo-carousel">
                <img src="http://sbyun.com/skins2/images/BANNER-1.jpg">
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">
                <img src="http://sbyun.com/skins2/images/BANNER-4.jpg">
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">
                <img src="http://sbyun.com/skins2/images/BANNER-5.jpg">
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">
                <img src="http://sbyun.com/skins2/images/BANNER-3.jpg">
            </div>
        </CarouselItem>
    </Carousel>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  data() {
  return {
    value2: 0
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
  methods: {
  }
};
</script>
<style lang="scss" scoped>
#Carousel{
    .demo-carousel{
        img{
            width: 100%;
        }
    }
}
</style>