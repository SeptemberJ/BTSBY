<template>
    <div id="ImgBar">
      <Row>
        <Col span="24" class="marginTB_40">
          <h2 class="TextCenter">{{Infor.tits.BigTit}}</h2>
          <p class="TextCenter">{{Infor.tits.SmallTit}}</p>
        </Col>
        <Col span="24">
          <Row type="flex" justify="space-around">
            <Col span="7" v-for="(Content,ContentIdx) in Infor.contents">
              <Card :bordered="true" dis-hover class="marginB_20">
                <div style="text-align:center">
                    <img :src="Content.img" alt="图片">
                    <h3 class="colorGray marginTB_10">原价：<span class="lineThrough">{{Content.oldPrice}}元</span> 现价：<b>{{Content.newPrice}}元</b></h3>
                    <p class="marginTB_10" v-for="(Section,SectionIdx) in Content.sections">{{Section}}</p>
                    <p><Button class="marginTB_10" type="ghost" @click="GoModule(ContentIdx)">查看详情</Button></p>
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
    GoModule(KIND){
      switch(KIND){
        case 0:
        this.$router.push({name:'个人保'})
        break
        case 1:
        this.$router.push({name:'企业保'})
        break

      }
    }
  }
};
</script>
<style lang="scss" scoped>
#ImgBar{
  width: 80%;
  margin: 0 auto;
  .lineThrough{
    text-decoration: line-through;
    text-decoration-color: #ff150e;
  }
  img{
    width: 100%;
  }
}
</style>