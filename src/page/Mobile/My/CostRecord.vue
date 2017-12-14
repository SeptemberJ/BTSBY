<template>
  <div class="CostRecord">
  	<BackBar></BackBar>
    <div class="MainContent">
      <Row type="flex" justify="space-around" class="code-row-bg" style="height: 35px;line-height: 35px;">
        <Col span="12" class="TextCenter" v-bind:class="{tab_active:CostRecordTab_cur==0}"><span @click="ChangeTab(0)">支付记录</span></Col>
        <Col span="12" class="TextCenter" v-bind:class="{tab_active:CostRecordTab_cur==1}"><span @click="ChangeTab(1)">消费订单</span></Col>
      </Row>
      <!-- 支付记录 -->
      <PayRecordList v-if="CostRecordTab_cur==0"></PayRecordList>
      
      <!-- 消费订单 -->
      <OrderList  v-if="CostRecordTab_cur==1"></OrderList>
    </div>
    <!-- 返回顶部 -->
    <BackTop :height="100" :bottom="200">
      <div class="top"><Icon type="android-arrow-dropup" :size="24"></Icon></div>
    </BackTop>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../../components/Mobile/BackBar'
import OrderList from '../../../components/Mobile/OrderList'
import PayRecordList from '../../../components/Mobile/PayRecordList'
  export default{
    data: function () {
      return {
        CostRecordTab_cur:0,
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
      PayRecordList,
      OrderList
    },
    methods: {
      ChangeTab(KIND){
        switch(KIND){
          case 0:
          this.CostRecordTab_cur = 0
          break
          case 1:
          this.CostRecordTab_cur = 1
          break
        }

      },
      
      
    }
  }
</script>
<style lang="scss">
.CostRecord{
  margin-bottom: 130px;
  .MainContent{
    width: 100%;
    margin-top: 52px;
    .tab_active{
      font-weight: bold;
      color: #39f;
      border-bottom: 2px solid #39f;
    }
    .ListBlock{
      width: 95%;
      margin: 10px auto;
     
    }
    
  }
  .top{
        padding: 0px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 50%;
    }
}
</style>