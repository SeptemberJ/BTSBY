<template>
  <div class="FourModule">
    <Row type="flex">
        <Col span="6">
          <Card :bordered="false" dis-hover>
              <div style="text-align:center">
                  <img src="static/img/jsb.png">
                  <h5>开始缴纳</h5>
              </div>
          </Card>
        </Col>
        <Col span="6">
          <Card :bordered="false" dis-hover>
              <div style="text-align:center">
                  <img src="static/img/bfss.png">
                  <h5>社保计算</h5>
              </div>
          </Card>
        </Col>
        <Col span="6">
          <Card :bordered="false" dis-hover>
              <div style="text-align:center">
                  <img src="static/img/sbzb.png">
                  <h5>社保周边</h5>
              </div>
          </Card>
        </Col>
        <Col span="6">
          <Card :bordered="false" dis-hover>
              <div style="text-align:center">
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
    }
  }
</script>
<style lang="scss">
.FourModule{
  width: 100%;
}
</style>