<template>
      <Modal v-model="ifDisMission" :mask-closable="false" @on-ok="Dismission"
        @on-cancel="DismissionCancel" ok-text="确认离职">
        <p slot="header" style="text-align:left">
            <span>离职管理</span>
        </p>
        <div style="text-align:left">
        <Row>
            <Col span="12"><span class="">姓名：</span><span>{{memberInfo.name}}</span></Col>
            <Col span="12"><span class="">身份证号：</span><span>{{memberInfo.id_number}}</span></Col>
        </Row>
        <Row class="marginT_10">
            <!-- <Col span="12"><span class="">单位：</span><span>上海旺策尔信息技术有限公司</span></Col> -->
            <Col span="12"><span class="">职位：</span><span>{{memberInfo.post_name}}</span></Col>
            <Col span="12"><span class="">入职时间：</span><span>{{memberInfo.entry_time}}</span></Col>
        </Row>
       <!--  <Row>
            <Col span="24"><span class="">入职时间：</span><span>{{memberInfo.entry_time}}</span></Col>
        </Row> -->
        <Row class="marginT_10">
            <Form ref="formDisMission" :model="formDisMission" :rules="ruleValidate_DisMission" :label-width="90" label-position="left">
              <Col span="12">
                <FormItem label="离职类型：" prop="disMission_type">
                  <Select v-model="formDisMission.disMission_type" style="width: 100px;">
                      <Option v-for="item in TypeList" :value="item.typecode" :key="item.typename">{{ item.typename }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="离职时间：" prop="disMission_time">
                  <DatePicker v-model="formDisMission.disMission_time" type="date" placeholder="请选择" style="width: 110px;" @on-change = "changeDisMissionTime"></DatePicker>
                </FormItem>
              </Col>
            <Col span="24">
              <FormItem label="原因：" prop="disMission_reason">
                  <Input v-model="formDisMission.disMission_reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入该员工的离职原因"></Input>
                </FormItem>
            </Col>
            <Col span="24" class="marginB_20" style="border-top: 2px solid #eee;">
            </Col>
            <Col span="24">
              <p class="colorRed">请勾选以下离职需要办理的业务：</p>
            </Col>
            <Col span="24" class="marginT_10">
              <Checkbox v-model="stopS">停缴社保 此员工的所购买的社保将在下个月(2018-02)开始停缴</Checkbox>
            </Col>
            <Col span="24" class="marginT_10">
              <Checkbox v-model="stopG">停缴公积金 此员工的所购买的公积金将在下个月(2018-02)开始停缴</Checkbox>
            </Col>
            
            </Form>
        </Row>
        </div>
    </Modal>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import * as Moment from 'moment'
import qs from 'qs'

export default {
  props:['memberInfo'],
  data() {
  return {
    stopS:false,
    stopG:false,
    TypeList:[],
    formDisMission:{
      disMission_type:'0',
      disMission_time:'',
      disMission_reason:''
    },
    ruleValidate_DisMission:{
      disMission_time: [
            { type: "date", required: true, message: '离职时间为必填项!', trigger: 'change' }
      ],
    }
  }
  },
  created(){
    axios.get(R_PRE_URL+'/searchTypeList.do?typeGroupCode=leave'
    ).then((res)=> {
      this.TypeList = res.data.typeList
     }).catch((error)=> {
      console.log(error)
    })
  },
  mounted: function(){
    
  
  },
  computed: {
    ifDisMission: {
        get: function () {
          return this.$store.state.ifDisMission
        },
        set: function (newValue) {
          this.$store.state.ifDisMission = false
        }
    },
    
  },
  watch:{
  },
  methods: {
    changeDisMissionTime(event){
      this.formDisMission.disMission_time = event
    },
    Dismission() {
          let DATA = qs.stringify({
            leave_type:this.formDisMission.disMission_type,
            leave_time:this.formDisMission.disMission_time,
            leave_reason:this.formDisMission.disMission_reason,
            service:this.stopS && this.stopG?'2':(!this.stopS && !this.stopG?'':(this.stopS?'0':'1')),
            companyEmployeeid:this.memberInfo.id
          })
          console.log(DATA)
          axios.post(R_PRE_URL+'/updateCompanyEmployeeLeaveStatus.do',DATA
          ).then((res)=> {
            if(res.data.result=='2'){
              this.$Message.success('离职操作成功!')
            }else{
              this.$Message.error('离职操作失败!')
            }
           }).catch((error)=> {
            console.log(error)
          })

          //this.$emit('refreshData')  //返回刷新
    },
    DismissionCancel() {
    }
   
  },
};
</script>
<style lang="scss" scoped>
</style>