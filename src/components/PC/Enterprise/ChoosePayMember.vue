<template>
    <div id="ChooseMember">
          <!-- Modal 社保-->
          <Modal v-if="type==0" v-model="ifChooseMember" @on-visible-change="changeVisible" width="800">
            <p slot="header" style="text-align:left">
                <span>编辑社保参保名单</span><span class="colorRed tips">注:勾选的人员表示加入参保,如需不参保请取消勾选</span>
            </p>
            <div style="text-align:center;">
                <Table border ref="selection" :columns="columnsS" :data="dataS" @on-selection-change="MemberchangedS"></Table>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="submitMemberS">确定</Button>
            </div>
        </Modal>
        <!-- Modal 公积金-->
          <Modal v-else v-model="ifChooseMember" @on-visible-change="changeVisible" width="800">
            <p slot="header" style="text-align:left">
                <span>编辑公积金参保名单</span><span class="colorRed tips">注:勾选的人员表示加入参保,如需不参保请取消勾选</span>
            </p>
            <div style="text-align:center;">
                <Table border ref="selection" :columns="columnsG" :data="dataG" @on-selection-change="MemberchangedG"></Table>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="submitMemberG">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {timestampToFormatTime} from '../../../util/utils'
export default {
  props:['type'],
  data() {
  return {
    ifChooseMember:false,
    modal_loading:false,
    columnsS: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '姓名',
            key: 'name'
        },
        {
            title: '身份证号',
            key: 'id_card'
        },
        {
            title: '是否在职',
            key: 'postStatus'
        },
        {
            title: '参保城市',
            key: 'city'
        },
        {
            title: '户口性质',
            key: 'resident'
        },
        {
            title: '性别',
            key: 'sex'
        },
        {
            title: '入职时间',
            key: 'time'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'error',
                          size: 'small'
                      },
                      on: {
                          click: () => {
                              this.remove(params.index)
                          }
                      }
                  }, '修改信息')
              ]);
          }
        }
    ],
    columnsG: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '姓名',
            key: 'name'
        },
        {
            title: '身份证号',
            key: 'id_card'
        },
        {
            title: '是否在职',
            key: 'postStatus'
        },
        {
            title: '参保城市',
            key: 'city'
        },
        {
            title: '公积金基数',
            key: 'basicG'
        },
        {
            title: '单位比例',
            key: 'perU'
        },
        {
            title: '个人比例',
            key: 'perI'
        },
        {
            title: '入职时间',
            key: 'time'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'error',
                          size: 'small'
                      },
                      on: {
                          click: () => {
                              this.remove(params.index)
                          }
                      }
                  }, '修改信息')
              ]);
          }
        }
    ],
    dataS: [
        {
            name: '张三',
            id_card: 320684198212123663,
            postStatus: '在职',
            city:'上海',
            resident:'本地城镇（五金）',
            sex:'男',
            time: '2016-10-03'
        },
        {
            name: '李四',
            id_card: 320684198212123663,
            postStatus: '在职',
            city:'上海',
            resident:'本地城镇（五金）',
            sex:'男',
            time: '2016-10-03'
        },
    ],
    dataG: [
        {
            name: '张三',
            id_card: 320684198212123663,
            postStatus: '在职',
            city:'上海',
            basicG:'1399',
            perU:'7%',
            perI:'7%',
            time: '2016-10-03'
        },
        {
            name: '张三',
            id_card: 320684198212123663,
            postStatus: '在职',
            city:'上海',
            basicG:'1399',
            perU:'7%',
            perI:'7%',
            time: '2016-10-03'
        },
    ]


    
  }
  },
  created(){
    this.ifChooseMember = true
    // axios.get(R_PRE_URL+'/searchCityList.do'
    // ).then((res)=> { 
    //   this.cityList = res.data.arr
    // }).catch((error)=> {
    //   console.log(error)
    // })

    
  },
  mounted: function(){
    
  
  },
  computed: {
    // ifShowModal: {
    //     get: function () {
    //       return this.$store.state.toAddMember
    //     },
    //     set: function (newValue) {
    //       this.$store.state.toAddMember = false
    //     }
    // }
    
  },
  watch:{
  },
  methods: {
    changeVisible(event){
      this.$emit('changeVisible',event)
        
    },
    MemberchangedS(selection){
      console.log(selection)  //所有选择的人员信息list   @on-select 单个改变状态触发
    },
    MemberchangedG(selection){
      console.log(selection)  //所有选择的人员信息list   @on-select 单个改变状态触发
    },
    //提交社保人员名单
    submitMemberS(){
        // window.open(window.location.origin)
    },
    //提交公积金人员名单
    submitMemberG(){
        // window.open(window.location.origin)
    }
   
  },
};
</script>
<style lang="scss" scoped>
#ChooseMember{

}
.tips{
  font-weight: normal;
  margin-left: 20px;
  }

</style>