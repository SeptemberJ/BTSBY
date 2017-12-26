<template>
    <div id="InsuredInfoI">
       <Form ref="formInsuredInfo" :model="formInsuredInfo" :rules="ruleInline" :inline="false">
           <FormItem prop="NAME" label="真实姓名">
            <Row>
              <Col span="18">
                  <Input v-model="formInsuredInfo.NAME" placeholder="请输入真实姓名"></Input>
              </Col>
            </Row>
          </FormItem>

          <FormItem prop="IDNUMBER" label="身份证号">
            <Row>
              <Col span="18">
                  <Input v-model="formInsuredInfo.IDNUMBER" placeholder="请输入身份证号"></Input>
              </Col>
            </Row>
          </FormItem>

          <FormItem prop="INSURED_AREA" label="参保地区">
            <Row>
              <Col span="18">
                   <Select v-model="formInsuredInfo.INSURED_AREA" style="width:200px;">
                      <Option v-for="(City,CityIdx) in cityList"  :value="City.city_name" :key="CityIdx">{{City.city_name}}</Option>
                   </Select>
              </Col>
            </Row>
          </FormItem>

          <FormItem prop="RESIDENCE" label="户口性质">
            <Row>
              <Col span="18">
                   <Select v-model="formInsuredInfo.RESIDENCE" style="width:200px">
                      <Option value="0">本地城镇（五险）</Option>
                      <Option value="1">外地农村（五险）</Option>
                      <Option value="2">外地城镇（五险）</Option>
                      <Option value="3">外地农村（五险）</Option>
                   </Select>
              </Col>
            </Row>
          </FormItem>

          <FormItem>
            <Row>
              <Col span="24">
                相关附件：<a href="http://sbyun.com/template/%E4%B8%8A%E6%B5%B7/%E4%B8%AA%E4%BA%BA%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF%E9%87%87%E9%9B%86%E8%A1%A8%EF%BC%881412%E7%89%88%EF%BC%89.pdf" target="_blank">个人基本信息采集表（1412版）.pdf</a>
              </Col>
            </Row>
          </FormItem>

          <FormItem>
            <Row>
              <Col span="5">
                <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUploadSF"
          accept=".png, .jpg, .jpeg"
          type="drag"
          action=""
          style="display: inline-block;">
                  <div class="demo-upload-list">
                    <img :src="URL + formInsuredInfo.AvatarSource.sfz_front">
                  </div>
                  <p>*身份证正面</p>
                </Upload>
              </Col>

              <Col span="5">
                <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUploadSB"
          accept=".png, .jpg, .jpeg"
          type="drag"
          action=""
          style="display: inline-block;">
                  <div class="demo-upload-list">
                    <img :src="URL + formInsuredInfo.AvatarSource.sfz_back">
                  </div>
                  <p>*身份证反面</p>
                </Upload>
              </Col>

              <Col span="5">
                <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUploadHZ"
          accept=".png, .jpg, .jpeg"
          type="drag"
          action=""
          style="display: inline-block;">
                  <div class="demo-upload-list">
                    <img :src="URL + formInsuredInfo.AvatarSource.hkb_hz">
                  </div>
                  <p>*户口簿主页</p>
                </Upload>
              </Col>

              <Col span="5">
                <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUploadBR"
          accept=".png, .jpg, .jpeg"
          type="drag"
          action=""
          style="display: inline-block;">
                  <div class="demo-upload-list">
                    <img :src="URL + formInsuredInfo.AvatarSource.hkb_br">
                  </div>
                  <p>*户口簿本人页</p>
                </Upload>
              </Col>

              <Col span="5">
                <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUploadPD"
          accept=".png, .jpg, .jpeg"
          type="drag"
          action=""
          style="display: inline-block;">
                  <div class="demo-upload-list">
                    <img :src="URL + formInsuredInfo.AvatarSource.personal_detail">
                  </div>
                  <p>*个人基本信息采集表</p>
                </Upload>
              </Col>
            </Row>
          </FormItem>


        
          <FormItem>
              <Button type="primary" @click="saveSecurityInfo('formInsuredInfo')">保存</Button>
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
    formInsuredInfo: {
      memberDetail:{},
      NAME:'',//用户名
      IDNUMBER:'',//身份证
      INSURED_AREA:'',//参保城市
      RESIDENCE:'',//户口性质
      // JOB:'',//岗位
      // STREET:'',//街道
      AvatarSource:{   //upload img
        sfz_front:'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
        sfz_back:'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',
        hkb_hz:'',
        hkb_br:'',
        personal_detail:'',
      }
    },
    ruleInline: {
        NAME: [
            { required: true, message: '请输入真实姓名！', trigger: 'blur' }
        ],
        IDNUMBER: [
            { required: true, message: '请输入身份证号！', trigger: 'blur' },
        ],
        INSURED_AREA: [
            { required: true, message: '请选择参保城市！', trigger: 'blur' },
        ],
        RESIDENCE: [
            { required: true, message: '请选择户口性质！', trigger: 'blur' },
        ],
    },
    defaultList: [
    'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
    ],
    imgName: '',
    visible: false,
    uploadList: []
    
  }
  },

  created() {
    axios.get(R_PRE_URL+'/searchCityList.do'
    ).then((res)=> { 
      this.cityList = res.data.arr
    }).catch((error)=> {
      console.log(error)
    })
    axios.get(R_PRE_URL+'/searchMemberDetail.do?member_id='+this.$store.state.userInfo.member_id
    ).then((res)=> { 
      console.log('searchMemberDetail-------------------')
      console.log(res.data.memberDetail)
      let MemberDetail = res.data.memberDetail
      this.formInsuredInfo.NAME = MemberDetail.real_name || ''
      this.formInsuredInfo.IDNUMBER = MemberDetail.sfz_no || ''
      this.formInsuredInfo.INSURED_AREA = MemberDetail.city_name|| ''
      this.formInsuredInfo.RESIDENCE = MemberDetail.type || ''
      this.formInsuredInfo.AvatarSource = {  
            sfz_front:MemberDetail.sfz_front || '',
            sfz_back:MemberDetail.sfz_back || '',
            hkb_hz:MemberDetail.hkb_hz || '',
            hkb_br:MemberDetail.hkb_br || '',
            personal_detail:MemberDetail.personal_detail || ''
     }
    }).catch((error)=> {
      console.log(error)
    })
  },
  mounted: function(){
    this.uploadList = this.$refs.upload.fileList;
  
  },
  computed: {
    URL(){
      return R_PRE_URL+'/'
    },
  },
  watch:{
    URL(){
      return R_PRE_URL+'/'
    },
  },
  methods: {
    saveSecurityInfo(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
              if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.formInsuredInfo.IDNUMBER))){
                this.$Message.error('身份证格式不正确!')
                return false
              }
              //必填项校验
              if(!this.formInsuredInfo.AvatarSource.sfz_front || !this.formInsuredInfo.AvatarSource.sfz_back || !this.formInsuredInfo.AvatarSource.hkb_hz || !this.formInsuredInfo.AvatarSource.hkb_br ||!this.formInsuredInfo.AvatarSource.personal_detail ){
                this.$Message.error('请先上传需要的文件!')
                return false
              }
              let DATA = {
                member_id:this.$store.state.userInfo.member_id,
                real_name:this.formInsuredInfo.NAME,
                sfz_no:this.formInsuredInfo.IDNUMBER,
                city:this.formInsuredInfo.INSURED_AREA,
                type:this.formInsuredInfo.RESIDENCE,
                sfz_front:this.formInsuredInfo.AvatarSource.sfz_front,
                sfz_back:this.formInsuredInfo.AvatarSource.sfz_back,
                hkb_hz:this.formInsuredInfo.AvatarSource.hkb_hz,
                hkb_br:this.formInsuredInfo.AvatarSource.hkb_br,
                personal_detail:this.formInsuredInfo.AvatarSource.personal_detail
              }
              console.log(DATA)
                axios.post(R_PRE_URL+'/updateMemberDetail.do',DATA
              ).then((res)=> {
                if(res.data.code==2){
                  this.$Message.success('信息更新成功!')
                }else{
                  this.$Message.error('信息更新失败!')
                  return false
                }
              }).catch((error)=> {
                console.log(error)
              })
                
            } else {
                this.$Message.error('带*号的为必填项!')
            }
        })
        //必填项校验
      // if(!this.NAME || !this.IDNUMBER || !this.INSURED_AREA || !this.RESIDENCE || !this.AvatarSource.sfz_front || !this.AvatarSource.sfz_back || !this.AvatarSource.hkb_hz || !this.AvatarSource.hkb_br ||!this.AvatarSource.personal_detail ){
      //   this.$store.commit('SNACKBAR',{text:'带*号为必填项!'})
      //   this.$parent.$parent.$parent.$parent.$refs.Snackbar.$refs.Snackbar.open()
      //   return false
      // }
      // if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.IDNUMBER))){
      //   this.$store.commit('SNACKBAR',{text:'身份证格式不正确!'})
      //   this.$parent.$parent.$parent.$parent.$refs.Snackbar.$refs.Snackbar.open()
      //   return false
      // }
      // let DATA = {
      //   member_id:this.$store.state.userInfo.member_id,
      //   real_name:this.NAME,
      //   sfz_no:this.IDNUMBER,
      //   city:this.INSURED_AREA,
      //   type:this.RESIDENCE,
      //   sfz_front:this.AvatarSource.sfz_front,
      //   sfz_back:this.AvatarSource.sfz_back,
      //   hkb_hz:this.AvatarSource.hkb_hz,
      //   hkb_br:this.AvatarSource.hkb_br,
      //   personal_detail:this.AvatarSource.personal_detail
      // }
      // console.log(DATA)
      //   axios.post(R_PRE_URL+'/updateMemberDetail.do',DATA
      // ).then((res)=> {
      //   if(res.data.code==2){
      //     this.$store.commit('SNACKBAR',{text:'信息更新成功!'})
      //     this.$parent.$parent.$parent.$parent.$refs.Snackbar.$refs.Snackbar.open()
      //   }else{
      //     this.$store.commit('SNACKBAR',{text:'信息更新失败!'})
      //     this.$parent.$parent.$parent.$parent.$refs.Snackbar.$refs.Snackbar.open()
      //     return false
      //   }
      // }).catch((error)=> {
      //   console.log(error)
      // })
    },
    // upload
    // 身份证正面
    handleBeforeUploadSF(event) {
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
          _this.AvatarSource[sfz_front] = res.data.fileName
        }).catch((error)=> {
          console.log(error)
        })
      } 
    },
    // 身份证反面
    handleBeforeUploadSB(event) {
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
          _this.AvatarSource[sfz_back] = res.data.fileName
        }).catch((error)=> {
          console.log(error)
        })
      } 
    },
    //户口簿主页
    handleBeforeUploadHZ(event) {
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
          _this.AvatarSource[hkb_hz] = res.data.fileName
        }).catch((error)=> {
          console.log(error)
        })
      } 
    },
    //户口簿本人页
    handleBeforeUploadBR(event) {
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
          _this.AvatarSource[hkb_br] = res.data.fileName
        }).catch((error)=> {
          console.log(error)
        })
      } 
    },
    //个人基本信息采集表
    handleBeforeUploadPD(event) {
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
          _this.AvatarSource[personal_detail] = res.data.fileName
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
    handleBeforeUpload () {
    }
   
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
.demo-upload-list{
        display: inline-block;
        width: 150px;
        height: 150px;
        text-align: center;
        line-height: 150px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>