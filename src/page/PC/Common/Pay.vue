<template>
  <div id="Pay" class="TextCenter">
  <h1>订单提交成功，请尽快付款</h1>
  <p>订单号：201712251092378</p>
  <p>订单名称：代缴上海2018年1月,2月,3月社保公积金</p>
  <p>订单总额：6268 元</p>
  <h3>请用手机微信支付扫一扫支付~</h3>
  <img src="http://sbyun.com/skins2/images/code02-new.png">
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BlankBar from '../../../components/Mobile/BlankBar'
import {timestampToFormatTime} from "../../../util/utils"

export default {
  data() {
  return {
  }
  },
  created() {
  },
  mounted: function(){

    
  
  },
  computed: {
    
  },
  watch:{
  },
  components: {
    BlankBar
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
#Pay{
  width: 100%;
  margin: 0px auto;
  img{
    width: 200px;
  }
  

  
}

</style>