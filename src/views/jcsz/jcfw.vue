<template>
  <section>
    <!--表单区视图-->
    <wn-row>
      <wn-col :xs="24">
        <div class="box">
          <div class="box-content" style="padding-bottom: 0">
            <wn-form  :model="searchForm" :rules="rules" ref="searchForm" label-width="80px" >
              <wn-row >
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="3">
                  <wn-form-item label="名称"  prop="illness" >
                    <wn-input type="text"  v-model="searchForm.name" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="3">
                  <wn-form-item label="检索码" >
                    <wn-input type="text"  v-model="searchForm.searchCode" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="服务类型" >
                    <wn-select v-model="searchForm.serviceType" clearable  placeholder="请选择">
                      <wn-option v-for="item in select.serviceType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                    </wn-select>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="考核类型" >
                    <wn-select v-model="searchForm.assessType" clearable  placeholder="请选择">
                      <wn-option v-for="item in select.assessType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                    </wn-select>
                  </wn-form-item>
                </wn-col>

                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="状态" prop="change">
                    <wn-select v-model="searchForm.serStates" clearable placeholder="请选择">
                      <wn-option v-for="item in select.serStates" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                    </wn-select>
                  </wn-form-item>
                </wn-col>

                <wn-col  :xs="24"  :sm="24" :md="8" :lg="6" style="text-align: right;margin-bottom: 10px;">

                  <wn-button type="warning" @click="searchServiceLists('searchForm',1)">查&nbsp;&nbsp;询</wn-button>
                  <!--<wn-button type="warning" @click="resetForm('searchForm')">重&nbsp;&nbsp;置</wn-button>-->
                  <wn-button type="warning" @click="handleAdd">新&nbsp;&nbsp;建</wn-button>
                  <wn-button type="warning" @click="batchSet(1)" :disabled="this.sels.length===0||(this.batchStar===true && this.hiddenButton===true)">停&nbsp;&nbsp;用</wn-button>
                  <wn-button type="warning"  @click="batchSet(0)" :disabled="this.sels.length===0||(this.batchStar===false && this.hiddenButton===true)">启&nbsp;&nbsp;用</wn-button>
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
            <wn-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" :row-class-name="tableRowClassName" style="width: 100%;">
              <wn-table-column type="selection"  width="55" header-align="center" align="center" >
              </wn-table-column>
              <wn-table-column type="index" label="编号" width="55">
              </wn-table-column>
              <wn-table-column prop="name" label="名称" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="searchCode" label="检索码" width="100"  header-align="center" align="center" >
              </wn-table-column>
              <wn-table-column prop="serviceType" label="服务类型" :formatter="formatServiceType" width="100" header-align="center" align="center" >
              </wn-table-column>
              <wn-table-column prop="assessType" label="考核类型" :formatter="formatAssessType" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="assessScore" label="考核分值"  width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="appoint" label="可否预约"  :formatter="formatAppoint" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="referencePrice" label="参考价格" width="100" header-align="left" align="center">
              </wn-table-column>
              <wn-table-column prop="serStates" label="状态" width="100" :formatter="formatSerStates" header-align="center" align="center">
              </wn-table-column>

              <wn-table-column  label="操作" min-width="180"  header-align="center" align="center">
                <template slot-scope="scope">
                  <i class="iconfont icon-xg" style="cursor:pointer" @click="handleEdit(scope.$index, scope.row)" title="修改"></i>
                  <!--启用-->
                  <i class="iconfont icon-ty" style="cursor:pointer" v-show="scope.row.serStates == '0' ? true: false"  @click="handleStop(scope.$index, scope.row)" title="停用"></i>
                  <!--停用-->
                  <i class="iconfont icon-sp" style="cursor:pointer" v-show="scope.row.serStates == '1' ? true : false"  @click="handleStar(scope.$index, scope.row)" title="启用"></i>
                  <!--<i class="iconfont" :class="icon-ty:isstop,icon-sp:isstar" @click="handleStop(scope.$index, scope.row)" title="停用"></i>-->
                </template>
              </wn-table-column>
            </wn-table>
            <!--分页功能-->
            <wn-col :span="24" class="toolbar">
              <wn-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" :total="total" >
              </wn-pagination>
            </wn-col>
          </div>
        </div>
      </wn-col>
    </wn-row>
    <!--新建服务包模态框视图-->
    <wn-dialog title="基 础 服 务 信 息" v-model="addFormVisible" :close-on-click-modal="false" top="5%" size="large" >

      <div class="box" style="margin-bottom: 0px">
        <div class="box-content" style="padding-bottom: 0">
          <wn-form  :model="addForm"  label-width="100px" :rules="rules" ref="addForm">
            <wn-row >
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="服务名称" prop="name">
                  <wn-input type="text"  v-model="addForm.name"  :maxlength="64" @change="jsmComplete(addForm)" ></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="服务编号" prop="serviceNum">
                  <wn-input type="text"  v-model="addForm.serviceNum" :maxlength="64"></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="检索编码" prop="searchCode">
                  <wn-input type="text"  v-model="addForm.searchCode"   :disabled="true" placeholder="默认为名称首写字母"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row >
              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="服务类型" prop="serviceType">
                  <wn-select v-model="addForm.serviceType" placeholder="请选择">
                    <wn-option v-for="item in select.serviceType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                    <!--<wn-option v-for="item in select.xylx" :key="item.value" :value="item.value" :label="item.label"></wn-option>-->
                  </wn-select>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="考核类型" prop="assessType">
                  <wn-select v-model="addForm.assessType" placeholder="请选择">
                    <wn-option v-for="item in select.assessType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                    <!-- <wn-option v-for="item in select.assessType" :key="item.value" :value="item.value" :label="item.label"></wn-option>-->
                  </wn-select>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="考核分值" prop="assessScore">
                  <wn-input type="text"  v-model="addForm.assessScore" ></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="参考价格" prop="referencePrice">
                  <wn-input type="text"   v-model="addForm.referencePrice"  :maxlength="10"></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="排序" prop="sort">
                  <wn-input type="text"  v-model="addForm.sort" ></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="可否预约" prop="appoint">
                  <wn-radio class="radio" v-model="addForm.appoint" label="0" >是</wn-radio>
                  <wn-radio  class="radio" v-model="addForm.appoint" label="1">否</wn-radio>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row>
              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="状态" prop="serStates">
                  <wn-radio class="radio" v-model="addForm.serStates" label="0" >启用</wn-radio>
                  <wn-radio  class="radio" v-model="addForm.serStates" label="1">停用</wn-radio>
                </wn-form-item>
              </wn-col>
            </wn-row>
          </wn-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <wn-button type="warning" @click.native="addSubmit" :loading="addLoading">保存</wn-button>
        <wn-button type="warning"  @click.native="addFormVisible = false">取消</wn-button>

      </div>
    </wn-dialog>
    <!--表格修改功能视图-->
    <wn-dialog title="基础服务信息"  :close-on-click-modal="false" v-model="editFormVisible">
      <wn-form :model="editForm" label-width="100px" :rules="rules" ref="editForm">
        <wn-form-item label="服务名称" >
          <wn-input v-model="editForm.name" auto-complete="off"   :maxlength="64" @change="jsmComplete(editForm)" ></wn-input>
        </wn-form-item>
        <wn-form-item label="服务编号" >
          <wn-input v-model="editForm.serviceNum" auto-complete="off" :maxlength="64" ></wn-input>
        </wn-form-item>
        <wn-form-item label="检索编码" >
          <wn-input v-model="editForm.searchCode"  :disabled="true" auto-complete="off"  placeholder="默认为名称首字母"></wn-input>
        </wn-form-item>
        <wn-form-item label="服务类型" >
          <wn-select v-model="editForm.serviceType" placeholder="请选择">
            <wn-option v-for="item in select.serviceType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
          </wn-select>
        </wn-form-item>
        <wn-form-item label="考核类型" >
          <wn-select v-model="editForm.assessType" placeholder="请选择"  >
            <wn-option v-for="item in select.assessType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
          </wn-select>
        </wn-form-item>
        <wn-form-item label="考核分值" >
          <wn-input v-model="editForm.assessScore" auto-complete="off"  ></wn-input>
        </wn-form-item>
        <wn-form-item label="参考价格">
          <wn-input-number v-model="editForm.referencePrice" :min="0" ></wn-input-number>元
        </wn-form-item>
        <wn-form-item label="排序">
          <wn-input v-model="editForm.sort" auto-complete="off" ></wn-input>
        </wn-form-item>
        <wn-form-item label="可否预约" >
          <wn-radio class="radio" v-model="editForm.appoint" label="0">是</wn-radio>
          <wn-radio  class="radio" v-model="editForm.appoint" label="1">否</wn-radio>
        </wn-form-item>
        <wn-form-item label="状态" >
          <wn-radio class="radio" v-model="editForm.serStates" label="0">启用</wn-radio>
          <wn-radio  class="radio" v-model="editForm.serStates" label="1">停用</wn-radio>
        </wn-form-item>
      </wn-form>
      <div slot="footer" class="dialog-footer">
        <wn-button type="warning" @click.native="editFormVisible = false">取消</wn-button>
        <wn-button type="warning" @click.native="editSubmit" :loading="editLoading">提交</wn-button>
      </div>
    </wn-dialog>
  </section>
