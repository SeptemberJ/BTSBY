<template>
    <div id="ImgBar">
      <Row>
        <Col span="24" class="marginTB_40">
          <h2 class="TextCenter">{{Infor.tits.BigTit}}</h2>
          <p class="TextCenter">{{Infor.tits.SmallTit}}</p>
        </Col>
        <Col span="24">
          <Row>
            <Col :span="24/Infor.contents.length" v-for="(Content,ContentIdx) in Infor.contents">
              <Card :bordered="false" dis-hover>
                <div style="text-align:center">
                    <img :src="Content.img" alt="图片">
                      <h3 class="colorGray marginTB_10">原价：<span class="lineThrough">{{Content.oldPrice}}元</span> 现价：<b>{{Content.newPrice}}元</b></h3>
                      <p class="marginTB_10" v-for="(Section,SectionIdx) in Content.sections">{{Section}}</p>
                      <p><Button class="marginTB_10" type="ghost">查看详情</Button></p>
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
#ImgBar{
  width: 100%;
  margin: 0 auto;
  .lineThrough{
    text-decoration: line-through;
    text-decoration-color: #ff150e;
  }
}
</style>