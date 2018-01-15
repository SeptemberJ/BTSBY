<template>
  <div class="DoubleLine">
    <Row class="marginT_20">
        <Col span="12">
          <Row>
              <div @click="GoModule(0)">
                <Col span="16"  class="Center"><h4>为何购买社保</h4><p>一张图告诉你断缴的风险</p></Col>
                <Col span="8"  class="TextCenter"><img src="static/img/whgsb.png"></Col>
              </div>
          </Row>
        </Col>
        <Col span="12">
          <Row>
              <div @click="GoModule(1)">
                <Col span="16"  class="Center"><h4>社保云服务</h4><p>专业服务，安全保障</p></Col>
                <Col span="8"  class="TextCenter"><img src="static/img/sbyfw.png"></Col>
              </div>
          </Row>
        </Col>
    </Row>
    <Row class="marginTB_20">
        <Col span="12">
          <Row>
              <div @click="GoModule(2)">
                <Col span="16" class="Center"><h4>如何在线购买</h4><p>手把手教您在线缴社保</p></Col>
                <Col span="8" class="TextCenter"><img src="static/img/ruzxgm.png"></Col>
              </div>
          </Row>
        </Col>
        <Col span="12">
          <Row>
              <div @click="GoModule(3)">
                <Col span="16" class="Center"><h4>问题解答</h4><p>一对一在线答疑</p></Col>
                <Col span="8"  class="TextCenter"><img src="static/img/wtjd.png"></Col>
              </div>
          </Row>
        </Col>
    </Row>
  </div> 



  


    
    
  


</template>
<script>
import Vue from 'vue'
import axios from 'axios'
  export default{
    data: function () {
      return {
      }
    },
    mounted: function () {
      
    },
    created() {
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      

    },
    methods: {
      //前往模块
      GoModule(KIND){
        switch(KIND){
          case 0:
          this.$router.push({name:'为何购买社保'})
          break
          case 1:
          this.$router.push({name:'社保服务介绍'})
          break
          case 2:
          this.$router.push({name:'如何在线购买'})
          break
          case 3:
          this.$store.state.PeripheryTab_cur = 3
          this.$router.push({name:'社保周边'})
          break
        }
        
      }
    }
  }
</script>
<style lang="scss">
.DoubleLine{
  .Center{
    padding-left: 20px;
    height: 100%;
  }

}
img{
  width: 80%;
}
p{
  color: #999;
}
</style>