</template>
<script type="text/javascript">
  import util from '../../common/js/util'
  import NProgress from 'nprogress'
  import hypy from '../../common/js/hypy'
  import { getUserListPage,searchUserList,getOptionsList,handleStop,handleStar,batchSets, editUser, addUser,searchServiceList,addService,editService,updateServiceStates } from '../../api/api';
  export default {
    data()
    {
//               自定义验证名词规则
      var checkName = (rule, value, callback) =>{
        var reg = /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
        //^[0-9]+(.[0-9]{1,3})?$
        if (!value) {
          return callback(new Error('名称不能为空'));
        } else {
          callback();
        }

      };
      var checkDouble= (rule, value, callback)=>{
        var reg = /^[0-9]+(.[0-9]{1,3})?$/;
        if(reg.test(value) == false){
          return callback(new Error('请输入数字类型的价格'));
        } else {
          callback();
        }

      }
      return {
        listLoading: false,
        page: 1,
        searchpage:1,
        users:[],//用户
        sels: [],//列表选中列
        batchStar:'',
        total: 0,
        hiddenButton: false,
        currentPage:1,
//          服务包表单查询表单的select的option列表
        select:{
          serviceType:[{value:"0",label:"基本诊疗"},{value:"1",label:"公卫服务"}],
          assessType:[{value:"0",label:"不考核"},{value:"1",label:"自动考核"},{value:"2",label:"手动考核"}],
          serStates:[{value:"0",label:"启用"},{value:"1",label:"停用"}],
        },
//           基础服务表单初始化数据
        searchForm: {
          serviceNum: '',
          serviceCode:'',
          name:'',
          searchCode:'',
          serviceType:'',
          assessType:'',
          assessScore:'',
          appoint:'',
          referencePrice:'',
          sort:'',
          serStates:'',
          value:''
        },
        rules: {
          name: [
            { required: true, message: '请输入服务名称', trigger: 'blur' },
            { validator: checkName, trigger: 'blur' }
          ],
          serviceNum: [
            { required: true, message: '请输入服务编号', trigger: 'blur' }
          ],
          serviceType: [
            { required: true, message: '请输入服务类型', trigger: 'change'  }
          ],
          assessType: [
            { required: true, message: '请输入考核类型', trigger: 'change'  }
          ],
          assessScore: [
            { required: true, message: '请输入考核分值', trigger: 'blur' }
          ],
          referencePrice: [
            { required: true, message: '请输入参考价格', trigger: 'blur' },
            { validator: checkDouble, trigger: 'blur' }
          ],
          sort:[
            { required: true, message: '请输入排序顺序', trigger: 'blur' }
          ]
        },
//                  模态框数据开始
        addFormVisible:false,
//                    新增界面表单
        addForm: {
          serviceNum: '',
          serviceCode: '',
          name:'',
          searchCode:'',
          serviceType:'',
          assessType:'',
          assessScore:'',
          appoint:'',
          referencePrice:'',
          serStates:'',
          sort:''

        },
        addLoading:false,
//                  模态框数据结束
        //编辑界面数据
        editFormVisible:false,
        editForm: {
          serviceNum: '',
          serviceCode: '',
          name:'',
          searchCode:'',
          serviceType:'',
          assessType:'',
          assessScore:'',
          appoint:'',
          referencePrice:'',
          serStates:'',
          sort:''
        },
//                    提交加载动画
        editLoading:false,
        //编辑界面数据结束
      }
    },
    methods: {
      resetForm(formName) {
        if (
          formName != undefined &&
          formName.$refs.addForm != null &&
          formName.$refs.addForm.resetFields() != undefined
        )
          formName.resetFields();
      },
      formatServiceType: function (row, column) {
        return row.serviceType == 0 ?'基本诊疗' : row.serviceType == 1 ?'公卫服务' : '公卫服务';
      },
      formatAssessType: function (row, column) {
        return row.assessType == 0 ?'不考核' : row.assessType == 1 ?'自动考核' : '手动考核';
      },
      formatAppoint: function (row, column) {
        return row.appoint == 0 ?'是' : row.appoint == 1 ?'否' : '否';
      },
      formatSerStates: function (row, column) {
        return row.serStates == 0 ?'启用' : row.serStates == 1 ?'停用' : '停用';
      },
      //名称拼音简写
      jsmComplete(jsmName){
        jsmName.searchCode=hypy.getSearchCode(jsmName.name);
        // this.$refs.jsmRef.disabled = true;
      },
//        对表格隔行换色进调整
      tableRowClassName(row, index) {
        if (index%2 !==0) {
          return 'info-odd';
        } else if (index%2 ==0) {
          return 'info-even';
        }
        return '';
      },

      //查询表单获取初始化option
      getOptions() {
//      获取当前路由
//       let path=this.$route.path.substring(1)
        let para={
        }
        this.listLoading = true;
        searchServiceList(para).then((res)  => {
          this.users = res.data;
          this.listLoading = false;
          // tht = res.dais.selecta.Options;
        });
      },
      //表格数据获取用户列表
      // getUsers() {
      //   //搜索功能
      //   this.searchServiceLists('searchForm',1,1);
      // },
//      查询功能
      searchServiceLists(formName,pageValue,currentPage) {
        if(currentPage == undefined || currentPage == ''){
          currentPage = 1;
        }
        let page = pageValue;
        this.currentPage = currentPage;
        this.searchForm.start=(currentPage-1)*10;
        this.searchForm.limit=10;
        this.searchForm.dir='DESC';
        this.searchForm.sort='sort';
        let para = JSON.stringify(this.searchForm);
        this.listLoading = true;
        searchServiceList(para).then((res)  => {
          this.users = res.data.content;
          this.total = res.data.totalElements;
          this.page = res.data.totalPages;
          this.listLoading = false;
        });
      },
//      表单重置
//       resetForm(formName) {
//         this.$refs[formName].resetFields();
//       },
//    换页
      handleCurrentChange(val) {
        this.page = val;
        this.searchServiceLists('searchForm',val,val);
      },
      //显示新建界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          serviceNum: '',
          serviceCode: '',
          name:'',
          searchCode:'',
          serviceType:'0',
          assessType:'0',
          assessScore:'',
          appoint:'0',
          referencePrice:'',
          serStates:'0',
          sort:''

        };
        this.resetForm(this);
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          console.log(valid);
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              NProgress.start();
              let para = JSON.stringify(this.addForm);
              addService(para).then((res) => {
                this.addLoading = false;
                let msg =  res.data.message;
                let suc = res.data.success;
                let type = '';
                if(suc === true) {
                  type = 'success';
                } else{
                  type = 'error';
                }
                debugger
                var _this = this;
                this.$message({
                  showClose: true,
                  message: msg,
                  type: type,
                  onClose: function () {
                    if(suc == true){
                      // _this.$refs['addForm'].resetFields();
                      // getDoctor(JSON.stringify(_this.addForm));
                      _this.addFormVisible=false;
                      _this.searchServiceLists('searchForm',1,1);
                    }
                  }
                });
                // this.$refs['addForm'].resetFields();
                // this.addFormVisible = false;
              });

//            可以增加适量的数据过滤

            });
          }
        });
      },
