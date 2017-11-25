<template>
    <div id="CommonThree">
      <Row>
        <Col span="8" v-for="(commonBlock,commonBlockIdx) in commonThreeInfo">
          <Card :bordered="false" dis-hover>
            <div style="text-align:center">
                <img :src="commonBlock.img" alt="图片" style="width: 80px;height: 80px;">
                <p v-for="paragraph in commonBlock.text">{{paragraph}}</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  data() {
  return {
    commonThreeInfo:''
  }
  },
  created() {
    axios.get(PRE_URL+'static/json/CommonBlock.json'
      ).then((res)=> {
        this.commonThreeInfo = res.data.commonBlocks
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
  }
};
</script>
<style lang="scss" scoped>
#CommonThree{
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid #dddee1;
}
</style>