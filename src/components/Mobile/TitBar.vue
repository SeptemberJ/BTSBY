<template>
  <div class="TitBar">
    <span class="NavTxt">{{activeRoute}}</span>
  </div> 



  


    
    
  


</template>
<script>
// import MemberSideBar from 'components/MemberSideBar'
  export default{
    data: function () {
      return {
      }
    },
    mounted: function () {
      
    },
    created: function () {
      
    },
    computed: {
      activeRoute(){
        return this.$store.state.activeRoute
      }
      
    },
    watch: {
      
    },
    components: {
      

    },
    methods: {
    }
  }
</script>
<style lang="scss">
.TitBar{
  background: #39f;
  width: 100%;
  height: 42px;
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 10px;
  line-height: 42px;
  color: #fff;
  z-index: 999999;
  .NavTxt{
    height:100%;
    margin-left: 20px;
  }
}
</style>
