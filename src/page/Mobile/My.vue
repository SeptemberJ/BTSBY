<template>
  <div class="My">
  	<TitBar></TitBar>
    <div class="MainContent">
      <Row class="TopBlock">
        <Col span="24" class="TextCenter">
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="small"/>
        </Col>
        <div @click="UserName?'':ToLogin()"><Col span="24" class="TextCenter marginTB_10">{{UserName?UserName:'点击登录'}}</Col></div>

      </Row>
      <!-- middle two -->
      <Row class="MiddleTwo">
        <div  @click="GoModule(-1)">
          <Col span="12" class="TextCenter" style="border-right: 1px solid #ddd;">
            <Avatar src="static/img/qiangbao.png" size="small"/>
            <h4>我的订单</h4>
          </Col>
        </div>
        <div  @click="GoModule(-2)">
          <Col span="12" class="TextCenter">
            <Avatar src="static/img/tbjl.png" size="small"/>
            <h4>投保记录</h4>
          </Col>
        </div>
      </Row>

      <BlankBar></BlankBar>

      <!-- list -->
      <div class="List">
        <Row :gutter="16" class="ListItem">
          <div  @click="GoModule(0)">
            <Col span="4" class="TextCenter"><Avatar src="static/img/wdqb.png" size="small"/></Col>
            <Col span="12">我的钱包</Col>
            <Col span="8" class="TextRight"><Icon type="chevron-right"></Icon></Col>
          </div>
        </Row>
        <Row :gutter="16" class="ListItem">
          <div  @click="GoModule(1)">
            <Col span="4" class="TextCenter"><Avatar src="static/img/grzl.png" size="small"/></Col>
            <Col span="12">个人资料</Col>
            <Col span="8" class="TextRight"><Icon type="chevron-right"></Icon></Col>
          </div>
        </Row>
        <Row :gutter="16" class="ListItem">
          <div  @click="GoModule(2)">
            <Col span="4" class="TextCenter"><Avatar src="static/img/xgmm.png" size="small"/></Col>
            <Col span="12">修改密码</Col>
            <Col span="8" class="TextRight"><Icon type="chevron-right"></Icon></Col>
          </div>
        </Row>
      </div>
      <BlankBar></BlankBar>
      <div class="List">
        <Row :gutter="16" class="ListItem">
          <div  @click="GoModule(3)">
            <Col span="4" class="TextCenter"><Avatar src="static/img/xxtx.png" size="small"/></Col>
            <Col span="12">我的消息</Col>
            <Col span="8" class="TextRight">
              <Badge :count="MessageCount" class-name="demo-badge-alone"></Badge>
              <Icon type="chevron-right"></Icon>
            </Col>
          </div>
        </Row>
        <Row :gutter="16" class="ListItem">
          <div  @click="GoModule(4)">
            <Col span="4" class="TextCenter"><Avatar src="static/img/yjfk.png" size="small"/></Col>
            <Col span="12">意见反馈</Col>
            <Col span="8" class="TextRight"><Icon type="chevron-right"></Icon></Col>
          </div>
        </Row>
        <Row :gutter="16" class="ListItem">
          <div  @click="GoModule(5)">
            <Col span="4" class="TextCenter"><Avatar src="static/img/gysby.png" size="small"/></Col>
            <Col span="12">关于社保云</Col>
            <Col span="8" class="TextRight"><Icon type="chevron-right"></Icon></Col>
          </div>
        </Row>
      </div>
      <Button type="error" long class="marginTB_40" @click="Logout">退出登录</Button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import TitBar from '../../components/Mobile/TitBar'
import BlankBar from '../../components/Mobile/BlankBar'
import {clearCookie} from '../../util/utils'
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
      UserName(){
        return this.$store.state.userInfo.username
      },
      MessageCount(){
        return this.$store.state.MessageCount
      },
      
    },
    watch: {
      
    },
    components: {
      TitBar,
      BlankBar
      

    },
    methods: {
      GoModule(KIND){
        switch(KIND){
          case -1:
          if(this.$store.state.userInfo.register_type==0){
            this.$router.push({name:'我的订单(个人)'})
          }else{
            this.$router.push({name:'我的订单(企业)'})
          }
          break
          case -2:
          this.$router.push({name:'投保记录'})
          break
          case 0:
          this.$router.push({name:'我的钱包'})
          break
          case 1:
          this.$router.push({name:'个人资料'})
          break
          case 2:
          this.$router.push({name:'修改密码'})
          break
          case 3:
          this.$router.push({name:'我的消息'})
          break
          case 4:
          this.$router.push({name:'意见反馈'})
          break
          case 5:
          this.$router.push({name:'社保服务介绍'})
          break
        }
      },
      Logout(){
        localStorage.clear();
        this.$store.state.userInfo.username = ''
        this.$store.state.userInfo.member_id = ''
        this.$store.state.ifLogined = false
        this.$router.push({name:'首页'})
        clearCookie('btsby_cookie')
      },
      ToLogin(){
        this.$router.push({name:'登录'})
      }
    },
    
  }
</script>
<style lang="scss">
.My{
  margin-bottom: 130px;
  .MainContent{
    width: 100%;
    margin: 0 auto;
    margin-top: 40px;
    text-align: center;
    button{
      width: 80%;
    }
    .TopBlock{
      color: #fff;
      background-color: #3399ff;
      background-image: linear-gradient(180deg, #3399ff 25%, #FFE32C 100%);
      img{
        width: 82px;
        height: 82px;
        margin: 10px auto 0 auto;
        border-radius: 50%;
      }
    }
    .MiddleTwo{
      padding: 5px;
      img{
        width: 35px;
        height: 35px;
        margin: 5px auto;
      }
      h4{
        color: #39f;
      }
    }
    .List{
      width: 95%;
      margin: 0 auto;
      .ListItem{
        height: 45px;
        line-height: 45px;
        overflow: hidden;
        text-align: left;
        border-bottom: 1px solid #ddd;
        img{
          width: 32px;
          height: 32px;
          margin-top: 5px;
        }
      }
      .demo-badge-alone{

      }
    }
  }

}
</style>