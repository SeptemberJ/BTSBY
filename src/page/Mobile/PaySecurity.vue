<template>
  <div class="PaySecurity">
  	<BackBar></BackBar>
    <div class="MainContent">
      <div class="List">
        <Row class="BgGray">
          <Col span="2"><Icon type="calendar" size="18"></Icon></Col>
          <Col span="22">缴纳月份</Col>
        </Row>
        <Row  class="ListItem MonthList">
          <CheckboxGroup v-model="buyMonthList" class="monthList" @on-change="changeBuyMonth">
            <Col span="8" class="marginTB_10 TextCenter"  v-for="(Month,MonthIdx) in MonthList" >
              <Checkbox :label="Month"></Checkbox>
            </Col>
          </CheckboxGroup>
        </Row>

        <Row class="BgGray">
          <Col span="2"><Icon type="ios-pricetag" size="18"></Icon></Col>
          <Col span="22">参保类型</Col>
        </Row>
        <Row  class="ListItem">
          <Col span="6">社保</Col>
          <Col span="18" class="TextRight">
            <i-switch v-model="switchS"></i-switch>
          </Col>
        </Row>
        <Row  class="ListItem">
          <Col span="6">公积金</Col>
          <Col span="18" class="TextRight">
            <i-switch v-model="switchG" @on-change=""></i-switch>
          </Col>
        </Row>



        <Row class="BgGray">
          <Col span="2"><Icon type="cash" size="18"></Icon></Col>
          <Col span="22">费用信息</Col>
        </Row>
        <Row  class="ListItem">
          <Col span="6">社保费用</Col>
          <Col span="18" class="TextRight" v-if="switchS">¥{{Security}}元/月/人* {{buyMonthList.length}}月 = ¥{{Security*buyMonthList.length}}</Col>
          <Col span="18" class="TextRight" v-else>¥0</Col>
        </Row>
        <Row  class="ListItem">
          <Col span="6">公积金费用</Col>
          <Col span="18" class="TextRight" v-if="switchG">¥{{Funds.toFixed(2)}}元/月/人* {{buyMonthList.length}}月 = ¥{{(Funds*buyMonthList.length).toFixed(2)}}</Col>
          <Col span="18" class="TextRight" v-else>¥0</Col>
        </Row>
        <Row  class="ListItem">
          <Col span="6">服务费用</Col>
          <Col span="18" class="TextRight">{{service_fee}}元/月/人 * {{buyMonthList.length}}月 = ¥{{service_fee*buyMonthList.length}}</Col>
        </Row>
        <Row  class="ListItem">
          <Col span="6">其他费用</Col>
          <Col span="18" class="TextRight">¥{{material_fee}}</Col>
        </Row>
        <Row  class="ListItem">
          <Col span="6">合计费用</Col>
          <Col span="18" class="TextRight" v-if="switchS && !switchG">¥{{((Security + service_fee)*buyMonthList.length+material_fee).toFixed(2)}}</Col>
          <Col span="18" class="TextRight" v-if="!switchS && switchG">¥{{((Funds + service_fee)*buyMonthList.length+material_fee).toFixed(2)}}</Col>
          <Col span="18" class="TextRight" v-if="switchG && switchS">¥{{((Security + Funds + service_fee)*buyMonthList.length+material_fee).toFixed(2)}}</Col>
          <Col span="18" class="TextRight" v-if="!switchS && !switchG">¥0</Col>
        </Row>

        <Row type="flex" justify="center" class="code-row-bg marginT_20">
          <Col span="12"><Button type="error" long @click="toSubmitOrder">提交订单</Button></Col>
        </Row>


      </div>
    </div>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../components/Mobile/BackBar'
