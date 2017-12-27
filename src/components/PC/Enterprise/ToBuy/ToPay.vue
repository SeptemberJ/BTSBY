<template>
  <div id="TopayE">
    <!-- top -->
    <h2>参保资料</h2>
    <p class="securityInfo">参保城市:上海  <a href="http://sbyun.com/SicOrderMain.mc?method=exportAreaMeal&areaId=10&areaName=%E4%B8%8A%E6%B5%B7" class="marginL_20"><Icon type="ios-download"></Icon>下载上海社保缴费明细</a></p>

    <Table :columns="columnsHead" :loading="ifLoading" :data="dataOrder"></Table>
    
    <p class="marginT_20"><span class="marginL_20 fixedWidth">社保代缴</span><span class="marginL_20">社保参保人数：0人 </span><a @click="chooseMemberS(0)"><Icon type="ios-compose" size="18"></Icon>社保参保名单</a></p>
    <p class="marginT_20"><span class="marginL_20 fixedWidth">公积金代缴</span><span class="marginL_20">公积金参保人数：0人 </span><a @click="chooseMemberG(1)"><Icon type="ios-compose" size="18"></Icon>公积金参保名单</a></p>

    <!-- Bottom -->
    <h2 class="marginT_20">选择购买月份</h2>
    <CheckboxGroup v-model="buyMonthList" class="monthList" @on-change="changeBuyMonth">
        <Checkbox v-for="(Month,MonthIdx) in MonthList" :label="Month"></Checkbox>
    </CheckboxGroup>
    <div class="tipBlock">
      <p>提示：每个月的15号为上海的社保增员截止日期，投保类型为当月缴当月</p>
      <p style="text-indent: 36px">每个月的11号为上海的社保减员截止日期</p>
      <p>提示：每个月的15号为上海的社保增员截止日期，投保类型为当月缴当月</p>
      <p style="text-indent: 36px">每个月的11号为上海的社保减员截止日期</p>
    </div>

    <h3 class="marginT_20">订单费用详情</h3>
    <div class="sumBlock marginT_10">
      <div>
        <p>代收社保费用小计：<span>1740.8 元（ 1740.8元/月[1人] × 1月</span></p>
        <p>代收公积金费用小计：<span>306 元（ 306元/月 [1人] × 1月 ）</span></p>
        <p>其他费用小计：<span>9元（材料费:9元/人 x 1人）</span></p>
        <p>代理缴纳费用小计：<span> 39.8元（双买：39.8元（39.8元/月×1月×1人次）</span></p>
        <p>合计：<span class="colorRed" style="font-size: 18px; font-weight: bold;">¥ 2095.6</span></p>
         
      </div>
      

      <p class="colorRed marginT_20">注：订单代收费用为预收取费用，若在代缴期间遇到社保政策变化导致的社保基数、比例调整，系统会自动生成补收或退款订单。</p>
      <p class="colorRed">订单信息会以邮件的方式通知。在社保代缴期间，请注意查收您的邮箱。详情请咨询客服：400-0135-200</p>
      <p class="colorRed">2、如您为员工一次性购买多月，员工在已购买月份离职或不续保，请在花名册进行离职或者减员操作，系统将不会扣款。</p> 
      <p class="colorRed">3、本服务可开具增值税普通发票，若需开具请与客服进行联系。</p>
    </div>

    <Button type="error" class="marginT_20" @click="toSubmitOrder">立即购买</Button>

    <ChoosePayMember v-if="ifShowModal" :type="type" v-on:changeVisible="changeVisible"></ChoosePayMember>
    

    

  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import ChoosePayMember from "./ChoosePayMember.vue"
