<template>
    <div id="MyorderI">
      <h3 style="">
        <span style="font-size: 18px;">
          <Icon type="ios-cart" size="24"></Icon>
          我的订单
        </span>
      <!-- </h3>
      <h3 class="marginT_10" style="text-align: right;"> -->
      <span style="margin-left: 20px;">
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
      <Table class="marginT_10" border highlight-row :columns="myOrderList" :loading="ifLoading" :data="dataOrder"></Table>

      <Page class="marginT_20" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
      
            <!-- Modal -->
      <Modal v-model="ifShowModal">
        <p slot="header" style="text-align:left">
            <Icon type="ios-pricetags"></Icon>
            <span>社保云增值服务详细信息</span>
        </p>
        <div style="text-align:left">
          <Row class="marginTB_10">
              <Col span="12"><span>订单号 ：</span><span>{{ModalInfo.order_no}}</span></Col>
              <Col span="12"><span>订单名称 ：</span><span>{{ModalInfo.order_name}}</span></Col>
              
          </Row>
          <Row>
              <Col span="12"><span>订单金额 ：</span><span>￥{{ModalInfo.amount}}</span></Col>
              <Col span="12"><span>支付状态：</span><span>{{ModalInfo.status}}</span></Col>
          </Row>
          <Row>
              <Col span="12"><span>服务内容 ：</span><span>{{ModalInfo.pay_type_T}}</span></Col>
              <Col span="12"><span>代缴月份：</span><span>{{}}</span></Col>
          </Row>
          <!-- <Row class="marginTB_10" style="border-top: 1px solid #ddd;">
              <Col span="24" class="marginTB_10"><span><b>客户本人需提供资料 ：</b></span><span>{{ModalInfo.personal_info}}</span></Col>
              <Col span="24" class="marginTB_10"><span><b>服务公司需提供资料 ：</b></span><span>{{ModalInfo.company_info}}</span></Col>
              <Col span="24" class="marginTB_10"><span><b>办理步骤 ：</b></span><span>{{ModalInfo.process_steps}}</span></Col>
          </Row> -->
        </div>
        <div slot="footer" style="text-align: center;">
            <Button type="primary" size="large" :loading="modal_loading" @click=""><Icon type="printer"></Icon><a href="http://192.168.10.177:8082/exportExcel?order_id=ea225728-e8ce-4b3c-8853-fb971ef9e66b&pay_type=0" download="http://192.168.10.177:8082/exportExcel?order_id=ea225728-e8ce-4b3c-8853-fb971ef9e66b&pay_type=0">导出订单数据</a></Button>
        </div>
      </Modal>

    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {timestampToFormatTime} from '../../../util/utils'
export default {
  data() {
  return {
    ifShowModal:false,
    modal_loading: false,
    ifLoading:false,
    Total:0,
    page_num:1,  //页数
    number:10,   //每页条数
    status:'-1',
    progress:'-1',
    start_time:'',
    end_time:'',
    month_name:'',
    ModalInfo:{
      id:'',
      order_no:'',
      order_name:'',
      amount:'',
      status:'',
      pay_type:'',
      pay_type_T:''
    },
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
    myOrderList: [
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
                                            this.seeDetail(params)
                                        }
                                    }
                                }, '查看')
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
    seeDetail (Info) {
        console.log(Info)
        this.ifShowModal = true
        this.ModalInfo.id = Info.row.id
        this.ModalInfo.order_no = Info.row.order_no
        this.ModalInfo.order_name = Info.row.order_name
        this.ModalInfo.amount = Info.row.amount
        this.ModalInfo.status = Info.row.status
        this.ModalInfo.pay_type = Info.row.pay_type
        this.ModalInfo.pay_type_T = Info.row.pay_type == '0'?'代缴社保和公积金':(Info.row.pay_type == '1'?'代缴社保':'代缴公积金')
        
    },
    //导出excel
    pinterExl(){
      let ID = this.ModalInfo.id
      let TYPE = this.ModalInfo.pay_type
      axios.get(R_PRE_URL+'/exportExcel?order_id='+ID + '&pay_type='+TYPE
        ).then((res)=> { 
          
        }).catch((error)=> {
          console.log(error)
        })
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
      this.ifLoading = true
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
        this.ifLoading = false

      }).catch((error)=> {
        console.log(error)
      })
    },
    //选择某行
    // chooseOrder(event){
    //   console.log(event)

    // }
   
  },
};
</script>
<style lang="scss" scoped>
#MyorderI{}
</style>