<template>
  <div class="PayRecordList">
    <Row class="ListBlock TextCenter" v-if="PayRecordList.length<=0">
       <Col span="24"><img src="static/img/NoData.png"></Col>
       <Col span="24" class="marginT_10">暂无数据</Col>
    </Row>
    <Row class="ListBlock" v-else>
      <Col span="24" v-for="(PayRecord,PayRecordIdx) in PayRecordList" class="marginT_20">
        <Card>
            <p slot="title">
                单号:
                {{PayRecord.OrderNo}}
            </p>
            <a  slot="extra">
                {{PayRecord.Status}}
            </a>
            <ul>
                <li><b>订单名称： </b>{{PayRecord.OrderName}}</li>
                <li><b>订单总额： </b>¥{{PayRecord.Sum}}</li>
                <li><b>下单时间： </b>{{PayRecord.date}}</li>
            </ul>
        </Card>
      </Col>
    </Row>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
  export default{
    data: function () {
      return {
        PayRecordList:[
          {OrderNo:'2017112400001000020016262817',date:'2017-09-09',Way:'微信',Sum:'1366'},
          {OrderNo:'2017112400001000020016262817',date:'2017-09-09',Way:'支付宝',Sum:'1366'},
        ]
      }
    },
    mounted: function () {
      
    },
    created() {
      this.getPayData()
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      

    },
    methods: {
      getPayData(){
        // axios.get(R_PRE_URL+'/searchCityList.do'
        // ).then((res)=> { 
        //   this.PayRecordList = res.data.arr
        // }).catch((error)=> {
        //   console.log(error)
        // })
      },
    }
  }
</script>
<style lang="scss">
.PayRecordList{
  img{
      width: 80px;
      height: 80px;
      margin: 40px auto 0 auto;
    }
}
</style>