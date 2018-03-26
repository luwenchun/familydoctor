<template>
  <section>
    <!--表单区视图-->
    <wn-row>
      <wn-col :xs="24">
        <div class="box">
          <div class="box-content" style="padding-bottom: 0">
            <wn-form  :model="zjjmForm" ref="zjjmForm" label-width="80px" class="demo-ruleForm wnform">
              <wn-row >
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="姓名"  >
                    <wn-input type="text"  v-model="zjjmForm.name" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="检索码" >
                    <wn-input type="text"  v-model="zjjmForm.nameIndex" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="身份证号" >
                    <wn-input type="text"  v-model="zjjmForm.idNumber" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="手机" >
                    <wn-input type="text"  v-model="zjjmForm.phone" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="紧急电话" >
                    <wn-input type="text"  v-model="zjjmForm.tel" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="24" :md="8"  :lg="4"   style="text-align: center;margin-bottom: 10px;">
                  <wn-button type="warning" @click="searchUsers()">查&nbsp;&nbsp;询</wn-button>
             <!-- <wn-button type="warning" @click="handleAdd">新&nbsp;&nbsp;建</wn-button> -->
                </wn-col>
              </wn-row>
            </wn-form>
          </div>
        </div>
      </wn-col>
    </wn-row>
    <!--表格区视图-->
    <wn-row>
      <wn-col :xs="24">
        <div class="box">
          <div class="box-header">
            <div class="box-name">
              <span>服务类型</span>
            </div>
          </div>
          <div class="box-content clearfix" style="padding: 0 10px;">
            <!--表格-->
            <wn-table :data="users" ref="zjjmTable" highlight-current-row v-loading="listLoading" @select-all="selectAll" :row-class-name="tableRowClassName" style="width: 100%;">
              <wn-table-column type="selection" prop="id" label="ID" width="55" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="name" label="姓名" width="120" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="gender" label="性别"  :formatter="formatGender" width="80"  header-align="center" align="center" >
              </wn-table-column>
              <wn-table-column prop="birthDate" :formatter="dateFormat" label="出生日期" width="140" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="idNumber" label="身份证号" width="180" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="phone" label="手机" width="140" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="tel" label="紧急电话"  width="120" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="contractCount" label="历史签约次数" width="120" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column  label="操作" min-width="140" header-align="center" align="center">
                <template slot-scope="scope">
                  <i class="iconfont icon-tjfwjl" v-show="(scope.row.states == '1'|| scope.row.states == '2') ? true: false" @click="handleEdit(scope.$index, scope.row)" title="添加服务记录"></i>
                </template>
              </wn-table-column>
            </wn-table>
            <!--分页功能-->
            <wn-col :span="24" class="toolbar">
              <wn-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" >
              </wn-pagination>
            </wn-col>
          </div>
        </div>
      </wn-col>
    </wn-row>
    <!--表格添加服务记录信息视图-->
    <wn-dialog title="服务记录信息"  :close-on-click-modal="false" v-model="editFormVisible">
      <wn-form :model="editForm" label-width="100px" :rules="rules2" ref="editForm">
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="居民姓名" prop="name">
              <wn-input type="text" :disabled="true" v-model="editForm.name"></wn-input>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24"  :sm="12" :md="11">
            <wn-form-item label="性别" >
              <wn-select v-model="editForm.gender" :disabled="true">
                <wn-option v-for="item in select.genderType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
              </wn-select>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="签约日期" prop="contractDate">
              <wn-date-picker v-model="editForm.contractDate" type="date" :disabled="true" style="width: 100%;">
              </wn-date-picker>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="签约团队" prop="teamCode">
              <wn-input type="text" :disabled="true" v-model="teamNameArr"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="服务日期" prop="serviceDate">
              <wn-date-picker v-model="editForm.serviceDate" type="date" :picker-options="pickerOptions0" style="width: 100%">
              </wn-date-picker>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="服务人" prop="serviceDoct">
              <wn-input type="text" v-model="editForm.serviceDoct"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col :xs="24"  :sm="12" :md="11" :lg="22">
            <wn-form-item label="基础服务" prop="serviceName">
              <wn-autocomplete popper-class="my-autocomplete" v-model="editForm.serviceName" :fetch-suggestions="querySearch" placeholder="请输入检索码" @select="handleSelect">
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                <template slot-scope="props">
                  <div class="name">{{ props.item.value }}</div>
                  <span class="addr">{{ props.item.id }}</span>
                </template>
              </wn-autocomplete>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="服务次数" prop="serviceCount">
              <wn-input type="text"  v-model="editForm.serviceCount"></wn-input>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="记录来源" prop="sourctType">
              <wn-select v-model="editForm.sourctType" :disabled="true">
                <wn-option v-for="item in select.selSourctType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
              </wn-select>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11" :lg="22">
            <wn-form-item label="服务描述" prop="common">
              <wn-input type="textarea"  v-model="editForm.common"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
      </wn-form>
      <div slot="footer" class="dialog-footer">
        <wn-button type="warning" @click.native="editFormVisible = false">取消</wn-button>
        <wn-button type="warning" @click.native="editSubmit" :loading="editLoading">保存</wn-button>
      </div>
    </wn-dialog>
  </section>