import {getOneYearMonth,removeByValue} from "../../../../util/utils"
export default {
  data() {
  return {
    ifShowModal:false,
    ifLoading: false,
    type:0,  //0社保 1公积金
    NAME:'',
    INSURED_AREA:'',
    RESIDENCE:'',
    ifSecurityChoosed:true,
    ifFundsChoosed:false,
    ifJoined:'新参保',
    OldEnterprise:'',       //原公司名称
    FundsAccount:'',  //公积金代缴基数
    total_securityI:'',     //社保个人总计
    total_securityU:'',     //社保公司总计
    FundsBasic:'',
    FundsU:'',
    FundsI:'',
    buyMonthList:[],
    service_fee:0,
    material_fee:0,
    securityID:'',
    columnsHead: [
        {
            title: '套餐名称',
            key: 'kind'
        },
        {
            title: '单位缴纳费用',
            key: 'priceU'
        },
        {
            title: '个人缴纳费用',
            key: 'priceI'
        },
        {
            title: '购买人数',
            key: 'amount'
        }
    ],
    dataOrder: [
        {
            kind: '上海本地城镇（五险）',
            priceU: '¥1330.9',
            priceI: '¥1330.9',
            amount:1
        },
        {
            kind: '上海外地城镇（五险）',
            priceU: '¥1330.9',
            priceI: '¥1330.9',
            amount:1
        },
        {
            kind: '上海本地地农村（五险）',
            priceU: '¥1330.9',
            priceI: '¥1330.9',
            amount:1
        },
        {
            kind: '上海外地农村（五险）',
            priceU: '¥1330.9',
            priceI: '¥1330.9',
            amount:1
        },
        {
            kind: '费用明细',
            priceU: '¥1330.9',
            priceI: '¥409.9',
            amount: '总计：¥1740.8',
        }


    ]
    
    
  }
  },
  created() {
    // axios.get(R_PRE_URL+'/searchMemberDetail.do?member_id='+this.$store.state.userInfo.member_id
    // ).then((res)=> { 
    //   let MemberDetail = res.data.memberDetail
    //   if(!MemberDetail){
    //     this.$Message.error('请先填写参保资料!')
    //     console.log(this)
    //     return false
    //   }else{
    //   let CityCode = MemberDetail.city
    //   this.NAME = MemberDetail.real_name || ''
    //   this.INSURED_AREA = MemberDetail.city_name|| ''
    //   switch(MemberDetail.type){
    //     case '0':
    //     this.RESIDENCE = '本地城镇（五险）'
    //     break;
    //     case '1':
    //     this.RESIDENCE = '外地城镇（五险）'
    //     break;
    //     case '2':
    //     this.RESIDENCE = '外地城市（五险）'
    //     break;
    //     case '3':
    //     this.RESIDENCE = '外地农村（五险）'
    //     break;
    //     default:
    //     this.RESIDENCE = ''
    //   }
    //   axios.get(R_PRE_URL+'/searchInsurance.do?city='+CityCode
    //   ).then((RES)=> {
    //     let InsuranceDetail = RES.data.insuranceDetail
    //     let BASIC = InsuranceDetail.base
    //     this.FundsBasic = InsuranceDetail.providen_base
    //     this.FundsU = InsuranceDetail.providentunit
    //     this.FundsI = InsuranceDetail.providentinductrial
    //     this.securityID = InsuranceDetail.id
    //     // this.FundsU = Number(InsuranceDetail.providentunit*100).toFixed(2)
    //     // this.FundsI = Number(InsuranceDetail.providentinductrial*100).toFixed(2)
    //     this.total_securityI = InsuranceDetail.person_total,
    //     this.total_securityU= InsuranceDetail.company_total,
    //     this.dataOrder = [
    //                   {
    //                       kind: '养老',
    //                       basic: BASIC,
    //                       proportionI: InsuranceDetail.oldinductrial,
    //                       priceI: BASIC*InsuranceDetail.oldinductrial,
    //                       proportionU: InsuranceDetail.oldunit,
    //                       priceU: BASIC*InsuranceDetail.oldunit,
    //                   },
    //                   {
    //                       kind: '失业',
    //                       basic: BASIC,
    //                       proportionI: InsuranceDetail.workinductrial,
    //                       priceI: BASIC*InsuranceDetail.workinductrial,
    //                       proportionU: InsuranceDetail.workunit,
    //                       priceU: BASIC*InsuranceDetail.workunit,
    //                   },
    //                   {
    //                       kind: '工伤',
    //                       basic: BASIC,
    //                       proportionI: InsuranceDetail.injuryinductrial,
    //                       priceI: BASIC*InsuranceDetail.injuryinductrial,
    //                       proportionU: InsuranceDetail.injuryunit,
    //                       priceU: BASIC*InsuranceDetail.injuryunit,
    //                   },
    //                   {
    //                       kind: '生育',
    //                       basic: 3902,
    //                       proportionI: InsuranceDetail.procreationinductrial,
    //                       priceI: BASIC*InsuranceDetail.procreationinductrial,
    //                       proportionU: InsuranceDetail.procreationunit,
    //                       priceU: BASIC*InsuranceDetail.procreationunit,
    //                   },
    //                   {
    //                       kind: '基本医疗',
    //                       basic: BASIC,
    //                       proportionI: InsuranceDetail.medicalinductrial,
    //                       priceI: BASIC*InsuranceDetail.medicalinductrial,
    //                       proportionU: InsuranceDetail.medicalunit,
    //                       priceU: BASIC*InsuranceDetail.medicalunit,
    //                   },
    //                   {
    //                       kind: '费用合计',
    //                       basic: '-',
    //                       proportionI: '-',
    //                       priceI: InsuranceDetail.person_total,
    //                       proportionU: '-',
    //                       priceU: InsuranceDetail.company_total,
    //                   }
                      
    //               ] 
                  
    //               this.ifLoading = false

    //   }).catch((error)=> {
    //     console.log(error)
    //   })

    //   }

    // }).catch((error)=> {
    //   console.log(error)
    // })
    
   },
  mounted: function(){
    
  
  },
  computed: {
    MonthList(){
        return getOneYearMonth(12,15)
    },
    
  },
  watch:{
  },
  components: {
    ChoosePayMember
  },
  methods: {
    //选择月份获取服务费用、其他费用
    changeBuyMonth(){
      axios.get(R_PRE_URL+'/searchSbyFee.do?month_count='+this.buyMonthList.length
      ).then((res)=> { 
        let FeeInfo = res.data.feeInfo
        this.service_fee = FeeInfo.service_fee
        this.material_fee =  FeeInfo.material_fee
      }).catch((error)=> {
        console.log(error)
      })
    },
    //提交订单
    toSubmitOrder(){
      if(!this.ifFundsChoosed && !this.ifSecurityChoosed){
        this.$Message.error('请选择代缴种类！')
        return
      }
      let Amount =0
      let monthListStr=''
      this.buyMonthList.map(function(item,idx){
        monthListStr = monthListStr + item.replace("-","") +'-'
      })
      let Pay_type = this.ifFundsChoosed && this.ifSecurityChoosed ?'0':this.ifFundsChoosed?'2':'1'
      switch(Pay_type){
        case '0':
        Amount = ((this.total_securityI+this.total_securityU+this.FundsBasic*(this.FundsI+this.FundsU)+this.service_fee)*this.buyMonthList.length+this.material_fee).toFixed(2)
        break;
        case '1':
        Amount = ((this.total_securityI+this.total_securityU+this.service_fee)*this.buyMonthList.length+this.material_fee).toFixed(2)
        break;
        case '2':
        Amount = ((this.service_fee)*this.buyMonthList.length+this.material_fee).toFixed(2)
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
          break;
          case '0':
          this.$Message.error(res.data.message+':'+res.data.detail)
          break;
        }
        console.log(res)
      }).catch((error)=> {
        console.log(error)
      })
      

    },
    //选择社保成员
    chooseMemberS(TYPE){
      this.ifShowModal = true 
      this.type = TYPE
    },
    chooseMemberG(TYPE){
      this.ifShowModal = true
      this.type = TYPE
    },
    //监听子组件返回
    changeVisible(Info){
      this.ifShowModal = Info
    }

   
  },
};
</script>
<style lang="scss" scoped>
#TopayE{
  .securityInfo{
    font-size: 14px;
    line-height: 60px;
  }
  .fixedWidth{
    width: 100px;
    display: inline-block;
  }
  form{
    margin-top: 20px;
  }
  .sumBlock{
    h3{
      font-weight:normal;
    }
  }
  .MonthActive{
    background-color: #57a3f3;
    color: #fff;
  }
  .monthList ,.tipBlock, .monthBlock{
    margin-top: 20px;
  }

  .tipBlock{
    p{
      font-size: 12px;
    }
  }

}
</style>