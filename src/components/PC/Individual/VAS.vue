<template>
    <div id="MyorderI">
      <h3>
        <span style="font-size: 18px;">
          <Icon type="person-stalker" size="24"></Icon>
          社保云增值服务
        </span>
        <span style="float: right;">
          <span>
            投保地
            <Select v-model="City" size="small" style="width:100px">
              <Option v-for="item in cityList" :value="item.city_code" :key="item.city_code">{{ item.city_name }}</Option>
            </Select>
          </span>
          <span>
            服务险种
            <Select v-model="Kind" size="small" style="width:100px">
              <Option v-for="item in serviceKindList" :value="item.s_code" :key="item.id">{{ item.s_name }}</Option>
            </Select>
          </span>
          <span>
            办理方式
            <Select v-model="Way" size="small" style="width:100px">
              <Option v-for="item in ways" :value="item.code" :key="item.code">{{ item.way }}</Option>
            </Select>
          </span>
          <span><Button type="primary" icon="ios-search" @click="searchVasDetail">搜索</Button></span>
        </span>
      </h3>
      <!-- table -->
      <Table class="marginT_20" border :columns="columns5" :loading="ifLoading" :data="dataVas"></Table>

      <!-- Modal -->
      <Modal v-model="ifShowModal">
        <p slot="header" style="text-align:left">
            <Icon type="ios-pricetags"></Icon>
            <span>社保云增值服务详细信息</span>
        </p>
        <div style="text-align:left">
          <Row>
              <Col span="12"><span>投保地名称 ：</span><span>{{ModalInfo.city_name}}</span></Col>
              <Col span="12"><span>服务险种名称 ：</span><span>{{ModalInfo.s_name}}</span></Col>
              
          </Row>
          <Row>
              <Col span="12"><span>服务事项 ：</span><span>{{ModalInfo.service_items}}</span></Col>
              <Col span="12"><span>办理方式：</span><span>{{ModalInfo.way}}</span></Col>
          </Row>
            <!-- <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" >
              <FormItem label="投保地名称 ：" prop="name">
                  <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
              </FormItem>
              <FormItem label="服务事项 ：" prop="mail">
                  <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
            </Form> -->
        </div>
        <div slot="footer" style="text-align: center;">
            <Button type="primary" size="large" :loading="modal_loading" @click="del">办理</Button>
        </div>
      </Modal>
      
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {timestampToFormatTime} from '../../../util/utils'
export default {
  data() {
  return {
    ifLoading:false,
    ifShowModal:false,
    ModalInfo:{
      city_name:'',
      s_name:'',
      service_items:'',
      way:''
    },
    cityList:[],
    serviceKindList:[],
    modal_loading: false,
    ways:[{'code':0,'way':'均可办理'},{'code':1,'way':'只可自行办理'},{'code':2,'way':'委托办理'}],
    City:'',
    Kind:'',
    Way:'',
    cityList: [
            {
                value: 'New York',
                label: 'New York'
            },
    ],
    columns5: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '投保地名称',
                key: 'city_name',
                
            },
            {
                title: '选择服务险种名称',
                key: 's_name',
                sortable: true
            },
            {
                title: '服务事项',
                key: 'service_items',
            },
            {
                title: '预计时间',
                key: 'estimated_time'
            },
            {
                title: '收费标准',
                key: 's_fee'
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
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
                                            this.show(params)
                                        }
                                    }
                                }, 'View'),
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
                                }, 'Delete')
                            ]);
                        }
                          
            }
        ],
        dataVas: [],
        formValidate: {
                    name: ''
                },
        ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ]
                  }

    
  }
  },
  created(){
    axios.get(R_PRE_URL+'/searchCityList.do'
    ).then((res)=> { 
      this.cityList = res.data.arr
    }).catch((error)=> {
      console.log(error)
    })
    axios.get(R_PRE_URL+'/searchAddNameList.do'
    ).then((res)=> { 
      this.serviceKindList = res.data.arr
    }).catch((error)=> {
      console.log(error)
    })


   
    // axios.get(R_PRE_URL+'/searchOrderList.do?member_id='+this.$store.state.userInfo.member_id
    //   ).then((res)=> {
    //     let temp = res.data.arr
    //     temp.map((item,idx)=>{
    //       item.pay_time = timestampToFormatTime(item.pay_time.time)
    //     })
    //     this.dataOrder = temp
    //     console.log(this.dataOrder)

    //   }).catch((error)=> {
    //     console.log(error)
    //   })
  },
  mounted: function(){
    
  
  },
  computed: {
    
  },
  watch:{
  },
  methods: {
    show (params) {
      let rowInfo = params.row
      this.ifShowModal = true
      this.ModalInfo.city_name = rowInfo.city_name
      this.ModalInfo.s_name = rowInfo.s_name
      this.ModalInfo.service_items = rowInfo.service_items
       this.ModalInfo.way = rowInfo.management_mode == 0?'均可办理':(rowInfo.management_mode == 1?'只可自行办理':'委托办理')
      // this.ModalInfo.way = (rowInfo.management_mode == 0?'均可办理':(rowInfo.management_mode==1)?:'只可自行办理':'委托办理')
        // this.$Modal.info({
        //     title: 'User Info',
        //     content: `content`//Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}
        // })
    },
    remove (index) {
        //this.data6.splice(index, 1);
    },
    //VAS详情
    searchVasDetail(){
      this.ifLoading = true
      axios.get(R_PRE_URL+'/searchSbyAddedInfoList.do?s_city='+this.City+'&insurance_name='+this.Kind+'&management_mode='+this.Way
      ).then((res)=> { 
        this.dataVas = res.data.arr
        this.ifLoading = false
      }).catch((error)=> {
        console.log(error)
      })
    },
    //办理
    del () {
      this.modal_loading = true;
      setTimeout(() => {
          this.modal_loading = false;
          this.modal2 = false;
          this.$Message.success('Successfully delete');
      }, 2000);
            }
   
  },
};
</script>
<style lang="scss" scoped>
#MyorderI{}
</style>