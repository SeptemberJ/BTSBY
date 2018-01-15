<template>
  <div>
    <div id="TopayI" v-if="ifHasInfoAlready">
      <!-- top -->
      <h2>参保资料</h2>
      <p class="securityInfo">参保人: {{NAME}}  参保城市：{{INSURED_AREA}}  户口性质：{{RESIDENCE}}<span class="cursorPointer" @click="ToModifySecurityInfo"><Icon type="compose" size="18"></Icon></span></p>
      <Table :columns="columnsHead" :loading="ifLoading" :data="dataOrder"></Table>
      <Form>
          <FormItem label="">
              <Checkbox v-model="ifSecurityChoosed">社保代缴</Checkbox>
          </FormItem>
          <FormItem label="">
              <Checkbox v-model="ifFundsChoosed">公积金代缴</Checkbox>
          </FormItem>
          <!-- <FormItem label="" v-if="ifFundsChoosed">
              <RadioGroup v-model="ifJoined">
                  <Radio label="新参保">新参保</Radio>
                  <Radio label="曾参保">曾参保</Radio>
              </RadioGroup>
              <Input v-if="ifJoined == '曾参保'" v-model="OldEnterprise" placeholder="原参保公司名称" style="width: 300px"></Input>
              <Input v-if="ifJoined == '曾参保'" v-model="FundsAccount" placeholder="公积金账号" style="width: 300px"></Input>
          </FormItem> -->
          <FormItem label="公积金代缴基数：" v-if="ifFundsChoosed" :label-width="150">
            <Row>
              <Col span="14">
                  <Input v-model="FundsBasic" disabled style="width: 80px"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="公积金个人比例：" v-if="ifFundsChoosed" :label-width="150">
            <Row>
              <Col span="14">
                  <Input v-model="FundsU" icon="" disabled style="width: 80px"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="公积金单位比例：" v-if="ifFundsChoosed" :label-width="150">
            <Row>
              <Col span="14">
                  <Input v-model="FundsI" icon="" disabled style="width: 80px"></Input>
              </Col>
            </Row>
          </FormItem>
      </Form>
      <!-- Bottom -->
      <h2>选择购买月份</h2>
      <CheckboxGroup v-model="buyMonthList" class="monthList" @on-change="changeBuyMonth">
          <Checkbox v-for="(Month,MonthIdx) in MonthList" :label="Month"></Checkbox>
      </CheckboxGroup>
      <div class="tipBlock">
        <p>提示：每个月的15号为上海的社保增员截止日期，投保类型为当月缴当月</p>
        <p style="text-indent: 36px">每个月的11号为上海的社保减员截止日期</p>
        <p>提示：每个月的15号为上海的社保增员截止日期，投保类型为当月缴当月</p>
        <p style="text-indent: 36px">每个月的11号为上海的社保减员截止日期</p>
      </div>
      <div class="sumBlock">
        <!-- 社保及公积金 -->
        <div v-if="ifFundsChoosed && ifSecurityChoosed">
          <h3>代收费用小计：<h2 class="colorRed" style="display: inline;">¥{{((total_securityI+total_securityU+FundsBasic*(FundsI+FundsU)+service_fee)*buyMonthList.length+material_fee).toFixed(2)}}</h2></h3>
          <p>(社保：{{total_securityI+total_securityU}}元/月 + 公积金: {{(FundsBasic*(FundsI+FundsU)).toFixed(2)}}元/月 )× {{buyMonthList.length}}月 + 服务费用：{{service_fee}}元/月/人 x {{buyMonthList.length}}月 + 其他费用：{{material_fee}}元</p>
        </div>
        <!-- 仅社保 -->
        <div v-if="ifSecurityChoosed &&  !ifFundsChoosed">
          <h3>代收费用小计：<h2 class="colorRed" style="display: inline;">¥{{((total_securityI+total_securityU+service_fee)*buyMonthList.length+material_fee).toFixed(2)}}</h2></h3>
          <p>社保：{{total_securityI+total_securityU}}元/月 × {{buyMonthList.length}}月 + 服务费用：{{service_fee}}元/月/人 x {{buyMonthList.length}}月 + 其他费用：{{material_fee}}元</p>
        </div>
        <!-- 仅公积金 -->
        <div v-if="!ifSecurityChoosed && ifFundsChoosed">
          <h3>代收费用小计：<h2 class="colorRed" style="display: inline;">¥{{((FundsBasic*(FundsI+FundsU)+service_fee)).toFixed(2)*buyMonthList.length+material_fee}}</h2></h3>
          <p>公积金：{{(FundsBasic*(FundsI+FundsU)).toFixed(2)}}元/月 × {{buyMonthList.length}}月 + 服务费用：{{service_fee}}元/月/人 x {{buyMonthList.length}}月 + 其他费用：{{material_fee}}元</p>
        </div>
        <div v-if="!ifFundsChoosed && !ifSecurityChoosed">
          <p>请选择要代缴的种类！</p>
        </div>

        <Alert closable  class="marginT_20">其他费用：{{material_fee}}</Alert>
        <p class="colorRed">注：订单代收费用为预收取费用，若在代缴期间遇到社保政策变化导致的社保基数、比例调整，系统会自动生成补收或退款订单。</p>
        <p class="colorRed">订单信息会以邮件的方式通知。在社保代缴期间，请注意查收您的邮箱。详情请咨询客服：400-0135-200</p>
      </div>

      <Button type="error" class="marginT_20" @click="toSubmitOrder">立即购买</Button>
    </div>

    <Alert v-else type="warning" show-icon><h3>请先填写参保资料! <a @click="ToModifySecurityInfo">去填写</a></h3></Alert>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {getOneYearMonth,DateSortASC,ifContinuity,MessageChange} from "../../../util/utils"
