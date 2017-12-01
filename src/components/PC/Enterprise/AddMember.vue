<template>
    <div id="AddMember">
          <Card :bordered="false" dis-hover v-if="ifShowModal">
                <p slot="title">新增员工</p>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="24">
                        <Row>
                            <Col span="8">
                                <FormItem label="身份证号" prop="id_number">
                                    <Input v-model="formValidate.id_number" @on-blur="" ></Input>
                                </FormItem>
                                <FormItem label="姓名" prop="name">
                                    <Input v-model="formValidate.name" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="员工号" prop="employee_no">
                                    <Input v-model="formValidate.employee_no" placeholder="若不输入系统自动生成"></Input>
                                </FormItem>
                                <FormItem label="投保地" prop="city">
                                    <Select v-model="formValidate.city" size="small">
                                      <Option v-for="(City,CityIdx) in cityList"  :value="City.city_name" :key="CityIdx">{{City.city_name}}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="入职时间" prop="entry_time">
                                    <DatePicker v-model="formValidate.entry_time" type="date" placeholder="选择入职时间" @on-change="changeEntryTime"></DatePicker>
                                </FormItem>
                                <FormItem label="岗位名称" prop="post_name">
                                    <Input v-model="formValidate.post_name" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="用工类型" prop="employment_type">
                                    <Input v-model="formValidate.employment_type" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="直接上司" prop="direct_supervisor">
                                    <Input v-model="formValidate.direct_supervisor" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="手机号码" prop="telephone">
                                    <Input v-model="formValidate.telephone" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="居住地址" prop="residential_address">
                                    <Input v-model="formValidate.residential_address" placeholder=""></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="政治面貌" prop="political_visage">
                                    <Select v-model="formValidate.political_visage" size="small">
                                      <Option v-for="item in politicalVisageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <!-- <Input v-model="formValidate.political_visage" placeholder=""></Input> -->
                                </FormItem>
                                <FormItem label="民族" prop="nation">
                                    <Input v-model="formValidate.nation" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="籍贯" prop="origin">
                                    <Input v-model="formValidate.origin" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="户口性质" prop="registered_residence">
                                    <Select v-model="formValidate.registered_residence">
                                      <Option value="0">本地城镇（五险）</Option>
                                      <Option value="1">外地城镇（五险）</Option>
                                      <Option value="2">外地城市（五险）</Option>
                                      <Option value="3">外地农村（五险）</Option>
                                   </Select>
                                </FormItem>
                                <FormItem label="婚姻状况" prop="marital_status">
                                    <Select v-model="formValidate.marital_status" size="small">
                                      <Option v-for="item in maritalStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="最高学历" prop="highest_educational">
                                    <Select v-model="formValidate.highest_educational" size="small">
                                      <Option v-for="item in educationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="健康状况" prop="health">
                                    <Select v-model="formValidate.health" size="small">
                                      <Option v-for="item in heathStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="开卡银行" prop="bank_card">
                                    <Input v-model="formValidate.bank_card" placeholder=""></Input>
                                </FormItem>
                                <FormItem label=" 银行帐号" prop="bank_no">
                                    <Input v-model="formValidate.bank_no" placeholder=""></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem>
                                    <Row>
                                        <Upload
                                  ref="upload"
                                  :show-upload-list="false"
                                  :on-success="handleSuccess"
                                  :format="['jpg','jpeg','png']"
                                  :max-size="2048"
                                  :on-format-error="handleFormatError"
                                  :on-exceeded-size="handleMaxSize"
                                  :before-upload="handleBeforeUpload"
                                  multiple
                                  type="drag"
                                  action=""
                                  style="display: inline-block;">
                                          <div class="demo-upload-list">
                                            <img :src="URL + formValidate.avatar">
                                          </div>
                                          <p>*(2寸证件照)</p>
                                        </Upload>
                                    </Row>
                                </FormItem>
                                <FormItem label="姓名拼音" prop="name_spelling">
                                    <Input v-model="name_spelling" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="出生日期" prop="birthdate">
                                    <Input v-model="formValidate.birthdate" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="性别" prop="sex">
                                    <Select v-model="formValidate.sex" size="small">
                                      <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>    
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                    <!-- 更多信息 -->
                    <Col span="24" style="border-top: 1px solid #ddd; padding-top: 20px;">
                        <Row>
                            <Col span="8">
                                <FormItem label="电子邮箱" prop="email">
                                    <Input v-model="formValidate.email" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="家庭电话" prop="home_mobile">
                                    <Input v-model="formValidate.home_mobile" placeholder=""></Input>
                                </FormItem>
                                <FormItem label=" 入党团日期" prop="joining_date">
                                    <Input v-model="formValidate.joining_date" placeholder=""></Input>
                                </FormItem>
                                <FormItem label=" 参加工作时间" prop="work_time">
                                    <Input v-model="formValidate.work_time" placeholder=""></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="紧急联系人" prop="emergency_contact">
                                    <Input v-model="formValidate.emergency_contact" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="家庭地址" prop="home_address">
                                    <Input v-model="formValidate.home_address" placeholder=""></Input>
                                </FormItem>
                                <FormItem label=" 毕业学校" prop="graduation_school">
                                    <Input v-model="formValidate.graduation_school" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="入职前工龄" prop="work_age">
                                    <Input v-model="formValidate.work_age" placeholder=""></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="紧急联系人电话" prop="emergency_mobile">
                                    <Input v-model="formValidate.emergency_mobile" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="毕业时间" prop="graduation_time">
                                    <Input v-model="formValidate.graduation_time" placeholder=""></Input>
                                </FormItem>
                                <FormItem label="国籍" prop="nationality">
                                    <Select v-model="formValidate.nationality" size="small">
                                      <Option v-for="item in nationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                    <Col span="24">
                      <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button type="ghost" @click="handleBack" style="margin-left: 8px">返回</Button>
                        <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
                    </FormItem>
                    </Col>
                </Row>
                </Form>

            </Card>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {toPingyin} from '../../../util/toPingyin'
