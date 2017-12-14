<template>
  <div class="OrderList">
    <Row class="ListBlock TextCenter" v-if="OrderList.length<=0">
      <Col span="24"><img src="static/img/NoData.png"></Col>
      <Col span="24" class="marginT_10">暂无数据</Col>
    </Row>
    <Row class="ListBlock" v-else>
      <Col span="24" v-for="(Order,OrderIdx) in OrderList" class="marginT_20">
        <Card>
            <p slot="title">
                单号:
                {{Order.OrderNo}}
            </p>
            <a  slot="extra">
                {{Order.Status}}
            </a>
            <ul>
                <li><b>支付方式： </b>{{Order.Way}}</li>
                <li><b>付款金额： </b>¥{{Order.Sum}}</li>
                <li><b>支付时间： </b>{{Order.date}}</li>
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
        OrderList:[
          {OrderNo:'2017112400001000020016262817',date:'2017-09-09',OrderName:'代缴广州201712-201801-社保公积金',Status:'待支付',Sum:'1366'},
          {OrderNo:'2017112400001000020016262817',date:'2017-09-09',OrderName:'代缴广州201712-201801-社保公积金',Status:'待支付',Sum:'1366'},
          {OrderNo:'2017112400001000020016262817',date:'2017-09-09',OrderName:'代缴广州201712-201801-社保公积金',Status:'待支付',Sum:'1366'},
          {OrderNo:'2017112400001000020016262817',date:'2017-09-09',OrderName:'代缴广州201712-201801-社保公积金',Status:'待支付',Sum:'1366'}
        ]
      }
    },
    mounted: function () {
      
    },
    created() {
      this.getOrderData()
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      

    },
    methods: {
      getOrderData(){
        // axios.get(R_PRE_URL+'/searchCityList.do'
        // ).then((res)=> { 
        //   this.OrderList = res.data.arr
        // }).catch((error)=> {
        //   console.log(error)
        // })
      },
    }
  }
</script>
<style lang="scss">
.OrderList{
   img{
      width: 80px;
      height: 80px;
      margin: 40px auto 0 auto;
    }
}
</style>