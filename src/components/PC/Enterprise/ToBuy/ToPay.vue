<template>
  <div id="TopayE">
    <!-- top -->
    <h2>参保资料</h2>
    <p class="securityInfo">参保城市:{{City}}  <a href="http://sbyun.com/SicOrderMain.mc?method=exportAreaMeal&areaId=10&areaName=%E4%B8%8A%E6%B5%B7" class="marginL_20"><Icon type="ios-download"></Icon>下载上海社保缴费明细</a></p>

    <Table :columns="columnsHead" :loading="ifLoading" :data="dataOrder"></Table>
    
    <p class="marginT_20"><span class="marginL_20 fixedWidth">社保代缴</span><span class="marginL_20">社保参保人数：{{MemberAmountS}}人 </span><a @click="chooseMemberS(0)"><Icon type="compose" size="18"></Icon>社保参保名单</a></p>
    <p class="marginT_20"><span class="marginL_20 fixedWidth">公积金代缴</span><span class="marginL_20">公积金参保人数：{{MemberAmountG}}人 </span><a @click="chooseMemberG(1)"><Icon type="compose" size="18"></Icon></Icon>公积金参保名单</a></p>

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
        <p>代收社保费用小计：<span>{{(total_securityI + total_securityU)*MemberAmountS*buyMonthList.length}} 元（ {{total_securityI + total_securityU}}元/月 × {{MemberAmountS}}人次 × {{buyMonthList.length}}月</span></p>
        <p>代收公积金费用小计：<span>{{FundsBasic*MemberAmountG*buyMonthList.length}} 元（ 306元/月 × {{MemberAmountG}}人次 × {{buyMonthList.length}}月 ）</span></p>
        <p>其他费用小计：<span>{{material_fee*MemberAmountS}}元（材料费:{{material_fee}}元/人 x {{MemberAmountS}}人）</span></p>
        <p>代理缴纳费用小计：<span> {{service_fee*(MemberAmountG+MemberAmountS)*buyMonthList.length}}元（（双买：{{service_fee*IntersectList.length*buyMonthList.length}} 元（{{service_fee}}元/月 × {{buyMonthList.length}} 月 × {{IntersectList.length}} 人次） + 社保单买：{{service_fee*(MemberAmountS - IntersectList.length)}} 元（{{service_fee}}元/月 × {{buyMonthList.length}} 月 × {{MemberAmountS - IntersectList.length}} 人次）+ 公积金单买：{{service_fee*(MemberAmountG - IntersectList.length)*buyMonthList.length}} 元（{{service_fee}}元/月 × {{buyMonthList.length}} 月 × {{MemberAmountG - IntersectList.length}} 人次））</span></p>
        <!-- <p>代理缴纳费用小计：<span> {{service_fee*(MemberAmountG+MemberAmountS)*buyMonthList.length}}元（（双买：{{service_fee}}元/月×{{buyMonthList.length}}月×{{IntersectList.length}}人次
        {{service_fee}}元/月×{{buyMonthList.length}}月×{{MemberAmountS + MemberAmountG}}人次）</span></p> -->
        <!-- <p>代理缴纳费用小计：<span> 39.8元（双买：39.8元（39.8元/月×1月×{{MemberAmountS + MemberAmountG}}人次）</span></p> -->
        <p>合计：
          <span class="colorRed" style="font-size: 18px; font-weight: bold;">
            ¥{{((total_securityI + total_securityU)*MemberAmountS*buyMonthList.length)+(FundsBasic*MemberAmountG*buyMonthList.length)+(material_fee*MemberAmountS)+(service_fee*(MemberAmountG+MemberAmountS)*buyMonthList.length)}}
          </span>
        </p>
         
      </div>
      

      <p class="colorRed marginT_20">注：订单代收费用为预收取费用，若在代缴期间遇到社保政策变化导致的社保基数、比例调整，系统会自动生成补收或退款订单。</p>
      <p class="colorRed">订单信息会以邮件的方式通知。在社保代缴期间，请注意查收您的邮箱。详情请咨询客服：400-0135-200</p>
      <p class="colorRed">2、如您为员工一次性购买多月，员工在已购买月份离职或不续保，请在花名册进行离职或者减员操作，系统将不会扣款。</p> 
      <p class="colorRed">3、本服务可开具增值税普通发票，若需开具请与客服进行联系。</p>
    </div>

    <Button type="error" class="marginT_20" @click="toSubmitOrder">立即购买</Button>

    <ChoosePayMember v-if="ifShowModal" :type="type"  :FundsBasic='FundsBasic' :FundsU='FundsU' :FundsI='FundsI' :choosedMemberList='type==0?MemberListS:MemberListG' v-on:changeVisible="changeVisible" v-on:MemberAmountSChange="MemberAmountSChange" v-on:MemberAmountGChange="MemberAmountGChange"></ChoosePayMember>
    

    

  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import ChoosePayMember from "./ChoosePayMember.vue"
