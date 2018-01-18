<template>
  <div class="SecurityInfo">
  	<TitBar></TitBar>
    <div class="MainContent">
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
            <Row >
              <Col span="24" class="marginT_20">
                <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUploadSF"
          type="drag"
          action=""
          style="display: block;">
                  <div class="demo-upload-list">
                    <img :src="URL + formInsuredInfo.AvatarSource.sfz_front">
                  </div>
                  <p>*身份证正面</p>
                </Upload>
              </Col>

              <Col span="24" class="marginT_20">
                <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUploadSB"
          type="drag"
          action=""
          style="display: block;">
                  <div class="demo-upload-list">
                    <img :src="URL + formInsuredInfo.AvatarSource.sfz_back">
                  </div>
                  <p>*身份证反面</p>
                </Upload>
              </Col>

              <Col span="24" class="marginT_20">
                <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUploadHZ"
          type="drag"
          action=""
          style="display: block;">
                  <div class="demo-upload-list">
                    <img :src="URL + formInsuredInfo.AvatarSource.hkb_hz">
                  </div>
                  <p>*户口簿主页</p>
                </Upload>
              </Col>

              <Col span="24" class="marginT_20">
                <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUploadBR"
          type="drag"
          action=""
          style="display: block;">
                  <div class="demo-upload-list">
                    <img :src="URL + formInsuredInfo.AvatarSource.hkb_br">
                  </div>
                  <p>*户口簿本人页</p>
                </Upload>
              </Col>

              <Col span="24" class="marginT_20">
                <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUploadPD"
          type="drag"
          action=""
          style="display: block;">
                  <div class="demo-upload-list">
                    <img :src="URL + formInsuredInfo.AvatarSource.personal_detail">
                  </div>
                  <p>*个人基本信息采集表</p>
                </Upload>
              </Col>
            </Row>
          </FormItem>


        
          <FormItem class="TextCenter">
              <Button type="primary" @click="saveSecurityInfo('formInsuredInfo')">下一步</Button>
          </FormItem>
      </Form>
    </div>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import TitBar from '../../components/Mobile/TitBar'
  export default{
    data: function () {
      return {
        canNext:false,
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
            sfz_back:'',
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
            sfz_front: [
                { required: true, message: '请上传身份证正面！', trigger: 'blur' },
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
      if(this.$store.state.userInfo.register_type == 1){
        this.$Message.warning('企业用户请登录PC端进行缴纳!')
        this.$router.push({name:'首页'})
      }else{
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
          if(res.data.memberDetail){
            this.canNext = true
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

          }else{
            this.canNext = false
          }
          
          

        }).catch((error)=> {
          console.log(error)
        })

      }
    
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
  components: {
      TitBar
      

    },
  methods: {
    saveSecurityInfo(name) {
      alert(this.canNext)
      if(this.canNext){   //信息已存在
        this.$router.push({name:'缴纳社保'})
      }else{   //填写信息
        this.$refs[name].validate((valid) => {
            if (valid) {
              if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.formInsuredInfo.IDNUMBER))){
                this.$Message.error('身份证格式不正确!')
                return false
              }
              console.log(this.formInsuredInfo.AvatarSource)
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
                  this.canNext == true
                  this.$router.push({name:'缴纳社保'})
                }else{
                  this.$Message.error('信息更新失败!')
                  return false
                }
              }).catch((error)=> {
                console.log(error)
              })
            }else{
              this.$Message.error('带*号的为必填项!')
            }
          })
      }
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
    },
    handleFormatError (file) {
          this.$Notice.warning({
              title: '图片格式警告',
              desc: '您上传的' + file.name + '文件格式不支持!'
          });
      },
    handleMaxSize (file) {
          this.$Notice.warning({
              title: '图片大小警告',
              desc: '您上传的  ' + file.name + '太大了, 请不要超过2M!'
          });
      },
    handleBeforeUpload () {
    }
   
    },
};
</script>
<style lang="scss">
.SecurityInfo{
  margin-bottom: 130px;
  .MainContent{
    width: 90%;
    margin: 0 auto;
    margin-top: 52px;

  }
}
</style>