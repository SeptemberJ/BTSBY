<template>
<Modal v-model="ifReadExcel" :mask-closable="false">
        <p slot="header" style="text-align:left">
            <span>导入员工</span>
        </p>
        <div style="text-align:left">
            <Upload
            action=""
            :before-upload="handleBeforeUpload"
            >
                <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
            </Upload>
            
        </div>
        <div slot="footer">
            <Button type="error" size="large"  :loading="modal_loading" @click="">提交更改</Button>
        </div>
    </Modal>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {ReadExcel} from '../../../../util/utils'


export default {
  props:[],
  data() {
  return {
    modal_loading:false,

    
  }
  },
  created(){


    
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
    handleBeforeUpload(event){
        var file = event
        var reader = new FileReader() 
      reader.readAsDataURL(file)   
      reader.onload = function(e){
        console.log(e)
      }

    }
   
  },
};
</script>
<style lang="scss" scoped>


</style>