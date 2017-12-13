<template>
    <div id="Register">
      <h3>
        <span style="font-size: 18px;">
          <Icon type="person" size="24"></Icon>
          员工信息管理
        </span>
        <span style="float: right;">
          <span>
            <Dropdown trigger="click" @on-click="OperationFns">
                <Button type="primary">
                    快捷操作
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="新增入职" >新增入职</DropdownItem>
                    <DropdownItem name="导入">导入</DropdownItem>
                    <DropdownItem name="离职" divided>离职</DropdownItem>
                    <DropdownItem name="增减员">增减员</DropdownItem>
                </DropdownMenu>
            </Dropdown>
          </span>
          <!-- <span>
            地区
            <Select v-model="city" size="small" style="width:80px">
              <Option v-for="(City,CityIdx) in cityList"  :value="City.city_name" :key="CityIdx">{{City.city_name}}</Option>
            </Select>
          </span> -->
          <span>
            岗位
            <Select v-model="post_name" size="small" style="width:120px">
              <Option v-for="item in postList" :value="item.post_name" :key="item.post_name">{{ item.post_name }}</Option>
            </Select>
          </span>
          <span>
            状态
            <Select v-model="status" size="small" style="width:120px">
              <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </span>
          
          <span><Button type="primary" icon="ios-search" @click="searchMemberList">搜索</Button></span>
        </span>
      </h3>
      <!-- table -->
      <Table class="marginT_20" highlight-row  border ref="selection" :columns="memberList" :data="dataMember" :loading="ifLoading" @on-selection-change="selectChanged"></Table>

      <Page class="marginT_20" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>


      <!-- 新增员工 -->
      <AddMember v-on:refreshData="getDataMember" :writeType="writeType" :memberInfo="memberInfo"></AddMember>

      <!-- 离职 -->
      <DisMission v-on:refreshData="getDataMember" :memberInfo="memberInfo"></DisMission>



      <!-- 增减员工 -->
      <AddOrMin  v-on:refreshData="getDataMember" :selectArray="selectArray"></AddOrMin>
      <!-- <Modal v-model="ifAddOrMin" :mask-closable="false">
        <p slot="header" style="text-align:left">
            <span>社保[公积金]增减</span>
        </p>
        <div style="text-align:left">
            <p>增减员名单：</p>
            <p><span class="marginR_10" v-for="(selection,selectionIdx) in selectArray">{{selection.name}}</span></p>
            <Form ref="formAddOrMin" :model="formAddOrMin" :rules="ruleValidate_AddOrMin">
              <FormItem label="操作类型：" prop="AddOrMin">
                  <RadioGroup v-model="formAddOrMin.AddOrMin">
                      <Radio label="增员">增员</Radio>
                      <Radio label="减员">减员</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="相关业务：" prop="business">
                  <CheckboxGroup v-model="formAddOrMin.business">
                      <Checkbox label="社保"></Checkbox>
                      <Checkbox label="公积金"></Checkbox>
                  </CheckboxGroup>
              </FormItem>
              <FormItem label="起始月份：" prop="startMonth">
                  <DatePicker v-model="formAddOrMin.startMonth" type="month" placeholder="" style="width: 200px"></DatePicker>
              </FormItem>
            </Form>
            
        </div>
        <div slot="footer">
            <Button type="error" size="large"  :loading="modal_loading" @click="submitAddOrMin">提交更改</Button>
        </div>
    </Modal> -->
    <!-- 查看缴纳历史 -->
    <Modal v-model="ifShowRecord" width="800" :mask-closable="false">
        <p slot="header" style="">
            <Icon type="information-circled"></Icon>
            <span>投保历史</span>
        </p>
        <div style="text-align:center">
            <Table :columns="columnsRecord" :data="dataRecord"></Table>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" @click="CloseRecord">关闭</Button>
        </div>
    </Modal>
  <!--   <Modal v-model="ifShowRecord" title="投保历史" @on-ok="" @on-cancel="" :mask-closable="false" width="800" cancel-text="">
        <Table :columns="columnsRecord" :data="dataRecord"></Table>
    </Modal> -->



    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import AddMember from './MemberOperation/AddMember.vue'
