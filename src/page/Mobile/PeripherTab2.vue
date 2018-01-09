<template>
  <div class="PeripheryTab">
	 <BackBar></BackBar>
   <div class="MainContent">
      <Row type="flex" justify="space-around" class="code-row-bg" style="height: 35px;line-height: 35px;">
        <Col span="4" class="TextCenter" v-bind:class="{tab_active:PeripheryTab_cur==0}"><span @click="ChangeTab(0)">社保知识</span></Col>
        <Col span="4" class="TextCenter" v-bind:class="{tab_active:PeripheryTab_cur==1}"><span @click="ChangeTab(1)">案例分析</span></Col>
        <Col span="4" class="TextCenter" v-bind:class="{tab_active:PeripheryTab_cur==2}"><span @click="ChangeTab(2)">常见问题</span></Col>
        <Col span="4" class="TextCenter" v-bind:class="{tab_active:PeripheryTab_cur==3}"><span @click="ChangeTab(3)">社保快讯</span></Col>
      </Row>
      <!-- <BlankBar></BlankBar> -->
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
   </div>
   <!-- 返回顶部 -->
   <BackTop :height="100" :bottom="200">
        <div class="top"><Icon type="android-arrow-dropup" :size="24"></Icon></div>
   </BackTop>
   <Button style="position: absolute;bottom:80px;" type="text" @click="LoadMore">加载更多</Button>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../components/Mobile/BackBar'
import BlankBar from '../../components/Mobile/BlankBar'
import {timestampToFormatTime} from "../../util/utils"
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
      this.getListData(this.$store.state.PeripheryTab_cur,1)
      
    },
    computed: {
      PeripheryTab_cur(){
        return this.$store.state.PeripheryTab_cur
      },
      preImg(){
        let ImgSrc = 'static/img/ICON0'+ (Number(this.$store.state.PeripheryTab_cur)+1) +'.jpg'
        return ImgSrc
      }
      
    },
    watch: {
      
    },
    components: {
      BackBar,
      BlankBar,
    },
    methods: {
      ChangeTab(KIND){
        switch(KIND){
          case 0:
          this.$store.state.PeripheryTab_cur = 0
          this.newsListInfo = []
          this.Page = 1
          this.getListData(0,1)
          break
          case 1:
          this.$store.state.PeripheryTab_cur = 1
          this.newsListInfo = []
          this.Page = 1
          this.getListData(1,1)
          break
          case 2:
          this.$store.state.PeripheryTab_cur = 2
          this.newsListInfo = []
          this.Page = 1
          this.getListData(2,1)
          break
          case 3:
          this.$store.state.PeripheryTab_cur = 3
          this.newsListInfo = []
          this.Page = 1
          this.getListData(3,1)
          break
        }
      },
      //详情页
      ToDetail(ID){
        this.$router.push({name:'详情',params: {id:ID}})
      },
      //获取数据
      getListData(KIND,PAGE){
        let _this = this
        let Type = KIND + 1
        axios.get(R_PRE_URL+'/searchArticleList.do?s_type='+Type+'&page_num='+PAGE
        ).then((res)=> { 
          this.Total = res.data.article_count
          if(res.data.arr.length>0){
            res.data.arr.map(function(item,idx){
              item.sub_time.time = timestampToFormatTime(item.sub_time.time)
              _this.newsListInfo.push(item)
            })
            this.Page++
          }else{
            this.Page = -1
            this.$Message.warning('到底了!');
          }
          
          //this.newsListInfo = res.data.arr
        }).catch((error)=> {
          console.log(error)
        })
      },
      LoadMore(){
        if(this.Page != -1){
          this.getListData(this.$store.state.PeripheryTab_cur,this.Page)
        }else{
          this.$Message.warning('到底了!');
        }
      }
         

    }
  }
</script>
<style lang="scss">
.PeripheryTab{
  margin-bottom: 130px;
  display: block;
  .MainContent{
    width: 100%;
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

</style>