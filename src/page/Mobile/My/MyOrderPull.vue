
<template>
<div class="MainContent">
  <pull-to
    :bottom-load-method="loadmore"
    @bottom-state-change="stateChange" class="Apositiom">
    
    <Row class="ListBlock">
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
     <!--  <ul class="list">
      <li v-for="item in MyOrderList">
        {{ item.order_no}}
      </li>
    </ul> -->
      </pull-to>
      </div>
    
    <!-- vue 2.5 use slot-scope -->
    <!-- <template slot="bottom-block" slot-scope="props">
      <div class="bottom-load-wrapper">
        <svg class="icon"
             :class="{
                'icon-arrow': props.state === 'trigger',
                'icon-loading': props.state === 'loading'
             }"
             aria-hidden="true">
          <use :xlink:href="iconLink"></use>
        </svg>
        {{ props.stateText }}
      </div>
    </template> -->

</template>


<script type="text/babel">
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../../components/Mobile/BackBar'
import BlankBar from '../../../components/Mobile/BlankBar'
import Spin from '../../../components/PC/Common/Spin'
  import PullTo from 'vue-pull-to'
  export default {
    name: 'simple-pull-to-loadmore',
    components: {
      PullTo
    },
    data() {
      return {
        Total:0,
        page_num:1,  //页数
        number:10,   //每页条数
        OrderTab_cur:0,
        MyOrderList:[],
        // dataList: [
        //   '(ง •̀_•́)ง', '(´・ω・`) ', '（/TДT)/ ', '>ㅂ<',
        //   'o(*≧▽≦)ツ', '(≖ ‿ ≖)✧', '(o^∇^o)ﾉ', ' (´・ω・)ﾉ',
        //   '(´・ω・`)', 'ヽ(･ω･｡)ﾉ', '(｀･ω･´)', '╰(*°▽°*)╯',
        //   '╮(￣▽￣)╭', '(￣▽￣)~*', '(⊙ˍ⊙)', '(￣0 ￣)y'
        // ],
        iconLink: ''
      };
    },
    created() {
      this.getDataOrder(this.number,this.page_num,this.OrderTab_cur)
      
    },
    methods: {
      //获取数据
      getDataOrder(Number,PageNum,Status){
        this.ifSpin = true
        let member_id = this.$store.state.userInfo.member_id,
            number = Number,
            page_num = PageNum,
            status = Status,
            progress = '',
            start_time = '',
            end_time = '',
            month_name = ''
        axios.get(R_PRE_URL+'/searchOrderList.do?member_id=98077101-bff3-4534-b3d5-1ece6121f469'+'&number='+number+'&status='+status+'&progress='+progress+'&start_time='+start_time+'&end_time='+end_time+'&month_name='+month_name+'&page_num='+ page_num
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
            //item.pay_time = timestampToFormatTime(item.pay_time.time)
            this.MyOrderList.push(item)
            this.ifSpin = false
          })
          //this.MyOrderList = temp

          this.ifSpin = false

        }).catch((error)=> {
          console.log(error)
        })
      },
      loadmore(loaded) {
        this.getDataOrder(this.number,this.page_num,this.OrderTab_cur)
        loaded('done');
        // setTimeout(() => {
        //   this.dataList = this.dataList.concat(this.dataList);
        //   loaded('done');
        // }, 2000);
      },
      stateChange(state) {
        if (state === 'pull' || state === 'trigger') {
          this.iconLink = '#icon-arrow-bottom';
        } else if (state === 'loading') {
          this.iconLink = '#icon-loading';
        } else if (state === 'loaded-done') {
          this.iconLink = '#icon-finish';
        }
      }
    }
  };
</script>

<style lang="scss">
.MainContent{
    width: 90%;
    margin-top: 52px;
    margin-bottom: 130px;
  }
  .Apositiom{
    position: absolute;
  }
  .bottom-load-wrapper {
    line-height: 50px;
    text-align: center;
  }
  .icon-arrow {
    transition: .2s;
    transform: rotate(180deg);
  }
  .icon-loading {
    transform: rotate(0deg);
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes loading
  {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
  }
</style>