<template>
  <div class="CityInfo">
  	<BackBar></BackBar>
    <div class="MainContent">
      <h4 class="marginTB_10">您当前选择的城市为：{{CityInfo.city_name}}</h4>
      <BlankBar></BlankBar>
      <h4 class="marginTB_10">社保查询</h4>
      <Row :gutter="16" class="ListItem">
        <div  @click="">
          <Col span="3" class="TextRight"><Icon type="ios-telephone" :size="18"></Icon></Col>
          <Col span="21">查询电话：{{CityInfo.securityInfo.tel}}</Col>
        </div>
      </Row>
      <Row :gutter="16" class="ListItem marginTB_10">
        <div  @click="GoNetLink(CityInfo.securityInfo.netLink)">
          <Col span="3" class="TextRight"><Icon type="planet"  :size="18"></Icon></Col>
          <Col span="12">社保局官网查询</Col>
          <Col span="8" class="TextRight"><Icon type="chevron-right"></Icon></Col>
        </div>
      </Row>
      <BlankBar></BlankBar>
      <h4  class="marginTB_10">公积金查询</h4>
      <Row :gutter="16" class="ListItem">
        <div  @click="">
          <Col span="3" class="TextRight"><Icon type="ios-telephone" :size="18"></Icon></Col>
          <Col span="12">查询电话：{{CityInfo.pubilcInfo.tel}}</Col>
        </div>
      </Row>
      <Row :gutter="16" class="ListItem marginTB_10">
        <div  @click="GoNetLink(CityInfo.pubilcInfo.netLink)">
          <Col span="3" class="TextRight"><Icon type="planet"  :size="18"></Icon></Col>
          <Col span="12">社保局官网查询</Col>
          <Col span="8" class="TextRight"><Icon type="chevron-right"></Icon></Col>
        </div>
      </Row>
      <BlankBar></BlankBar>

      
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
        CityCode:'',
        CityInfo:{
          city_name:"上海",
          city_code:"1",
          securityInfo:{"tel":"400","netLink":"http://www.baidu.com"},
          pubilcInfo:{"tel":"400","netLink":"http://www.baidu.com"}
        },
        
      }
    },
    mounted: function () {
      
    },
    created() {
      this.CityCode = this.$router.history.current.params.CityCode
      console.log(this.CityCode)
      
      
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
      GoNetLink(LINK){
        window.location.href = LINK
      }
    }
  }
</script>
<style lang="scss">
.CityInfo{
  margin-bottom: 130px;
  .MainContent{
    width: 100%;
    margin-top: 52px;
    h4{
      padding-left: 10px;
    }

  }
}
</style>