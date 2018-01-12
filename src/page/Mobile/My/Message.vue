<template>
<div id="Message">
    <BackBar></BackBar>
    <div class="MainContent">
      <!-- <h3>
        <span style="font-size: 18px;">
          <Icon type="ios-bell" size='24'></Icon>
          消息通知
        </span>
      </h3> -->
      <Row class="marginT_40 TextCenter" v-if="MeaasgeList.length<=0">
        <Col span="24" class="TextCenter">
          <Icon type="social-tux" :size="36"></Icon> 暂无数据
        </Col>
      </Row>
      <Alert show-icon  class="marginT_20" v-for="(Message,MessageIdx) in MeaasgeList" :type="Message.fread==0?'error':'success'">
        <div class="marginT_10">
          <span class="InlineBlock"><b>系统提醒 {{Message.fdate}}</b></span>
          <span class="InlineBlock colorBlue" style="font-size: 12px;float: right;"@click="MarkMessage(Message.id,Message.fread)" >{{Message.fread==0?'标记为已读':'标记为未读'}}</span>
        </div>
        <Icon type="speakerphone" slot="icon"></Icon>
        <template slot="desc">
          {{Message.fcontent}}
        </template>
      </Alert>
      <Row type="flex" justify="center" class="code-row-bg"  v-if="MeaasgeList.length>0">
        <Col>
          <Page class="marginT_20" :show-sizer="false" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage"></Page>
        </Col>
      </Row>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../../components/Mobile/BackBar'
import {timestampToFormatTime} from '../../../util/utils'
export default {
  data() {
  return {
    Total:0,
    page_num:1,  //页数
    number:10,   //每页条数
    MeaasgeList:[]
  }
  },
  created(){
    this.getMessage()
  },
  mounted: function(){
    
  
  },
  computed: {
    
  },
  watch:{
  },
  components: {
      BackBar
    },
  methods: {
    //分页
    changePage(event){//当前页数
      this.page_num = event
      this.getDataOrder()
    },
    //切换每页条数
    changePageSize(event){
      this.number = event
      this.getDataOrder()
    },
    MarkMessage(ID,Fread){
      let TFread
      if(Fread==0){
        TFread=1
      }else{
        TFread=0
      }
      axios.get(R_PRE_URL+'/updateMessage.do?id='+ID+'&fread='+TFread
      ).then((res)=> {
        if(res.data.result == 2){
          this.$Message.success('标记成功！')
          this.getMessage()
        }else{
          this.$Message.error('标记失败！')
        }

      }).catch((error)=> {
        console.log(error)
      })
    },
    //获取消息
    getMessage(){
      axios.get(R_PRE_URL+'/serMessageList.do?member_id='+this.$store.state.userInfo.member_id+'&number='+this.number+'&page_num='+this.page_num
      ).then((res)=> {
        let temp = res.data.arr
        temp.map((item,idx)=>{
          item.fdate = timestampToFormatTime(item.fdate.time)
        })
        this.MeaasgeList = temp
        this.Total = res.data.messageCount

      }).catch((error)=> {
        console.log(error)
      })
    },
    deleteMsg(){
      alert('delete---')
    }
   
  },
};
</script>
<style lang="scss" scoped>
#Message{
  margin-bottom: 130px;
  .MainContent{
    width: 95%;
    margin: 62px auto 0 auto;
  }
}
</style>