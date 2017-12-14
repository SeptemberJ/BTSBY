<template>
  <div class="MyOrderDetail">
  	<BackBar></BackBar>
    <div class="MainContent">
      <Row>
        <Col span="20">订单号2017113000001000660014504300</Col>
        <Col span="4" class="TextRight">待支付</Col>
      </Row>
      <Row class="marginT_10">
        <Col span="2"><Icon type="card" :size="18"></Icon></Col>
        <Col span="22">费用明细</Col>
      </Row>
      <Row :gutter="16">
        <Col span="10">
          <p>王文亮</p>
          <p>上海</p>
          <p>201712-201810 11个月</p>
        </Col>
        <Col span="6" class="TextRight">
          <p>社保费用：</p>
          <p>公积金费用：</p>
          <p>服务费用：</p>
          <p>其他费用：</p>
          <p>合计费用：</p>
        </Col>
        <Col span="8">
          <p>¥11</p>
          <p>¥22</p>
          <p>¥33</p>
          <p>¥44</p>
          <p>¥110</p>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="colorRed">注意：使用支付宝端口进行支付，须额外支付6‰的手续费。微信端口支付，不须手续费。</Col>
      </Row>
    </div>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../../components/Mobile/BackBar'
import BlankBar from '../../../components/Mobile/BlankBar'
  export default{
    data: function () {
      return {
        OrderTab_cur:0,
        MyOrderList:[
         {OrderNo:'2017112400001000020016262817',date:'2017-09-09',OrderName:'代缴广州201712-201801-社保公积金',Status:'待支付',Sum:'1366'},
        ]
      }
    },
    mounted: function () {
      
    },
    created() {
      let OrderNo = this.$router.history.current.params.OrderNo
      
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
.MyOrderDetail{
  margin-bottom: 130px;
  .MainContent{
    width: 95%;
    margin: 0 auto;
    margin-top: 52px;
  }
}
</style>