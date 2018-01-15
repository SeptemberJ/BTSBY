<template>
  <div class="MyOrderDetail">
  	<BackBar></BackBar>
    <div class="MainContent">
      <Row class="ItemBlock">
        <Col span="20">订单号{{OrderNo}}</Col>
        <Col span="4" class="TextRight">待支付</Col>
      </Row>

      <BlankBar></BlankBar>

      <Row class="ItemBlock">
        <Col span="2"><Icon type="card" :size="18"></Icon></Col>
        <Col span="22"><b>费用明细</b></Col>
      </Row>
      <Row  class="ItemBlock">
        <Col span="12">
          代缴总价：
        </Col>
        <Col span="12">
          {{OrderAmount}}
        </Col>
      </Row>
      <Row  class="ItemBlock">
        <Col span="12">
          手续费：
        </Col>
        <Col span="12">
          {{Poundage}}
        </Col>
      </Row>
      <Row  class="ItemBlock">
        <Col span="12">
          支付金额：
        </Col>
        <Col span="12">
          {{Sum}}
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
      <Row  class="ItemBlock" v-if="trackOrderInfo.length>0">
        <Col span="24">
           <Timeline>
             <TimelineItem v-for="(trackInfo,trackInfoIdx) in trackOrderInfo " :color="trackInfoIdx==0?'Orange':''">
               <p class="time">{{trackInfo.fprocess}}({{trackInfo.ftimeT}}) {{trackInfo.contact}}</p>
               <p class="content">{{trackInfo.fcontent}}</p>
             </TimelineItem>
          </Timeline>
        </Col>
      </Row>

      <Row  class="ItemBlock" v-if="trackOrderInfo.length<=0">
        <Col span="24">
           <Timeline>
             <TimelineItem color="Orange">
               <p class="time">订单待支付</p>
               <p class="content">提交订单</p>
             </TimelineItem>
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
        <Col span="24">订单提交时间: {{trackOrderInfo[trackOrderInfo.length-1].ftimeT}}</Col>
      </Row>

      <!-- <BlankBar></BlankBar> -->

      <Row class="ItemBlock">
        <Col span="24" class="marginTB_20 TextCenter">
          <p>请在7天内完成付款，逾期订单将被取消</p>
          <p>咨询电话： 021-3100-7227</p>
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
import {timestampToFormatTime} from '../../../util/utils'
  export default{
    data: function () {
      return {
        OrderNo:'',
        OrderAmount:'',
        //Poundage:0, //手续费
        //Sum:0 ,//支付金额
        //OrderTab_cur:0,
        PayWay:'支付宝', //支付方式
        PayWayList:[{value:0,lable:'支付宝'},{value:1,lable:'微信'}],
        // MyOrderList:[
        //  {OrderNo:'2017112400001000020016262817',date:'2017-09-09',OrderName:'代缴广州201712-201801-社保公积金',Status:'待支付',Sum:'1366'},
        // ],
        trackOrderInfo:[]
      }
    },
    mounted: function () {
      
    },
    created() {
      this.OrderAmount = localStorage.getItem("OrderAmount")
      let OrderNo = this.$router.history.current.params.OrderNo
      this.OrderNo = OrderNo
      axios.get(R_PRE_URL+'/searchCompanyOrderProcess.do?order_no='+OrderNo
      ).then((res)=> {
        let temp = res.data.processList
        temp.map((item,idx)=>{
          item.ftimeT= timestampToFormatTime(item.ftime.time)
        })
        this.trackOrderInfo = temp
      }).catch((error)=> {
        console.log(error)
      })
      
    },
    computed: {
      Poundage(){
        let Price
        if(this.PayWay=='支付宝'){
          Price = Number(this.OrderAmount)*0.006
        }else{
          Price = 0
        }
        return Price.toFixed(2)
      },
      Sum(){
        let Price = Number(this.OrderAmount) + Number(this.Poundage)
        return Price.toFixed(2)
      }
      
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
    .time{
        font-size: 14px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
    }
  }
}
</style>