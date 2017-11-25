<template>
    <div id="Partner">
      <Row>
        <Col span="24" class="marginTB_40">
          <h2 class="TextCenter">{{IndexInfor.partner.tits.BigTit}}</h2>
          <p class="TextCenter">{{IndexInfor.partner.tits.SmallTit}}</p>
        </Col>
        <Col span="24">
          <Row>
            <Col span="4" v-for="(Content,ContentIdx) in IndexInfor.partner.contents">
              <Card :bordered="false" dis-hover>
                <div style="text-align:center">
                    <img :src="Content.logo" alt="图片">
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
  data() {
  return {
    IndexInfor:{}
  }
  },
  created() {
    axios.get(PRE_URL+'static/json/Index.json'
      ).then((res)=> {
        this.IndexInfor = res.data
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
#Partner{
  width: 80%;
  margin: 0 auto;
}
</style>