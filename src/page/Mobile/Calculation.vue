<template>
  <div class="Calculation">
  	<BackBar></BackBar>
    <div class="MainContent">
      <Row justify="center" class="code-row-bg TextCenter">
        <Col span="8"><p>社保费(元)</p><p>{{sumS}}</p></Col>
        <Col span="8"><p>公积金(元)</p><p>{{sumG}}</p></Col>
        <Col span="8"><p>合计(元)</p><p>{{sum}}</p></Col>
      </Row>
      <BlankBar></BlankBar>
      <div class="List">
        <Row :gutter="16" class="ListItem">
          <div>
            <Col span="6">参保城市</Col>
            <Col span="18" class="TextRight">
              <Select v-model="City" size="small" style="width:100px" @on-change="AccountAgain">
                  <Option v-for="item in cityList" :value="item.city_code" :key="item.id">{{ item.city_name }}</Option>
              </Select>
            </Col>
            <!-- <Col span="4" class="TextRight"><Icon type="chevron-right"></Icon></Col> -->
          </div>
        </Row>
        <Row :gutter="16" class="ListItem">
          <div>
            <Col span="6">户口性质</Col>
            <Col span="18" class="TextRight">
              <Select v-model="RESIDENCE" style="width:150px" size="small"  @on-change="AccountAgain">
                  <Option value="0">本地城镇（五险）</Option>
                  <Option value="1">外地农村（五险）</Option>
                  <Option value="2">外地城镇（五险）</Option>
                  <Option value="3">外地农村（五险）</Option>
               </Select>
            </Col>
            <!-- <Col span="4" class="TextRight"><Icon type="chevron-right"></Icon></Col> -->
          </div>
        </Row>
        <Row :gutter="16" class="ListItem">
          <div>
            <Col span="6"><p>社保基数</p></Col>
            <Col span="18" class="TextRight">{{BaseS}}</Col>
          </div>
        </Row>
        <Row :gutter="16" class="ListItem">
          <div>
            <Col span="2"><Checkbox v-model="ifPublic"></Checkbox></Col>
            <Col span="8"><p>公积金基数</p></Col>
            <Col span="14" class="TextRight">{{providen_base}}</Col>
          </div>
        </Row>
        <Row :gutter="16" class="ListItem" v-if="ifPublic">
          <div>
            <Col span="6"><p>单位比例</p></Col>
            <Col span="18" class="TextRight">{{providentunit}}</Col>
          </div>
        </Row>
        <Row :gutter="16" class="ListItem" v-if="ifPublic">
          <div>
            <Col span="6"><p>个人比例</p></Col>
            <Col span="18" class="TextRight">{{providentinductrial}}</Col>
          </div>
        </Row>
        <Row :gutter="16" class="marginT_20">
          <div>
            <Col span="12"><Button type="error" long @click="Calculate">计算</Button></Col>
            <Col span="12"><Button type="error" long @click="ToPay">缴社保</Button></Col></Col>
          </div>
        </Row>
      </div>
    </div>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../components/Mobile/BackBar'
import BlankBar from '../../components/Mobile/BlankBar'
  export default{
    data: function () {
      return {
        ifPublic:false,
        City:'',
        RESIDENCE:'',
        BaseS:0,  //社保基数
        providen_base:0, // 公积金基数
        providentunit:0, //单位比例
        providentinductrial:0, //个人比例
        sumS:0, //社保费
        sumG:0, //公积金费
        sum:0,  //合计
        cityList:[],
      }
    },
    mounted: function () {
      
    },
    created() {
      axios.get(R_PRE_URL+'/searchCityList.do'
      ).then((res)=> { 
        this.cityList = res.data.arr
        console.log(this.cityList)
      }).catch((error)=> {
        console.log(error)
      })
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      BackBar,
      BlankBar
      

    },
    methods: {
      // 重新计算社保
      AccountAgain(){
        this.sumS = 0
        this.sumG = 0
        this.sum = 0
        axios.get(R_PRE_URL+'/searchInsurance.do?city='+this.City
        ).then((res)=> { 
          let InsuranceDetail = res.data.insuranceDetail
          this.BaseS = InsuranceDetail.base
          this.providen_base = InsuranceDetail.providen_base || 2186
          this.providentunit = InsuranceDetail.providentunit
          this.providentinductrial = InsuranceDetail.providentinductrial
          this.person_total = InsuranceDetail.person_total
          this.company_total = InsuranceDetail.company_total
        }).catch((error)=> {
          console.log(error)
        })
      },
      Calculate(){
        if(!this.RESIDENCE || !this.City){
          this.$Message.error('请先选择参保城市或户口性质!')
          return false
        }
        this.sumS = 500 + this.company_total  //this.person_total + this.company_total
        this.sumG = (this.providen_base * (this.providentunit + this.providentinductrial)).toFixed(2)
        if(this.ifPublic){
          this.sum = (Number(this.sumS) + Number(this.sumG)).toFixed(2)
        }else{
          this.sumG = 0
          this.sum = Number(this.sumS).toFixed(2)
        }
        
      },
      ToPay(){
        if(this.$store.state.userInfo.register_type==0){
            this.$router.push({name:'参保信息'})
          }else{
            this.$Message.warning('企业用户请登录PC端进行缴纳!')
          }
        
      }
    }
  }
</script>
<style lang="scss">
.Calculation{
  margin-bottom: 130px;
  .MainContent{
    width: 100%;
    margin-top: 52px;
    .List{
      width: 95%;
      margin: 0 auto;
    .ListItem{
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
    }
  }
}
</style>