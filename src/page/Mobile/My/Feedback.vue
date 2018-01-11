<template>
  <div class="Feedback">
  	<BackBar></BackBar>
    <div class="MainContent">
      <Form ref="formFeedback" :model="formFeedback" :rules="ruleFeedback">
        <FormItem label="" prop="suggestion">
            <Input v-model="formFeedback.suggestion" type="textarea" :autosize="{minRows: 5,maxRows: 8}" placeholder="  请填写您的意见或建议"></Input>
        </FormItem>
        <FormItem label="" prop="contact_way">
            <Input v-model="formFeedback.contact_way" placeholder="  请输入您的手机号/邮箱/QQ"></Input>
        </FormItem>
        <Row>
          <Col span="24">
            <Button type="primary" long @click="handleSaveFeedback('formFeedback')">发送</Button>
          </Col>
        </Row>
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
        formFeedback:{
          suggestion:'',
          contact_way:''
        },
        ruleFeedback:{
          suggestion: [
              { required: true, message: '请填写您的意见或建议!', trigger: 'blur' }
          ],
          contact_way: [
              { required: true, message: '请输入您的手机号/邮箱/QQ!', trigger: 'blur' }
          ],
        }
      }
    },
    mounted: function () {
      
    },
    created() {
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      BackBar
      

    },
    methods: {
      handleSaveFeedback(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              let DATA = {
                memberid: this.$store.state.userInfo.member_id,
                fcontent: this.formFeedback.suggestion,
                contact_way: this.formFeedback.contact_way
              }
              
                axios.post(R_PRE_URL+'/insertOpinion.do',DATA,
                ).then((res)=> { 
                  if(res.data.result == 2){
                    this.$Message.success('反馈提交成功!');
                  }else{
                    this.$Message.success('反馈提交失败!');
                  }
                }).catch((error)=> {
                  console.log(error)
                })
              
            } else {
                this.$Message.error('请确保内容全部已填写!');
            }
        })
      }
    }
  }
</script>
<style lang="scss">
.Feedback{
  margin-bottom: 130px;
  .MainContent{
    width: 90%;
    margin: 0 auto;
    margin-top: 52px;
    
  }
}
</style>