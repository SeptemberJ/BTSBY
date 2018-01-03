<template>
  <div id="News">
    <Carousel></Carousel>
    <CommonThree></CommonThree>
    <div class="tab">
      <Row>
        <Col span="4">
          <Menu  :active-name="newsKind" style="width: auto;" @on-select="tabChange">
              <MenuGroup title="">
                  <MenuItem name="1">
                      <Icon type="document-text"></Icon>
                      社保知识
                  </MenuItem>
                  <MenuItem name="2">
                      <Icon type="chatbubbles"></Icon>
                      案例分析
                  </MenuItem>
                  <MenuItem name="3">
                      <Icon type="document-text"></Icon>
                      常见问题
                  </MenuItem>
                  <MenuItem name="4">
                      <Icon type="chatbubbles"></Icon>
                      社保快讯
                  </MenuItem>
              </MenuGroup>
          </Menu>
        </Col>
        <Col span="20">
          <Card :bordered="false" dis-hover style="width: 100%">
              <p slot="title">
                  {{newsKind==1?'社保知识':(newsKind==2?'案例分析':(newsKind==3?'常见问题':'社保快讯'))}}
              </p>
              <ul v-if="newsListInfo.length>0">
                  <li v-for="(News,NewsIdx) in newsListInfo" @click='newsDetail(News.id)' style="margin-top: 10px;cursor: pointer;">
                      <span >{{ News.s_title }}</span>
                      <span style="float: right;">
                          {{ News.sub_time.time }}
                      </span>
                  </li>
              </ul>
              <div v-else class="TextCenter">
                <Icon type="social-tux" :size="36"></Icon> 暂无数据
              </div>
          </Card>
          <Page class="marginT_20" :total="Total" show-total style="float: right;" :current="newsPage"  @on-change="changePage" @on-page-size-change="" v-if="newsListInfo.length>0"></Page>
        </Col>
      </Row>
    </div>
    
    
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import Carousel from '../../../components/PC/Common/Carousel'
import CommonThree from '../../../components/PC/Common/CommonThree'
import {timestampToFormatTime} from "../../../util/utils"

export default {
  data() {
  return {
  	Total:0,
    newsListInfo:[],
  }
  },
  created() {
    //手机端自动跳转手机端首页
    if(this.$store.state.isMobile){
      this.$router.push({name:'首页'})
    }
    this.getNewsData(this.$store.state.newsKind,this.$store.state.newsPage)
  },
  mounted: function(){

    
  
  },
  computed: {
  	newsKind(){
  		return this.$store.state.newsKind
  	},
  	newsPage(){
  		return this.$store.state.newsPage
  	},
    
  },
  watch:{
  },
  components: {
      Carousel,
      CommonThree
  },
  methods: {
    tabChange(event){
      //tab的name值
      this.$store.state.newsKind = event
      this.getNewsData(event,1)

    },
    changePage(event){//当前页数
      this.$store.state.newsPage = event
      this.getNewsData(this.$store.state.newsKind,event)
    },
    changePageSize(event){
      this.number = event
      this.getNewsData(this.$store.state.newsKind,event)
    },
    //获取对应页数新闻
    getNewsData(s_type,page_num){
      axios.get(R_PRE_URL+'/searchArticleList.do?s_type='+s_type+'&page_num='+page_num
      ).then((res)=> { 
        this.Total = res.data.article_count
        res.data.arr.map(function(item,idx){
          item.sub_time.time = timestampToFormatTime(item.sub_time.time)
        })
        this.newsListInfo = res.data.arr
      }).catch((error)=> {
        console.log(error)
      })
     },
     //咨询详情
     newsDetail(ID){
        this.$router.push({name:'资讯详情',params: {id:ID}});
    }
  },
};
</script>
<style lang="scss" scoped>
#News{
  .tab{
    width: 80%;
    margin: 0 auto;
  }
  
}
</style>