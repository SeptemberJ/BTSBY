<template>
    <div id="MyorderI">
      <h3>
        <span style="font-size: 18px;">
          <Icon type="ios-list" size="24"></Icon>
          增值服务订单列表
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
      <Table class="marginT_20" border :columns="columns5" :data="dataVasOrder"></Table>
      
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios' 
import {timestampToFormatTime} from '../../../util/utils'
export default {
  data() {
  return {
    model1: '',
    cityList: [
            {
                value: 'New York',
                label: 'New York'
            },
    ],
    columns5: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '订单提交时间',
                key: 'order_subtime',
                
            },
            {
                title: '客户名称',
                key: 'member_id',
                sortable: true
            },
            {
                title: '办理事项',
                key: 'service_items',
            },
            {
                title: '办理状态',
                key: 's_status'
            },
            {
                title: '受理方',
                key: 's_acquirer'
            }
        ],
        dataVasOrder: [
          {
            order_subtime:'201701',
            member_id:'张三',
            service_items:'养老',
            s_status:'待办理',
            s_acquirer:'财政局'

          }
        ]

    
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
    show (index) {
        this.$Modal.info({
            title: 'User Info',
            content: `content`//Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}
        })
    },
    remove (index) {
        //this.data6.splice(index, 1);
    }
   
  },
};
</script>
<style lang="scss" scoped>
#MyorderI{}
</style>