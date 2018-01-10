<template>
    <div id="ChooseMember">
          <!-- Modal 社保-->
          <Modal v-if="type==0" v-model="ifChooseMember" :mask-closable="false"  @on-visible-change="changeVisible" width="900">
            <p slot="header" style="text-align:left">
                <span>编辑社保参保名单</span><span class="colorRed tips">注:勾选的人员表示加入参保,如需不参保请取消勾选</span>
            </p>
            <div style="text-align:left;" class="marginB_110">
                <Table border ref="selection" :loading="ifLoading" :columns="columnsS" :data="dataS" @on-selection-change="MemberchangedS"></Table>
                <Page class="marginT_10" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" :show-sizer="false"></Page>
            </div>
           <!--  <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="submitMemberS">确定</Button>
            </div> -->
        </Modal>
        <!-- Modal 公积金-->
          <Modal v-else v-model="ifChooseMember" @on-visible-change="changeVisible" width="900"  :mask-closable="false">
            <p slot="header" style="text-align:left">
                <span>编辑公积金参保名单</span><span class="colorRed tips">注:勾选的人员表示加入参保,如需不参保请取消勾选</span>
            </p>
            <div style="text-align:center;" class="marginB_110">
                <Table border ref="selection2" :loading="ifLoading" :columns="columnsG" :data="dataG" @on-selection-change="MemberchangedG" @on-select="MemberchangedGSingle"></Table>
                <Page class="marginT_10" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" :show-sizer="false"></Page>
            </div>
            <!-- <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="submitMemberG">确定</Button>
            </div> -->
        </Modal>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {timestampToFormatTimeS} from '../../../../util/utils'
