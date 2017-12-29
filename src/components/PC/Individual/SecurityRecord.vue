<template>
    <div id="SecurityRecordI">
      <h3>
        <span style="font-size: 18px;">
          <Icon type="ios-paper" size="24"></Icon>
          社保公积金缴费记录
        </span>
        <span class="InlineBlock FloatRight">
          缴纳年份
          <DatePicker class="InlineBlock" type="year" placeholder="请选择" style="width: 100px" v-model="Year" @on-change="YearChange"></DatePicker>
          <Button type="primary" icon="ios-search" @click="searchRecord">搜索</Button>
        </span>
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
    Year:new Date(),
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
                key: 'pay_month',
            },
            {
                title: '社保',
                key: 'sb_status',
            },
            {
                title: '公积金',
                key: 'gjj_status'
            },
            // {
            //     title: '操作',
            //     key: 'action',
            //     width: 150,
            //             align: 'center',
            //             render: (h, params) => {
            //                 return h('div', [
            //                     h('Button', {
            //                         props: {
            //                             type: 'primary',
            //                             size: 'small'
            //                         },
            //                         style: {
            //                             marginRight: '5px'
            //                         },
            //                         on: {
            //                             click: () => {
            //                                 this.show(params.index)
            //                             }
            //                         }
            //                     }, 'View'),
            //                     h('Button', {
            //                         props: {
            //                             type: 'error',
            //                             size: 'small'
            //                         },
            //                         on: {
            //                             click: () => {
            //                                 this.remove(params.index)
            //                             }
            //                         }
            //                     }, 'Delete')
            //                 ]);
            //             }
                          
            // }
        ],
        dataOrder: []

    
  }
  },
  created(){
    this.getData(this.Year)
    
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
    },
    YearChange(YEAR){
       this.Year = YEAR
    },
    searchRecord(){
      if(!this.Year){
        this.$Message.error('请选择缴纳年份!')
        return false
      }
       this.getData(this.Year)
    },
    //获取记录
    getData(YEAR){
      this.ifLoading = true
      const OnlyYear = (typeof YEAR == 'string')?YEAR:YEAR.getFullYear()
      const DATA = {
                  "member_id":this.$store.state.userInfo.member_id,
                  entryList:[
                    {pay_month:OnlyYear+"01"},
                    {pay_month:OnlyYear+"02"},
                    {pay_month:OnlyYear+"03"},
                    {pay_month:OnlyYear+"04"},
                    {pay_month:OnlyYear+"05"},
                    {pay_month:OnlyYear+"06"},
                    {pay_month:OnlyYear+"07"},
                    {pay_month:OnlyYear+"08"},
                    {pay_month:OnlyYear+"09"},
                    {pay_month:OnlyYear+"10"},
                    {pay_month:OnlyYear+"11"},
                    {pay_month:OnlyYear+"12"},
                   ]
                }
    axios.post(R_PRE_URL+'/checkOrderMonth.do?',DATA
    ).then((res)=> {
      let temp = res.data.orderMonthList
      temp.map((Item,Idx)=>{
        switch(Item.sb_status){
            case 0:
            Item.sb_status = '待支付'
            break;
            case 1:
            Item.sb_status = '已支付'
            break;
            case 9:
            Item.sb_status = '未投保'
            break;
            default:
            Item.sb_status = '其他'
          }
        switch(Item.gjj_status){
            case 0:
            Item.gjj_status = '待支付'
            break;
            case 1:
            Item.gjj_status = '已支付'
            break;
            case 9:
            Item.gjj_status = '未投保'
            break;
            default:
            Item.gjj_status = '其他'
          }

      })
      this.dataOrder = temp
      this.ifLoading = false
    }).catch((error)=> {
      console.log(error)
    })

    }
   
  },
};
</script>
<style lang="scss" scoped>
#SecurityRecordI{}
</style>