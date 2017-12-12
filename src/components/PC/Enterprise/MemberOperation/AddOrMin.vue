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
              <FormItem label="起始月份：" prop="startMonth">
                  <DatePicker v-model="formAddOrMin.startMonth" type="month" placeholder="" style="width: 200px"></DatePicker>
              </FormItem>
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
      // selectArray_  formAddOrMin
    },
   
  },
};
</script>
<style lang="scss" scoped>
</style>