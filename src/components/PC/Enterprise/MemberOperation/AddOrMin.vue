<template>
<Modal v-model="ifAddOrMin" :mask-closable="false">
        <p slot="header" style="text-align:left">
            <span>社保[公积金]增减</span>
        </p>
        <div style="text-align:left">
            <p>增减员名单：</p>
            <p><span class="marginR_10" v-for="(selection,selectionIdx) in selectArray">{{selection.name}}</span></p>
            <Form ref="formAddOrMin" :model="formAddOrMin" :rules="ruleValidate_AddOrMin">
              <FormItem label="操作类型：" prop="AddOrMin">
                  <RadioGroup v-model="formAddOrMin.AddOrMin">
                      <Radio label="增员">增员</Radio>
                      <Radio label="减员">减员</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="相关业务：" prop="business">
                  <CheckboxGroup v-model="formAddOrMin.business">
                      <Checkbox label="社保"></Checkbox>
                      <Checkbox label="公积金"></Checkbox>
                  </CheckboxGroup>
              </FormItem>
              <!-- <FormItem label="起始月份：" prop="startMonth">
                  <DatePicker v-model="formAddOrMin.startMonth" type="month" placeholder="" style="width: 200px"></DatePicker>
              </FormItem> -->
            </Form>
            
        </div>
        <div slot="footer">
            <Button type="error" size="large"  :loading="modal_loading" @click="submitAddOrMin">提交更改</Button>
        </div>
    </Modal>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import * as Moment from 'moment'
import qs from 'qs'

export default {
  props:['selectArray'],
  data() {
  return {
    modal_loading:false,
    formAddOrMin: {
        AddOrMin:'增员',
        business:[],
        startMonth:''

    },
    ruleValidate_AddOrMin: {
        AddOrMin: [
            { required: true, message: '请选择种类', trigger: 'blur' }
        ],
        business: [
            { required: true, type: 'array', min: 1, message: '至少选择一项业务', trigger: 'change' },
            { type: 'array', max: 2, message: '至少选择一项业务', trigger: 'change' }
        ],
        startMonth:[
            { required: true, message: '请选择起始月份', trigger: 'blur' }
        ]
      },
  }
  },
  created(){
  },
  mounted: function(){
    
  
  },
  computed: {
    ifAddOrMin: {
        get: function () {
          return this.$store.state.ifAddOrMin
        },
        set: function (newValue) {
          this.$store.state.ifAddOrMin = false
        }
    },
    
  },
  watch:{
  },
  methods: {
    //提交增减员名单
    submitAddOrMin(){
      let CompanyEmployeeList = []
      this.selectArray.map((item,idx)=>{
        CompanyEmployeeList.push({'companyEmployeeid':item.id})
      })
      var DATA = {
        op:this.formAddOrMin.AddOrMin=='增员'?'ad':'de',
        service:this.formAddOrMin.business.length==2?'2':(this.formAddOrMin.business[0]=='社保'?'0':'1'),
        CompanyEmployeeList:CompanyEmployeeList
      }
      axios.post(R_PRE_URL+'/updateCompanyEmployeeSbGjjStatus.do',DATA
      ).then((res)=> {
        if(res.data.result=='2'){
          this.$Message.success('增减员操作成功!')
        }else{
          this.$Message.error('增减员操作失败!')
        }
       }).catch((error)=> {
        console.log(error)
      })
      
      // selectArray_  formAddOrMin
    },
   
  },
};
</script>
<style lang="scss" scoped>
</style>