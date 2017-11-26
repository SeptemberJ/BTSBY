<template>
    <div id="ImgTxt">
      <Row>
        <Col span="24" class="marginTB_40">
          <h2 class="TextCenter">{{Infor.tits.BigTit}}</h2>
          <p class="TextCenter">{{Infor.tits.SmallTit}}</p>
        </Col>
        <Col span="24" v-for="(Content,ContentIdx) in Infor.contents">
          <Row v-if="ContentIdx%2==0" type="flex" justify="center" align="middle">
            <Col span="12">
             <img :src="Content.img" style="width: 80%; height: 80%;">
            </Col>
            <Col span="12" style="height:100%;">
              <h2 class="marginB_20">{{Content.slogan}}</h2>
              <p>{{Content.paragraph}}</p>
            </Col>
          </Row>
          <!-- 图在右侧 -->
          <Row v-else type="flex" justify="center" align="middle">
            <Col span="12" style="height:100%;">
              <h2 class="marginB_20">{{Content.slogan}}</h2>
              <p>{{Content.paragraph}}</p>
            </Col>
            <Col span="12">
             <img :src="Content.img" style="width: 80%; height: 80%;">
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
    // IndexInfor:{}
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
#ImgTxt{
  width: 80%;
  margin: 0 auto;
}
</style>