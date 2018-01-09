<template>
<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <Row  v-for="(item, idx) in DataList">
            <div class="ListItem marginT_10" @click="ToDetail(item.id)">
              <Col span="4"><img :src="preImg"></Col>
              <Col span="14">
                <h4>{{item.s_title}}</h4>
              </Col>
              <Col span="4">
                <Icon type="chevron-right" style="float: right;"></Icon>
              </Col>
            </div>
          </Row>
</div>
  <!-- <ul class="content table-view easy-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <li class="table-view-cell media" v-for="result in results">
      <router-link class="navigate-right" to="/detail">
        <img class="media-object pull-left" :src="result.img">
        <div class="media-body">
          hello vue
          <p>a easy example using the vue to implement easy web</p>
        </div>
      </router-link>
    </li>
    <div class="nsr-card-loading">
      <nsr-loading :hide-loading="isloadingComplete" :is-end-text="endText">
      </nsr-loading>
    </div>
  </ul> -->
</template>

<script>
import { mapState } from 'vuex';
export default {
    propos:['DataList'],
  data: () => ({}),
  components: {
  },
  mounted: function() {
    // this.$nextTick(function() {
    //   this.fetchData(this);
    // });
  },
  methods: {
    fetchData: function(progress) {
        alert('getData')
      // this.$store.dispatch('getData', {
      //   progress: progress,
      //   refresh: false
      // });
    },
    loadMore: function() {
      this.fetchData(this);
    }
  },
  computed: mapState({
    // results: state => state.cardData,
    // isloadingComplete: state => state.isloadingComplete,
    // busy: state => state.busy,
  })
}
</script>

<style>
.easy-list img {
  width: 42px;
}
</style>