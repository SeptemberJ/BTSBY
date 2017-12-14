<template>
  <div class="FourModule">
    <Row type="flex">
        <Col span="6">
          <Card :bordered="false" dis-hover>
              <div style="text-align:center" @click="GoModule(0)">
                  <img src="static/img/jsb.png">
                  <h5>开始缴纳</h5>
              </div>
          </Card>
        </Col>
        <Col span="6">
          <Card :bordered="false" dis-hover>
              <div style="text-align:center"  @click="GoModule(1)">
                  <img src="static/img/bfss.png">
                  <h5>社保计算</h5>
              </div>
          </Card>
        </Col>
        <Col span="6">
          <Card :bordered="false" dis-hover>
              <div style="text-align:center"  @click="GoModule(2)">
                  <img src="static/img/sbzb.png">
                  <h5>社保周边</h5>
              </div>
          </Card>
        </Col>
        <Col span="6">
          <Card :bordered="false" dis-hover>
              <div style="text-align:center"  @click="GoModule(3)">
                  <img src="static/img/myorder.png">
                  <h5>我的订单</h5>
              </div>
          </Card>
        </Col>
    </Row>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
//import BackBar from 'components/BackBar'
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
      GoModule(KIND){
        switch(KIND){
          case 0:
          this.$router.push({name:'缴纳社保'})
          break
          case 1:
          this.$router.push({name:'社保计算'})
          break
          case 2:
          this.$router.push({name:'社保周边'})
          break
          case 3:
          this.$router.push({name:'我的订单'})
          break
        }
      },
    }
  }
</script>
<style lang="scss">
.FourModule{
  width: 100%;
}
</style>