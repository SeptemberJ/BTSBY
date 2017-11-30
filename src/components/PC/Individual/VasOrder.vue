<template>
    <div id="MyorderI">
      <h3>
        <span style="font-size: 18px;">
          <Icon type="ios-list" size="24"></Icon>
          增值服务订单列表
        </span>
        <span style="float: right;">
          <span>
            险种类型
            <Select v-model="insuranceKind" size="small" style="width:100px">
              <Option v-for="item in insuranceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </span>
          <span>
            订单状态
            <Select v-model="orderStatus" size="small" style="width:150px">
              <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </span>
          <span><Button type="primary" icon="ios-search" @click="searchOrderVas">搜索</Button></span>
        </span>
      </h3>
      <!-- table -->
      <Table class="marginT_20" border :columns="columns5" :data="dataVasOrder"></Table>

       <Page class="marginT_20" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
      
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios' 
import {timestampToFormatTime} from '../../../util/utils'
export default {
  data() {
  return {
    Total:0,
    page_num:1,  //页数
    number:10,   //每页条数
    insuranceKind: '-1',
    orderStatus:'-1',
    insuranceList: [
            {
                value: '-1',
                label: '全部'
            },
            {
                value: '0',
                label: '养老'
            },
            {
                value: '1',
                label: '失业'
            },
    ],
    statusList: [
            {
                value: '-1',
                label: '全部'
            },
            {
                value: '0',
                label: '订单待支付'
            },
            {
                value: '1',
                label: '已支付待确认'
            },
            {
                value: '2',
                label: '已确认支付成功'
            },
            {
                value: '3',
                label: '未支付成功'
            },
            {
                value: '4',
                label: '订单已处理'
            },
            {
                value: '5',
                label: '订单已完成'
            },
            {
                value: '6',
                label: '订单已取消'
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
                key: 'real_name',
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
        dataVasOrder: []

    
  }
  },
  created(){
    this.getDataVas()
    
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
    },
    //分页
    changePage(event){//当前页数
      this.page_num = event
      this.getDataVas()
    },
    //切换每页条数
    changePageSize(event){
      this.number = event
      this.getDataVas()
    },
    searchOrderVas(){
      this.getDataVas()
    },
    //获取订单
    getDataVas(){
      let member_id = this.$store.state.userInfo.member_id,
        number = this.number,
        page_num = this.page_num,
        insurance_name = this.insuranceKind ==  '-1'?'':this.insuranceKind,
        s_status = this.orderStatus ==  '-1'?'':this.orderStatus
    axios.get(R_PRE_URL+'/searchSbyAddedOrderList.do?member_id='+this.$store.state.userInfo.member_id+'&number='+number+'&page_num='+page_num+'&insurance_name='+insurance_name+'&s_status='+s_status
      ).then((res)=> {
        this.Total = res.data.orderCount
        let temp = res.data.arr
        temp.map((item,idx)=>{
          item.order_subtime = timestampToFormatTime(item.order_subtime.time)
          switch(item.s_status){
            case '0':
            item.s_status = '订单待支付'
            break;
            case '1':
            item.s_status = '已支付待确认'
            break;
            case '2':
            item.s_status = '已确认支付成功'
            break;
            case '3':
            item.s_status = '未支付成功'
            break;
            case '4':
            item.s_status = '订单已处理'
            break;
            case '5':
            item.s_status = '订单已完成'
            break;
            case '6':
            item.s_status = '订单已取消'
            break;
          }
        })
        this.dataVasOrder = temp
        console.log(typeof this.dataVasOrder[0].order_subtime)

      }).catch((error)=> {
        console.log(error)
      })
    }
   
  },
};
</script>
<style lang="scss" scoped>
#MyorderI{}
</style>