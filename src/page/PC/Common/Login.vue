<template>
 <div id="Login" style="min-width: 1150px;min-height: 600px;padding: 20px;background:url('http://sbyun.com/skins2/images/login-banner.jpg')  no-repeat top center/cover;">
   <div class="LoginBox">
        <Card :bordered="false">
            <p slot="title">No border title</p>
            <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
        </Card>
    </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  data() {
  return {
    value2: 0
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
#Login{
  .LoginBox{
    padding: 25px;
    position: absolute;
    right: 40px;
    top: 150px;
    width: 355px;
    height: 350px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 3px 4px 4px #F7CD95;
  }
}
</style>