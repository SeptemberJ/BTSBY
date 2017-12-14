<template>
  <div class="PeripheryTab">
	 <BackBar></BackBar>
   <div class="MainContent">
      <Row type="flex" justify="space-around" class="code-row-bg" style="height: 35px;line-height: 35px;">
        <Col span="4" class="TextCenter" v-bind:class="{tab_active:PeripheryTab_cur==0}"><span @click="ChangeTab(0)">社保知识</span></Col>
        <Col span="4" class="TextCenter" v-bind:class="{tab_active:PeripheryTab_cur==1}"><span @click="ChangeTab(1)">案例分析</span></Col>
        <Col span="4" class="TextCenter" v-bind:class="{tab_active:PeripheryTab_cur==2}"><span @click="ChangeTab(2)">常见问题</span></Col>
        <Col span="4" class="TextCenter" v-bind:class="{tab_active:PeripheryTab_cur==3}"><span @click="ChangeTab(3)">社保快讯</span></Col>
      </Row>
      <!-- <BlankBar></BlankBar> -->
      <div class="List marginTB_20">
        <Row  v-for="(item, idx) in ArticleList">
          <div class="ListItem marginT_10" @click="ToDetail(item.id)">
            <Col span="4"><img src="static/img/ICON01.jpg"></Col>
            <Col span="14">
              <h4>{{item.title}}</h4>
              <p class="">{{item.content}}</p>
            </Col>
            <Col span="4">
              <Icon type="chevron-right" style="float: right;"></Icon>
            </Col>
          </div>
        </Row>
      </div>
   </div>
   <!-- 返回顶部 -->
   <BackTop :height="100" :bottom="200">
        <div class="top"><Icon type="android-arrow-dropup" :size="24"></Icon></div>
   </BackTop>
  </div> 
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import BackBar from '../../components/Mobile/BackBar'
import BlankBar from '../../components/Mobile/BlankBar'
  export default{
    data: function () {
      return {
        theme1:'light',
        ArticleList:[
          {title:'我国失业保险政策详细解读',id:0,content:'失业保险政策问答1、什么是失业保险?失业保险是指国家通过立法'},
          {title:'我国失业保险政策详细解读',id:1,content:'失业保险政策问答1、什么是失业保险?失业保险是指国家通过立法'},
          {title:'我国失业保险政策详细解读',id:2,content:'失业保险政策问答1、什么是失业保险?失业保险是指国家通过立法'},
          {title:'我国失业保险政策详细解读',id:3,content:'失业保险政策问答1、什么是失业保险?失业保险是指国家通过立法'}
        ]
      }
    },
    mounted: function () {
      
    },
    created() {
      //this.getListData(this.$store.state.PeripheryTab_cur)
      
    },
    computed: {
      PeripheryTab_cur(){
        return this.$store.state.PeripheryTab_cur
      }
      
    },
    watch: {
      
    },
    components: {
      BackBar,
      BlankBar
      

    },
    methods: {
      ChangeTab(KIND){
        switch(KIND){
          case 0:
          this.$store.state.PeripheryTab_cur = 0
          //this.getListData(0)
          break
          case 1:
          this.$store.state.PeripheryTab_cur = 1
          //this.getListData(1)
          break
          case 2:
          this.$store.state.PeripheryTab_cur = 2
          //this.getListData(2)
          break
          case 3:
          this.$store.state.PeripheryTab_cur = 3
          //this.getListData(3)
          break
        }

      },
      //详情页
      ToDetail(ID){
        this.$router.push({name:'详情',params: {id:ID}})
      },
      //获取数据
      getListData(KIND){
        axios.get(R_PRE_URL+'/searchCityList.do'
        ).then((res)=> { 
          this.ArticleList = res.data.arr
        }).catch((error)=> {
          console.log(error)
        })
      },

    }
  }
</script>
<style lang="scss">
.PeripheryTab{
  margin-bottom: 130px;
  .MainContent{
    width: 100%;
    margin-top: 42px;
    span{
      width: 100%;
      height: 100%;
      display: inline-block;
    }
    .tab_active{
      font-weight: bold;
      color: #39f;
      border-bottom: 2px solid #39f;
    }
    .List{
      padding: 0 10px;
      .ListItem{
        display: flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        border-bottom: 1px solid #eee;
        h4,p{
          white-space:nowrap; 
          width:200px; 
          overflow:hidden; 
          text-overflow:ellipsis;
          display: inline-block;
        }
      }

    }
  }
  .top{
        padding: 0px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 50%;
    }
  
}

</style>