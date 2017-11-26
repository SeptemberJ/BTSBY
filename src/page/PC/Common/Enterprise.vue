<template>
  <div id="Enterprise">
    <Carousel></Carousel>
    <CommonThree></CommonThree>
    <TMBPart :Infor="EnterpriseInfor.professional"></TMBPart>
    <!-- <Partner :Infor="IdividualInfor.benifits"></Partner> -->
    <ImgTxt  :Infor="EnterpriseInfor.superiority"></ImgTxt>
    <OnlyImg  :Infor="EnterpriseInfor.flow"></OnlyImg>
    <FoldBrand  :Infor="EnterpriseInfor.problems"></FoldBrand>
    
    
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import Carousel from '../../../components/PC/Common/Carousel'
import CommonThree from '../../../components/PC/Common/CommonThree'
import TMBPart from '../../../components/PC/Common/TMBPart.vue'
import Partner from '../../../components/PC/Common/Partner.vue'
import ImgTxt from '../../../components/PC/Common/ImgTxt.vue'
import OnlyImg from '../../../components/PC/Common/OnlyImg.vue'
import FoldBrand from '../../../components/PC/Common/FoldBrand.vue'
export default {
  data() {
  return {
    EnterpriseInfor:{}
  }
  },
  created() {
    axios.get(PRE_URL+'static/json/Enterprise.json'
        ).then((res)=> {
          this.EnterpriseInfor = res.data
      }).catch((error)=> {
        console.log(error)
      })
  },
  mounted: function(){

    
  
  },
  computed: {
    
  },
  watch:{
  },
  components: {
      Carousel,
      CommonThree,
      TMBPart,
      Partner,
      ImgTxt,
      OnlyImg,
      FoldBrand
  },
  methods: {
    },
};
</script>
<style lang="scss" scoped>
#Enterprise{
}
</style>