import AddOrMin from './MemberOperation/AddOrMin.vue'
import DisMission from './MemberOperation/DisMission.vue'
import {timestampToFormatTime} from '../../../util/utils'
import * as Moment from 'moment'
export default {
  data() {
  return {
    // ifDisMission:false, //离职显示
    modal_loading: false,
    ifLoading:true,
    writeType:0,  //0新增 1修改
    Total:0,
    page_num:1,  //页数
    number:10,   //每页条数
    cityList:[],
    city:'',     //参保城市
    post_name:'',     //岗位
    status:'',   //状态
    postList:[],
    memberInfo:{},//查看的员工的信息
    statusList:[
            {
                value: '-1',
                label: '全部'
            },
            {
                value: '0',
                label: '在职'
            },
            {
                value: '1',
                label: '离职'
            },
    ],
    memberList: [
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
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.SearchMemberInfo(params.row)
                                }
                            }
                        }, params.row.name),
                    ]);
                }
            },
            {
                title: '身份证号',
                key: 'id_number',
            },
            {
                title: '参保城市',
                key: 'city'
            },
            {
                title: '户口性质',
                key: 'registered_residenceTxt'
            },
            {
                title: '社保详情',
                key: 'action',
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.showRecord(0,params.index)
                                }
                            }
                        }, '查看'),
                    ]);
                }
            },
            {
                title: '公积金详情',
                key: 'action',
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.showRecord(1,params.index)
                                }
                            }
                        }, '查看'),
                    ]);
                }
            },
            {
                title: '性别',
                key: 'sexTxt',
                width:70
            },
            {
                title: '岗位',
                key: 'post_name',
            },
            {
                title: '手机',
                key: 'telephone',
            },
            {
                title: '入职时间',
                key: 'entry_time',
            }
        ],
    dataMember: [],
    ifShowRecord:false,
    ifAddOrMin:false,
    selectArray:[],  //selected 名单
    // formAddOrMin: {
    //     AddOrMin:'增员',
    //     business:[],
    //     startMonth:''

    // },
    // ruleValidate_AddOrMin: {
    //     AddOrMin: [
    //         { required: true, message: '请选择种类', trigger: 'blur' }
    //     ],
    //     business: [
    //         { required: true, type: 'array', min: 1, message: '至少选择一项业务', trigger: 'change' },
    //         { type: 'array', max: 2, message: '至少选择一项业务', trigger: 'change' }
    //     ],
    //     startMonth:[
    //         { required: true, message: '请选择起始月份', trigger: 'blur' }
    //     ]
    //   },
    columnsRecord: [
          {
              type: 'index',
              width:60
          },
          {
              title: '缴纳月份',
              key: 'Month'
          },
          {
              title: '订单号',
              key: 'Order_no'
          },
          {
              title: '购买时间',
              key: 'Pay_date'
          },
          {
              title: '单位费用',
              key: 'Sum_U'
          },
          {
              title: '个人费用',
              key: 'Sum_I'
          },
          {
              title: '费用合计',
              key: 'Sum'
          },
          {
              title: '服务状态',
              key: 'Status'
          }
    ],
    dataRecord: [
          {
              Month: '2017-09',
              Order_no: 'OR123456',
              Pay_date: '2017-09-09',
              Sum_U: 2999,
              Sum_I:1000,
              Sum:3999,
              Status:'XX状态'
          },
    ],


    
  }
  },
  created(){
    axios.get(R_PRE_URL+'/searchCityList.do'
    ).then((res)=> { 
      this.cityList = res.data.arr
    }).catch((error)=> {
      console.log(error)
    })

    axios.get(R_PRE_URL+'/searchPostNameList.do?member_id='+this.$store.state.userInfo.member_id
    ).then((res)=> { 
       res.data.postNameList.unshift({"post_name": "全部"})
       this.postList = res.data.postNameList
    }).catch((error)=> {
      console.log(error)
    })
    this.getDataMember()

    
  },
  mounted: function(){
    
  
  },
  computed: {
    
    
  },
  watch:{
  },
  components: {
    AddMember,
    AddOrMin,
    DisMission
  },
  methods: {
    //查看员工缴纳历史
    showRecord(TYPE,INFO){
      this.ifShowRecord = true
      // if(TYPE==0){ //社保历史
      //   axios.get(R_PRE_URL+''
      //   ).then((res)=> { 
      //     this.dataRecord = res.data
      //   }).catch((error)=> {
      //     console.log(error)
      //   })
      // }else{ //公积金历史
      //   axios.get(R_PRE_URL+''
      //   ).then((res)=> { 
      //     this.dataRecord = res.data
      //   }).catch((error)=> {
      //     console.log(error)
      //   })
      // }
    },
    CloseRecord(){
      this.ifShowRecord = false
    },
    //快捷操作
    OperationFns(event){
      switch(event){
        case '新增入职':
        // window.open(window.location.origin + '#/Login')
        this.writeType = 0
        this.$store.state.toAddMember = true
        break;
        case '导入':
        break;
        case '离职':
        if(this.selectArray.length<=0){
          this.$Message.error('请选择要离职的员工!')
        }else if(this.selectArray.length>1){
          this.$Message.warning('只能选择一个离职的员工!')
        }else{
          this.memberInfo = this.selectArray[0]
          this.$store.state.ifDisMission = true
        }
        break;
        case '增减员':
        if(this.selectArray.length<=0){
          this.$Message.error('请选择要增(减)员的员工!')
        }else{
          this.$store.state.ifAddOrMin = true
        }
        break;
      }
    },
    //增减员
    selectChanged(LIST){
      this.selectArray = LIST
      console.log(this.selectArray)
    },
    // //提交增减员名单
    // submitAddOrMin(){
    //   // selectArray_  formAddOrMin
    // },
    //查看员工信息
    SearchMemberInfo(Member){
      this.$store.state.toAddMember = true
      this.writeType = 1
      this.memberInfo = Member
      console.log('Member----p')
      console.log(Member)

    },
    //search
    searchMemberList(){
      this.page_num = 1
      this.getDataMember()
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
    //获取数据
    getDataMember(){
      this.ifLoading = true
      let member_id = this.$store.state.userInfo.member_id,
          number = this.number,
          page_num = this.page_num,
          post_name = this.post_name == '全部'?'':this.post_name
          status = this.status == -1?'':this.status
          // post_name = this.post_name == '-1'?'':this.post_name
          // status = this.status == '-1'?'':this.status
   
        axios.get(R_PRE_URL+'/searchCompanyEmployeeList.do?member_id='+member_id+'&number='+number+'&page_num='+page_num+'&post_name='+post_name+'&status='+status
        ).then((res)=> {
          let temp = res.data.employeeList
          temp.map((Item,Idx)=>{
            Item.birthdate = timestampToFormatTime(Item.birthdate.time)
            Item.entry_time = timestampToFormatTime(Item.entry_time.time)
            // Item.joining_date = timestampToFormatTime(Item.joining_date.time)
            // Item.work_time = timestampToFormatTime(Item.work_time.time)
            // Item.graduation_time = timestampToFormatTime(Item.graduation_time.time)
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
             switch(Item.sex){
              case '0':
              Item.sexTxt = '男'
              break
              case '1':
              Item.sexTxt = '女'
              break
              default:
              Item.sexTxt = ''
            }
            
            
          })
          this.dataMember = temp
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
#Register{
  table{

  }

}
</style>