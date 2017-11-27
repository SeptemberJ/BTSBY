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
                      社保资讯
                  </MenuItem>
              </MenuGroup>
          </Menu>
        </Col>
        <Col span="20">
          <Card :bordered="false" dis-hover style="width: 100%">
              <p slot="title">
                  社保知识
              </p>
              <ul>
                  <li v-for="(News,NewsIdx) in newsListInfo" style="margin-top: 10px;">
                      <p @click='newsDetail(News.id)'>{{ News.s_title }}</p>
                      <span style="float: right;">
                          {{ News.sub_time.time }}
                      </span>
                  </li>
              </ul>
          </Card>
          <Page class="marginT_20" :total="Total" show-total style="float: right;" :current="newsPage" @on-change="changePage"></Page>
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