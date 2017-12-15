<template>
  <div class="CostRecord">
  	<BackBar></BackBar>
    <div class="MainContent">
      <Row type="flex" justify="start" class="code-row-bg">
        <Col span="12">
            <Form :label-width="80">
              <FormItem label="缴纳年份">
                  <DatePicker type="year" placeholder="缴纳年份" v-model="Year" @on-change="YearChange"></DatePicker>
              </FormItem>
            </Form>
           <!--  <DatePicker type="year" placeholder="缴纳年份" v-model="Year" @on-change="YearChange"></DatePicker> -->
        </Col>
        <!-- <Col span="4" offset="1">
            <Button type="primary" shape="circle" icon="ios-search"></Button>
        </Col> -->
    </Row>
    <Row class="TextCenter lightBlue columnHead">
        <Col span="8"><b>缴纳月份</b></Col>
        <Col span="8"><b>社保</b></Col>
        <Col span="8"><b>公积金</b></Col>
    </Row>
    <Row v-for="(Item,Idx) in dataOrder" class="marginT_20 TextCenter item">
        <Col span="8">{{Item.pay_month}}</Col>
        <Col span="8">{{Item.sb_status}}</Col>
        <Col span="8">{{Item.gjj_status}}</Col>
    </Row>
    </div>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../../components/Mobile/BackBar'
  export default{
    data: function () {
      return {
        CostRecordTab_cur:0,
        Year:new Date(),
        dataOrder:[],
      }
    },
    mounted: function () {
      
    },
    created() {
      this.getData(this.Year)
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      BackBar
    },
    methods: {
          YearChange(YEAR){
             this.Year = YEAR
             this.searchRecord()
          },
          searchRecord(){
            if(!this.Year){
              this.$Message.error('请选择缴纳年份!')
              return false
            }
             this.getData(this.Year)
          },
          //获取记录
          getData(YEAR){
            this.ifLoading = true
            const OnlyYear = (typeof YEAR == 'string')?YEAR:YEAR.getFullYear()
            const DATA = {
                        "member_id":this.$store.state.userInfo.member_id,
                        entryList:[
                          {pay_month:OnlyYear+"01"},
                          {pay_month:OnlyYear+"02"},
                          {pay_month:OnlyYear+"03"},
                          {pay_month:OnlyYear+"04"},
                          {pay_month:OnlyYear+"05"},
                          {pay_month:OnlyYear+"06"},
                          {pay_month:OnlyYear+"07"},
                          {pay_month:OnlyYear+"08"},
                          {pay_month:OnlyYear+"09"},
                          {pay_month:OnlyYear+"10"},
                          {pay_month:OnlyYear+"11"},
                          {pay_month:OnlyYear+"12"},
                         ]
                      }
          axios.post(R_PRE_URL+'/checkOrderMonth.do?',DATA
          ).then((res)=> {
            let temp = res.data.orderMonthList
            temp.map((Item,Idx)=>{
              switch(Item.sb_status){
                  case 0:
                  Item.sb_status = '待支付'
                  break;
                  case 1:
                  Item.sb_status = '已支付'
                  break;
                  case 9:
                  Item.sb_status = '未投保'
                  break;
                  default:
                  Item.sb_status = '其他'
                }
              switch(Item.gjj_status){
                  case 0:
                  Item.gjj_status = '待支付'
                  break;
                  case 1:
                  Item.gjj_status = '已支付'
                  break;
                  case 9:
                  Item.gjj_status = '未投保'
                  break;
                  default:
                  Item.gjj_status = '其他'
                }

            })
            this.dataOrder = temp
            this.ifLoading = false
          }).catch((error)=> {
            console.log(error)
          })

          }
      
      
    }
  }
</script>
<style lang="scss">
.CostRecord{
  margin-bottom: 130px;
  .MainContent{
    width: 95%;
    margin: 0 auto;
    margin-top: 52px;
    .columnHead{
      height: 35px;
      line-height: 35px;
    }
    .item{
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>