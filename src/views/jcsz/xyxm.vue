<template>
  <section>
    <!--表单区视图-->
    <wn-row>
      <wn-col :xs="24">
        <div class="box">
          <div class="box-content" style="padding-bottom: 0">
            <wn-form  :model="searchForm" :rules="rules" ref="searchForm" label-width="100px" class="demo-ruleForm wnform">
              <wn-row >
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="名称" prop="name">
                    <wn-input type="text"  v-model="searchForm.name" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="检索码" >
                    <wn-input type="text"  v-model="searchForm.searchCode" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="适宜人群" prop="itemType">
                    <wn-select v-model="searchForm.itemType" clearable placeholder="请选择">
                      <wn-option v-for="item in select.itemType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                    </wn-select>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="状态" prop="states">
                    <wn-select v-model="searchForm.states" clearable placeholder="请选择">
                      <wn-option v-for="item in select.states" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                    </wn-select>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="24" :md="8" :lg="8" style="text-align: right;">
                  <wn-form-item >
                    <wn-button type="warning" @click="searchItemServiceLists('searchForm',1)">查&nbsp;&nbsp;询</wn-button>
                    <wn-button type="warning" @click="handleAdd">新&nbsp;&nbsp;建</wn-button>
                    <wn-button type="warning" @click="batchSet(1)" :disabled="this.sels.length===0||(this.batchStar===true && this.hiddenButton===true)">停&nbsp;&nbsp;用</wn-button>
                    <wn-button type="warning"  @click="batchSet(0)" :disabled="this.sels.length===0||(this.batchStar===false && this.hiddenButton===true)">启&nbsp;&nbsp;用</wn-button>
                  </wn-form-item>
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
          <div class="box-content clearfix" style="padding: 0 15px;">
            <!--表格-->
            <wn-table :data="items" highlight-current-row v-loading="listLoading" @selection-change="selsChange" :row-class-name="tableRowClassName" style="width: 100%;">
              <wn-table-column type="selection" width="55" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="name" label="名称" width="120" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="itemType" label="适宜人群" width="100" :formatter="formatItemType" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="searchCode" label="检索码" width="100"  header-align="center" align="center" >
              </wn-table-column>
              <wn-table-column prop="states" label="状态" width="100" :formatter="formatSerStates" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="sort"  label="排序" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="content" label="项目描述"  header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="serviceName" label="基础服务" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column  label="操作" width="180" header-align="center" align="center">
                <template  slot-scope="scope">
                  <i class="iconfont icon-xg"  @click="handleEdit(scope.$index, scope.row)" title="修改"></i>
                  <!--启用-->
                  <i class="iconfont icon-ty" v-show="scope.row.states == '0' ? true: false"  @click="handleStop(scope.$index, scope.row)" title="停用"></i>
                  <!--停用-->
                  <i class="iconfont icon-sp" v-show="scope.row.states == '1' ? true : false"  @click="handleStar(scope.$index, scope.row)" title="启用"></i>
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
    <!--新建服务包模态框视图-->
    <wn-dialog title="协 议 项 目 信 息" v-model="addFormVisible" :close-on-click-modal="false" top="5%" size="large" >

      <div class="box" style="margin-bottom: 15px">
        <div class="box-content" style="padding-bottom: 0">
          <wn-form  :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm wnform">
            <wn-row >
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="项目名称" prop="name">
                  <wn-input type="text"  v-model="addForm.name"   :maxlength="64" @change="jsmComplete(addForm)"></wn-input>
                </wn-form-item>
              </wn-col>

              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="适宜人群" prop="itemType">
                  <wn-select v-model="addForm.itemType" placeholder="请选择">
                    <wn-option v-for="item in select.itemType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                  </wn-select>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="检索编码"  prop="searchCode">
                  <wn-input type="text"  v-model="addForm.searchCode" :disabled="true" placeholder="默认为名称首写字母"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row >
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="排序" prop="sort">
                  <wn-input type="text"  v-model="addForm.sort"  :maxlength="22" ></wn-input>
                </wn-form-item>
              </wn-col>

              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="状态" prop="state">
                  <wn-radio class="radio" v-model="addForm.states" label="0">启用</wn-radio>
                  <wn-radio  class="radio" v-model="addForm.states" label="1">停用</wn-radio>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row >
              <wn-col  :xs="24"  >
                <wn-form-item label="简介" prop="content">
                  <wn-input type="textarea" v-model="addForm.content"  :maxlength="300"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
          </wn-form>
        </div>
      </div>
      <div class="box" style="margin-bottom: 0px">
        <div class="box-header" style="margin-top: 10px">
          <div class="box-name">
            <span>基础服务：</span>
            <wn-autocomplete
              popper-class="my-autocomplete"
              v-model="state3"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect">
              <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
                @click="handleIconClick">
              </i>
              <template slot-scope="props">
                <div class="name">{{ props.item.value }}</div>
                <span class="addr">{{ props.item.name }}</span>
              </template>
            </wn-autocomplete>
          </div>
        </div>
        <div class="box-content" style="padding-top: 10px">
          <wn-table
            :data="tableData"
            style="width: 100%" :row-class-name="tableRowClassName">
            <wn-table-column
              prop="name"
              label="服务名称"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column
              prop="serviceType"
              label="服务类型"
              width="180" header-align="center"  :formatter="formatServiceType" align="center">
            </wn-table-column>
            <wn-table-column
              prop="assessType"
              label="考核类型"
              width="180" header-align="center" :formatter="formatAssessType" align="center">
            </wn-table-column>
            <wn-table-column
              prop="assessScore"
              label="参考价格"
              width="100" header-align="center" :formatter="formatPrice" align="center">
            </wn-table-column>
            <wn-table-column label="操作" header-align="center" align="center">
              <template scope="scope">
                <i class="iconfont icon-delete"  @click="handleDelte(scope.$index, scope.row)" title="删除"></i>
              </template>
            </wn-table-column>
          </wn-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <wn-button type="warning" @click.native="addSubmit" :loading="addLoading">保存</wn-button>
        <wn-button type="warning"  @click.native="addFormVisible = false">取消</wn-button>
      </div>
    </wn-dialog>
    <!--表格修改功能视图-->
    <wn-dialog title="编辑"  :close-on-click-modal="false" v-model="editFormVisible" size="large" >
      <div class="box" style="margin-bottom: 15px">
        <div class="box-content" style="padding-bottom: 0">
          <wn-form  :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm wnform">
            <wn-row >
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="项目名称" prop="name">
                  <wn-input type="text"  v-model="editForm.name" @change="jsmComplete(editForm)"></wn-input>
                </wn-form-item>
              </wn-col>

              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="适宜人群" prop="itemType">
                  <wn-select v-model="editForm.itemType" placeholder="请选择">
                    <wn-option v-for="item in select.itemType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                  </wn-select>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="检索编码"  prop="searchCode">
                  <wn-input type="text"  v-model="editForm.searchCode" :disabled="true" placeholder="默认为名称首写字母"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row >
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="排序" prop="sort">
                  <wn-input type="text"  v-model="editForm.sort" ></wn-input>
                </wn-form-item>
              </wn-col>

              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="状态" prop="state">
                  <wn-radio class="radio" v-model="editForm.states" label="0">启用</wn-radio>
                  <wn-radio  class="radio" v-model="editForm.states" label="1">停用</wn-radio>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row >
              <wn-col  :xs="24"  >
                <wn-form-item label="简介" prop="content">
                  <wn-input type="textarea" v-model="editForm.content"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
          </wn-form>
        </div>
      </div>
      <div class="box" style="margin-bottom: 0px">
        <div class="box-header" style="margin-top: 10px">
          <div class="box-name">
            <span>协议项目：</span>
            <wn-autocomplete
              popper-class="my-autocomplete"
              v-model="state4"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect">
              <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
                @click="handleIconClick">
              </i>
              <template slot-scope="props">
                <div class="name">{{ props.item.value }}</div>
                <span class="addr">{{ props.item.name }}</span>
              </template>
            </wn-autocomplete>
          </div>
        </div>
        <div class="box-content" style="padding-top: 10px">
          <wn-table
            :data="tableData"
            style="width: 100%" :row-class-name="tableRowClassName">
            <wn-table-column
              prop="name"
              label="服务名称"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column
              prop="serviceType"
              label="服务类型"
              width="180" header-align="center"  :formatter="formatServiceType" align="center">
            </wn-table-column>
            <wn-table-column
              prop="assessType"
              label="考核类型"
              width="180" header-align="center" :formatter="formatAssessType" align="center">
            </wn-table-column>
            <wn-table-column
              prop="assessScore"
              label="参考价格"
              width="100" header-align="center" :formatter="formatPrice" align="center">
            </wn-table-column>
            <wn-table-column label="操作" header-align="center" align="center">
              <template scope="scope">
                <i class="iconfont icon-delete"  @click="handleDelte(scope.$index, scope.row)" title="删除"></i>
              </template>
            </wn-table-column>
          </wn-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <wn-button type="warning" @click.native="editSubmit" :loading="editLoading">保存</wn-button>
        <wn-button type="warning"  @click.native="editFormVisible = false">取消</wn-button>
      </div>
    </wn-dialog>
  </section>
