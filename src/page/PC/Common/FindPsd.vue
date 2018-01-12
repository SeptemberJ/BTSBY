<template>
  <div id="FindPsd">
    <div class="FindPsdInnerBox">
      <Steps class="StepBar" :current="NavCur" >
          <Step title="安全验证" :content="NavCur==0?'进行中':'已完成'"></Step>
          <Step title="设置新密码" :content="NavCur==0?'待进行':NavCur==1?'进行中':'已完成'"></Step>
          <Step title="找回成功" :content="NavCur==3?'进行中':'待进行'"></Step>
      </Steps>
      <!-- stepOne -->
      <Card class="stepOne" v-if="NavCur == 0" :bordered="false" dis-hover> 
         <Form  ref="formStepOne" :model="formStepOne" :rules="ruleInlineOne" :inline="false" :label-width="120">
            <FormItem prop="TEL" label="手机号码">
              <Row>
                <Col span="14">
                    <Input v-model="formStepOne.TEL" placeholder="请输入手机号码"></Input>
                </Col>
                <Col span="4" offset="1">
                    <Button type="error" :disabled="disabled" @click="toGetCode">{{timerCount}}</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem prop="CODE" label="手机验证码">
              <Row>
                <Col span="14">
                    <Input v-model="formStepOne.CODE" placeholder="请输入手机验证码"></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem prop="TEL" label="图形验证码">
              <Row>
                <Col span="14">
                    <Input v-model="formStepOne.RIMGCODE" placeholder="请输入图形验证码"></Input>
                </Col>
                <Col span="4" offset="1">
                    <Button type="error" @click="changeIMGCODE">{{formStepOne.IMGCODE}}</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
                <Button type="primary"  @click="handleStepOne('formStepOne')">下一步</Button>
            </FormItem>
         </Form>
      </Card>
      <!-- stepTwo -->
      <Card class="stepTwo" v-if="NavCur == 1" :bordered="false" dis-hover> 
         <Form  ref="formStepTwo" :model="formStepTwo" :rules="ruleInlineTwo" :inline="false" :label-width="120">
            <FormItem prop="PSD" label="新密码">
              <Row>
                <Col span="14">
                    <Input v-model="formStepTwo.PSD" type="password" placeholder="请输入新密码"></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem prop="PSDAgain" label="确认密码">
              <Row>
                <Col span="14">
                    <Input v-model="formStepTwo.PSDAgain" type="password" placeholder="请再次输入新密码"></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleStepTwo('formStepTwo')">下一步</Button>
            </FormItem>
         </Form>
      </Card>
      <!-- step3 -->
      <Card class="stepThree" v-if="NavCur == 2" :bordered="false" dis-hover> 
         <h3>恭喜您，修改密码成功！</h3>
         <br>
         <Button type="primary"  @click="GoLogin" style="margin-top: 20px;">去登录</Button>

      </Card>
    </div>
    
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {generateMixed} from "../../../util/utils"
export default {
  data() {
  return {
    NavCur:0,
    timerCount:"获取验证码",
    disabled:false,
    formStepOne: {
      TEL:"",
      IMGCODE:"",
      RIMGCODE:"",
      CODE:"",
    },
    formStepTwo: {
      PSD:'',
      PSDAgain:"",
    },
    ruleInlineOne: {
      TEL: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
      ],
      RIMGCODE: [
          { required: true, message: '请输入图形验证码.', trigger: 'blur' },
      ],
      CODE: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' }
      ]
    },
    ruleInlineTwo: {
      PSD: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
      ],
      PSDAgain: [
          { required: true, message: '请再次输入新密码.', trigger: 'blur' },
      ]
    },
  }
  },
  created() {
    //手机端自动跳转手机端首页
    if(this.$store.state.isMobile){
      this.$router.push({name:'首页'})
    }
    this.changeIMGCODE()
  },
  mounted: function(){

    
  
  },
  computed: {
    
  },
  watch:{
  },
  components: {
  },
  methods: {
    GoLogin(){
      this.$router.push({name:'登录'})
    },
    // 图形验证码
    changeIMGCODE(){
      this.formStepOne.IMGCODE = generateMixed(4)
    },
    //获取手机验证码
    toGetCode(){
      if (!(/^1[34578]\d{9}$/.test(this.formStepOne.TEL))){
        this.$Message.error('手机号格式不正确!');
        return false
      }
      if (this.disabled){
      return false
      }
      //倒计时
      var countdown = 10;
      var _this = this
      settime()
      function settime() {
        if (countdown == 0) {
            _this.disabled = false
            _this.timerCount = '获取验证码'
            countdown = 10;
        } else {
            _this.disabled = true,
            _this.timerCount = "重新发送(" + countdown + ")"
            countdown--;
        }
        setTimeout(function () {
          if (_this.disabled == true){
            settime()
          }
          
        }, 1000)
      }
    },
    //step1
    handleStepOne(name) {
      //必填项校验
      this.$refs[name].validate((valid) => {
          if (valid) {
            //手机号验证
            if(!(/^1[34578]\d{9}$/).test(this.formStepOne.TEL)){
              this.$Message.error('手机号格式不正确!')
              return false
            }
            // 图形码校验
            if(this.formStepOne.IMGCODE!=this.formStepOne.RIMGCODE.toUpperCase()){
              this.$Message.error('图形验证码不正确!')
              this.changeIMGCODE()
              return false
            }
            this.NavCur = 1
          } else {
            this.$Message.error('带*号的为必填项!')
          }
      })

    },
    handleStepTwo(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          //手机号验证
          if(this.formStepTwo.PSD!=this.formStepTwo.PSDAgain){
            this.$Message.error('两次输入的密码不一致!')
            return false
          }
          this.NavCur = 2
        } else {
          this.$Message.error('带*号的为必填项!')
        }
      })

    },
    },
};
</script>
<style lang="scss" scoped>
#FindPsd{
  width: 100%;
  padding: 20px 0;
  margin: 10px auto;
  background-color: #efeff4;
  .FindPsdInnerBox{
    width: 90%;
    margin:  20px auto;
    padding: 20px 0;
    background-color: #fff;
    .StepBar{
      width: 100%;
      margin:  20px auto 20px 10%;
    }
    .stepOne, .stepTwo ,.stepThree{
      width: 500px;
      margin: 20px auto;
    }
    .stepThree{
      h3{
        color: red;

      }
    }

  }
}
.ivu-card-head{
  border-bottom:0px;
}
.ivu-steps-item{
  width: 32% !important;
}
</style>