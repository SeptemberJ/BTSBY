<template>
    <div id="TMBPart">
      <Row>
        <Col span="24" class="marginTB_40">
          <h2 class="TextCenter">{{Infor.tits.BigTit}}</h2>
          <p class="TextCenter">{{Infor.tits.SmallTit}}</p>
        </Col>
        <Col span="24">
          <Row type="flex" justify="space-around">
            <Col span="7" v-for="(Content,ContentIdx) in Infor.contents">
              <Card :bordered="false" dis-hover class="marginB_20">
                <div style="text-align:center">
                    <img :src="Content.img" alt="图片" style="max-width: 80%;">
                    <h2 class="colorOrange">{{Content.slogan}}</h2>
                    <p style="text-align:left">{{Content.paragraph}}</p>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
    </Row>
    </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  props:['Infor'],
  data() {
  return {
    //IndexInfor:{}
  }
  },
  created() {
    // axios.get(PRE_URL+'static/json/Index.json'
    //   ).then((res)=> {
    //     this.IndexInfor = res.data
    // }).catch((error)=> {
    //   console.log(error)
    // })
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
#TMBPart{
  width: 80%;
  margin: 0 auto;
}
</style>