<template>
  <div class="FindPsd">
    <BackBar></BackBar>
      <!-- list -->
      <div class="List">
        <Form  ref="formFindPsd" :model="formFindPsd" :rules="ruleInlineFindPsd" :inline="false">
          <FormItem prop="TEL" label="">
            <Row>
              <Col span="2">
                  <Icon type="android-phone-portrait" :size="22"></Icon>
                </Col>
                <Col span="14">
                    <Input v-model="formFindPsd.TEL" placeholder="请输入手机号码">
                    </Input>
                </Col>
                <Col span="4" offset="1">
                    <Button type="error" :disabled="disabled" @click="toGetCode">{{timerCount}}</Button>
                </Col>
            </Row>
          </FormItem>
          <FormItem prop="CODE" label="">
              <Row>
                <Col span="2">
                  <Icon type="email-unread" :size="22"></Icon>
                </Col>
                <Col span="20">
                    <Input v-model="formFindPsd.CODE" placeholder="请输入手机验证码"></Input>
                </Col>
              </Row>
            </FormItem>

            <FormItem prop="PSD" label="">
              <Row>
                <Col span="2">
                  <Icon type="locked" :size="22"></Icon>
                </Col>
                <Col span="20">
                    <Input  type="password" v-model="formFindPsd.PSD" placeholder="请输入登录密码"></Input>
                </Col>
              </Row>
            </FormItem>

            <FormItem prop="PSDAgain" label="">
              <Row>
                <Col span="2">
                  <Icon type="locked" :size="22"></Icon>
                </Col>
                <Col span="20">
                    <Input type="password" v-model="formFindPsd.PSDAgain" placeholder="请再次输入登录密码"></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
                <Button type="primary" long @click="handleFindPsd('formFindPsd')">确认修改</Button>
            </FormItem>
        </Form>
      </div>
    
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../components/Mobile/BackBar'
import {generateMixed} from "../../util/utils"
export default {
  data() {
  return {
    timerCount:"获取验证码",
    disabled:false,
    formFindPsd: {
      TEL:"",
      CODE:"",
      PSDAgain:'',
      PSD:'',
    },
    ruleInlineFindPsd: {
      TEL: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
      ],
      PSD: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
      ],
      PSDAgain: [
          { required: true, message: '请再次输入新密码.', trigger: 'blur' },
      ],
      CODE: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' }
      ]
    },
  }
  },
  created() {
  },
  mounted: function(){

    
  
  },
  computed: {
    
  },
  watch:{
  },
  components: {
    BackBar
  },
  methods: {
    GoLogin(){
      this.$router.push({name:'登录'})
    },
    // 图形验证码
    changeIMGCODE(){
      this.formFindPsd.IMGCODE = generateMixed(4)
    },
    //获取手机验证码
    toGetCode(){
      if (!(/^1[34578]\d{9}$/.test(this.formFindPsd.TEL))){
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
    handleFindPsd(name) {
      //必填项校验
      this.$refs[name].validate((valid) => {
          if (valid) {
            //手机号验证
            if(!(/^1[34578]\d{9}$/).test(this.formFindPsd.TEL)){
              this.$Message.error('手机号格式不正确!')
              return false
            }
            //密码一致性验证
            if(this.formStepTwo.PSD!=this.formStepTwo.PSDAgain){
              this.$Message.error('两次输入密码不一致!')
              return false
            }
            
          } else {
            this.$Message.error('带*号的为必填项!')
          }
      })

    }
    },
};
</script>
<style lang="scss" scoped>
.FindPsd{
  margin-bottom: 130px;
  .List{
      width: 95%;
      margin: 0 auto;
      margin-top: 52px;
      .ListItem{
        height: 45px;
        line-height: 45px;
        overflow: hidden;
        text-align: left;
        border-bottom: 0px solid #ddd;
        img{
          width: 32px;
          height: 32px;
          margin-top: 5px;
        }
      }
      .demo-badge-alone{

      }
    }
}
</style>