<template>
    <div id="TradeOrderI">
      <h3>
        <span style="font-size: 18px;">{{Name}}</span>
        <br>
        <span>
          <Icon type="card" size="18"></Icon>
          订单数{{orderAmount}} （已支付 {{havePayed}} / 未支付 {{haveNotPayed}}）
        </span>
      </h3>
      <h2 class="marginT_20">充值记录</h2>
      <Table class="marginT_20" border :columns="columnsRecharge" :data="dataRecharge"></Table>
      <h2 class="marginT_20">消费账单</h2>
      <Table class="marginT_20" border :columns="columnsCost" :data="dataCost"></Table>
      <h2 class="marginT_20">退款申请</h2>
      <Table class="marginT_20" border :columns="columnsRefund" :data="dataRefund"></Table>
      
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {timestampToFormatTime} from '../../../util/utils'
export default {
  data() {
  return {
    Name:'',
    orderAmount:'',
    havePayed:'',
    haveNotPayed:'',
    columnsRecharge: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '交易名称',
                key: 'trade_name',
                
            },
            {
                title: '订单号',
                key: 'trade_number',
                
            },
            {
                title: '交易金额',
                key: 'trade_sum',
                
            },

            {
                title: '交易时间',
                key: 'trade_time',
                
            },
            {
                title: '支付类型',
                key: 'pay_way',
                
            },
            ],
    columnsCost: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '消费名称',
                key: 'trade_name',
                
            },
            {
                title: '订单号',
                key: 'trade_number',
                
            },
            {
                title: '消费金额',
                key: 'trade_sum',
                
            },

            {
                title: '交易时消费时间间',
                key: 'trade_time',
                
            },
            ],
    columnsRefund: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '申请时间',
                key: 'trade_name',
                
            },
            {
                title: '退款金额',
                key: 'trade_number',
                
            },
            {
                title: '退款账号',
                key: 'trade_sum',
                
            },

            {
                title: '状态',
                key: 'trade_time',
                
            },
            {
                title: '处理时间',
                key: 'pay_way',
                
            },
            {
                title: '处理结果',
                key: 'pay_way',
                
            },
            ],
    dataRecharge:[],
    dataCost:[],
    dataRefund:[]

    
  }
  },
  created(){
    axios.get(R_PRE_URL+'/searchOrderCount.do?member_id='+this.$store.state.userInfo.member_id
      ).then((res)=> {
        let AccountInfo = res.data
        this.Name = AccountInfo.orderCount.real_name
        this.orderAmount = AccountInfo.orderCount.order_count
        this.havePayed = AccountInfo.orderCount.pay_count
        this.haveNotPayed = AccountInfo.orderCount.unpay_count
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
  methods: {
   
  },
};
</script>
<style lang="scss" scoped>
#TradeOrderI{}
</style>