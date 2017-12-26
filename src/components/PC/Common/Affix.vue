<template>
	<div class="SideBar">
		<Affix :offset-bottom="20" v-if="!isMobile">
	        <Poptip trigger="hover" title="咨询电话" content="021-3100-7227" placement="right">
	            <Avatar src="static/img/tel.png" />
	        </Poptip>
	    </Affix>
		<Affix :offset-bottom="60" v-if="!isMobile">
	        <Poptip trigger="hover" title="客服" placement="right">
	            <Avatar src="static/img/customer-service.png" />
	            <div class="api" slot="content">
	            	<a :href="ShangQiao" target = _blank>点击咨询</a>
	            </div>
	        </Poptip>
		</Affix>
		<Affix :offset-bottom="100" v-if="!isMobile">
	        <Poptip trigger="hover" title="微信二维码" content="400-0135-200" placement="right">
	            <Avatar src="static/img/Wechat.png" />
	            <div class="api" slot="content">
	            	<img src="http://www.ztnet-info.com/images/weixin-icon.jpg" style="width: 100%;">
	            </div>
	        </Poptip>
		</Affix>
	</div>
</template>
<script>
  export default{
    data: function () {
      return {
      	ShangQiao:'http://p.qiao.baidu.com/cps2/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sid%22%3A%22-100%22%2C%22tid%22%3A%22105869%22%2C%22ttype%22%3A1%2C%22siteId%22%3A%2210191790%22%2C%22userId%22%3A%2222734968%22%2C%22pageId%22%3A0%7D'

      }
    },
    mounted: function () {
      
    },
    created: function () {
      
    },
    computed: {
      isMobile(){
        return this.$store.state.isMobile
       }
      
    },
    watch: {
      
    },
    components: {
      

    },
    methods: {
    	Service(){
    		window.open = 'http://p.qiao.baidu.com/cps2/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sid%22%3A%22-100%22%2C%22tid%22%3A%22105869%22%2C%22ttype%22%3A1%2C%22siteId%22%3A%2210191790%22%2C%22userId%22%3A%2222734968%22%2C%22pageId%22%3A0%7D'//'http://p.qiao.baidu.com//im/index?siteid=8261213&amp;ucid=19457989'
    	}
     

    }
  }
</script>
<style lang="scss">
.SideBar{
	margin-left: 10px;
}
.ivu-affix{
	width: 40px !important;
  img{
    width: 35px;
  }
}
</style>