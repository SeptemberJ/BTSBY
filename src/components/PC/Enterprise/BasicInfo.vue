<template>
    <div id="BasicInfoI">
       <Form ref="formBasicInfo" :model="formBasicInfo" :rules="ruleInline" :inline="false" :label-width="150">
           <FormItem prop="company_name" label="公司名称">
            <Row>
              <Col span="18">
                  <Input v-model="formBasicInfo.company_name" placeholder="请输入公司名称"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="company_lincese" label="营业执照注册号">
            <Row>
              <Col span="18">
                  <Input v-model="formBasicInfo.company_lincese" placeholder="请输入营业执照注册号"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="faddress" label="联系地址">
            <Row>
              <Col span="18">
                  <Input v-model="formBasicInfo.faddress" placeholder="请输入联系地址"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="fcity" label="投保地">
            <Row>
              <Col span="18">
                  <Select v-model="formBasicInfo.city_code">
                      <Option v-for="(City,CityIdx) in cityList"  :value="City.city_code" :key="CityIdx">{{City.city_name}}</Option>
                   </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="email" label="电子邮件">
            <Row>
              <Col span="18">
                  <Input v-model="formBasicInfo.email" placeholder="请输入电子邮件"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="mobile" label="移动电话 ">
            <Row>
              <Col span="18">
                  <Input v-model="formBasicInfo.mobilephone" placeholder="请输入移动电话"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="contact" label="联系人">
            <Row>
              <Col span="18">
                  <Input v-model="formBasicInfo.contact" placeholder="请输入联系人"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="recomment_code" label="邀请码 ">
            <Row>
              <Col span="18">
                  <Input v-model="formBasicInfo.recomment_code" placeholder="请输入邀请码"></Input>
              </Col>
            </Row>
          </FormItem>

          
          <FormItem>
              <Button type="primary" @click="handleSaveBasicInfo('formBasicInfo')">保存</Button>
          </FormItem>
      </Form>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  data() {
  return {
    cityList:'',//城市列表
    formBasicInfo: {
        company_name:'',
        company_lincese:'',
        faddress:'',
        fcity:'',
        city_code:'0',
        email:'',
        mobilephone:'',
        contact:'',
        recomment_code:''
    },
    ruleInline: {
        company_name: [
            { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        company_lincese: [
            { required: true, message: '请输入营业执照注册号', trigger: 'blur' },
        ],
        fcity: [
            { required: true, message: '请选择投保地', trigger: 'blur' },
        ],
        email: [
            { required: true, message: '请输入电子邮件', trigger: 'blur' },
        ],
        mobilephone: [
            { required: true, message: '请输入移动电话', trigger: 'blur' },
        ],
        contact: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
        ]
    }
    
  }
  },
  created() {
    axios.get(R_PRE_URL+'/searchCityList.do'
    ).then((res)=> { 
      this.cityList = res.data.arr
    }).catch((error)=> {
      console.log(error)
    })
    axios.get(R_PRE_URL+'/searchCompanyDetail.do?member_id='+this.$store.state.userInfo.member_id
    ).then((res)=> { 
      this.formBasicInfo = res.data.companyDetail
    }).catch((error)=> {
      console.log(error)
    })
   },
  mounted: function(){
    
  
  },
  computed: {
    
  },
  watch:{
  },
  methods: {
    handleSaveBasicInfo(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                let temp = this.formBasicInfo
                temp.fcity = this.formBasicInfo.city_code
                let DATA = temp
                axios.post(R_PRE_URL+'/updateCompanyDetail.do',DATA
                ).then((res)=> { 
                  if(res.data.code == 2){
                    this.$Message.success('企业信息更新成功!')
                  }else{
                    this.$Message.error(res.data.message+'!');
                  }
                  this.$store.state.userInfo.username = this.formBasicInfo.mobilephone
                }).catch((error)=> {
                  console.log(error)
                })
            } else {
                this.$Message.error('带*号的为必填项!');
            }
        })
    },
   
    },
};
</script>
<style lang="scss" scoped>
#BasicInfoI{
  form{
    width: 500px;
    margin-left: 40px;
  }
}
</style>