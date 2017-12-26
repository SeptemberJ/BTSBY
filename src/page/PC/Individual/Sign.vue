<template>
<div id="Sign">
    <div class="SignInnerBox">
      <Steps class="StepBar" :current="NavCur" >
          <Step title="设置用户名" :content="NavCur==0?'进行中':'已完成'"></Step>
          <Step title="填写账号信息" :content="NavCur==0?'待进行':NavCur==1?'进行中':'已完成'"></Step>
          <Step title="注册成功" :content="NavCur==2?'进行中':'待进行'"></Step>
      </Steps>
      <!-- step1 -->
      <Card class="stepOne" v-if="NavCur == 0" :bordered="false" dis-hover> 
         <Form  ref="formStepOne" :model="formStepOne" :rules="ruleInlineOne" :inline="false">
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

            <FormItem prop="RIMGCODE" label="图形验证码">
              <Row>
                <Col span="14">
                    <Input v-model="formStepOne.RIMGCODE" placeholder="请输入图形验证码"></Input>
                </Col>
                <Col span="4" offset="1">
                    <Button type="error" @click="changeIMGCODE">{{formStepOne.IMGCODE}}</Button>
                </Col>
              </Row>
            </FormItem>

            <FormItem prop="CODE" label="手机验证码">
              <Row>
                <Col span="18">
                    <Input v-model="formStepOne.CODE" placeholder="请输入手机验证码"></Input>
                </Col>
              </Row>
            </FormItem>

            <FormItem prop="EMAIL" label="电子邮箱">
              <Row>
                <Col span="18">
                    <Input v-model="formStepOne.EMAIL" placeholder="请输入电子邮箱"></Input>
                </Col>
              </Row>
            </FormItem>

           <!--  <FormItem label="" prop="checkAgreement">
              <CheckboxGroup v-model="formStepOne.checkAgreement[0]">
                <Checkbox label="同意社保云个人保协议"></Checkbox>
              </CheckboxGroup>
            </FormItem> -->
            
            <FormItem>
                <Button type="primary" long @click="handleStepOne('formStepOne')">下一步</Button>
            </FormItem>
         </Form>       
      </Card>
      <!-- step2 -->
      <Card class="stepTwo" v-if="NavCur == 1" :bordered="false" dis-hover> 
         <Form  ref="formStepTwo" :model="formStepOne" :rules="ruleInlineOne" :inline="false">
            <FormItem  label="用户名">
              <Row>
                <Col span="18">
                    <Input v-model="formStepOne.TEL"  disabled ></Input>
                </Col>
              </Row>
            </FormItem>

            <FormItem prop="PSD" label="登录密码">
              <Row>
                <Col span="18">
                    <Input  type="password" v-model="formStepTwo.PSD" placeholder="请输入登录密码"></Input>
                </Col>
              </Row>
            </FormItem>

            <FormItem prop="PSDAGAIN" label="密码确认">
              <Row>
                <Col span="18">
                    <Input type="password" v-model="formStepTwo.PSDAGAIN" placeholder="请再次输入登录密码"></Input>
                </Col>
              </Row>
            </FormItem>

            <FormItem prop="REALNAME" label="真实姓名">
              <Row>
                <Col span="18">
                    <Input  v-model="formStepTwo.REALNAME" placeholder="请再次输入登录密码"></Input>
                </Col>
              </Row>
            </FormItem>

            <FormItem prop="INVITECODE" label="邀请码">
              <Row>
                <Col span="18">
                    <Input v-model="formStepTwo.INVITECODE" placeholder="请输入邀请码(选填)"></Input>
                </Col>
              </Row>
            </FormItem>

            <FormItem prop="PREFERENTIALCODE" label="优惠码">
              <Row>
                <Col span="18">
                    <Input v-model="formStepTwo.PREFERENTIALCODE" placeholder="请输入优惠码(选填)"></Input>
                </Col>
              </Row>
            </FormItem>
            
            <FormItem>
                <Button type="primary" long @click="handleStepTwo('formStepTwo')">下一步</Button>
            </FormItem>
         </Form>       
      </Card>
      <!-- step3 -->
      <Card class="stepThree" v-if="NavCur == 2" :bordered="false" dis-hover> 
         <h3>恭喜注册成功，你的帐号为：</h3>
         <br>
         <p><b>登录名：{{formStepOne.TEL}} (账号通用于社保云和EHR的管理)</b></p>
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
    
    
    // REALNAME:"",
    // INVITECODE:"",
    formStepOne: {
      TEL:"",
      IMGCODE:"",
      RIMGCODE:"",
      CODE:"",
      EMAIL:"",
      checkAgreement:[false],
    },
    formStepTwo: {
      PSD:"",
      PSDAGAIN:"",
      REALNAME:"",
      INVITECODE:"",
      PREFERENTIALCODE:""
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
      ],
      EMAIL: [
          { required: true, message: '请输入电子邮箱.', trigger: 'blur' },
      ],
    },
    ruleInlineTwo: {
      PSD: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
      ],
      PSDAGAIN: [
          { required: true, message: '请输入密码确认.', trigger: 'blur' },
      ],
      REALNAME: [
          { required: true, message: '请输入真实姓名.', trigger: 'blur' },
      ]
    },
  }
  },
  created() {
    //手机端自动跳转手机端首页
    if(this.$store.state.isMobile){
      this.$router.push({name:'首页'})
    }
    this.formStepOne.IMGCODE = generateMixed(4)
  },
  mounted: function(){
    
  
  },
  computed: {
    
  },
  watch:{
  },
  methods: {
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
            // 邮箱号校验
            if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.formStepOne.EMAIL))){
              this.$Message.error('邮箱格式不正确!')
              return false
            }
            // 图形码校验
            if(this.formStepOne.IMGCODE!=this.formStepOne.RIMGCODE.toUpperCase()){
              this.$Message.error('图形验证码不正确!')
              return false
              return false
            }
            //手机验证码校验
            //do something ...
            // 是否同意协议
            if(!this.formStepOne.checkAgreement){
              this.$Message.error('请先同意协议!')
              return false
            }
            this.NavCur = 1
            //this.$Message.success('提交成功!');
          } else {
            this.$Message.error('带*号的为必填项!')
          }
      })

    },
    //step2
    handleStepTwo(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              if (!this.formStepTwo.PSD || !this.formStepTwo.PSDAGAIN || !this.formStepTwo.REALNAME){
                this.$Message.error('带*号为必填项!')
                return false
              }
              if (this.formStepTwo.PSD != this.formStepTwo.PSDAGAIN){
                this.$Message.error('两次输入的密码不一致!')
                return false
              }
              // 传数据
              const DATA = {
                  "mobilephone":this.formStepOne.TEL,
                  "email":this.formStepOne.EMAIL,
                  "password":this.formStepTwo.PSD,
                  "real_name":this.formStepTwo.REALNAME,
                  "register_type":"0",
                  "recomment_code":this.formStepTwo.INVITECODE,
                  "discount_code":this.formStepTwo.PREFERENTIALCODE,
                }
              axios.post(R_PRE_URL+'/register.do',DATA
              ).then((res)=> {
                if(res.data.result==2){
                  this.NavCur = 2
                  this.$Message.success('注册成功!')
                }else{
                  this.$Message.error('注册失败!')
                  return false
                }
              }).catch((error)=> {
                console.log(error)
              })
              
            } else {
              this.$Message.error('带*号的为必填项!');
            }
        })
    },
    GoLogin(){
      this.$router.push({name:'登录'});
    },
    // 图形验证码
    changeIMGCODE(){
      this.formStepOne.IMGCODE = generateMixed(4)
    },
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
  
  }
};
</script>
<style lang="scss" scoped>
#Sign{
  width: 100%;
  padding: 20px 0;
  margin: 10px auto;
  background-color: #efeff4;
  .SignInnerBox{
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