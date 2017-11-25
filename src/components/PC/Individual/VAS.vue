<template>
    <div id="MyorderI">
      <h3>
        <span style="font-size: 18px;">
          <Icon type="person-stalker" size="24"></Icon>
          社保云增值服务
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
      <Table class="marginT_20" border :columns="columns5" :data="dataVas"></Table>
      
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
                title: '投保地名称',
                key: 's_city',
                
            },
            {
                title: '选择服务险种名称',
                key: 'insurance_name',
                sortable: true
            },
            {
                title: '服务事项',
                key: 'service_items',
            },
            {
                title: '预计时间',
                key: 'estimated_time'
            },
            {
                title: '收费标准',
                key: 's_fee'
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
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
                                }, 'Delete')
                            ]);
                        }
                          
            }
        ],
        dataVas: [
          {
            s_city:'上海',
            insurance_name:'医疗',
            service_items:'201701',
            estimated_time:'一个月',
            s_fee:320

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