<template>
    <div id="TradeOrderI">
      <h3>
        <span style="font-size: 18px;">
          <Icon type="clipboard" size="24"></Icon>
          交易账单
        </span>
        <!-- <span>
          支付状态
          <Select v-model="model1" size="small" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </span>
        <span>
          订单进度
          <Select v-model="model1" size="small" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </span>
        <span>
          <DatePicker type="date" placeholder="创建起始时间" style="width: 100px"></DatePicker>
        </span>
        至
        <span>
          <DatePicker type="date" placeholder="创建结束时间" style="width: 100px"></DatePicker>
        </span>
        <span>
          <DatePicker type="month" placeholder="缴纳月份" style="width: 100px"></DatePicker>
        </span>
        <span><Button type="primary" icon="ios-search">搜索</Button></span> -->
      </h3>
      <!-- table -->
      <!-- <Table class="marginT_20" border :columns="columns5" :data="dataVas"></Table> -->
      
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {timestampToFormatTime} from '../../../util/utils'
export default {
  data() {
  return {

    
  }
  },
  created(){
    // axios.get(R_PRE_URL+'/searchOrderList.do?member_id='+this.$store.state.userInfo.member_id
    //   ).then((res)=> {
    //     let temp = res.data.arr
    //     temp.map((item,idx)=>{
    //       item.pay_time = timestampToFormatTime(item.pay_time.time)
    //     })
    //     this.dataOrder = temp
    //     console.log(this.dataOrder)

    //   }).catch((error)=> {
    //     console.log(error)
    //   })
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