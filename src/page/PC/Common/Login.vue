<template>
<!-- Mobile -->
<div class="LoginM" v-if="isMobile">
  <BackBar></BackBar>
  <div class="MainContent">
     <Form ref="formLogin" :model="formLogin" :rules="ruleInline" :inline="false">
        <FormItem prop="UserName">
            <Input type="text" v-model="formLogin.UserName" placeholder="用户名">
                <Icon type="person" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="UserPsd">
            <Input type="password" v-model="formLogin.UserPsd" placeholder="密码">
                <Icon type="locked" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" long @click="handleSubmit('formLogin')">登录</Button>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="12">
              <Button type="text" @click="FindPsd">找回密码</Button>
            </Col>
            <Col span="12" class="TextRight">
              <Button type="text" @click="GoSignM">去注册</Button>
            </Col>
          </Row>
        </FormItem>
        
      </Form>
  </div>
</div>
<!-- PC -->
 <div v-else id="LoginP" style="min-width: 1150px;min-height: 600px;padding: 20px;">
   <div class="LoginBox">
        <Card :bordered="false" dis-hover>
            <p slot="title">用户登录</p>
             <p>
               <Form ref="formLogin" :model="formLogin" :rules="ruleInline" :inline="false">
                  <FormItem prop="UserName">
                      <Input type="text" v-model="formLogin.UserName" placeholder="用户名">
                          <Icon type="person" slot="prepend"></Icon>
                      </Input>
                  </FormItem>
                  <FormItem prop="UserPsd">
                      <Input type="password" v-model="formLogin.UserPsd" placeholder="密码">
                          <Icon type="locked" slot="prepend"></Icon>
                      </Input>
                  </FormItem>
                  <FormItem label="记住密码" prop="ifRemmberPsd">
                    <Checkbox label="记住密码" v-model="ifRemmberPsd" @on-change="RemmberChange"></Checkbox>
                    <Button type="text" style="float: right;" @click="FindPsd">忘记密码</Button>
                  </FormItem>
                  
                  <FormItem>
                      <Button type="primary" @click="handleSubmit('formLogin')">登录</Button>
                  </FormItem>
              </Form>
             </p>
        </Card>
   </div>
</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import {setCookie,getCookie,getCryptoJsCookie,Encrypt,Decrypt} from '../../../util/utils'
import BackBar from '../../../components/Mobile/BackBar'
export default {
  data() {
  return {
    ifRemmberPsd:true,//localStorage.getItem("user_remember")?true : false,
    formLogin: {
        UserName:getCookie('btsby_UserName')?Decrypt(getCookie('btsby_UserName')) : '',
        UserPsd:getCookie('btsby_UserPsd')?Decrypt(getCookie('btsby_UserPsd')) : '',
    },
    // formLogin: {
    //     UserName:localStorage.getItem("user_remember")?localStorage.getItem("user_name") : '',
    //     UserPsd:localStorage.getItem("user_remember")?localStorage.getItem("user_psd") : ''
    // },
    ruleInline: {
        UserName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        UserPsd: [
            { required: true, message: '请输入密码.', trigger: 'blur' },
            // { type: 'string', min: 1, message: '密码不能少于6位', trigger: 'blur' }
        ],
        // ifRemmberPsd: [
        //     { required: false, type: 'Boolean', message: '', trigger: 'change' }
            
        // ],
    }
  }
  },
  mounted: function(){
    
  
  },
  computed: {
    isMobile(){
      return this.$store.state.isMobile
     }
    
  },
  watch:{
  },
  components: {
      BackBar
    },
  methods: {
    FindPsd(){
      this.$router.push({name:'密码找回'})
    },
    GoSign(){
      this.$router.push({name:'个人注册'})
    },
    //记住密码
    RemmberChange(event){
      if(event){
        //Decrypt(Encrypt('222'))
         setCookie('btsby_UserName',Encrypt(this.formLogin.UserName),1)
         setCookie('btsby_UserPsd',Encrypt(this.formLogin.UserPsd),1)
      }

      
    },
    handleSubmit(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.LoginIn(this.formLogin.UserName,this.formLogin.UserPsd)
                
            } else {
                this.$Message.error('请输入正确的用户名和密码!');
            }
        })
    },
    LoginIn(NAME,PSD){
      axios.get(R_PRE_URL+'/login.do?mobile='+NAME+'&psw='+PSD
      ).then((res)=> {
        switch(res.data.result){
          case "2":
          localStorage.setItem("user_name",this.formLogin.UserName)
          if(this.ifRemmberPsd){
            localStorage.setItem("user_psd",this.formLogin.UserPsd)
            localStorage.setItem("user_remember",true)
          }
          localStorage.setItem("member_id",res.data.member_id)
          localStorage.setItem("register_type",res.data.register_type)
          this.$store.state.userInfo.username = this.formLogin.UserName
          this.$store.state.userInfo.member_id = res.data.member_id
          this.$store.state.userInfo.register_type = res.data.register_type
          this.$store.state.ifLogined = true
          setCookie('btsby_cookie',res.data.member_id,1)
          this.$Message.success('登录成功!');
          this.$router.push({name:'首页'})
          break;
          case "3":
          this.$Message.error('手机号不存在!');
          break;
          case "4":
          this.$Message.error('密码不正确!');
          break;
          default:
          this.$Message.error('登录失败!');
        }
      }).catch((error)=> {
        console.log(error)
      })
    },
    // Mobile
    GoSignM(){
      this.$router.push({name:'注册'});
    },
  }
};
</script>
<style lang="scss" scoped>
.LoginM{
  margin-bottom: 130px;
  .MainContent{
    width: 80%;
    margin: 0 auto;
    margin-top: 62px;
  }
}
#LoginP{
  background: url('http://sbyun.com/skins2/images/login-banner.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  
  .LoginBox{
    padding: 25px;
    position: absolute;
    right: 40px;
    top: 150px;
    width: 355px;
    height: 350px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 3px 4px 4px #F7CD95;
  }
}
</style>