<template>
    <div id="MessageI">
      <h3>
        <span style="font-size: 18px;">
          <Icon type="ios-bell" size='24'></Icon>
          消息通知
        </span>
      </h3>
      <Alert show-icon closable @on-close="deleteMsg" class="marginT_20" type="error">
        系统提醒 2017-11-08 10:30:27
        <Icon type="speakerphone" slot="icon"></Icon>
        <template slot="desc">
您选择的上海地区201712,201801,201802,201803月份购买社保公积金已生成订单!订单号为：20171108103026000230</template>
        <Button type="text">标记为已读</Button>
        <span slot="close">删除</span>
      </Alert>
      <Alert show-icon closable="true" @on-close="deleteMsg" class="marginT_20">
        系统提醒 2017-11-08 10:30:27
        <Icon type="speakerphone" slot="icon"></Icon>
        <template slot="desc">
您选择的上海地区201712,201801,201802,201803月份购买社保公积金已生成订单!订单号为：20171108103026000230</template>
      </Alert>
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
    deleteMsg(){
      alert('delete---')
    }
   
  },
};
</script>
<style lang="scss" scoped>
#MessageI{}
</style>