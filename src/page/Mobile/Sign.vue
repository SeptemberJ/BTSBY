<template>
  <div class="Sign">
	<BackBar></BackBar>
  <!-- list -->
      <div class="List">
        <Form  ref="formSign" :model="formSign" :rules="ruleInlineSign" :inline="false">
          <FormItem prop="REALNAME" label="">
            <Row>
              <Col span="2">
                <Icon type="person" :size="22"></Icon>
              </Col>
              <Col span="20">
                  <Input  v-model="formSign.REALNAME" placeholder="请输入真实姓名"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="TEL" label="">
            <Row class="ListItem">
                <Col span="2">
                  <Icon type="android-phone-portrait" :size="22"></Icon>
                </Col>
                <Col span="14">
                    <Input v-model="formSign.TEL" placeholder="请输入手机号码">
                    </Input>
                </Col>
                <Col span="4" offset="1">
                    <Button type="error" :disabled="disabled" @click="toGetCode">{{timerCount}}</Button>
                </Col>
              </Row>
          </FormItem>
          <FormItem prop="RIMGCODE" label="">
              <Row>
                <Col span="2">
                  <Icon type="images" :size="22"></Icon>
                </Col>
                <Col span="14">
                    <Input v-model="formSign.RIMGCODE" placeholder="请输入图形验证码"></Input>
                </Col>
                <Col span="4" offset="1">
                    <Button type="error" @click="changeIMGCODE">{{formSign.IMGCODE}}</Button>
                </Col>
              </Row>
            </FormItem>

            <FormItem prop="CODE" label="">
              <Row>
                <Col span="2">
                  <Icon type="email-unread" :size="22"></Icon>
                </Col>
                <Col span="20">
                    <Input v-model="formSign.CODE" placeholder="请输入手机验证码"></Input>
                </Col>
              </Row>
            </FormItem>

            <FormItem prop="PSD" label="">
              <Row>
                <Col span="2">
                  <Icon type="locked" :size="22"></Icon>
                </Col>
                <Col span="20">
                    <Input  type="password" v-model="formSign.PSD" placeholder="请输入登录密码"></Input>
                </Col>
              </Row>
            </FormItem>

            <FormItem prop="PSDAGAIN" label="">
              <Row>
                <Col span="2">
                  <Icon type="locked" :size="22"></Icon>
                </Col>
                <Col span="20">
                    <Input type="password" v-model="formSign.PSDAGAIN" placeholder="请再次输入登录密码"></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem prop="EMAIL" label="">
              <Row>
                <Col span="2">
                  <Icon type="at" :size="22"></Icon>
                </Col>
                <Col span="20">
                    <Input v-model="formSign.EMAIL" placeholder="请输入邮箱"></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem prop="INVITECODE" label="">
              <Row>
                <Col span="2">
                  <Icon type="ribbon-b" :size="22"></Icon>
                </Col>
                <Col span="20">
                    <Input v-model="formSign.INVITECODE" placeholder="请输入邀请码(选填)"></Input>
                </Col>
              </Row>
            </FormItem>

            <FormItem prop="PREFERENTIALCODE" label="">
              <Row>
                <Col span="2">
                  <Icon type="card" :size="22"></Icon>
                </Col>
                <Col span="20">
                    <Input v-model="formSign.PREFERENTIALCODE" placeholder="请输入优惠码(选填)"></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
                <Button type="primary" long @click="handleSign('formSign')">立即注册</Button>
            </FormItem>
        </Form>
      </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../components/Mobile/BackBar'
import BlankBar from '../../components/Mobile/BlankBar'
import {generateMixed} from "../../util/utils"
  export default{
    data: function () {
      return {
        timerCount:"获取验证码",
        disabled:false,
        formSign: {
          TEL:"",
          IMGCODE:"",
          RIMGCODE:"",
          CODE:"",
          EMAIL:"",
          //checkAgreement:[false],
          PSD:"",
          PSDAGAIN:"",
          REALNAME:"",
          INVITECODE:"",
          PREFERENTIALCODE:""
        },
        ruleInlineSign: {
          TEL: [
              { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          RIMGCODE: [
              { required: true, message: '请输入图形验证码', trigger: 'blur' },
          ],
          CODE: [
              { required: true, message: '请输入手机验证码', trigger: 'blur' }
          ],
          EMAIL: [
              { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          ],
          PSD: [
              { required: true, message: '请输入登录密码', trigger: 'blur' }
          ],
          PSDAGAIN: [
              { required: true, message: '请输入密码确认', trigger: 'blur' },
          ],
          REALNAME: [
              { required: true, message: '请输入真实姓名', trigger: 'blur' },
          ]
        },
      }
    },
    mounted: function () {
      
    },
    created() {
      this.changeIMGCODE()
      
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
      // 图形验证码
    changeIMGCODE(){
      this.formSign.IMGCODE = generateMixed(4)
    },
    toGetCode(){
      if (!(/^1[34578]\d{9}$/.test(this.formSign.TEL))){
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
    //注册
    handleSign(name) {
      console.log(this.formSign)
        this.$refs[name].validate((valid) => {
            if (valid) {
              if (!(/^1[34578]\d{9}$/.test(this.formSign.TEL))){
                this.$Message.error('手机号格式不正确!');
                return false
              }
              if (this.formSign.PSD != this.formSign.PSDAGAIN){
                this.$Message.error('两次输入的密码不一致!')
                return false
              }
              // 传数据
              const DATA = {
                  "mobilephone":this.formSign.TEL,
                  "email":this.formSign.EMAIL,
                  "password":this.formSign.PSD,
                  "real_name":this.formSign.REALNAME,
                  "register_type":"0",
                  "recomment_code":this.formSign.INVITECODE,
                  "discount_code":this.formSign.PREFERENTIALCODE,
                }
              axios.post(R_PRE_URL+'/register.do',DATA
              ).then((res)=> {
                if(res.data.result==2){
                  this.NavCur = 2
                  this.$Message.success('注册成功!')
                  this.$router.push({name:'登录'})
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
    }
  }
</script>
<style lang="scss">
.Sign{
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