import {getOneYearMonth,Intersect} from "../../../../util/utils"
export default {
  data() {
  return {
    ifShowModal:false,
    ifLoading: false,
    City:'', //公司参保城市
    MemberAmountS:0,//社保参保人数
    MemberListS:[], //社保参保人员信息
    MemberListSTemp:[],
    MemberAmountG:0,//公积金参保人数
    MemberListG:[], //公积金参保人员信息
    MemberListGTemp:[],
    IntersectList:[],//社保公积金双交的人员信息
    AmountArray:[0,0,0,0], //社保参保人数分类数组
    type:0,  //0社保 1公积金
    NAME:'',
    INSURED_AREA:'',
    RESIDENCE:'',
    ifSecurityChoosed:true,
    ifFundsChoosed:false,
    ifJoined:'新参保',
    OldEnterprise:'',       //原公司名称
    FundsAccount:'',  //公积金代缴基数
    total_securityI:'',     //每人社保个人总计
    total_securityU:'',     //每人社保公司总计
    FundsBasic:306,
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
    dataOrder: []
    
    
  }
  },
  created() {
    axios.get(R_PRE_URL+'/searchCompanyDetail.do?member_id='+this.$store.state.userInfo.member_id
    ).then((res)=> {
      this.City = res.data.companyDetail.fcity 
    }).catch((error)=> {
      console.log(error)
    })
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
      axios.get(R_PRE_URL+'/searchInsurance.do?city=1'
      ).then((RES)=> {
        let InsuranceDetail = RES.data.insuranceDetail
        this.FundsBasic = Number(InsuranceDetail.providen_base).toFixed(2)
        this.FundsU = InsuranceDetail.providentunit
        this.FundsI = InsuranceDetail.providentinductrial
        this.total_securityU = InsuranceDetail.company_total
        this.total_securityI = InsuranceDetail.person_total
        this.securityID = InsuranceDetail.id

        this.dataOrder = [

        {
            kind: '本地城镇（五险）',
            priceU: '¥'+InsuranceDetail.person_total,
            priceI: '¥'+InsuranceDetail.company_total,
            amount:0
        },
        {
            kind: '本地农村（五险）',
            priceU: '¥'+InsuranceDetail.person_total,
            priceI: '¥'+InsuranceDetail.company_total,
            amount:0
        },
        {
            kind: '外地城镇（五险）',
            priceU: '¥'+InsuranceDetail.person_total,
            priceI: '¥'+InsuranceDetail.company_total,
            amount:0
        },
        {
            kind: '外地农村（五险）',
            priceU: '¥'+InsuranceDetail.person_total,
            priceI: '¥'+InsuranceDetail.company_total,
            amount:0
        },
        {
            kind: '费用明细',
            priceU: '¥'+InsuranceDetail.company_total*this.MemberAmountS,
            priceI: '¥'+InsuranceDetail.person_total*this.MemberAmountS,
            amount: '总计：¥'+(InsuranceDetail.company_total + InsuranceDetail.person_total)*this.MemberAmountS,
             cellClassName: {
                            amount: 'demo-table-info-cell-amount',
                            priceU: 'demo-table-info-cell-priceU',
                            priceI: 'demo-table-info-cell-priceI',
                        }
        }
        ]
        
      }).catch((error)=> {
        console.log(error)
      })
    
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
      let monthListStr=''
      if(this.MemberAmountS == 0 && this.MemberAmountG == 0){
        this.$Message.error('请选择参保员工！')
        return
      }
      if(this.buyMonthList.length<=0){
        this.$Message.error('请选择参保月份！')
        return
      }
      this.buyMonthList.map(function(item,idx){
        monthListStr = monthListStr + item.replace("-","") +'-'
      })
      let Pay_type = this.MemberAmountS!=0 && this.MemberAmountG!=0 ?'0':this.MemberAmountG!=0?'2':'1'

      console.log('社保--')
      console.log(this.MemberListS)
      console.log('公积金--')
      console.log(this.MemberListG)
      
      
      
      // let monthObjList =[]
      // this.buyMonthList.map(function(item,idx){
      //   let obj = {'pay_month':item.replace("-","")}
      //   monthObjList.push(obj)
      // })

      // let orderInfo = {
      //   'order_name':'代缴'+ this.INSURED_AREA + monthListStr + (Pay_type==0?'社保公积金':Pay_type==1?'社保':'公积金'),
      //'amount':this.service_fee*(this.MemberAmountG+this.MemberAmountS)*this.buyMonthList.length,
      //   'pay_time':new Date(),
      //   'service_charge':this.service_fee,
      //   'member_id':this.$store.state.userInfo.member_id,
      //   'insurance_detail_id':this.securityID,
      //   'city':this.INSURED_AREA,
      //   'order_month':'',//monthListStr
      //   'pay_type':Pay_type,
      //   'sbEntryList':monthObjList,
      //   'gjjEntryList':monthObjList
      // }
      // console.log(orderInfo)

      // axios.post(R_PRE_URL+'/insertOrder.do',orderInfo
      // ).then((res)=> {
      //   switch(res.data.result){
      //     case '2':
      //     this.$Message.success('下单成功!')
      //     break;
      //     case '0':
      //     this.$Message.error(res.data.message+':'+res.data.detail)
      //     break;
      //   }
      //   console.log(res)
      // }).catch((error)=> {
      //   console.log(error)
      // })
      

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
    },
    MemberAmountSChange(selectionList){
      this.AmountArray = [0,0,0,0]
      this.MemberListS = selectionList
      let MemberListSTemp = []
      let accountTemp =0
      selectionList.map((itemArray,idxArray)=>{
        accountTemp+=itemArray.length
        itemArray.map((item,idx)=>{
          MemberListSTemp.push(item.id)
          switch(item.registered_residence){
            case '0':
            this.AmountArray[0]+=1
            break
            case '1':
            this.AmountArray[1]+=1
            break
            case '2':
            this.AmountArray[2]+=1
            break
            case '3':
            this.AmountArray[3]+=1
            break
          }
        })
      })

      this.MemberAmountS = accountTemp
      this.dataOrder[0].amount = this.AmountArray[0]
      this.dataOrder[1].amount = this.AmountArray[1]
      this.dataOrder[2].amount = this.AmountArray[2]
      this.dataOrder[3].amount = this.AmountArray[3]
      this.dataOrder[4].priceU = this.total_securityU*this.MemberAmountS
      this.dataOrder[4].priceI = this.total_securityI*this.MemberAmountS
      this.dataOrder[4].amount = (this.total_securityU + this.total_securityI)*this.MemberAmountS
      this.MemberListSTemp = MemberListSTemp
      this.IntersectList = Intersect(this.MemberListSTemp,this.MemberListGTemp)
    },
    MemberAmountGChange(selectionList){
      this.MemberListG = selectionList
      let MemberListGTemp = []
      let accountTemp =0
      selectionList.map((itemArray,idxArray)=>{
        accountTemp+=itemArray.length
        itemArray.map((item,idx)=>{
          MemberListGTemp.push(item.id)
        })
      })
      this.MemberAmountG = accountTemp
      this.MemberListGTemp = MemberListGTemp
      this.IntersectList = Intersect(this.MemberListSTemp,this.MemberListGTemp)
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