//    选中状态切换
      selsChange: function (sels) {
//      选中行对象
        this.sels = sels;
        if(sels != undefined && sels.length==1) {
          this.hiddenButton = false;
          if (sels[0].serStates == '0') {
            this.hiddenButton = true;
            this.batchStar = false;
            // this.selectable();
          }else {
            this.hiddenButton = true;
            this.batchStar = true
          }
        }else{
          this.hiddenButton = false;
        }
      },
//    禁止选中状态
      selectable(row,index){

        if(row.serStates=="1"){
          return false
        }else {
          return true
        }
      },


      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
//        ES6深层拷贝当前行数据赋值给editfrom
        this.editForm = Object.assign({}, row);
      },
//    对当前数据的状态进行管理停用
      handleStop:function(index,row){
        this.$confirm('确认将当前状态停用？','提交',{}).then(()=>{
          let para={
            ids:this.users[index].id,
            states:'1'
          }
          updateServiceStates(para).then((res)=>{
            debugger
            let msg =  res.data.message;
            let suc = res.data.success;
            let cpg = res.data.result.currentPage;
            let type = 'false';
            debugger
            if(suc == true) {
              type = 'success';
            } else{
              type = 'false';
            }
            var _this = this;
            this.$message({
              duration:1000,
              showClose: true,
              message: msg,
              type: type,
              onClose: function () {
                if(suc == true){
                  _this.editFormVisible=false;
                  _this.searchServiceLists('searchForm',cpg,cpg);
                }
              }
            // this.$message({
            //   message:'修改成功',
            //   type:'success',
            //   duration:2000
            // });
            });
          });

        })
      },
      handleStar:function(index,row){
        this.$confirm('确认将当前状态启用？','提交',{}).then(()=>{

          let para={
            ids:this.users[index].id,
            states:'0'
          }
          updateServiceStates(para).then((res)=>{
            let msg =  res.data.message;
            let suc = res.data.success;
            let cpg = res.data.result.currentPage;
            let type = 'false';
            debugger
            if(suc == true) {
              type = 'success';
            } else{
              type = 'false';
            }
            var _this = this;
            this.$message({
              duration:1000,
              showClose: true,
              message: msg,
              type: type,
              onClose: function () {
                if(suc == true){
                  _this.editFormVisible=false;
                  _this.searchServiceLists('searchForm',cpg,cpg);
                }
              }
              // this.$message({
              //   message:'修改成功',
              //   type:'success',
              //   duration:2000
              // });
            });
          });

        })
      },
