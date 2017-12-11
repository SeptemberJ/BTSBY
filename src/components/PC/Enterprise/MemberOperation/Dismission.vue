<template>
<!-- 增减员工 -->
      <Modal v-model="ifDisMission" :mask-closable="false">
        <p slot="header" style="text-align:left">
            <span>离职管理</span>
        </p>
        <div style="text-align:left">
        <Row>
            <Col span="12"><span class="">姓名：</span><span>张三</span></Col>
            <Col span="12"><span class="">身份证号：</span><span>320684199210163664</span></Col>
        </Row>
        <Row>
            <Col span="12"><span class="">单位：</span><span>上海旺策尔信息技术有限公司</span></Col>
            <Col span="12"><span class="">职位：</span><span>经理</span></Col>
        </Row>
        <Row>
            <Col span="24"><span class="">入职时间：</span></Col>
        </Row>
        <Row>
            <Form ref="formDisMission" :model="formDisMission" :rules="ruleValidate_DisMission">
              <Col span="12">
                <FormItem label="离职类型：" prop="disMission_type">
                   <Select v-model="formDisMission.disMission_type" size="small" style="width: 100px;">
                    <Option value="类型一">类型一</Option>
                    <Option value="类型二">类型二</Option>
                  </Select>
                 <!--  <Select v-model="formDisMission.disMission_type" size="small">
                    <Option v-for="item in educationList" :value="item.typecode" :key="item.value">{{ item.typename }}</Option>
                  </Select> -->
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="离职时间：" prop="disMission_time">
                  <DatePicker v-model="formDisMission.disMission_time" type="date" placeholder="" style="width: 100px;"></DatePicker>
                </FormItem>
              </Col>
              <Row>
            <Col span="24">
              <Input v-model="formDisMission.disMission_reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </Col>
        </Row>
            </Form>
        </Row>
        
           <!--  <Form ref="formAddOrMin" :model="formAddOrMin" :rules="ruleValidate_AddOrMin">
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
              <FormItem label="起始月份：" prop="startMonth">
                  <DatePicker v-model="formAddOrMin.startMonth" type="month" placeholder="" style="width: 200px"></DatePicker>
              </FormItem>
            </Form> -->
            
        </div>
        <div slot="footer">
            <Button type="error" size="large"   @click="">提交更改</Button>
        </div>
    </Modal>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  data() {
  return {
    formDisMission:{
      disMission_type:'',
      disMission_time:'',
      disMission_reason:''
    },
    ruleValidate_DisMission:{
      disMission_type: [
            { required: true, message: '离职类型为必填项!', trigger: 'blur' }
      ],
      disMission_time: [
            { type: "date", required: true, message: '离职时间为必填项!', trigger: 'blur' }
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
   
  },
};
</script>
<style lang="scss" scoped>
</style>