<template>
  <div class="Search">
  	<TitBar></TitBar>
    <div class="MainContent">
      <Row type="flex" justify="center" class="code-row-bg widthS">
          <Col span="24" class="TextCenter marginB_20">
            <h2><b>平台查询方式</b></h2>
            <p class="marginTB_10">已在社保云缴纳过的用户,可以查询所有在社保云的缴纳记录。</p>
            <Button type="primary" shape="circle" icon="ios-search" long @click="GoMyOrder">立即查询</Button>
          </Col>
      </Row>
      <BlankBar></BlankBar>
      <Row type="flex" justify="center" class="code-row-bg widthS">
          <Col span="24" class="TextCenter  marginT_10">
            <h2><b>官方查询方式</b></h2>
            <p class="marginTB_10">想知道所有的缴纳明细，推荐去各地社保官网查询，但政府更新数据会有一定的滞后性。</p>
          </Col>
          <Col span="12" class="TextCenter  marginT_10">
            <Input v-model="searchKey" placeholder="输入查询地区"></Input>
          </Col>
          <Col span="8" class="TextCenter  marginT_10">
            <Button :loading="loading" type="primary" icon="ios-search" @click="searchCity">搜索</Button>
          </Col>
      </Row>
      <Row class="marginT_20">
          <Col span="6" v-for="(City,CityIdx) in cityList" class="TextCenter marginTB_10 ">
            <span class="BorderSpan" @click="GoCityInfo(City.city_code)">{{City.city_name}}</span></Col>
      </Row>
    </div>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import TitBar from '../../components/Mobile/TitBar'
import BlankBar from '../../components/Mobile/BlankBar'
  export default{
    data: function () {
      return {
        loading: false,
        searchKey:'',
        cityList:[]
      }
    },
    mounted: function () {
      
    },
    created() {

      axios.get('/static/json/SearchCity.json'
      ).then((res)=> { 
        this.cityList = res.data.arr
      }).catch((error)=> {
        console.log(error)
      })
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      TitBar,
      BlankBar
      

    },
    methods: {
      searchCity(){
        this.loading = true
        // axios.get(R_PRE_URL + '/static/json/SearchCity.json'
        // ).then((res)=> { 
        //   this.cityList = res.data.arr
        // }).catch((error)=> {
        //   console.log(error)
        // })
        this.$Message.error('暂无该城市信息!');
        //alert(this.searchKey)
      },
      GoCityInfo(CityCode){
        this.$router.push({name:'城市查询信息',params: {CityCode:CityCode}})
      },
      GoMyOrder(){
        this.$router.push({name:'我的订单'})
      }
    },
  }
</script>
<style lang="scss">
.Search{
  margin-bottom: 130px;
  .MainContent{
    width: 100%;
    margin: 0 auto;
    margin-top: 52px;
    .widthS{
      width: 80%;
      margin: 0 auto;
    }
    .BorderSpan{
      width: 90%;
      margin: 0 auto;
      height: 100%;
      border: 1px solid #ddd;
      display: block;
    }

  }
}
</style>