import {getOneYearMonth,DateSortASC,ifContinuity} from "../../util/utils"
export default{
  data: function () {
      return {
        buyMonthList:[],
        switchS:true,     //是否交社保
        switchG:false,    //是否交公积金
        Security:'',    //社保费用
        Funds:'',       //公积金费用
        service_fee:0, //服务费
        material_fee:0,//其他费用
        SumS:0,
        SumG:0,
        Sum:0,          //合计
        securityID:'',
        INSURED_AREA:''
        
      }
  },
  created() {
    axios.get(R_PRE_URL+'/searchMemberDetail.do?member_id='+this.$store.state.userInfo.member_id
    ).then((res)=> {
      let MemberDetail = res.data.memberDetail
      let CityCode = MemberDetail.city
      this.INSURED_AREA = MemberDetail.city_name
      axios.get(R_PRE_URL+'/searchInsurance.do?city='+CityCode
      ).then((RES)=> {
        let InsuranceDetail = RES.data.insuranceDetail
        this.securityID = InsuranceDetail.id
        this.Security = InsuranceDetail.person_total + InsuranceDetail.company_total
        this.Funds = InsuranceDetail.providen_base*(InsuranceDetail.providentinductrial + InsuranceDetail.providentunit)
      }).catch((error)=> {
        console.log(error)
      })

    }).catch((error)=> {
      console.log(error)
    })
  },
  mounted: function(){
    
  
  },
  computed: {
    MonthList(){
        return getOneYearMonth(12,15)
    }
    
  },
  watch:{
    
  },  
  components: {
      BackBar
      

  },
  methods: {
    //缴纳月份变化
    changeBuyMonth(){
      axios.get(R_PRE_URL+'/searchSbyFee.do?month_count='+this.buyMonthList.length
      ).then((res)=> { 
        let Data = res.data
        if(Data.hasOwnProperty("feeInfo")){
          this.service_fee = Data.feeInfo.service_fee
          this.material_fee = Data.feeInfo.material_fee
        }else{
          this.service_fee = 0
          this.material_fee = 0
        }
        console.log(this.material_fee +'---' + this.service_fee)
      }).catch((error)=> {
        console.log(error)
      })
    },
    //提交订单
    toSubmitOrder(){
      if(this.buyMonthList.length<=0){
        this.$Message.error('请选择代缴年月！')
        return
      }
      if(!this.switchS && !this.switchG){
        this.$Message.error('请选择代缴种类！')
        return
      }

      //月份是否连续
      if(!ifContinuity(DateSortASC(this.buyMonthList))){
        this.$Message.error('参保的月份必须连续！')
        return
      }

      let Amount =0
      let monthListStr=''
      this.buyMonthList.map(function(item,idx){
        monthListStr = monthListStr + item.replace("-","") +'-'
      })
      let Pay_type = this.switchG && this.switchS ?'0':this.switchG?'2':'1'
      switch(Pay_type){
        case '0':
        Amount = ((this.Security + this.Funds + this.service_fee)*this.buyMonthList.length+this.material_fee).toFixed(2)
        break;
        case '1':
        Amount = ((this.Security + this.service_fee)*this.buyMonthList.length+this.material_fee).toFixed(2)
        break;
        case '2':
        Amount = ((this.Funds + this.service_fee)*this.buyMonthList.length+this.material_fee).toFixed(2)
        break;
      }
      let monthObjList =[]
      this.buyMonthList.map(function(item,idx){
        let obj = {'pay_month':item.replace("-","")}
        monthObjList.push(obj)
      })

      let orderInfo = {
        'order_name':'代缴'+ this.INSURED_AREA + monthListStr + (Pay_type==0?'社保公积金':Pay_type==1?'社保':'公积金'),
        'amount':Amount,
        'pay_time':new Date(),
        'service_charge':this.service_fee,
        'member_id':this.$store.state.userInfo.member_id,
        'insurance_detail_id':this.securityID,
        'city':this.INSURED_AREA,
        'order_month':'',//monthListStr
        'pay_type':Pay_type,
        'sbEntryList':monthObjList,
        'gjjEntryList':monthObjList
      }
      console.log(orderInfo)

      axios.post(R_PRE_URL+'/insertOrder.do',orderInfo
      ).then((res)=> {
        switch(res.data.result){
          case '2':
          this.$Message.success('下单成功!')
          this.$router.push({name:'订单详情',params:{OrderNo:res.data.订单号}})
          break;
          case '0':
          this.$Message.error(res.data.message+':'+res.data.detail)
          break;
        }
        console.log(res)
      }).catch((error)=> {
        console.log(error)
      })
      //this.$router.push({name:'订单详情',params:{OrderNo:123}})
      
    }
    
  },
};
</script>
<style lang="scss">
.PaySecurity{
  margin-bottom: 130px;
  .MainContent{
    width: 100%;
    margin: 0 auto;
    margin-top: 42px;
    .List{
      width: 100%;
      margin: 0 auto;
    .ListItem{
        padding: 0 10px;
        height: 45px;
        line-height: 45px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        img{
          width: 32px;
          height: 32px;
          margin-top: 5px;
        }
        .ivu-select-selection{
          border: 0px;
        }
      }
      .MonthList{
        height: 100%;
        line-height: 100%;
        padding: 0 0px;
      }
    }

  }
  .BgGray{
    background-color: #efeff4;
    padding: 5px 10px;
  }
}
</style>