<template>
    <div id="ChooseMember">
          <!-- Modal 社保-->
          <Modal v-if="type==0" v-model="ifChooseMember" :mask-closable="false"  @on-visible-change="changeVisible" width="800">
            <p slot="header" style="text-align:left">
                <span>编辑社保参保名单</span><span class="colorRed tips">注:勾选的人员表示加入参保,如需不参保请取消勾选</span>
            </p>
            <div style="text-align:left;" class="marginB_110">
                <Table border ref="selection" :columns="columnsS" :data="dataS" @on-selection-change="MemberchangedS"></Table>
                <Page class="marginT_10" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
            </div>
           <!--  <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="submitMemberS">确定</Button>
            </div> -->
        </Modal>
        <!-- Modal 公积金-->
          <Modal v-else v-model="ifChooseMember" @on-visible-change="changeVisible" width="800"  :mask-closable="false">
            <p slot="header" style="text-align:left">
                <span>编辑公积金参保名单</span><span class="colorRed tips">注:勾选的人员表示加入参保,如需不参保请取消勾选</span>
            </p>
            <div style="text-align:center;" class="marginB_110">
                <Table border ref="selection2" :columns="columnsG" :data="dataG" @on-selection-change="MemberchangedG"></Table>
                <Page class="marginT_10" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
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
import {timestampToFormatTimeS,removeSame} from '../../../../util/utils'
export default {
  props:['type','FundsBasic'],
  data() {
  return {
    ifChooseMember:false,
    modal_loading:false,
    Total:0,
    page_num:1,  //页数
    number:10,   //每页条数
    choosedMemberG:[],
    columnsS: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        // {
        //     type: 'index',
        //     width: 60,
        //     align: 'center'
        // },
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
            key: 'city'
        },
        {
            title: '户口性质',
            key: 'registered_residenceTxt'
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
            title: '姓名',
            key: 'name',
        },
        {
            title: '身份证号',
            key: 'id_number'
        },
        {
            title: '状态',
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
            key: 'entry_time'
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
      this.$emit('MemberAmountSChange',selection)
      //console.log(selection)  //所有选择的人员信息list   @on-select 单个改变状态触发
    },
    MemberchangedG(selection){
      this.$emit('MemberAmountGChange',selection)//所有选择的人员信息list   @on-select 单个改变状态触发
      if(selection[selection.length-1]){
        this.choosedMemberG = this.choosedMemberG.concat(selection[selection.length-1])
      }
      //this.choosedMemberG = removeSame(this.choosedMemberG)
      console.log(this.choosedMemberG.length)
      console.log((removeSame(this.choosedMemberG)))
    },
    //提交社保人员名单
    submitMemberS(){
        // window.open(window.location.origin)
    },
    //提交公积金人员名单
    submitMemberG(){
        // window.open(window.location.origin)
    },
    getDataMember(){
      this.ifLoading = true
      let member_id = this.$store.state.userInfo.member_id,
          number = this.number,
          page_num = this.page_num,
          post_name = ''
          status = 0
   
        axios.get(R_PRE_URL+'/searchCompanyEmployeeList.do?member_id='+member_id+'&number='+number+'&page_num='+page_num+'&post_name='+post_name+'&status='+status
        ).then((res)=> {
          let temp = res.data.employeeList
          temp.map((Item,Idx)=>{
            Item.entry_time = timestampToFormatTimeS(Item.entry_time.time)
            Item.basicG = this.FundsBasic
            this.choosedMemberG.map((item,idx)=>{
              if(Item.id_number == item.id_number){
                Item._checked = true
              }
            })
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
            // switch(Item.status){
            //   case '0':
            //   Item.status = '在职'
            //   break
            //   case '1':
            //   Item.status = '离职'
            //   break
            // }
          //  switch(Item.sex){
          //   case '0':
          //   Item.sexTxt = '男'
          //   break
          //   case '1':
          //   Item.sexTxt = '女'
          //   break
          //   default:
          //   Item.sexTxt = ''
          // }
            
            
          })
          this.dataS = temp
          this.dataG = temp
          this.Total = res.data.count
          this.ifLoading = false
          
        }).catch((error)=> {
          console.log(error)
        })
    
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