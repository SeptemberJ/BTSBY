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
            <li v-for="item in policyList">
                <a @click="GoArticleDetail(item.id)" class="ellipsis" style="color: #333;">{{ item.title }}</a>
                <span style="float: right;">
                    {{item.date}}
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
  export default{
    data: function () {
      return {
        policyList: [
            {
                title: '关于深圳重特大疾病补充保险续保通知',
                date:'2017-09-09',
                id: 0
            },
            {
                title: '中小微企业经营管理平台和社保云正式上线',
                date:'2017-09-09',
                id: 1
            },
        ]
      }
    },
    mounted: function () {
      
    },
    created() {
      
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
            this.$store.state.PeripheryTab_cur = 3
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
    width:200px; 
    overflow:hidden; 
    text-overflow:ellipsis;
    display: inline-block;
}
</style>