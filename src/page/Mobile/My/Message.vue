<template>
<div id="Message">
    <BackBar></BackBar>
    <pull-to
    :bottom-load-method="loadmore"
    @bottom-state-change="stateChange" class="Apositiom">
    <div class="MainContent">
      <Row class="marginT_40 TextCenter" v-if="MeaasgeList.length<=0">
        <Col span="24" class="TextCenter">
          <Icon type="social-tux" :size="36"></Icon> 暂无数据
        </Col>
      </Row>
      <Alert :show-icon='false'  class="marginT_20" v-for="(Message,MessageIdx) in MeaasgeList" :type="Message.fread==0?'error':'success'">
        <div class="marginT_10">
          <span class="InlineBlock"><b>系统提醒 {{Message.fdate}}</b></span>
          <span class="InlineBlock colorBlue cursorPointer" style="font-size: 12px;float: right;"@click="MarkMessage(Message.id,Message.fread)" >{{Message.fread==0?'标记为已读':'标记为未读'}}</span>
        </div>
        <Icon type="speakerphone" slot="icon"></Icon>
        <template slot="desc">
          {{Message.fcontent}}
        </template>
      </Alert>
      <!-- <Row type="flex" justify="center" class="code-row-bg"  v-if="MeaasgeList.length>0">
        <Col>
          <Page class="marginT_20 marginB_150" :show-sizer="false" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage"></Page>
        </Col>
      </Row> -->
    </div>
    </pull-to>
</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../../components/Mobile/BackBar'
import PullTo from 'vue-pull-to'
import {timestampToFormatTime,MessageChange} from '../../../util/utils'
const BOTTOM_DEFAULT_CONFIG = {
  pullText: '上拉加载',
  triggerText: '释放更新',
  loadingText: '加载中...',
  doneText: '加载完成',
  failText: '加载失败',
  loadedStayTime: 400,
  stayDistance: 50,
  triggerDistance: 70
}
export default {
  data() {
  return {
    Total:0,
    page_num:1,  //页数
    number:10,   //每页条数
    MeaasgeList:[],
    iconLink: ''
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
      BackBar,
      PullTo
    },
  methods: {
    //分页
    changePage(event){//当前页数
      this.page_num = event
      this.getMessage()
    },
    //切换每页条数
    changePageSize(event){
      this.number = event
      this.getMessage()
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
          MessageChange()
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
        if(res.data.arr.length<=0){
            this.MeaasgeList.push()
          }else{
            temp.map((item,idx)=>{
              item.fdate = timestampToFormatTime(item.fdate.time)
              this.MeaasgeList.push(item)
            })
            this.page_num++
          }
        //this.Total = res.data.messageCount
      }).catch((error)=> {
        console.log(error)
      })
    },
    loadmore(loaded) {
      this.getMessage(this.number,this.page_num,this.OrderTab_cur)
      loaded('done');
    },
    stateChange(state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = '#icon-arrow-bottom';
      } else if (state === 'loading') {
        this.iconLink = '#icon-loading';
      } else if (state === 'loaded-done') {
        this.iconLink = '#icon-finish';
      }
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
    margin: 62px auto 80px auto;
  }
  .Apositiom{
    width: 100%;
    position: absolute;
    top: 0;
  }
  
}
</style>