<template>
  <div class="CostRecord">
  	<BackBar></BackBar>
    <div class="MainContent">
      <Row type="flex" justify="space-around" class="code-row-bg" style="height: 35px;line-height: 35px;">
        <Col span="8" class="TextCenter" v-bind:class="{tab_active:OrderTab_cur==0}"><span @click="ChangeTab(0)">待支付</span></Col>
        <Col span="8" class="TextCenter" v-bind:class="{tab_active:OrderTab_cur==1}"><span @click="ChangeTab(1)">支付成功</span></Col>
        <Col span="8" class="TextCenter" v-bind:class="{tab_active:OrderTab_cur==2}"><span @click="ChangeTab(2)">支付失败</span></Col>
      </Row>


      <Row class="marginT_40 TextCenter" v-if="MyOrderList.length<=0">
        <Col span="24" class="TextCenter">
          <Icon type="social-tux" :size="36"></Icon> 暂无数据
        </Col>
      </Row>
      <Row class="ListBlock" v-else>
        <Col span="24" v-for="(Order,OrderIdx) in MyOrderList" class="marginT_20">
          <div @click="Order.status=='待支付'?ToOrderDetail(Order):''">
            <Card>
                <p slot="title">
                    单号:
                    {{Order.order_no}}
                </p>
                <a  slot="extra" v-if="Order.status=='待支付'">
                    <Icon type="chevron-right"></Icon>
                </a>
                <ul>
                    <li><b>订单名称： </b>{{Order.order_name}}</li>
                    <li><b>付款金额： </b>¥{{Order.amount}}</li>
                    <li><b>支付时间： </b>{{Order.pay_time}}<a style="float: right;">{{Order.status}}</a></li>
                </ul>
            </Card>
          </div>
        </Col>
      </Row>
      
    </div>
    <!-- 返回顶部 -->
    <BackTop :height="100" :bottom="200">
      <div class="top"><Icon type="android-arrow-dropup" :size="24"></Icon></div>
    </BackTop>
    <Spin v-if="ifSpin"></Spin>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../../components/Mobile/BackBar'
import BlankBar from '../../../components/Mobile/BlankBar'
import Spin from '../../../components/PC/Common/Spin'
import {timestampToFormatTime} from '../../../util/utils'
  export default{
    data: function () {
      return {
        OrderTab_cur:0,
        MyOrderList:[]
      }
    },
    mounted: function () {
      
    },
    created() {
      this.getDataOrder(100,1,0)
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      BackBar,
      Spin
    },
    methods: {
      ChangeTab(KIND){
        switch(KIND){
          case 0:
          this.OrderTab_cur = 0
          this.getDataOrder(100,1,0)
          break
          case 1:
          this.OrderTab_cur = 1
          this.getDataOrder(100,1,2)
          break
          case 2:
          this.OrderTab_cur = 2
          this.getDataOrder(100,1,3)
          break
        }
      },
      ToOrderDetail(Order){
        localStorage.setItem("OrderAmount",Order.amount)
        this.$router.push({name:'订单详情(企业)',params:{OrderNo:Order.order_no}})
      },
      //获取数据
    getDataOrder(Number,PageNum,Status){
      this.ifSpin = true
      let member_id = this.$store.state.userInfo.member_id,
          number = Number,
          page_num = 1,
          status = Status,
          progress = '',
          start_time = '',
          end_time = '',
          month_name = ''
      axios.get(R_PRE_URL+'/searchCompanyOrderList.do?member_id='+this.$store.state.userInfo.member_id+'&number='+number+'&status='+status+'&progress='+progress+'&start_time='+start_time+'&end_time='+end_time+'&month_name='+month_name+'&page_num='+ page_num
      ).then((res)=> {
        //this.Total = res.data.orderCount
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
          this.ifSpin = false
        })
        this.MyOrderList = temp
        this.ifSpin = false

      }).catch((error)=> {
        console.log(error)
      })
    },
      
      
    }
  }
</script>
<style lang="scss">
.CostRecord{
  margin-bottom: 130px;
  .MainContent{
    width: 100%;
    margin-top: 52px;
    .tab_active{
      font-weight: bold;
      color: #39f;
      border-bottom: 2px solid #39f;
    }
    .ListBlock{
      width: 95%;
      margin: 40rpx auto 0 auto;
     img{
        width: 80px;
        height: 80px;
        margin: 40px auto 0 auto;
      }
    }
    
  }
  .top{
        padding: 0px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 50%;
    }
}
</style>