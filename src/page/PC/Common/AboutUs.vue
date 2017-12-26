<template>
  <div id="AboutUs">
    <Carousel></Carousel>
    <CommonThree></CommonThree>
    <ImgTxt  :Infor="IdividualInfor.superiority"></ImgTxt>
    <TMBPart :Infor="IdividualInfor.customer"></TMBPart>
    <Partner :Infor="IdividualInfor.partner"></Partner>
    <Contact :Infor="IdividualInfor.contactInfo"></Contact>
    <!-- 返回顶部 -->
    <BackTop></BackTop>
    
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import Carousel from '../../../components/PC/Common/Carousel'
import CommonThree from '../../../components/PC/Common/CommonThree'
import ImgTxt from '../../../components/PC/Common/ImgTxt.vue'
import TMBPart from '../../../components/PC/Common/TMBPart.vue'
import Partner from '../../../components/PC/Common/Partner.vue'
import Contact from '../../../components/PC/Common/Contact.vue'
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
    axios.get(PRE_URL+'static/json/AboutUs.json'
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
      ImgTxt,
      TMBPart,
      Partner,
      Contact
  },
  methods: {
    },
};
</script>
<style lang="scss" scoped>
#AboutUs{
}
</style>