<template>
    <div id="Contact">
      <Row>
        <Col span="24" class="marginTB_40">
          <h2 class="TextCenter">{{Infor.tits.BigTit}}</h2>
          <p class="TextCenter">{{Infor.tits.SmallTit}}</p>
        </Col>
        <Col span="24">
          <Row ype="flex" justify="center" align="middle">
            <Col span="12">
             <img :src="Infor.contents.img" style="width: 80%; height: 80%;">
            </Col>
            <Col span="12" style="height:100%;">
              <h2 class="marginB_20">{{Infor.contents.enterprise}}</h2>
              <h3 class="marginTB_10"><Icon type="ios-location" size="18"></Icon> {{Infor.contents.address}}</h3>
              <h3 class="marginTB_10"><Icon type="ios-telephone" size="18"></Icon> {{Infor.contents.tel}}</h3>
              <h3 class="marginTB_10"><Icon type="email" size="18"></Icon> {{Infor.contents.email}}</h3>
              <h3 class="marginTB_10"><Icon type="folder" size="18"></Icon><a :href="Infor.contents.resume.link" target=_blank> {{Infor.contents.resume.text}}</a></h3>
              <h3 class="marginTB_10"><Icon type="android-subway" size="18"></Icon> {{Infor.contents.subway}}</h3>
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
#Contact{
  width: 80%;
  margin: 0 auto;
  a{
    color: #6d7380;
    &:hover{
      color: #39f;
    }
  }
}
</style>