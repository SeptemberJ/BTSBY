<template>
    <div class="Index"  :style="{'margin-bottom':isMobile ? '50px':'0px'}" >
        <!-- Mobile -->
        <div id="Mwrap" v-if="isMobile">
          <Carousel></Carousel>
          <FourModule></FourModule>
          <BlankBar></BlankBar>
          <DoubleLine></DoubleLine>
          <BlankBar></BlankBar>
          <PolicyUnscramble></PolicyUnscramble>
        </div>
        <!-- PC -->
        <div id="Pwrap" v-else>
          <Carousel></Carousel>
          <CommonThree></CommonThree>
          <ImgBar :Infor="IndexInfor.experience"></ImgBar>
          <TMBPart :Infor="IndexInfor.customer"></TMBPart>
          <ImgTwoColumn :Infor="IndexInfor.compare"></ImgTwoColumn>
          <NewsPart  :Infor="IndexInfor.news"></NewsPart>
          <Partner :Infor="IndexInfor.partner"></Partner>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Carousel from '../../components/PC/Common/Carousel'
import CommonThree from '../../components/PC/Common/CommonThree'
import ImgBar from '../../components/PC/Common/ImgBar'
import TMBPart from '../../components/PC/Common/TMBPart'
import ImgTwoColumn from '../../components/PC/Common/ImgTwoColumn'
import NewsPart from '../../components/PC/Common/NewsPart'
import Partner from '../../components/PC/Common/Partner'

import FourModule from '../../components/Mobile/FourModule'
import BlankBar from '../../components/Mobile/BlankBar'
import DoubleLine from '../../components/Mobile/DoubleLine'
import PolicyUnscramble from '../../components/Mobile/PolicyUnscramble'

  export default{
    data: function () {
      return {
        IndexInfor:{}
       
      }
    },
   created() {
    axios.get(PRE_URL+'static/json/Index.json'
      ).then((res)=> {
        this.IndexInfor = res.data
    }).catch((error)=> {
      console.log(error)
    })
     
   },
   computed: {
    isMobile(){
      return this.$store.state.isMobile
     }
    
   },
    components: {
      Carousel,
      CommonThree,
      ImgBar,
      TMBPart,
      ImgTwoColumn,
      NewsPart,
      Partner,

      FourModule,
      BlankBar,
      DoubleLine,
      PolicyUnscramble
      
    },
    
    methods: {
      
    }
  }

</script>
<style lang="scss" scoped>

</style>