</template>
<script type="text/javascript">
  import util from '../../common/js/util'
  import hypy from '../../common/js/hypy'
  import NProgress from 'nprogress'
  import {test, getUserListPage,searchUserList,getOptionsList,handleStop,handleStar,batchSets, editUser, addUser,searchServiceList,updateItemStates,searchServiceLists,searchItemServiceList,addItem } from '../../api/api';
  export default {
    data()
    {
//               自定义验证规则
      var checkName = (rule, value, callback) =>{
        var reg = /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        else if (reg.test(value) == false) {
          callback(new Error('名称为中文或者英文！长度为10以内！'));
        } else {
          callback();
        }

      };
      return {
        listLoading: false,
        filters: {//为配合模拟数据
          name: ''
        },
        page: 1,
        searchpage:1,
        users:[],//用户
        items:[],
        sels: [],//列表选中列
        batchStar:'',
        total: 0,
//                    协议项目表单
        select:{
          itemType:[{value:"0",label:"健康"},{value:"1",label:"慢病"},{value:"2",label:"老年人"}],
          states:[{value:"0",label:"启用"},{value:"1",label:"停用"}],
        },
        searchForm: {
          itemCode: '',
          itemType:'',
          name:'',
          searchCode:'',
          //        非必须
          content:'',
          states:'',
          sort:'',
          orgCode:'',
          orgName:'',
          start:'',
          limit:'',
          dir:'',
          serviceName:''
        },
        searchItemForm: {
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
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          itemType: [
            { required: true, message: '请输入适宜人群', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '请输入排序', trigger: 'blur' }
          ],
          content:[
            { required: true, message: '请输入简介', trigger: 'blur' }
          ]

        },
//                  模态框数据开始
        addFormVisible:false,
//                    新增界面表单
        addForm: {
          itemCode:'',
          itemType:'',
          name: '',
          searchCode:'',
          content:'',
          states:'',
          sort:'',
          orgCode:'启用',
          orgName:'',
          services:[]
        },
        addLoading:false,
        input:'',
        tableData: [],
//    模态框数据结束
        //编辑界面数据
        editFormVisible:false,
        editForm: {
          itemCode:'',
          itemType:'',
          name: '',
          searchCode:'',
          content:'',
          states:'',
          sort:'',
          orgCode:'启用',
          orgName:'',
          services:[]
        },
//                    提交加载动画
        editLoading:false,
        restaurants: [],
        state3: '',
        state4:'',
        arr:[],
        selected:''
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
      //表格数据格式化
      formatItemType: function (row, column) {
        return row.itemType == 0 ?'健康' : row.itemType == 1 ?'慢病' : '老年人';
      },
      formatAssessType: function (row, column) {
        return row.assessType == 0 ?'不考核' : row.assessType == 1 ?'自动考核' : '手动考核';
      },
      formatPrice: function (row, column) {
        return row.referencePrice+'元';
      },
      formatSerStates: function (row, column) {
        return row.states == 0 ?'启用' : row.states == 1 ?'停用' : '停用';
      },
      formatServiceType: function (row, column) {
        return row.serviceType == 0 ?'基本诊疗' : row.serviceType == 1 ?'公卫服务' : '公卫服务';
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
        let path=this.$route.path.substring(1)
        let para={
          route:path
        }
        this.listLoading = true;
        getOptionsList(para).then((res)  => {
          this.select = res.data.Options;
        });
      },
      //获取用户列表
      //表格数据获取用户列表
      getUsers() {
        //搜索功能
        let para = {
          // page: this.page,
        };
        searchItemServiceList(para).then((res)  => {
          this.total = res.data.total;
          this.users = res.data.users;
          this.listLoading = false;
        });

      },
      test:function(){

        let para={};
//      test(para).then((res)=> {
//
//        this.users=res.data;
//
//      })
      },
      //      查询功能
      searchItemServiceLists(formName,pageValue,currentPage) {
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
        console.log(para);
        this.listLoading = true;
        searchItemServiceList(para).then((res)  => {
          this.items = res.data.content;
          console.log(res.data.content);
          this.total = res.data.totalElements;
          this.page = res.data.totalPages;
          this.listLoading = false;
        });
      }
      ,
//    换页
      handleCurrentChange(val) {
        this.page = val;
        this.searchItemServiceLists('searchForm',val,val);
      },
//    选中状态切换
      selsChange: function (sels) {
        //      选中行对象
        this.sels = sels;
        if(sels != undefined && sels.length==1) {
          this.hiddenButton = false;
          if (sels[0].states == '0') {
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
          updateItemStates(para).then((res) => {
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
                  _this.searchItemServiceLists('searchForm',cpg,cpg);
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
      },
      //    对当前数据的状态进行管理停用
      handleStop:function(index,row){
        this.$confirm('确认将当前状态停用？','提交',{}).then(()=>{
          let para={
            ids:this.items[index].id,
            states:'1'
          }
          updateItemStates(para).then((res) => {
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
                  _this.searchItemServiceLists('searchForm',cpg,cpg);
                }
              }
            });
          });

        })
      },
      handleStar:function(index,row){
        this.$confirm('确认将当前状态启用？','提交',{}).then(()=>{

          let para={
            ids:this.items[index].id,
            states:'0'
          }
          updateItemStates(para).then((res) => {
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
                  _this.searchItemServiceLists('searchForm',cpg,cpg);
                }
              }
            });
          });

        })
      },
      //    禁止选中状态
      selectable(row,index){
        if(row.state=="停用"){
          return false
        }else {
          return true
        }
      },
      //审批状态显示转换
      formatSpzt: function (row, column) {
        return row.sex == 1 ? '通过' : row.sex == 0 ? '未通过' : '未知';
      },
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      //显示新建界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm ={
          itemCode:'',
          itemType:'0',
          name: '',
          searchCode:'',
          content:'',
          states:'0',
          sort:'',
          orgCode:'',
          orgName:'',
          services:[]
        };
        this.resetForm(this);
      },
      //新增表单保存
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            if (this.tableData.length >0) {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                this.addLoading = true;
                NProgress.start();
                this.addForm.services = this.tableData;
                let para = Object.assign({}, this.addForm);
//            可以增加适量的数据过滤
                addItem(para).then((res) => {
                  this.addLoading = false;
                  let msg = res.data.message;
                  let suc = res.data.success;
                  let type = '';
                  if (suc == true) {
                    type = 'success';
                  } else {
                    type = 'error';
                  }
                  var _this = this;
                  this.$message({
                    duration: 1000,
                    showClose: true,
                    message: msg,
                    type: type,
                    onClose: function () {
                      if (suc == true) {
                        // _this.$refs['addForm'].resetFields();
                        // getDoctor(JSON.stringify(_this.addForm));
                        _this.addFormVisible = false;
                        _this.searchItemServiceLists('searchForm', 1, 1);
                      }
                    }
                  });

                });
              });
            }else{
              this.$message({
                duration: 1000,
                showClose: true,
                message: '基础服务不能为空',
                type: 'warning'
              });
            }
          }
        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