export default {
  data() {
  return {
    ifHasInfoAlready:false,
    ifLoading: true,
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
            title: '缴纳项目',
            key: 'kind'
        },
        {
            title: '社保基数',
            key: 'basic'
        },
        {
            title: '缴纳比例(个人)',
            key: 'proportionI'
        },
        {
            title: '缴纳金额（元）',
            key: 'priceI'
        },
        {
            title: '缴纳比例(企业)',
            key: 'proportionU'
        },
        {
            title: '缴纳金额（元）',
            key: 'priceU'
        }
    ],
    dataOrder: []
    
    
  }
  },
  created() {
    axios.get(R_PRE_URL+'/searchMemberDetail.do?member_id='+this.$store.state.userInfo.member_id
    ).then((res)=> { 
      let MemberDetail = res.data.memberDetail
      if(!MemberDetail){
        this.ifHasInfoAlready = false
        //this.$Message.error('请先填写参保资料!')
        this.$Notice.warning({
            title: '请先填写参保资料!'
        });
        return false
      }else{
      this.ifHasInfoAlready = true
      let CityCode = MemberDetail.city
      this.NAME = MemberDetail.real_name || ''
      this.INSURED_AREA = MemberDetail.city_name|| ''
      switch(MemberDetail.type){
        case '0':
        this.RESIDENCE = '本地城镇（五险）'
        break;
        case '1':
        this.RESIDENCE = '外地城镇（五险）'
        break;
        case '2':
        this.RESIDENCE = '外地城市（五险）'
        break;
        case '3':
        this.RESIDENCE = '外地农村（五险）'
        break;
        default:
        this.RESIDENCE = ''
      }
      axios.get(R_PRE_URL+'/searchInsurance.do?city='+CityCode
      ).then((RES)=> {
        let InsuranceDetail = RES.data.insuranceDetail
        let BASIC = InsuranceDetail.base
        this.FundsBasic = InsuranceDetail.providen_base  //公积金基数
        this.FundsU = InsuranceDetail.providentunit      //公积金单位比例
        this.FundsI = InsuranceDetail.providentinductrial//公积金个人比例
        this.securityID = InsuranceDetail.id
        // this.FundsU = Number(InsuranceDetail.providentunit*100).toFixed(2)
        // this.FundsI = Number(InsuranceDetail.providentinductrial*100).toFixed(2)
        this.total_securityI = InsuranceDetail.person_total,
        this.total_securityU= InsuranceDetail.company_total,
        this.dataOrder = [
                      {
                          kind: '养老',
                          basic: BASIC,
                          proportionI: InsuranceDetail.oldinductrial,
                          priceI: BASIC*InsuranceDetail.oldinductrial,
                          proportionU: InsuranceDetail.oldunit,
                          priceU: BASIC*InsuranceDetail.oldunit,
                      },
                      {
                          kind: '失业',
                          basic: BASIC,
                          proportionI: InsuranceDetail.workinductrial,
                          priceI: BASIC*InsuranceDetail.workinductrial,
                          proportionU: InsuranceDetail.workunit,
                          priceU: BASIC*InsuranceDetail.workunit,
                      },
                      {
                          kind: '工伤',
                          basic: BASIC,
                          proportionI: InsuranceDetail.injuryinductrial,
                          priceI: BASIC*InsuranceDetail.injuryinductrial,
                          proportionU: InsuranceDetail.injuryunit,
                          priceU: BASIC*InsuranceDetail.injuryunit,
                      },
                      {
                          kind: '生育',
                          basic: BASIC,
                          proportionI: InsuranceDetail.procreationinductrial,
                          priceI: BASIC*InsuranceDetail.procreationinductrial,
                          proportionU: InsuranceDetail.procreationunit,
                          priceU: BASIC*InsuranceDetail.procreationunit,
                      },
                      {
                          kind: '基本医疗',
                          basic: BASIC,
                          proportionI: InsuranceDetail.medicalinductrial,
                          priceI: BASIC*InsuranceDetail.medicalinductrial,
                          proportionU: InsuranceDetail.medicalunit,
                          priceU: BASIC*InsuranceDetail.medicalunit,
                      },
                      {
                          kind: '费用合计',
                          basic: '-',
                          proportionI: '-',
                          priceI: InsuranceDetail.person_total,
                          proportionU: '-',
                          priceU: InsuranceDetail.company_total,
                      }
                      
                  ] 
                  
                  this.ifLoading = false

      }).catch((error)=> {
        console.log(error)
      })

      }

    }).catch((error)=> {
      console.log(error)
    })
    
    // axios.get(R_PRE_URL+'/searchMemberRegister.do?member_id='+this.$store.state.userInfo.member_id
    // ).then((res)=> { 
    //   let MemberRegister = res.data.memberRegister
    //   this.formBasicInfo.NAME = MemberRegister.real_name
    //   this.formBasicInfo.TEL =  MemberRegister.mobilephone
    //   this.formBasicInfo.EAMIL =  MemberRegister.email
    // }).catch((error)=> {
    //   console.log(error)
    // })
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
  methods: {
    //修改参保资料
    ToModifySecurityInfo(){
      this.$store.state.HRMenuCur = '参保资料'
    },
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
      if(this.buyMonthList.length<=0){
        this.$Message.error('请选择代缴年月！')
        return
      }

      if(!this.ifFundsChoosed && !this.ifSecurityChoosed){
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
      let Pay_type = this.ifFundsChoosed && this.ifSecurityChoosed ?'0':this.ifFundsChoosed?'2':'1'
      switch(Pay_type){
        case '0':
        Amount = ((this.total_securityI+this.total_securityU+this.FundsBasic*(this.FundsI+this.FundsU)+this.service_fee)*this.buyMonthList.length+this.material_fee).toFixed(2)
        break;
        case '1':
        Amount = ((this.total_securityI+this.total_securityU+this.service_fee)*this.buyMonthList.length+this.material_fee).toFixed(2)
        break;
        case '2':
        Amount = ((this.FundsBasic*(this.FundsI+this.FundsU)+this.service_fee)*this.buyMonthList.length+this.material_fee).toFixed(2)
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
          this.$store.state.HRMenuCur = '我的订单'
          MessageChange()
          break;
          case '0':
          this.$Message.error(res.data.message+':'+res.data.detail)
          break;
        }
        console.log(res)
      }).catch((error)=> {
        console.log(error)
      })
      

    }

   
  },
};
</script>
<style lang="scss" scoped>
#TopayI{
  .securityInfo{
    font-size: 14px;
    line-height: 60px;
  }
  form{
    margin-top: 20px;
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