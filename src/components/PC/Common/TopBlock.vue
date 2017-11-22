<template>
  <div id="TopBlock" class="layout-ceiling">
      <div class="layout-ceiling-main">
          <Row>
              <Col span="12">
                <Button type="text">登录</Button>
                <Button type="text">注册</Button>
              </Col>
              <Col span="12" class="ContRight">
                <Button type="text">社保资讯</Button>
                <Button type="text">帮助</Button>
              </Col>
          </Row>
      </div>
  </div>
       
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  data() {
  return {
  }
  },
  mounted: function(){
    //获取导航菜单
    // axios.get(PRE_URL+'static/json/Navbar.json'
    //     ).then((res)=> {
    //       this.navbarInfo = res.data.navbar
    //   }).catch((error)=> {
    //     console.log(error)
    //   })
    
  
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
#TopBlock{
  .ContRight{
    text-align: right;
  }
}
</style>