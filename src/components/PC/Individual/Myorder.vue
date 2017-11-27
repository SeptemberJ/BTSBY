<template>
    <div id="MyorderI">
      <h3>
        <span style="font-size: 18px;">
          <Icon type="ios-cart" size="24"></Icon>
          我的订单
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
      <Table class="marginT_20" border :columns="columns5" :loading="ifLoading" :data="dataOrder"></Table>
      
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {timestampToFormatTime} from '../../../util/utils'
export default {
  data() {
  return {
    ifLoading:true,
    cityList: [
            {
                value: 'New York',
                label: 'New York'
            },
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
    axios.get(R_PRE_URL+'/searchOrderList.do?member_id='+this.$store.state.userInfo.member_id
      ).then((res)=> {
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