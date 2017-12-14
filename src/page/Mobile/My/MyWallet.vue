<template>
  <div class="MyWallet">
  	<BackBar></BackBar>
    <div class="MainContent">
      <Row class="TopBlock">
        <Col span="24" class="TextCenter">
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="small"/>
        </Col>
        <Col span="24" class="TextCenter marginT_10"><h2>账户余额</h2></Col>
        <Col span="24" class="TextCenter"><h1>¥{{Balance}}</h1></Col>
      </Row>
      <Button type="success" long @click="ToCostRecord">消费记录</Button>
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
        Balance:0
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
      ToCostRecord(){
        this.$router.push({name:'消费记录'})
      }
    }
  }
</script>
<style lang="scss">
.MyWallet{
  margin-bottom: 130px;
  .MainContent{
    width: 100%;
    margin-top: 52px;
    text-align: center;
    img{
        width: 82px;
        height: 82px;
        margin: 10px auto 0 auto;
      }
    button{
      width: 80%;
      margin-top: 40px;
    }
    
  }
}
</style>