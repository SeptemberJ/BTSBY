<template>
    <div id="NewsPart">
      <Row>
        <Col span="24" class="marginTB_40">
          <h2 class="TextCenter">{{Infor.tits.BigTit}}</h2>
          <p class="TextCenter">{{Infor.tits.SmallTit}}</p>
        </Col>
        <Col span="24">
          <Row>
            <Col span="8">
              <Card :bordered="false" dis-hover>
                <div style="text-align:left">
                    <img :src="Infor.contents.oneNews.img" alt="图片">
                    <h3 class="marginTB_10">{{Infor.contents.oneNews.tit}}</h3>
                    <p>{{Infor.contents.oneNews.abstract}}</p>
                </div>
              </Card>
            </Col>
            <Col span="16">
              <Row>
                <Col class="marginT_10" span="12" v-for="(NewsKind,NewsKindIdx) in Infor.contents.newsList">
                 <!--  <Card style="width:350px"> -->
                 <Card style="width:auto" dis-hover>
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        {{NewsKind.kind}}
                    </p>
                    <a href="#" slot="extra" @click.prevent="LoadMore(NewsKindIdx+1)">
                        更多 <Icon type="chevron-right"></Icon><Icon type="chevron-right"></Icon>
                        
                    </a>
                    <ul>
                        <li v-for="(Article,ArticleIdx) in NewsKind.articles">
                            <a :href="Article.id" target="_blank">{{ Article.tit }}</a>
                        </li>
                    </ul>
                  </Card>
                </Col>
                </Row>
            </Col>
          </Row>
        </Col>
    </Row>
    </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  props:['Infor'],
  data() {
  return {
  }
  },
  created() {

  },
  mounted: function(){
    
    
  
  },
  computed: {
    
  },
  watch:{
  },
  methods: {
    LoadMore(Menu){
      this.$router.push({name:'社保资讯'})
      this.$store.state.newsKind = Menu.toString()
    },
    //获取对应页数新闻
    getNewsData(s_type,page_num){
      axios.get(R_PRE_URL+'/searchArticleList.do?s_type='+s_type+'&page_num=1'
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
  }
};
</script>
<style lang="scss" scoped>
#NewsPart{
  width: 80%;
  margin: 0 auto;
}
</style>