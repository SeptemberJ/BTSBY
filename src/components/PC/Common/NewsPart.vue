<template>
    <div id="NewsPart">
      <Row>
        <Col span="24" class="marginTB_40">
          <h2 class="TextCenter">{{Infor.tit.BigTit}}</h2>
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
                  <Card style="width:350px">
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        {{NewsKind.kind}}
                    </p>
                    <a href="#" slot="extra" @click.prevent="changeLimit">
                        <Icon type="ios-loop-strong"></Icon>
                        更多
                    </a>
                    <ul>
                        <li v-for="(Article,ArticleIdx) in NewsKind.articles">
                            <a :href="Article.id" target="_blank">{{ Article.tit }}</a>
                            <!-- <span>
                                <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                                {{ item.rate }}
                            </span> -->
                        </li>
                    </ul>
                  </Card>
                </Col>
                </Row>
              <!-- <Card :bordered="false" dis-hover>
                <div style="text-align:center">
                    <img :src="Content" alt="图片">
                </div>
              </Card> -->
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
    // IndexInfor:{}
  }
  },
  created() {
    // axios.get(PRE_URL+'static/json/Index.json'
    //   ).then((res)=> {
    //     this.IndexInfor = res.data
    // }).catch((error)=> {
    //   console.log(error)
    // })
  },
  mounted: function(){
    
    
  
  },
  computed: {
    
  },
  watch:{
  },
  methods: {
    changeLimit () {
      
    }
  }
};
</script>
<style lang="scss" scoped>
#NewsPart{
  width: 80%;
  margin: 0 auto;
}
</style>