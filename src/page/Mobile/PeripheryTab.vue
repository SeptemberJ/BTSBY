<template>
  <div class="PeripheryTab">
   <BackBar></BackBar>
   <div class="MainContent">

       <Row type="flex" justify="space-around" class="code-row-bg" style="height: 35px;line-height: 35px;position: relative;z-index: 999;background-color: #fff;">
        <Col span="4" class="TextCenter" v-bind:class="{tab_active:PeripheryTab_cur==1}"><span @click="ChangeTab(1)">社保知识</span></Col>
        <Col span="4" class="TextCenter" v-bind:class="{tab_active:PeripheryTab_cur==2}"><span @click="ChangeTab(2)">案例分析</span></Col>
        <Col span="4" class="TextCenter" v-bind:class="{tab_active:PeripheryTab_cur==3}"><span @click="ChangeTab(3)">常见问题</span></Col>
        <Col span="4" class="TextCenter" v-bind:class="{tab_active:PeripheryTab_cur==4}"><span @click="ChangeTab(4)">社保快讯</span></Col>
      </Row>
    
      
      <BlankBar></BlankBar>
      <!-- <pull-to :bottom-load-method="LoadMore" style="height: 100%;"> -->
        <div class="List marginTB_20">
          <Row  v-for="(item, idx) in newsListInfo">
            <div class="ListItem marginT_10" @click="ToDetail(item.id)">
              <Col span="4"><img :src="preImg"></Col>
              <Col span="14">
                <h4>{{item.s_title}}</h4>
              </Col>
              <Col span="4">
                <Icon type="chevron-right" style="float: right;"></Icon>
              </Col>
            </div>
          </Row>
          
        </div>
      <!-- </pull-to> -->
   </div>

   <Row type="flex" justify="center" class="code-row-bg" v-if="Total>0">
        <Col>
          <Page :total="Total" :page-size="2" size="small" show-total :current="newsPage"  @on-change="changePage"></Page>
        </Col>
    </Row>

    <Row type="flex" justify="center" class="code-row-bg" v-else>
        <Col span="24" class="TextCenter">
          <Icon type="social-tux" :size="36"></Icon> 暂无数据
        </Col>
    </Row>
   

   <!-- 返回顶部 -->
   <BackTop :height="100" :bottom="200">
        <div class="top"><Icon type="android-arrow-dropup" :size="24"></Icon></div>
   </BackTop>

   <!-- <Button style="position: absolute;bottom:80px;" type="text" @click="LoadMore">加载更多</Button> -->
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../components/Mobile/BackBar'
import BlankBar from '../../components/Mobile/BlankBar'
import PullTo from 'vue-pull-to'
import {timestampToFormatTime} from "../../util/utils"
// const BOTTOM_DEFAULT_CONFIG = {
//   pullText: '上拉加载',
//   triggerText: '释放更新',
//   loadingText: '加载中...',
//   doneText: '加载完成',
//   failText: '加载失败',
//   loadedStayTime: 400,
//   stayDistance: 60,
//   triggerDistance: 130
// }
  export default{
    data: function () {
      return {
        theme1:'light',
        Total:0,
        Page:1,
        newsListInfo:[],
        // ArticleList:[]
      }
    },
    mounted: function () {
      
    },
    created() {
      this.getListData(this.$store.state.PeripheryTab_cur,this.$store.state.newsPage)
      
    },
    computed: {
      PeripheryTab_cur(){
        return this.$store.state.PeripheryTab_cur
      },
      preImg(){
        let ImgSrc = 'static/img/ICON0'+ this.$store.state.PeripheryTab_cur +'.jpg'
        return ImgSrc
      },
      newsPage(){
        return this.$store.state.newsPage
      },
      
    },
    watch: {
      
    },
    components: {
      BackBar,
      BlankBar,
      PullTo
    },
    methods: {
      ChangeTab(KIND){
          this.$store.state.PeripheryTab_cur = KIND
          this.$store.state.newsPage = 1
          this.Page = 1
          this.getListData(KIND,1)
      },
      //详情页
      ToDetail(ID){
        this.$router.push({name:'详情',params: {id:ID}})
      },
      //分页
      changePage(event){//当前页数
        this.$store.state.newsPage = event
        this.getListData(this.$store.state.newsKind,event)
      },
      //获取数据
      getListData(KIND,PAGE){
        axios.get(R_PRE_URL+'/searchArticleList.do?s_type='+KIND+'&page_num='+PAGE
        ).then((res)=> { 
          this.Total = res.data.article_count
          if(res.data.article_count>0){
            res.data.arr.map(function(item,idx){
              item.sub_time.time = timestampToFormatTime(item.sub_time.time)
            })
          }
          this.newsListInfo = res.data.arr
        }).catch((error)=> {
          console.log(error)
        })
      },
      //获取数据下拉
      // getListData2(KIND,PAGE){
      //   let _this = this
      //   let Type = KIND + 1
      //   axios.get(R_PRE_URL+'/searchArticleList.do?s_type='+Type+'&page_num='+PAGE
      //   ).then((res)=> { 
      //     this.Total = res.data.article_count
      //     if(res.data.arr.length>0){
      //       res.data.arr.map(function(item,idx){
      //         item.sub_time.time = timestampToFormatTime(item.sub_time.time)
      //         _this.newsListInfo.push(item)
      //       })
      //       this.Page++
      //     }else{
      //        this.Page = -1
      //        this.$Message.warning('到底了!');
      //     }
          
      //     this.newsListInfo = res.data.arr
      //   }).catch((error)=> {
      //     console.log(error)
      //   })
      // },
      // LoadMore(loaded){
      //   if(this.Page != -1){
      //     this.getListData(this.$store.state.PeripheryTab_cur,this.Page)
      //     loaded('done');
      //   }else{
      //     this.$Message.warning('到底了!');
      //     loaded('done');
      //   }
      // }
         

    }
  }
</script>
<style lang="scss">
.PeripheryTab{
  width: 100%;
  margin-bottom: 130px;
  display: block;
  height: 100%;
  .MainContent{
    width: 100%;
    min-height: 100%;
    margin-top: 42px;
    span{
      width: 100%;
      height: 100%;
      display: inline-block;
    }
    .tab_active{
      font-weight: bold;
      color: #39f;
      border-bottom: 2px solid #39f;
    }
    .List{
      padding: 0 10px;
      .ListItem{
        display: flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        border-bottom: 1px solid #eee;
        h4,p{
          white-space:nowrap; 
          width:200px; 
          overflow:hidden; 
          text-overflow:ellipsis;
          display: inline-block;
        }
      }

    }
  }
  .top{
        padding: 0px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 50%;
    }
  
}
.ivu-affix{
  width: 100% !important;
}
.vue-pull-to-wrapper{
  height: 100% !important;
}
.view-wrapper{
  box-sizing: border-box;
    padding-top: 50px;
    height: 100%;
    background: #f6f6f6;
}

</style>