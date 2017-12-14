<template>
  <div class="PersonalData">
    <BackBar></BackBar>
    <div class="MainContent">
      <Form ref="formBasicInfo" :model="formBasicInfo" :rules="ruleInline" :inline="false" :label-width="150">
           <FormItem prop="NAME" label="真实姓名">
            <Row>
              <Col span="18">
                  <Input v-model="formBasicInfo.NAME" placeholder="请输入真实姓名"></Input>
              </Col>
            </Row>
          </FormItem>

          <FormItem prop="TEL" label="手机号码">
            <Row>
              <Col span="18">
                  <Input v-model="formBasicInfo.TEL" placeholder="请输入手机号码"></Input>
              </Col>
              <!-- <Col span="4" offset="1">
                  <Button type="text" disabled>手机号码为你的登录账号，请牢记</Button>
              </Col> -->
            </Row>
          </FormItem>

          <FormItem prop="EAMIL" label="常用邮箱">
            <Row>
              <Col span="18">
                  <Input v-model="formBasicInfo.EAMIL" placeholder="请输入常用邮箱"></Input>
              </Col>
            </Row>
          </FormItem>

          
         <!--  <FormItem> -->
            <Row>
              <Col span="24">
                <Button type="primary" long @click="handleSaveBasicInfo('formBasicInfo')">保存</Button>
              </Col>
            </Row>
          <!-- </FormItem> -->
      </Form>
    </div>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../../components/Mobile/BackBar'
  export default{
    data: function () {
      return {
        formBasicInfo: {
            NAME:'',
            TEL:'',
            EAMIL:''
        },
        ruleInline: {
            NAME: [
                { required: true, message: '请输入真实姓名', trigger: 'blur' }
            ],
            TEL: [
                { required: true, message: '请输入手机号.', trigger: 'blur' },
            ],
            EAMIL: [
                { required: true, message: '请输入电子邮箱.', trigger: 'blur' },
                { type: 'email', message: '邮箱格式不正确!', trigger: 'blur' }
            ],
        }
      }
    },
    mounted: function () {
      
    },
    created() {
      axios.get(R_PRE_URL+'/searchMemberRegister.do?member_id='+this.$store.state.userInfo.member_id
      ).then((res)=> { 
        let MemberRegister = res.data.memberRegister
        this.formBasicInfo.NAME = MemberRegister.real_name
        this.formBasicInfo.TEL =  MemberRegister.mobilephone
        this.formBasicInfo.EAMIL =  MemberRegister.email
      }).catch((error)=> {
        console.log(error)
      })
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      BackBar
      

    },
    methods: {
      handleSaveBasicInfo(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                console.log(this.NAME+this.TEL+this.EAMIL)
                // axios.get(R_PRE_URL+''
                // ).then((res)=> { 
                //   this.$store.state.userInfo.username = this.TEL
                //   this.$store.commit('SNACKBAR',{text:'修改成功!'})
                //   this.$parent.$parent.$parent.$parent.$refs.Snackbar.$refs.Snackbar.open()
                // }).catch((error)=> {
                //   console.log(error)
                // })
              this.$Message.success('修改成功!');
            } else {
                this.$Message.error('带*号的为必填项!');
            }
        })
    },
    }
  }
</script>
<style lang="scss">
.PersonalData{
  margin-bottom: 130px;
  .MainContent{
    width: 100%;
    margin-top: 52px;
    text-align: center;
    button{
      width: 80%;
    }
    
  }
}
</style>