<template>
    <div id="SecurityRecordI">
      <h3>
        <span style="font-size: 18px;">
          <Icon type="ios-paper" size="24"></Icon>
          社保公积金缴费记录
        </span>
        <!-- <span>
          缴纳年份
          <DatePicker type="year" placeholder="请选择" style="width: 100px"></DatePicker>
        </span>
        <span><Button type="primary" icon="ios-search">搜索</Button></span> -->
      </h3>
      <!-- table -->
      <Table class="marginT_20" border :columns="columns5" :data="dataOrder"></Table>
      
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
                title: '缴纳月份',
                key: 'payMonth',
            },
            {
                title: '社保',
                key: 'security',
            },
            {
                title: '公积金',
                key: 'funds'
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
        dataOrder: [
                {
                  'payMonth':'201701',
                  'security':'未投保',
                  'funds':'未投保'
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
            content: index//Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}
        })
    },
    remove (index) {
        //this.data6.splice(index, 1);
    }
   
  },
};
</script>
<style lang="scss" scoped>
#SecurityRecordI{}
</style>