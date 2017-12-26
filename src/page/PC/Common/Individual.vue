<template>
  <div id="Individual">
    <Carousel></Carousel>
    <CommonThree></CommonThree>
    <TMBPart :Infor="IdividualInfor.professional"></TMBPart>
    <Partner :Infor="IdividualInfor.benifits"></Partner>
    <ImgTxt  :Infor="IdividualInfor.superiority"></ImgTxt>
    <OnlyImg  :Infor="IdividualInfor.flow"></OnlyImg>
    <FoldBrand  :Infor="IdividualInfor.problems"></FoldBrand>
    <!-- 返回顶部 -->
    <BackTop></BackTop>
    
    
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
    IdividualInfor:{}
  }
  },
  created() {
    //手机端自动跳转手机端首页
    if(this.$store.state.isMobile){
      this.$router.push({name:'首页'})
    }
    axios.get(PRE_URL+'static/json/Individual.json'
        ).then((res)=> {
          this.IdividualInfor = res.data
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
#Individual{
}
</style>