<template>
  <div class="ArticleDetail">
  	<BackBar></BackBar>
    <div class="MainContent">
      <h3 class="TextCenter attachInfo">{{Tit}}</h3>
      <p  class="TextCenter marginB_20 attachInfo">{{Time}}</p>
      <div class="content" v-html="HtmlContent"></div>   
      <!-- <h2 class="TextCenter marginT_10">{{ArticleInfo.title}}</h2>
      <p class="TextCenter">{{ArticleInfo.date}}</p>
      <div class="content" v-html="ArticleInfo.content"></div> -->
    </div>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../components/Mobile/BackBar'
import {timestampToFormatTime} from "../../util/utils";
  export default{
    data: function () {
      return {
        ArticleInfo:{
          title:'关于深圳重特大疾病补充保险续保通知',
          date:'2017-09-09',
          content:'<span style=";font-family:宋体;font-size:19px">据深圳市人社局通知，2016年-2017年深圳20元重疾补充保险5月份开始参保。保障时间为2016年7月1日至2017年6月30日。5月1日至6月30日深圳市社会医疗保险参保人，不分户籍、年龄以及是否已经患病，均可依照自愿原则，通过团体办理、个人账户划扣、个人自费3种方式办理参保缴费，分别办理方式如下：</span>'
        },
        Tit:'',
        Time:'',
        HtmlContent:''
      }
    },
    mounted: function () {
      
    },
    created() {
      let ID = this.$router.history.current.params.id
      axios.get(R_PRE_URL+'/searchArticleInfo.do?id='+ID
      ).then((res)=> { 
        this.Tit = res.data.arr.s_title
        this.Time = timestampToFormatTime(res.data.arr.sub_time.time)
        this.HtmlContent = res.data.arr.s_content
      }).catch((error)=> {
        console.log(error)
      })
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      BackBar
      

    },
    methods: {
    }
  }
</script>
<style lang="scss">
.ArticleDetail{
  margin-bottom: 130px;
  .MainContent{
    width: 80%;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin: 0px auto;
    margin-top: 52px;
    attachInfo{
      width: 100%;
    }
    .content{
      width: 100%;
      text-align: left;
    }
  }
}
</style>