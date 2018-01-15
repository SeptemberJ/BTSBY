<template>
  <div class="PolicyUnscramble">
    <Card>
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            政策解读
        </p>
        <a href="#" slot="extra" @click.prevent="LoadMore">
            <Icon type="more"></Icon>
            
        </a>
        <ul>
            <li v-for="item in policyList" @click="GoArticleDetail(item.id)" >
                <a class="ellipsis" style="color: #333;">{{ item.s_title }}</a>
                <span style="float: right;">
                    {{item.sub_time.time}}
                </span>
            </li>
        </ul>
    </Card>
    <BlankBar></BlankBar>
  </div> 


</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BlankBar from './BlankBar'
import {timestampToFormatTime} from "../../util/utils"
  export default{
    data: function () {
      return {
        policyList: []
      }
    },
    mounted: function () {
      
    },
    created() {
      axios.get(R_PRE_URL+'/searchArticleList.do?s_type=4&page_num=1'
      ).then((res)=> {
        res.data.arr.map(function(item,idx){
          item.sub_time.time = timestampToFormatTime(item.sub_time.time)
        })
        this.policyList = res.data.arr
      }).catch((error)=> {
        console.log(error)
      })
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      BlankBar
      

    },
    methods: {
        LoadMore(){
            this.$store.state.PeripheryTab_cur = 4
            this.$router.push({name:'社保周边'})
        },
        GoArticleDetail(ID){
            this.$router.push({name:'详情',params:{id:ID}})
        }
    }
  }
</script>
<style lang="scss">
.PolicyUnscramble{

}
.ellipsis{
    white-space:nowrap; 
    width:50%; 
    overflow:hidden; 
    text-overflow:ellipsis;
    display: inline-block;
}
</style>