export default {
  props:['type','FundsBasic','FundsU','FundsI','choosedMemberList'],
  data() {
  return {
    ifLoading:false,
    ifChooseMember:false,
    modal_loading:false,
    Total:0,
    page_num:1,  //页数
    number:10,   //每页条数
    //choosedMemberList:[],
    columnsS: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            type: 'index',
            width: 60,
            align: 'center'
        },
        {
            title: '姓名',
            key: 'name',
        },
        {
            title: '身份证号',
            key: 'id_number',
        },
        {
            title: '状态',
            width: 80,
            key: 'status',
            render: (h, params) => {
                            return h('span',{
                                style: {
                                  //color:params.row.status==0?'#39f':'#FF3174',
                                },
                            }, params.row.status=='0'?'在职':'离职')
                        }
        },
        {
            title: '参保城市',
            key: 'city_name'
        },
        {
            title: '户口性质',
            key: 'registered_residenceTxt',
        },
        // {
        //   title: 'Action',
        //   key: 'action',
        //   width: 100,
        //   align: 'center',
        //   render: (h, params) => {
        //       return h('div', [
        //           h('Button', {
        //               props: {
        //                   type: 'error',
        //                   size: 'small'
        //               },
        //               on: {
        //                   click: () => {
        //                       this.remove(params.index)
        //                   }
        //               }
        //           }, '修改信息')
        //       ]);
        //   }
        // }
    ],
    columnsG: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            type: 'index',
            width: 60,
            align: 'center'
        },
        {
            title: '姓名',
            key: 'name',
        },
        {
            title: '身份证号',
            key: 'id_number'
        },
        {
            title: '状态',
            width: 80,
            key: 'status',
            render: (h, params) => {
                            return h('span',{
                                style: {
                                  //color:params.row.status==0?'#39f':'#FF3174',
                                },
                            }, params.row.status=='0'?'在职':'离职')
                        }
        },
        {
            title: '参保城市',
            key: 'city_name'
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
        // {
        //     title: '入职时间',
        //     key: 'entry_time'
        // },
        // {
        //   title: 'Action',
        //   key: 'action',
        //   width: 100,
        //   align: 'center',
        //   render: (h, params) => {
        //       return h('div', [
        //           h('Button', {
        //               props: {
        //                   type: 'error',
        //                   size: 'small'
        //               },
        //               on: {
        //                   click: () => {
        //                       this.remove(params.index)
        //                   }
        //               }
        //           }, '修改信息')
        //       ]);
        //   }
        // }
    ],
    dataS: [],
    dataG: [
        // {
        //     name: '张三',
        //     id_card: 320684198212123663,
        //     postStatus: '在职',
        //     city:'上海',
        //     basicG:'1399',
        //     perU:'7%',
        //     perI:'7%',
        //     time: '2016-10-03'
        // },
        // {
        //     name: '张三',
        //     id_card: 320684198212123663,
        //     postStatus: '在职',
        //     city:'上海',
        //     basicG:'1399',
        //     perU:'7%',
        //     perI:'7%',
        //     time: '2016-10-03'
        // },
    ]


    
  }
  },
  created(){
    this.ifChooseMember = true
    //this.getDataMemberId()
    this.getDataMember()
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
    //分页
    changePage(event){//当前页数
      this.page_num = event
      this.getDataMember()
    },
    //切换每页条数
    changePageSize(event){
      this.number = event
      this.getDataMember()
    },
    MemberchangedS(selection){
      this.choosedMemberList[this.page_num] = selection
      this.$emit('MemberAmountSChange',this.choosedMemberList)
    },
    MemberchangedG(selection){
      this.choosedMemberList[this.page_num] = selection
      this.$emit('MemberAmountGChange',this.choosedMemberList)
      
      //this.choosedMemberG = ifHasObj(this.choosedMemberG,selection.pop(),'id_number')
      //this.choosedMemberG = removeSame(this.choosedMemberG)
      
    },
    MemberchangedGSingle(selection,row){
    },
    //提交社保人员名单
    submitMemberS(){
        // window.open(window.location.origin)
    },
    //提交公积金人员名单
    submitMemberG(){
        // window.open(window.location.origin)
    },
    getDataMemberId(){
      this.ifLoading = true
      axios.post(R_PRE_URL+'/xfSbGjjEmployeeList.do?member_id='+this.$store.state.userInfo.member_id
      ).then((res)=> {
        if(this.type == 0){
          this.Total = res.data.sbEmployeeList.length
          return res.data.sbEmployeeList
        }else{
          this.Total = res.data.gjjEmployeeList.length
          return res.data.gjjEmployeeList
        }
      }).then((MemberIdList)=> {
        let MemberListArray = []
        MemberIdList.map((item,idx)=>{
          axios.get(R_PRE_URL+'/searchCompanyEmployee.do?id='+item.id
          ).then((res)=> {
            let Item = res.data.employee
            Item.entry_time = timestampToFormatTimeS(Item.entry_time.time)
            Item.basicG = this.FundsBasic
            Item.perU = this.FundsU
            Item.perI = this.FundsU
            if(this.choosedMemberList[this.page_num]){
              this.choosedMemberList[this.page_num].map((item,idx)=>{
                if(Item.id_number == item.id_number){
                  Item._checked = true
                }
              })
            }
            switch(Item.registered_residence){
              case '0':
              Item.registered_residenceTxt = '本地城镇'
              break
              case '1':
              Item.registered_residenceTxt = '本地农村'
              break
              case '2':
              Item.registered_residenceTxt = '外地城镇'
              break
              case '3':
              Item.registered_residenceTxt = '外地农村'
              break
            }
            MemberListArray.push(Item)
          }).catch((error)=> {
            console.log(error)
          })
        })
        return MemberListArray
      }).then((MemberListArray)=> {
        if(this.type == 0){
          this.dataS = MemberListArray
        }else{
          this.dataG = MemberListArray
        }
        this.ifLoading = false
      }).catch((error)=> {
        console.log(error)
      })


    },
    getDataMember(){
      this.getDataMemberId()
    }
   
  },
};
</script>
<style lang="scss" scoped>
#ChooseMember{
  table{
    margin-bottom: 20px;
  }

}
.tips{
  font-weight: normal;
  margin-left: 20px;
  }

</style>