import {autoBirthday} from '../../../util/utils'


export default {
  data() {
  return {
    modal_loading:false,
    formValidate: {
        id_number: '',
        name:'',
        employee_no:'',
        city:'',
        entry_time: '',//new Date()
        post_name: '',
        employment_type: '',
        direct_supervisor: '',
        telephone: '',
        residential_address: '',

        political_visage: '1',
        nation: '',
        origin: '',
        registered_residence: '',
        marital_status: '0',
        highest_educational: '',
        health: '0',
        bank_card: '',
        bank_no: '',

        avatar:'',
        // name_spelling: '',
        birthdate: '',
        sex: '',

        email: '',
        home_mobile: '',
        joining_date: '',
        work_time: '',

        emergency_contact: '',
        home_address: '',
        graduation_school: '',
        work_age: '',

        emergency_mobile: '',
        graduation_time: '',
        nationality: '0',
    },
    ruleValidate: {
        id_number: [
            { required: true, message: '身份证号为必填项!', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '姓名为必填项!', trigger: 'blur' }
        ],
        city: [
            { required: true, message: '投保地为必填项!', trigger: 'blur' }
        ],
        entry_time: [
            { type: "date", required: true, message: '入职时间为必填项!', trigger: 'blur' }
        ],
        post_name: [
            { required: true, message: '岗位名称为必填项!', trigger: 'blur' }
        ],
        telephone: [
            { required: true, message: '手机号码为必填项!', trigger: 'blur' }
        ],
        political_visage: [
            { required: true, message: '政治面貌为必填项!', trigger: 'blur' }
        ],
        nation: [
            { required: true, message: '民族为必填项!', trigger: 'blur' }
        ],
        registered_residence: [
            { required: true, message: '户口性质为必填项!', trigger: 'blur' }
        ],
        marital_status: [
            { required: true, message: '婚姻状况为必填项!', trigger: 'blur' }
        ],
        highest_educational: [
            { required: true, message: '最高学历为必填项!', trigger: 'blur' }
        ],
    },
    cityList:[],  //投保地selection
    politicalVisageList:[],//政治面貌selection
    maritalStatusList:[],//婚姻状况selection
    educationList:[],//最高学历selection
    heathStatusList:[],
    sexList:[],
    nationList:[]


    
  }
  },
  created(){
    axios.get(R_PRE_URL+'/searchCityList.do'
    ).then((res)=> { 
      this.cityList = res.data.arr
    }).catch((error)=> {
      console.log(error)
    })
    axios.get('static/json/MemberInfo.json'
    ).then((res)=> { 
        console.log(res)
      this.politicalVisageList = res.data.politicalVisageList
      this.maritalStatusList = res.data.maritalStatusList
      this.educationList = res.data.educationList
      this.heathStatusList = res.data.heathStatusList
      this.sexList = res.data.sexList
      this.nationList = res.data.nationList
    }).catch((error)=> {
      console.log(error)
    })


    
  },
  mounted: function(){
    
  
  },
  computed: {
    ifShowModal: {
        get: function () {
          return this.$store.state.toAddMember
        },
        set: function (newValue) {
          this.$store.state.toAddMember = false
        }
    },
    name_spelling(){
      return toPingyin(this.formValidate.name)
    }
    
  },
  watch:{
    
  },
  methods: {
    changeVisible(event){
        this.$store.state.toAddMember = event
    },
    handleBeforeUpload(event) {
      var _this = this
      var file = event
      console.log(file) 
      var reader = new FileReader();   
      reader.readAsDataURL(file);   
      reader.onload = function(e){
        let reg = /^data:image\/(jpeg|png|gif);base64,/
        console.log(this.result.replace(reg, ""))
        axios.get(R_PRE_URL+'/uploadBase64.do?imgStr='+this.result.replace(reg, "")
        ).then((res)=> {
          _this.formValidate.avatar = res.data.fileName
        }).catch((error)=> {
          console.log(error)
        })
      } 
    },
    handleView (name) {
        this.imgName = name;
        this.visible = true;
    },
    handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file) {
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: 'The file format is incorrect',
            desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
    },
    handleMaxSize (file) {
        this.$Notice.warning({
            title: 'Exceeding file size limit',
            desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
    },
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.success('Success!');
                
            } else {
                this.$Message.error('Fail!');
            }
        })
console.log(this.formValidate)
console.log(this.formValidate.entry_time)
        
    },
    handleReset (name) {
        this.$refs[name].resetFields()
    },
    handleBack(){
      this.$store.state.toAddMember = false
    },
    changeEntryTime(event){
      this.formValidate.entry_time = event
      console.log(this.formValidate.entry_time)
    },
    //根据身份证获得出生日期
    autoToBirthday(){
      switch(autoBirthday(this.formValidate.id_number)){
        case '格式不对':
        this.formValidate.id_number = ''
        this.formValidate.birthdate = ''
        this.$Message.error('请输入正确的身份证号码!')
        break;
        case '不能为空':
        this.formValidate.id_number = ''
        this.formValidate.birthdate = ''
        this.$Message.error('请输入身份证号码!')
        break;
        default:
        this.formValidate.birthdate = autoBirthday(this.formValidate.id_number)
      }
    }
    // submit(){
    //     window.open(window.location.origin)
    // }
   
  },
};
</script>
<style lang="scss" scoped>
#AddMember{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}

</style>