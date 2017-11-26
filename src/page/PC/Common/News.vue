<template>
  <div id="News">
    <Carousel></Carousel>
    <CommonThree></CommonThree>
    <div class="tab">
      <Row>
        <Col span="4">
          <Menu  active-name="1" style="width: auto;" @on-select="tabChange">
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
                  <li v-for="item in movieList" style="margin-top: 10px;">
                      <a :href="item.url" target="_blank">{{ item.name }}</a>
                      <span style="float: right;">
                          {{ item.rate }}
                      </span>
                  </li>
              </ul>
          </Card>
          <Page :total="100" show-total style="float: right;" @on-change="changePage"></Page>
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

export default {
  data() {
  return {
    IdividualInfor:{},
    movieList: [
            {
                name: '标题',
                url: 'https://movie.douban.com/subject/1292052/',
                rate: '2017-07-07'
            },
            {
                name: '标题',
                url: 'https://movie.douban.com/subject/1292052/',
                rate: '2017-07-07'
            },
            ]
  }
  },
  created() {
    // axios.get(PRE_URL+'static/json/Individual.json'
    //     ).then((res)=> {
    //       this.IdividualInfor = res.data
    //   }).catch((error)=> {
    //     console.log(error)
    //   })
  },
  mounted: function(){

    
  
  },
  computed: {
    
  },
  watch:{
  },
  components: {
      Carousel,
      CommonThree
  },
  methods: {
    tabChange(event){
      alert(event)  //tab的name值

    },
    changePage(event){
      console.log(event)  //当前页数
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