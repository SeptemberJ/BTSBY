<template>
  <div class="WhyBuy">
  	<BackBar></BackBar>
    <div class="MainContent">
      <img class="fullWidth" src="static/img/buy_sic_reason.jpg">
    </div>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../components/Mobile/BackBar'
import BlankBar from '../../components/Mobile/BlankBar'
  export default{
    data: function () {
      return {
      }
    },
    mounted: function () {
      
    },
    created() {
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      BackBar,
      BlankBar
      

    },
    methods: {
    }
  }
</script>
<style lang="scss">
.WhyBuy{
  margin-bottom: 130px;
  .MainContent{
    width: 95%;
    margin: 0px auto;
    margin-top: 52px;
    .fullWidth{
      width: 100%;
    }
  }
}
</style>