</template>
<script type="text/javascript">
  import util from '../../common/js/util'
  import hypy from '../../common/js/hypy'
  import NProgress from 'nprogress'
  import {getZjjmListPage,getJcServiceList,getTeamNameByCode,addServiceRecord} from '../../api/api';//api.js中请求后台的方法
  export default {
    data()
  {
//               自定义验证规则
    var checkName = (rule, value, callback) =>{
      var reg = /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
      if (!value) {
        return callback(new Error('名称不能为空'));
      }
      else if (reg.test(value) == false) {
        callback(new Error('名称为中文或者英文！长度为10以内！'));
      } else {
        callback();
      }
    };

    var checkDouble= (rule, value, callback)=>{
      var reg = /^[0-9]+(.[0-9]{1,3})?$/;
      if(reg.test(value) == false){
        return callback(new Error('请输入数字类型'));
      } else {
        callback();
      }
    }
      //校验服务日期
      var checkServiceDate = (rule, value, callback) => {
        if (!value ) {
          callback(new Error('请选择服务日期'))
        }else{
          callback()
        }
      }
      //校验基础服务
      var checkServiceName = (rule, value, callback) => {
        if (!value ) {
          callback(new Error('请选择基础服务'))
        }else{
          callback()
        }
      }
      //校验服务人
      var checkserviceDoct = (rule, value, callback) => {
        if (!value ) {
          callback(new Error('请输入服务人'))
        } else if (value.length > 20) {
          return callback(new Error("长度超长"));
        }else{
          callback()
        }
      }
      //校验服务描述
      var checkCommon = (rule, value, callback) => {
        if (!value ) {
          callback(new Error('请输入服务描述'))
        } else if (value.length > 150) {
          return callback(new Error("长度超长"));
        }else{
          callback()
        }
      }
    return {
      listLoading: false,
      page: 1,
      users: [], //用户
      teamNameArr:'',
      arr: [],
      serviceName:'',
      serviceCode:'',
      hiddenButton: false,
      currentPage:1,
      total: 0,
//   查询表单的select的option列表
      select:{
        genderType:[{value:"1",label:"男"},{value:"2",label:"女"}],
        selSourctType:[{value:"1",label:"系统生成"},{value:"2",label:"手动输入"}],
      },
      pickerOptions0:{
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
//    转介居民表单
      zjjmForm: {
        name: '',
        nameIndex:'',
        idNumber:'',
        phone:'',
        tel:'',
      },
      rules2: {
        serviceDate: [
          { required: true, message: '请输入服务日期'},
          {validator: checkServiceDate, trigger: 'blur'}
        ],
        serviceDoct: [
          { required: true, message: '请输入服务人'},
          {validator: checkserviceDoct, trigger: 'blur'}
        ],
        serviceName: [
          { required: true, message: '请输入基础服务'},
          {validator: checkServiceName, trigger: 'blur'}
        ],
        serviceCount: [
          { required: true, message: '请输入服务次数'},
          { validator: checkDouble, trigger: 'blur' }
        ],
        common: [
          { required: true, message: '请输入服务描述'},
          {validator: checkCommon, trigger: 'blur'}
        ],
      },
//    模态框数据结束
      //编辑界面数据
      editFormVisible:false,
      editForm: {
        name:'',
        gender:'',
        contractDate:'',
        teamCode:'',
        serviceDate:'',
        serviceDoct:'',
        serviceName:'',
        serviceCode:'',
        serviceCount:'',
        sourctType:'',
        common:''
      },
//    提交加载动画
      editLoading:false,
    }
  },
  methods: {
    //表单重置
    resetForm(formName) {
      if (
        formName != undefined &&
        formName.$refs.editForm != null &&
        formName.$refs.editForm.resetFields() != undefined
      )
        formName.resetFields();
    },

    //对表格隔行换色进调整
    tableRowClassName(row, index) {
      if (index%2 !==0) {
        return 'info-odd';
      } else if (index%2 ==0) {
        return 'info-even';
      }
      return '';
    },
    //表格数据获取用户列表
    searchUsers(formName,pageValue,currentPage) {
      if(currentPage == undefined || currentPage == ''){
        currentPage = 1;
      }
      //搜索功能
      var data = '';
      let page = pageValue;
      this.page = pageValue;
      this.currentPage = currentPage;
      this.zjjmForm.start=(this.page-1)*10;
      this.zjjmForm.limit=10;
      this.zjjmForm.dir='DESC';
      this.zjjmForm.sort='id';
      let para = {
        contractDto:this.zjjmForm
      };
      this.listLoading = true;
      var doc = this.zjjmForm;
      var zjjmUserData=JSON.stringify(this.zjjmForm);
      console.log(zjjmUserData);
      getZjjmListPage(zjjmUserData).then((res)  => {
        this.users = res.data.content;
        this.total = res.data.totalElements;
        this.page = res.data.totalPages;
        this.listLoading = false;
      })
        .catch( (error) =>{
          console.log(this);
          console.log(error);
        });
    },
    //换页
    handleCurrentChange(val) {
      this.page = val;
      this.searchUsers('zjjmForm',val,val);
    },
    //全选中
    selectAll : function (seles) {
      this.sele = seles;
      this.hiddenButton = false;
    },

    //性别显示转换
    formatGender: function (row, column) {
      return row.gender == 1 ? '男' : row.gender == 2 ? '女' : '未知';
    },
    //出生日期格式化
    dateFormat: function (row, column) {
      var birthDate = row[column.property];
      if(birthDate != '' && birthDate!= null && birthDate != undefined){
       return row.birthDate= util.formatDate.format(new Date(row[column.property]),'yyyy-MM-dd');
      }
    },
    getJcServiceList() {
      let para = {};
      this.listLoading = true;
      getJcServiceList(para).then(res => {
        this.arr = res.data;
      });
    },
    //下拉框基础服务
    querySearch(queryString, cb) {
      var restaurants = this.arr;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.searchCode
            .toUpperCase()
            .indexOf(queryString.toUpperCase()) === 0 ||
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(selected) {
      this.editForm.serviceCode=selected.serviceCode;
    },

    //显示编辑界面
    handleEdit: function (index, row) {
      var teamCode=row.teamCode;
      this.getTeamName(teamCode);
      this.getJcServiceList();//下拉框查询基础服务

      //ES6深层拷贝当前行数据赋值给editfrom
      this.editForm = Object.assign({}, row);
      this.editForm.sourctType='2';
      this.editFormVisible = true;
      this.listLoading = false;
      this.resetForm(this);
    },
    //查询签约团队名称
    getTeamName(teamCode) {
      let para = {teamCode};
      this.listLoading = true;
      getTeamNameByCode(para).then(res => {
        this.teamNameArr = res.data.name;
      });
    },

    //编辑界面提交编辑
    editSubmit:function(){
      this.$refs.editForm.validate((valid)=>{
        if(valid){
          this.$confirm('确认提交？','提交',{}).then(()=>{
            var serviceDate = this.editForm.serviceDate;
            if(serviceDate != '' && serviceDate!= null && serviceDate != undefined){
              this.editForm.serviceDate = util.formatDate.format(new Date(this.editForm.serviceDate),'yyyy-MM-dd');
            }
            this.editLoading=true;
            let para=Object.assign({},this.editForm);
            addServiceRecord(para).then((res)=>{
              let msg =  res.data.message;
              let suc = res.data.success;
              let type = 'false';
              if(suc == true) {
                type = 'success';
              } else{
                type = 'false';
              }
              var _this = this;
              this.$message({
                showClose: true,
                message: msg,
                type: type,
                onClose: function () {
                  if(suc == true){
                    _this.editFormVisible=false;
                    _this.searchUsers('zjjmForm',1,1);
                  }
                  this.editLoading=false;
                }
              });
            });
          }).catch(() => {
              NProgress.done();
              this.$message({
                message: "提交超时",
                type: "error"
              });
              this.editLoading = false;
            });
        }
      })
    },
  },
  mounted(){//dom加载完毕，渲染数据初始化
    this.searchUsers();
  }
  }
</script>
<style>
  .el-table .info-odd {
    background: #f5f5f5;
  }

  .el-table .info-even {
    background: #fff;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #f07f2e;
    background: #f07f2e;
  }
  .my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;
      width: 200px;
      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }
</style>
