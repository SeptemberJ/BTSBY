<template>
  <div class="PsdModification">
  	<BackBar></BackBar>
    <div class="MainContent">
       <Form ref="formAccountInfo" :model="formAccountInfo" :rules="ruleInline" :inline="false" :label-width="100">
           <FormItem prop="Old_PSD" label="原密码">
            <Row>
              <Col span="18">
                  <Input type="password" v-model="formAccountInfo.Old_PSD" placeholder="请输入原密码"></Input>
              </Col>
            </Row>
          </FormItem>

          <FormItem prop="New_PSD" label="新密码">
            <Row>
              <Col span="18">
                  <Input  type="password" v-model="formAccountInfo.New_PSD" placeholder="请输入新密码"></Input>
              </Col>
            </Row>
          </FormItem>

          <FormItem prop="New_PSDAGAIN" label="确认新密码">
            <Row>
              <Col span="18">
                  <Input  type="password" v-model="formAccountInfo.New_PSDAGAIN" placeholder="请确认新密码"></Input>
              </Col>
            </Row>
          </FormItem>

          
          <!-- <FormItem> -->
          <Row>
            <Col span="24">
              <Button type="primary" @click="handleSaveAccountInfo('formAccountInfo')">保存</Button>
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
        formAccountInfo: {
          Old_PSD:'',
          New_PSD:'',
          New_PSDAGAIN:'',
        },
        ruleInline: {
            Old_PSD: [
                { required: true, message: '请输入原密码', trigger: 'blur' }
            ],
            New_PSD: [
                { required: true, message: '请输入新密码.', trigger: 'blur' },
            ],
            New_PSDAGAIN: [
                { required: true, message: '请确认新密码.', trigger: 'blur' },
            ],
        }
      }
    },
    mounted: function () {
      
    },
    created() {
      
    },
   computed: {
      member_id(){
        return this.$store.state.userInfo.member_id
      }
    },
    watch:{
      member_id(){
        return this.$store.state.userInfo.member_id
      },
    },
    components: {
      BackBar
      

    },
    methods: {

      handleSaveAccountInfo(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              if(this.formAccountInfo.New_PSD!=this.formAccountInfo.New_PSDAGAIN){
                this.$Message.error('带*两次输入的密码不一致!');
                return false
              }
              axios.get(R_PRE_URL+'/modifyPsw.do?id='+this.member_id+'&old_psw='+this.formAccountInfo.Old_PSD+'&new_psw='+this.formAccountInfo.New_PSD
              ).then((res)=> {
                switch(res.data.result){
                  case "3":
                  this.$Message.error('带*当前密码不正确!');
                  break;
                  case "2":
                  this.$Message.error('带*密码修改成功!');
                  this.$router.push({name:'登录'});
                  break;
                  default:
                  this.$Message.error('密码修改失败!');
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
.PsdModification{
  margin-bottom: 130px;
  .MainContent{
    width: 90%;
    margin: 0 auto;
    margin-top: 52px;
    text-align: center;
    
    button{
      width: 80%;
    }
    
  }
}
</style>