//    编辑界面提交编辑
      editSubmit:function(){
        this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true;
            NProgress.start();
            let para = JSON.stringify(this.editForm);
            addService(para).then((res) => {
              this.addLoading = false;
              let msg =  res.data.message;
              let suc = res.data.success;
              let type = '';
              if(suc === true) {
                type = 'success';
              } else{
                type = 'error';
              }
              debugger
              var _this = this;
              this.$message({
                showClose: true,
                message: msg,
                type: type,
                onClose: function () {
                  if(suc == true){
                    // _this.$refs['addForm'].resetFields();
                    // getDoctor(JSON.stringify(_this.addForm));
                    _this.editFormVisible=false;
                    _this.searchServiceLists('searchForm',_this.page,_this.page);
                  }
                }
              });
              // this.$refs['addForm'].resetFields();
              // this.addFormVisible = false;
            });

//            可以增加适量的数据过滤

          });
        }
      });
      },
//    批量启用停用
      batchSet(batchzt) {
        var currPage =  this.currentPage ;
        var ids = this.sels.map(item => item.id).toString();
        debugger
        this.$confirm('确认修改选中状态吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {
            ids: ids,
            states: batchzt,
            currentPage : currPage
          };
          updateServiceStates(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            let msg =  res.data.message;
            let suc = res.data.success;
            let cpg = res.data.result.currentPage;
            let type = 'false';
            if(suc == true) {
              type = 'success';
            } else{
              type = 'error';
            }
            var _this = this;
            this.$message({
              duration:1000,
              showClose: true,
              message: msg,
              type: type,
              onClose: function () {
                if(suc == true){
                  // _this.$refs['addForm'].resetFields();
                  // getDoctor(JSON.stringify(_this.addForm));
                  // _this.editFormVisible=false;
                  _this.searchServiceLists('searchForm',cpg,cpg);
                }
              }
            });
          });
        }).catch(() => {
          NProgress.done();
          this.$message({
            message: '提交超时',
            type: 'error'
          });
        });
      }
    },
    mounted(){//dom加载完毕，渲染数据初始化
      this.selsChange(this.sels);
      this.searchServiceLists('searchForm',1,1);
      // this.getOptions();
    }
  }
</script>
<style scoped>

  .el-radio__input.is-checked .el-radio__inner {
    border-color: #f07f2e;
    background: #f07f2e;
  }
  .icon-sp:before {
    margin:0 15px;
  }
</style>
