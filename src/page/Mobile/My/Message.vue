<template>
  <div class="Message">
  	<BackBar></BackBar>
    <div class="MainContent">
      <Alert show-icon   class="marginT_20" type="error">
        <div class="marginT_10">
          <span class="InlineBlock"><b>系统提醒 2017-11-08 10:30:27</b></span>
          <span class="InlineBlock colorBlue" style="font-size: 12px;float: right;">标记为已读</span>
        </div>
        <Icon type="speakerphone" slot="icon"></Icon>
        <template slot="desc">
您选择的上海地区201712,201801,201802,201803月份购买社保公积金已生成订单!订单号为：20171108103026000230</template>
      </Alert>
      <Alert show-icon closable="true" @on-close="deleteMsg" class="marginT_20">
        <div class="marginT_10">
          <span class="InlineBlock"><b>系统提醒 2017-11-08 10:30:27</b></span>
          <span class="InlineBlock colorBlue" style="font-size: 12px;float: right;">标记为已读</span>
        </div>
        <Icon type="speakerphone" slot="icon"></Icon>
        <template slot="desc">
您选择的上海地区201712,201801,201802,201803月份购买社保公积金已生成订单!订单号为：20171108103026000230</template>
      </Alert>
    </div>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../../components/Mobile/BackBar'
  export default{
    data: function () {
      return {
      }
    },
    mounted: function () {
      
    },
    created() {
      let ID = this.$router.history.current.params.id
      // axios.get(R_PRE_URL+'/searchArticleInfo.do?id='+ID
      // ).then((res)=> { 
      //   this.Tit = res.data.arr.s_title
      //   this.Time = timestampToFormatTime(res.data.arr.sub_time.time)
      //   this.HtmlContent = res.data.arr.s_content
      // }).catch((error)=> {
      //   console.log(error)
      // })
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      BackBar
      

    },
    methods: {
      deleteMsg(){
        alert('delete---')
      }
    }
  }
</script>
<style lang="scss">
.Message{
  margin-bottom: 130px;
  .MainContent{
    width: 95%;
    margin: 0 auto;
    margin-top: 52px;
    
  }
}
</style>