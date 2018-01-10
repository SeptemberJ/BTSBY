
<template>
<Modal v-model="ifReadExcel" :mask-closable="false" width="900">
        <p slot="header" style="text-align:left">
            <span>导入员工</span>
        </p>
        <div style="text-align:left">
          <Form ref="formImport" :model="formImport" :rules="ruleImport" :label-width="120">
            <FormItem label="导入的组织单位：" prop="company_name">
                <span>{{formBasicInfo.company_name}}</span>
            </FormItem>
            <FormItem label="投保地区：" prop="city">
                <!-- <Input v-model="city"></Input> -->
                <span>{{formBasicInfo.fcity}}</span>
            </FormItem>
            <FormItem label="导入的excel：" prop="xlsFile">
              <!-- <Upload
                  :before-upload="handleUpload"
                  action="https://jsonplaceholder.typicode.com/posts/">
                  <Button type="ghost" icon="ios-cloud-upload-outline">选择要导入的文件</Button>
              </Upload>
              <span>{{formImport.xlsFile.name}}</span> -->
              <Upload
                :before-upload="handleUpload"
               action="">
                  <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
              </Upload>
              <span v-if="file !== null">Upload file: {{ file.name }}</span>
                
            </FormItem>
            <FormItem label="导入模板下载：" prop="xlsMoban">
                <a href="static/hrRecruitBaseTemplate.xls">员工导入模板</a>
            </FormItem>
          </Form>
            <!-- <Upload
            action=""
            :before-upload="handleBeforeUpload"
            >
                <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
            </Upload> -->
            <!-- <input id="upfile" type="file" name="file">
            <button @click="read">读取</button> -->
            
        </div>
        <div slot="footer">
            <Button type="error" size="large"  :loading="modal_loading" @click="upload">导入</Button>
        </div>
    </Modal>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {ReadExcel} from '../../../../util/utils'
import XLSX from 'xlsx'

export default {
  props:[],
  data() {
  return {
    modal_loading:false,
    formBasicInfo:'',
    file:null,
    loadingStatus: false,
    formImport: {
        company_name: '',
        city: '',
        xlsFile: '',
        xlsMoban:''
    },
    ruleImport: {
        xlsFile: [
            { required: true, message: '请选择导入的xls文件', trigger: 'blur' }
        ]
    }

    
  }
  },
  created(){
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
    ifReadExcel: {
        get: function () {
          return this.$store.state.ifReadExcel
        },
        set: function (newValue) {
          this.$store.state.ifReadExcel = false
        }
    },
        
    
  },
  watch:{
    
  },
  methods: {
    handleUpload (file) {
        this.file = file;
        return false;
    },
    upload () {
      if(!this.file){
        this.$Message.error('请选择要导入的文件!')
        return false
      }
        let formData = new FormData();
        formData.append('filename', this.file);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      axios.post(R_PRE_URL+'/importXls',formData,config
      ).then((res)=> {
        if(res.data == 1){
          this.$Message.success('导入成功!')
          this.ifReadExcel = false
        }else{
          this.$Message.error('导入失败!')
        }
        
      }).catch((error)=> {
        console.log(error)
      })

      }
    // handleBeforeUpload(event){
    //     var file = event
        
    //     var reader = new FileReader() 
    //   reader.readAsDataURL(file)   
    //   reader.onload = function(e){
    //     console.log(e)
    //   }

    // },
    // read(){
    //   ReadExcel()
    // }
   
  },
};
</script>
<style lang="scss" scoped>


</style>