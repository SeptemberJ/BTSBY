<template>
  <div id="SubmitOrder">
    <!-- 支付方式 -->
    <Card :bordered="false" dis-hover style="width: 80%;margin: 0 auto;">
        <p slot="title">选择支付方式</p>
        <RadioGroup v-model="PayWay">
          <Row>
            <Col span="8" class="TextCenter">
              <Radio label="0">
                <!-- <Icon type="chatbubbles"></Icon> -->
                <img src="static/img/微信 支付.png">
                <span>微信</span>
              </Radio>
            </Col>
            <Col span="8" class="TextCenter">
              <Radio label="1">
                <img src="static/img/转账.png">
                <span>银行卡</span>
              </Radio>
            </Col>
            <Col span="8" class="TextCenter">
              <Radio label="2">
                  <img src="static/img/支付宝.png">
                  <span>支付宝</span>
              </Radio>
            </Col>
          </Row>
        </RadioGroup>
        <pre class="CardTips" v-if="PayWay==0">
          微信支付成功后，我们将会尽快核对，如有问题请联系客服
        </pre>
        <pre class="CardTips" v-if="PayWay==1">
           公司名称：广州红海人力资源集团股份有限公司 
           兴业银行账号：399330100100025010（兴业银行广州荔湾支行.）
           成功转账后请点击下面的提交订单按钮，我们会尽快处理订单;如需快速处理请致电联系我们400-0135-200
        </pre>
        <pre class="CardTips" v-if="PayWay==2">
          支付宝转账成功后，我们将会尽快核对，如有问题请联系客服(社保云需要支付千分之六的手续费给支付宝)
        </pre>
    </Card>

    <BlankBar></BlankBar>
    <!-- 订单信息 -->
    <Card :bordered="false" dis-hover style="width: 80%;margin: 0 auto;">
        <p slot="title">确认订单信息</p>
          <!-- <Table :columns="columnOrder" :data="dataOrder"></Table> -->
          <Row style="border-bottom: 1px dashed #ddd;padding: 10px 0px;">
            <Col span="16" class=""><b>订单名称</b></Col>
            <Col span="8" class=""><b>订单总额</b></Col>
          </Row>
          <Row class="marginT_10">
            <Col span="16" class="">{{dataOrder.Order_name}}</Col>
            <Col span="8" class="">¥{{dataOrder.Order_sum}}</Col>
          </Row>
          <Row class="marginT_10">
            <Col span="24" class=""><Alert type="warning" show-icon>首次购买如需社保卡，请联系客服：400-0135-200</Alert></Col>
          </Row>
    </Card>

    <BlankBar></BlankBar>
    <Card :bordered="false" dis-hover style="width: 80%;margin: 0 auto;">
      <Row class='marginT_20'>
        <Col span="12" v-if="PayWay!=2">实付金额：<span class="colorRed Font24"><b>¥{{dataOrder.Order_sum}}</b></span></Col>
        <Col span="12" v-if="PayWay==2">实付金额：<span class="colorRed Font24"><b>¥{{(dataOrder.Order_sum*(1+0.006)).toFixed(2)}}</b></span></Col>
        <Col span="12" class="TextRight"><Button class="MidBt" type="error" @click="ToPay">提交订单</Button></Col>
      </Row>
    </Card>
    
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BlankBar from '../../../components/Mobile/BlankBar'
import {timestampToFormatTime} from "../../../util/utils"

export default {
  data() {
  return {
    PayWay:'0',
    dataOrder:{
                    Order_name: '代缴上海2018年1月,2月,3月社保公积金',
                    Order_sum: '6268'
                }
  }
  },
  created() {
  },
  mounted: function(){

    
  
  },
  computed: {
    
  },
  watch:{
  },
  components: {
    BlankBar
  },
  methods: {
    ToPay(){
      this.$router.push({name:'订单支付'})
    }
  },
};
</script>
<style lang="scss" scoped>
#SubmitOrder{
  width: 100%;
  padding: 20px 0;
  margin: 0px auto;
  background-color: #efeff4;
  .CardTips{
     font-size: 12px; 
     color: #a94442;
     margin-top: 20px;
  }
  .ivu-radio-group{
    width: 100%;
  }
  .ivu-table-wrapper{
    border: 0px !important;
  }
  .MidBt{
    margin: 10px auto;
  }
  img{
    width: 30px !important;
  }
  .Font24{
    font-size: 24px;
  }

  
}

</style>