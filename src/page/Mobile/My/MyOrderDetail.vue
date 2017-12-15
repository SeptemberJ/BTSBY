<template>
  <div class="MyOrderDetail">
  	<BackBar></BackBar>
    <div class="MainContent">
      <Row class="ItemBlock">
        <Col span="20">订单号2017113000001000660014504300</Col>
        <Col span="4" class="TextRight">待支付</Col>
      </Row>

      <BlankBar></BlankBar>

      <Row class="ItemBlock">
        <Col span="2"><Icon type="card" :size="18"></Icon></Col>
        <Col span="22"><b>费用明细</b></Col>
      </Row>
      <Row  class="ItemBlock">
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
      <Row class="ItemBlock">
        <Col span="24" class="colorRed">注意：使用支付宝端口进行支付，须额外支付6‰的手续费。微信端口支付，不须手续费。</Col>
      </Row>

      <BlankBar></BlankBar>

      <Row class="ItemBlock">
        <Col span="2"><Icon type="clipboard" :size="18"></Icon></Col>
        <Col span="22"><b>订单跟踪</b></Col>
      </Row>
      <Row  class="ItemBlock">
        <Col span="24">
           <Timeline>
              <TimelineItem>发布1.0版本</TimelineItem>
              <TimelineItem color="Orange">
                  <Icon type="ionic" slot="dot"></Icon>
                  <span>订单待支付(2017-11-30 11:12:56) 王文亮</span>
              </TimelineItem>
              <TimelineItem>发布2.0版本</TimelineItem>
              <TimelineItem>发布3.0版本</TimelineItem>
          </Timeline>
        </Col>
      </Row>

      <BlankBar></BlankBar>

      <Row class="ItemBlock">
        <Col span="2"><Icon type="clipboard" :size="18"></Icon></Col>
        <Col span="22"><b>支付方式</b></Col>
      </Row>
      <Row class="ItemBlock">
        <Col span="24">
          <RadioGroup v-model="PayWay" vertical>
              <Radio v-for="(Item,Idx) in PayWayList" :label="Item.lable">
                  <!-- <Icon type="social-apple"></Icon> -->
                  <span>{{Item.lable}}</span>
              </Radio>
          </RadioGroup>
        </Col>
      </Row>

      <BlankBar></BlankBar>

      <Row class="ItemBlock">
        <Col span="24">订单提交时间: 2017-11-30 11:12:56</Col>
      </Row>

      <!-- <BlankBar></BlankBar> -->

      <Row class="ItemBlock">
        <Col span="24" class="marginTB_20 TextCenter">
          <p>请在7天内完成付款，逾期订单将被取消</p>
          <p>咨询电话： 400-0135-200</p>
        </Col>
        <Col span="24">
          <Button type="error" long>去付款</Button>
        </Col>
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
        PayWay:'支付宝', //支付方式
        PayWayList:[{value:0,lable:'支付宝'},{value:1,lable:'微信'}],
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
    width: 100%;
    margin: 0 auto;
    margin-top: 52px;
    .ItemBlock{
       width: 95%;
       margin: 10px auto;
    }
  }
}
</style>