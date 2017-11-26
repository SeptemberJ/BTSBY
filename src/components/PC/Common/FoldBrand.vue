<template>
    <div id="FoldBrand">
      <Row>
        <Col span="24" class="marginTB_40">
          <h2 class="TextCenter">{{Infor.tits.BigTit}}</h2>
          <p class="TextCenter">{{Infor.tits.SmallTit}}</p>
        </Col>
        <Col span="24"> 
          <Collapse v-model="value2" accordion>
            <Panel  v-for="(Content,ContentIdx) in Infor.contents" :name="ContentIdx.toString()">
                {{Content.question}}
                <p slot="content">答：{{Content.answer}}</p>
            </Panel>
        </Collapse>
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
    value2: '0'
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
#FoldBrand{
  width: 80%;
  margin: 0 auto;
}
</style>