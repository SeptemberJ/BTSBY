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
            </Form>
        </Row>
        </div>
    </Modal>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import * as Moment from 'moment'

export default {
  props:['memberInfo'],
  data() {
  return {
    TypeList:[{'typecode':0,'typename':'类型一'},{'typecode':1,'typename':'类型二'}],
    formDisMission:{
      disMission_type:0,
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
          this.$Message.success('离职操作成功!')
          let DATA = this.formDisMission
          console.log(DATA)
          // axios.post(R_PRE_URL+'/insertCompanyEmployee2.do',DATA
          // ).then((res)=> {
          //  }).catch((error)=> {
          //   console.log(error)
          // })

          //this.$emit('refreshData')  //返回刷新
    },
    DismissionCancel() {
    }
   
  },
};
</script>
<style lang="scss" scoped>
</style>