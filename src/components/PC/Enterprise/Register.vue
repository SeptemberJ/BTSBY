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
          <span>
            地区
            <Select v-model="city" size="small" style="width:80px">
              <Option v-for="(City,CityIdx) in cityList"  :value="City.city_name" :key="CityIdx">{{City.city_name}}</Option>
            </Select>
          </span>
          <span>
            岗位
            <Select v-model="post" size="small" style="width:120px">
              <Option v-for="item in postList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </span>
          <span>
            状态
            <Select v-model="status" size="small" style="width:120px">
              <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </span>
          
          <span><Button type="primary" icon="ios-search" @click="searchOrder">搜索</Button></span>
        </span>
      </h3>
      <!-- table -->
      <Table class="marginT_20"  border ref="selection" :columns="memberList" :data="dataMember" :loading="ifLoading" ></Table>

      <Page class="marginT_20" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>



<AddMember></AddMember>


    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import AddMember from './AddMember.vue'
import {timestampToFormatTime} from '../../../util/utils'
export default {
  data() {
  return {
    modal_loading: false,
    ifLoading:false,
    Total:0,
    page_num:1,  //页数
    number:10,   //每页条数
    cityList:[],
    city:'-1',     //参保城市
    post:'-1',     //岗位
    status:'-1',   //状态
    postList:[
            {
                value: '-1',
                label: '全部'
            },
            {
                value: '0',
                label: '测试'
            },
    ],
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
                key: 'registered_residence'
            },
            {
                title: '社保状态',
                key: 's_status',
            },
            {
                title: '公积金状态',
                key: 'g_status',
            },
            {
                title: '性别',
                key: 'sex',
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
        dataMember: [
            {
              name:'张三',
              id_number:'320684123456789090',
              city:'上海',
              registered_residence:'本地城市(五金)',
              s_status:'未投保',
              g_status:'未投保',
              sex:'男',
              post_name:'销售员',
              telephone:'18234567890',
              entry_time:'2017-08-08'
            }

        ]

    
  }
  },
  created(){
    axios.get(R_PRE_URL+'/searchCityList.do'
    ).then((res)=> { 
      this.cityList = res.data.arr
    }).catch((error)=> {
      console.log(error)
    })
    //this.getDataOrder()
    
  },
  mounted: function(){
    
  
  },
  computed: {
    
  },
  watch:{
  },
  components: {
    AddMember
  },
  methods: {
    OperationFns(event){
      switch(event){
        case '新增入职':
        // window.open(window.location.origin + '#/Login')
        this.$store.state.toAddMember = true
        break;
        case '导入':
        break;
        case '离职':
        break;
        case '增减员':
        break;
      }
    },

    //search
    searchOrder(){
      this.getDataOrder()
    },
    //分页
    changePage(event){//当前页数
      this.page_num = event
      this.getDataOrder()
    },
    //切换每页条数
    changePageSize(event){
      this.number = event
      this.getDataOrder()
    },

    //获取数据
    getDataOrder(){
      let member_id = this.$store.state.userInfo.member_id,
          number = this.number,
          page_num = this.page_num,
          status = this.status=='-1'?'':this.status,
          progress = this.progress=='-1'?'':this.progress,
          start_time = this.start_time?timestampToFormatTime((this.start_time).getTime()):'',
          end_time = this.end_time?timestampToFormatTime((this.end_time).getTime()):'',
          month_name = this.month_name?(this.month_name).getMonth()+1:''
      axios.get(R_PRE_URL+'/searchOrderList.do?member_id='+this.$store.state.userInfo.member_id+'&number='+number+'&status='+status+'&progress='+progress+'&start_time='+start_time+'&end_time='+end_time+'&month_name='+month_name+'&page_num='+ page_num
      ).then((res)=> {
        this.Total = res.data.orderCount
        let temp = res.data.arr
        temp.map((item,idx)=>{
          switch(item.status){
            case '0':
            item.status = '待支付'
            break;
            case '1':
            item.status = '已支付'
            break;
            case '2':
            item.status = '支付成功'
            break;
            case '3':
            item.status = '支付失败'
            break;
          }
          switch(item.progress){
            case '0':
            item.progress = '订单待支付'
            break;
            case '1':
            item.progress = '已支付待确认'
            break;
            case '2':
            item.progress = '已确认支付成功'
            break;
            case '3':
            item.progress = '未支付成功'
            break;
            case '4':
            item.progress = '订单已处理'
            break;
            case '5':
            item.progress = '订单完成'
            break;
            case '6':
            item.progress = '订单已取消'
            break;
          }
          item.pay_time = timestampToFormatTime(item.pay_time.time)
          this.ifLoading = false
        })
        this.dataOrder = temp

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