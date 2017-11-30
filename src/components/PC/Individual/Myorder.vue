<template>
    <div id="MyorderI">
      <h3>
        <span style="font-size: 18px;">
          <Icon type="ios-cart" size="24"></Icon>
          我的订单
        </span>
        <span style="float: right;">
          <span>
            支付状态
            <Select v-model="status" size="small" style="width:80px">
              <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </span>
          <span>
            订单进度
            <Select v-model="progress" size="small" style="width:120px">
              <Option v-for="item in progressList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </span>
          <span>
            <DatePicker type="datetime" v-model="start_time" @on-change="changeStartTime" placeholder="创建起始时间" style="width: 160px"></DatePicker>
          </span>
          至
          <span>
            <DatePicker type="datetime" v-model="end_time" @on-change="changeEndTime" placeholder="创建结束时间" style="width: 160px"></DatePicker>
          </span>
          <span>
            <DatePicker type="month" v-model="month_name" placeholder="缴纳月份" style="width: 100px"></DatePicker>
          </span>
          <span><Button type="primary" icon="ios-search" @click="searchOrder">搜索</Button></span>
        </span>
      </h3>
      <!-- table -->
      <Table class="marginT_20" border :columns="columns5" :loading="ifLoading" :data="dataOrder"></Table>

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
    ifLoading:false,
    Total:0,
    page_num:1,  //页数
    number:10,   //每页条数
    status:'-1',
    progress:'-1',
    start_time:'',
    end_time:'',
    month_name:'',
    statusList: [
            {
                value: '-1',
                label: '全部'
            },
            {
                value: '0',
                label: '待支付'
            },
            {
                value: '1',
                label: '已支付'
            },
            {
                value: '1',
                label: '支付成功'
            },
            {
                value: '1',
                label: '支付失败'
            }
    ],
    progressList: [
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
                label: '已支付,待确认'
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
                label: '订单完成'
            },
            {
                value: '6',
                label: '订单已取消'
            }
    ],
    columns5: [
            {
                title: '订单名称',
                key: 'order_name',
                
            },
            {
                title: '订单号',
                key: 'order_no',
                sortable: true
            },
            {
                title: '支付状态',
                key: 'status',
            },
            {
                title: '订单总额',
                key: 'amount'
            },
            {
                title: '最新进度',
                key: 'progress'
            },
            {
                title: '下单时间',
                key: 'pay_time',
                sortable: true
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    // class: {
                                    //   foo: true,
                                    //   bar: false
                                    // },
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:this.dataOrder[params.index].status == '待支付'?'':'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '支付'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '取消')
                            ]);
                        }
                          
            }
        ],
        dataOrder: []

    
  }
  },
  created(){
    this.getDataOrder()
    
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
    changeStartTime(event){
      this.start_time = event
    },
    changeEndTime(event){
      this.end_time = event
    },
    //search
    searchOrder(){
      this.getDataOrder()
    },
    //分页
    changePage(event){//当前页数
      this.page_num = event
      this.getDataOrder()
    },
    //切换每页条数
    changePageSize(event){
      this.number = event
      this.getDataOrder()
    },
    //获取数据
    getDataOrder(){
      let member_id = this.$store.state.userInfo.member_id,
          number = this.number,
          page_num = this.page_num,
          status = this.status=='-1'?'':this.status,
          progress = this.progress=='-1'?'':this.progress,
          start_time = this.start_time?timestampToFormatTime((this.start_time).getTime()):'',
          end_time = this.end_time?timestampToFormatTime((this.end_time).getTime()):'',
          month_name = this.month_name?(this.month_name).getMonth()+1:''
      axios.get(R_PRE_URL+'/searchOrderList.do?member_id='+this.$store.state.userInfo.member_id+'&number='+number+'&status='+status+'&progress='+progress+'&start_time='+start_time+'&end_time='+end_time+'&month_name='+month_name+'&page_num='+ page_num
      ).then((res)=> {
        this.Total = res.data.orderCount
        let temp = res.data.arr
        temp.map((item,idx)=>{
          switch(item.status){
            case '0':
            item.status = '待支付'
            break;
            case '1':
            item.status = '已支付'
            break;
            case '2':
            item.status = '支付成功'
            break;
            case '3':
            item.status = '支付失败'
            break;
          }
          switch(item.progress){
            case '0':
            item.progress = '订单待支付'
            break;
            case '1':
            item.progress = '已支付待确认'
            break;
            case '2':
            item.progress = '已确认支付成功'
            break;
            case '3':
            item.progress = '未支付成功'
            break;
            case '4':
            item.progress = '订单已处理'
            break;
            case '5':
            item.progress = '订单完成'
            break;
            case '6':
            item.progress = '订单已取消'
            break;
          }
          item.pay_time = timestampToFormatTime(item.pay_time.time)
          this.ifLoading = false
        })
        this.dataOrder = temp

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