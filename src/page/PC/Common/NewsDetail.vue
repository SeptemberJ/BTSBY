<template>
  <div id="NewsDetail">
    <h3>{{Tit}}</h3>
    <p>{{Time}}</p>
    <div class="content" v-html="HtmlContent"></div>   
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {timestampToFormatTime} from "../../../util/utils";
export default {
  data() {
  return {
    Tit:'',
    Time:'',
    HtmlContent:''
  }
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
  mounted: function(){
    //console.log(this.$router.history.current.params.id)  
  
  },
  computed: {

  },
  watch:{
  },
  methods: {
    
    
  }
};
</script>
<style lang="scss" scoped>
#NewsDetail{
  width: 80%;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin: 20px auto;
  h3,p{
    width: 100%;
    margin-bottom: 10px;
    text-align: center;
  }
  .content{
    width: 100%;
    text-align: left;
  }

}

  

</style>