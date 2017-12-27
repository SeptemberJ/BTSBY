<template>
    <div id="Footer" class="layout-copy marginT_10" v-if="activeRoute!='登录' && activeRoute!='个人注册' && activeRoute!='企业注册' && activeRoute!='HR管理后台(个人)' && activeRoute!='HR管理后台(企业)'">
      <Row>
       <!--  <Col span="24" style="border-top: 1px solid #ddd;">
          <Row>
              <Col span="8">
                <Row>
                    <Col span="8" v-for="(leftList,leftListIdx) in footerInfo.leftList">
                      <Card :bordered="false" dis-hover>
                          <div style="text-align:left">
                              <h4 style="color: #000;">{{leftList.kind}}</h4>
                              <ul class="colorLightBlack">
                                  <li v-for="(child,childIdx) in leftList.childs">
                                      <p>{{ child }}</p>
                                  </li>
                              </ul>
                          </div>
                      </Card>
                    </Col>
                </Row>
              </Col>
              <Col span="8" style="color: #fff;"> mid</Col>
              <Col span="8">
                <Row>
                  <Col  span="12">
                    <Card :bordered="false" dis-hover>
                        <div style="text-align:center">
                            <img src="http://www.ztnet-info.com/images/weixin-icon.jpg" style="width: 120px; height: 120px;">
                            <p>扫我关注官方微信号</p>
                        </div>
                    </Card>
                  </Col>
                  <Col span="12">
                    <Card :bordered="false" dis-hover>
                        <div style="text-align:center">
                            <h3 class="colorRed"><b>400-880-4428</b></h3>
                            <p>周一至周五9:00-18:00</p>
                            <Button type="error" class="marginTB_10">在线咨询客服</Button>
                            <p>意见反馈: service@btzoon.com</p>
                        </div>
                    </Card>
                  </Col>
                </Row>
              </Col>
          </Row>
        </Col> -->
        <Col span="24" style="border-top: 1px solid #ddd;">
          <p class="marginTB_10">
            <span class="colorLightBlack">友情链接</span>
            
            <Button type="text" v-for="(friendLink,friendLinkIdx) in footerInfo.friendLinks" @click="GoFriendLink(friendLink.link)"><a :href="friendLink.link" target = _blank>{{friendLink.name}}</a></Button>
            <!-- <Button type="text" v-for="(friendLink,friendLinkIdx) in footerInfo.friendLinks" @click="GoFriendLink(friendLink.link)">{{friendLink.name}}</Button> -->
          </p>
          <p class="marginTB_10 colorLightBlack">{{footerInfo.address}}</p>
          <p class="colorLightBlack">{{footerInfo.copyRight}}</p>
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
    footerInfo:{}
  }
  },
  created(){
    axios.get(PRE_URL+'static/json/Footer.json'
        ).then((res)=> {
          this.footerInfo = res.data.footerInfo
      }).catch((error)=> {
        console.log(error)
      })
  },
  mounted: function(){
    
  
  },
  computed: {
    activeRoute(){
      return this.$store.state.activeRoute
    }
    
  },
  watch:{
  },
  methods: {
    GoFriendLink(){
    }
  }
};
</script>
<style lang="scss" scoped>
#Footer{
  width: 100%;
  margin: 0 auto;
  a{
    color: #6d7380;
    &:hover{
      color: #39f;
    }
  }
}
</style>