//        ES6深层拷贝当前行数据赋值给editfrom
        console.log(this.items);
        this.editForm = Object.assign({}, row);
        this.tableData = Object.assign({}, row).services;
      },
//    编辑界面提交编辑
      editSubmit:function(){
        console.log(this.tableData);
        debugger
        if (this.tableData != undefined &&this.tableData.length >0) {
          this.$refs.editForm.validate((valid) => {
            if (valid) {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                this.editLoading = true;
                NProgress.start();
                this.editForm.services = this.tableData;
                let para = Object.assign({}, this.editForm);
//            可以增加适量的数据过滤
                addItem(para).then((res) => {
                  this.editLoading = false;
                  let msg = res.data.message;
                  let suc = res.data.success;
                  let type = '';
                  if (suc == true) {
                    type = 'success';
                  } else {
                    type = 'error';
                  }
                  var _this = this;
                  this.$message({
                    duration: 1000,
                    showClose: true,
                    message: msg,
                    type: type,
                    onClose: function () {
                      if (suc == true) {
                        // _this.$refs['addForm'].resetFields();
                        // getDoctor(JSON.stringify(_this.addForm));
                        _this.editFormVisible = false;
                        _this.tableData = null;
                        _this.searchItemServiceLists('searchForm', 1, 1);
                      }
                    }
                  });
                });
              });
            }
          });
        }else{
          this.$message({
            duration: 1000,
            showClose: true,
            message: '基础服务不能为空',
            type: 'warning'
          });
        }
      },
      querySearch(queryString, cb) {
        var restaurants = this.arr;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.searchCode.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        this.listLoading = true;
        let para = Object.assign({},this.searchItemForm);;
        searchServiceLists(para).then((res)  => {
          this.arr = Array.from(res.data);
        });
      },
      handleSelect(selected) {
        // this.tableData.push(selected);
        console.log("handleSelect" + selected);
        // this.$confirm("确认添加该记录吗?", "提示", {
        //     type: "warning"
        //   })
        //   .then(() => {
        //     this.listLoading = true;
        this.set = new Set(this.tableData);
        let s = false;
        if (this != undefined && this.set != undefined) {
          this.set.forEach(function(value) {
            if (value.serviceCode == selected.serviceCode) {
              s = true;
            }
          });
        }
        if (s) {
          this.$message({
            message: "已存在该服务",
            type: "warning"
          });
        } else {
          this.set.add(selected);
          this.$message({
            message: "添加成功",
            type: "success"
          });
        }

        this.tableData = Array.from(this.set);
        this.listLoading = false;

        // })
        // .catch(() => {
        //   this.$message({
        //     message: "添加失败",
        //     type: "error"
        //   });
        this.tableData = Array.from(this.set);
        // });
      },
      handleIconClick(ev) {
        console.log("handleIconClick");
        console.log(ev);
      },
      handleDelte(asd,bcc){
        this.tableData.splice(asd,1);
      },
    },
    mounted(){//dom加载完毕，渲染数据初始化
      this.searchItemServiceLists('searchForm',1,1);
      // this.getUsers();
      // this.getOptions();
      // this.test();
      this.loadAll();
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
  .icon-sp:before {
    margin:0 15px;
  }
  .my-autocomplete li{
    line-height: normal;
    padding: 7px;
  }
  .my-autocomplete li .name{
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .my-autocomplete li .addr{
    font-size: 12px;
    color: #b4b4b4;
  }
  .my-autocomplete li .highlighted .addr{
    color: #ddd;
  }
</style>
