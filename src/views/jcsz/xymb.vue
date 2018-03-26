<template>
  <section>
    <!--表单区视图-->
    <wn-row>
      <wn-col :xs="24">
        <div class="box">
          <div class="box-content" style="padding-bottom: 0">
            <wn-form  :model="templateForm" :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm wnform">
              <wn-row >
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="名称"  >
                    <wn-input type="text"  v-model="templateForm.name" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="检索码" >
                    <wn-input type="text"  v-model="templateForm.searchCode" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="模板类型" >
                    <wn-select v-model="templateForm.tempType" placeholder="请选择">
                      <wn-option v-for="item in select.mblx" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                    </wn-select>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="状态" prop="change">
                    <wn-select v-model="templateForm.states" placeholder="请选择">
                      <wn-option v-for="item in select.zt" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                    </wn-select>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="24" :md="8" :lg="8" style="text-align: right;margin-bottom: 10px;">
                  <wn-button type="warning" @click="getTemplates('templateForm',1)">查&nbsp;&nbsp;询</wn-button>
                  <!--<wn-button type="warning" @click="resetForm('ruleForm2')">重&nbsp;&nbsp;置</wn-button>-->
                  <wn-button type="warning" @click="handleAdd">新&nbsp;&nbsp;建</wn-button>
                  <wn-button type="warning" @click="templatesBatchSets(2)" :disabled="this.sels.length===0|| (this.batchStar===true && this.hiddenButton===true)" :loading="addLoading">停&nbsp;&nbsp;用</wn-button>
                  <wn-button type="warning" @click="templatesBatchSets(1)" :disabled="this.sels.length===0|| (this.batchStar===false && this.hiddenButton===true)" :loading="addLoading">启&nbsp;&nbsp;用</wn-button>
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
              <span>协议模板</span>
            </div>
          </div>
          <div class="box-content clearfix" style="padding: 0 10px;">
            <!--表格-->
            <wn-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" :row-class-name="tableRowClassName" style="width: 100%;">
              <wn-table-column type="selection"  prop="id" label="ID" width="55" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="name" label="名称" width="220" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="tempType" label="模板类型"  :formatter="formatTempType" width="100"  header-align="center" align="center" >
              </wn-table-column>
              <wn-table-column prop="searchCode" label="检索码" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="states" label="状态" :formatter="formatStates"  width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="sort" label="排序" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="defaulte" label="默认模板" :formatter="formatDefault" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column  label="操作"  header-align="center" align="center">
                <template slot-scope="scope">
                  <i class="iconfont icon-mr" v-show="scope.row.defaulte == 'false' ? true: false" @click="handleDefaulte(scope.$index, scope.row)" title="设置默认"></i>
                  <i class="iconfont icon-mr" v-show="scope.row.defaulte == 'true' ? true : false" @click="handleNonDefault(scope.$index, scope.row)" title="取消默认"></i>
                  <i class="iconfont icon-xg" @click="handleEdit(scope.$index, scope.row)" title="修改"></i>
                  <i class="iconfont icon-sp" v-show="scope.row.states == '2' ? true: false" @click="handleStar(scope.$index, scope.row)" title="启用"></i>
                  <i class="iconfont icon-ty" v-show="scope.row.states == '1' ? true : false" @click="handleStop(scope.$index, scope.row)" title="停用"></i>
                  <i class="iconfont icon-kl" @click="handleCopy(scope.$index, scope.row)" title="克隆"></i>
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
    <wn-dialog title="协 议 模 板 信 息 " v-model="addFormVisible" :close-on-click-modal="false" top="5%"   size="large" >
      <div class="box" style="margin-bottom: 0px">
        <div class="box-content" style="padding-bottom: 0">
             <wn-form  :model="addForm" :rules="rules2" ref="addForm" label-width="100px" class="demo-ruleForm wnform">
              <wn-row style='display:flow-root' >
                <wn-col  :xs="24"  :sm="12" :md="8" >
                  <wn-form-item label="模板名称"  prop="name">
                    <wn-input type="text"  v-model="addForm.name"  @change="jsmComplete(addForm)" ></wn-input>
                  </wn-form-item>
                </wn-col> 
                <wn-col  :xs="24"  :sm="12" :md="8" >
                  <wn-form-item label="检索码" >
                    <wn-input type="text"  v-model="addForm.searchCode" :disabled="true"></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" >
                  <wn-form-item label="排序"  prop="sort">
                    <wn-input type="text"  v-model="addForm.sort" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24" :sm="12" :md="8" >
                  <wn-form-item label="启用状态" >
                  <wn-radio class="radio" v-model="addForm.states" label="1">启用</wn-radio>
                  <wn-radio  class="radio" v-model="addForm.states" label="2">停用</wn-radio>
                </wn-form-item>
                </wn-col>
                 <wn-checkbox v-model="addForm.defaulte" >默认启用此模板</wn-checkbox>
              </wn-row>
              <div>
                <Tinymce :height=200  v-model="addForm.content"></Tinymce>
              </div>
            </wn-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <wn-button type="warning" @click.native="addSubmit" :loading="addLoading">保  存</wn-button>
        <wn-button type="warning" @click.native="addFormVisible = false" >取 消</wn-button>
      </div>
    </wn-dialog>
    <!--表格修改功能视图-->
    <wn-dialog title="编辑"  :close-on-click-modal="false" v-model="editFormVisible" top="5%" size="large">
     <div class="box" style="margin-bottom: 0px">
     <div class="box-content" style="padding-bottom: 0">
      <wn-form :model="editForm" label-width="100px" style="margin-bottom: 0px" :rules="rules2" ref="editForm"  class="demo-ruleForm wnform" >
        <wn-row style='display:flow-root' >
          <wn-col  :xs="24"  :sm="12" :md="8" >
            <wn-form-item label="模板名称" >
              <wn-input type="text"  v-model="editForm.name"  @change="jsmComplete(editForm)" ></wn-input>
            </wn-form-item>
          </wn-col> 
          <wn-col  :xs="24"  :sm="12" :md="8" >
            <wn-form-item label="检索码" >
              <wn-input type="text"  v-model="editForm.searchCode" :disabled="true"></wn-input>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24"  :sm="12" :md="8" >
            <wn-form-item label="排序" >
              <wn-input type="text"  v-model="editForm.sort" ></wn-input>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24" :sm="12" :md="8" >
            <wn-form-item label="启用状态" >
              <wn-radio class="radio" v-model="editForm.states" label="1">启用</wn-radio>
              <wn-radio  class="radio" v-model="editForm.states" label="2">停用</wn-radio>
            </wn-form-item>
          </wn-col>
            <wn-checkbox v-model="editForm.defaulte" >默认启用此模板</wn-checkbox>
        </wn-row>
          <div>
            <Tinymce :height=200  v-model="editForm.content"></Tinymce>
          </div>
      </wn-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <wn-button type="warning" @click.native="editSubmit" :loading="editLoading">保 存</wn-button>
        <wn-button type="warning" @click.native="editFormVisible = false">取消</wn-button>
      </div>
    </wn-dialog>
  </section>
</template>
<script type="text/javascript">
import util from "../../common/js/util";
import hypy from "../../common/js/hypy";
import NProgress from "nprogress";
import Tinymce from "../../components/Tinymce/index";
import {
  getTemplatePageList,
  addTemplate,
  templateBatchSets,
  templateUpdateState,
  templateUpdateDefaulte
} from "../../api/api";
// import UE from "../../components/UE/UE.vue";
export default {
  components: {Tinymce},
  data() {
    //               自定义验证规则
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("名称不能为空"));
      } else if (value.length > 45) {
        return callback(new Error("长度超长"));
      } else {
        callback();
      }
    };

    var checkSort = (rule, value, callback)=>{
      let reg = /^([1-9]\d*|[0]{1,1})$/ ;
      if (!value) {
        return callback(new Error("序号不能为空"));
      } else if (reg.test(value) == false) {
        return callback(new Error("请填写数字"));
      } else {
        callback();
      }
    }

    return {
      listLoading: false,
      page: 1,
      users: [], //用户
      sels: [{ states: "" }], //列表选中列
      total: 0,
      batchStar: "",
      hiddenButton: false,
      currentPage: 1,
      //                  查询表单的select的option列表
      select: {
        mblx: [
          { value: "1", label: "系统模板" },
          { value: "2", label: "机构模板" }
        ],
        zt: [{ value: "1", label: "启用" }, { value: "2", label: "停用" }]
      },
      //   模板列表
      templateForm: {
        id: "",
        name: "",
        searchCode: "",
        tempCode: "",
        defaulte: "",
        sort: "",
        tempType: "",
        states: "",
        content: "",
        orgCode: "",
        orgName: "",
        operatorId: "",
        operator: "",
        dateCreatedSys: "",
        updateTime: ""
      },
      rules2: {
        name: [{ validator: checkName, trigger: "blur" }],
        sort: [{ validator: checkSort, trigger: "blur"  }]
      },
      // 富文本编辑器
      defaultContent:
        '<h2 style="text-align: center;"><span style="color: #000000;"><strong>家庭医生签约服务合同文书（参考样式）</strong></span></h2><p style="padding-left: 120px; text-align: right;"><span style="color: #000000;"><strong>编号：</strong>年份（2位）+机构编号（6位）+合同流水（6位）<br /></span></p><p><strong><span style="color: #000000;">甲方（居民）：&mdash;&mdash;<br /></span></strong><span style="color: #000000;">身份证号：--<br />联系电话：--<br />紧急联系人及联系电话：--<br />常住地址：--<br /><strong>乙方（家庭医生团队）：--<br /></strong>团队主要人员：--<br />团队联系电话：--<br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;甲、乙双方本着平等，尊重和自愿的原则，签订此协议，接受以下条款约定：<br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<strong>1、选择签约服务包：--</strong></span></p>',
      // 模态框数据开始
      addFormVisible: false,
      //新增界面表单
      addForm: {
        id: "",
        name: "",
        searchCode: "",
        tempCode: "",
        defaulte: "",
        sort: "",
        tempType: "2",
        states: "1",
        content:"",
        orgCode: "",
        orgName: "",
        operatorId: "",
        operator: "",
        dateCreatedSys: "",
        updateTime: ""
      },
      addLoading: false,
      // 模态框数据结束
      //编辑界面数据
      editFormVisible: false,
      editForm: {
        id: "",
        name: "",
        searchCode: "",
        tempCode: "",
        defaulte: "",
        sort: "",
        tempType: "",
        states: "",
        content: "",
        orgCode: "",
        orgName: "",
        operatorId: "",
        operator: "",
        dateCreatedSys: "",
        updateTime: ""
      },
      // 提交加载动画
      editLoading: false
    };
  },
  methods: {
    //是否默认显示转换
    formatDefault: function(row, column) {
      return (row.defaulte == true || row.defaulte == 'true') ? "是" : (row.defaulte == false || row.defaulte == 'false') ? "否" : "否";
    },
    //模板类型显示转换
    formatTempType: function(row, column) {
      return row.tempType == 1
        ? "系统模板"
        : row.tempType == 2 ? "机构模板" : "机构模板";
    },
    formatStates: function(row, column) {
      return row.states == 1 ? "启用" : row.states == 2 ? "停用" : "停用";
    },
    //        对表格隔行换色进调整
    tableRowClassName(row, index) {
      if (index % 2 !== 0) {
        return "info-odd";
      } else if (index % 2 == 0) {
        return "info-even";
      }
      return "";
    },
    //显示新建界面
    handleAdd: function() {
      this.addForm = {
        id: "",
        name: "",
        searchCode: "",
        tempCode: "",
        defaulte: true,
        sort: "",
        tempType: "2",
        states: "1",
        content:"",
        orgCode: "",
        orgName: "",
        operatorId: "",
        operator: "",
        dateCreatedSys: "",
        updateTime: ""
      };
      this.addForm.content = this.defaultContent;
      this.resetForm(this);
      this.addFormVisible = true;
      this.addLoading = false;
    },
    //名称拼音简写
    jsmComplete(jsmName) {
      jsmName.searchCode = hypy.getSearchCode(jsmName.name);
    },
    //显示编辑界面 ,因为
    handleEdit: function(index, row) {
      // ES6深层拷贝当前行数据赋值给editfrom
      this.addForm = Object.assign({}, row);
      if(this.addForm.defaulte == 'true') {
        this.addForm.defaulte = true;
      }else{
        this.addForm.defaulte = false;
      }
      // this.content = this.addForm.content;
      this.addLoading = false;
      this.addFormVisible = true;
    },
    //显示克隆界面
    handleCopy: function(index, row) {
      // ES6深层拷贝当前行数据赋值给editfrom
      this.editForm = Object.assign({}, row);
      if(this.editForm.defaulte == 'true') {
        this.editForm.defaulte = true;
      }else{
        this.editForm.defaulte = false;
      }
      // this.content = this.editForm.content;
      this.editForm.id = '';
      this.editLoading = false;
      this.editFormVisible = true;
    },

    // 查询功能
    //表格数据获取用户列表
    getTemplates(formName, pageValue, currentPage) {
      if (currentPage == undefined || currentPage == "") {
        currentPage = 1;
      }
      //搜索功能
      let page = pageValue;
      this.page = pageValue;
      this.currentPage = currentPage;
      this.templateForm.start = (this.page - 1) * 10;
      this.templateForm.limit = 10;
      this.templateForm.dir = "DESC";
      this.templateForm.sort = "id";
      /**
      var startDate = this.templateForm.startDate;
      var endDate = this.templateForm.endDate;
      if (startDate != "" && startDate != null && startDate != undefined)
        this.templateForm.startDate = util.formatDate.format(
          new Date(this.templateForm.startDate),
          "yyyy-MM-dd"
        );
      if (endDate != "" && endDate != null && endDate != undefined)
        this.templateForm.endDate = util.formatDate.format(
          new Date(this.templateForm.endDate),
          "yyyy-MM-dd"
        );
       */
      this.listLoading = true;
      var templateData = JSON.stringify(this.templateForm);
      getTemplatePageList(templateData)
        .then(res => {
          this.users = res.data.content;
          this.total = res.data.totalElements;
          this.page = res.data.totalPages;
          this.listLoading = false;
        })
        .catch(error => {
          console.log(this);
          console.log(error);
        });
    },

    //表单重置
    resetForm(formName) {
      if (
        formName != undefined &&
        formName.$refs.addForm != null &&
        formName.$refs.addForm.resetFields() != undefined
      )
        formName.resetFields();
    },
    // 换页
    handleCurrentChange(val) {
      this.page = val;
      this.getTeams("teamForm", val, val);
    },
    //全选中
    selectAll: function(seles) {
      this.sele = seles;
      this.hiddenButton = false;
    },
    //    选中状态切换
    selsChange: function(sele, row) {
      this.sele = sele;
      if (sele != undefined && sele.length == 1) {
        this.hiddenButton = false;
        if (sele[0].states == "1") {
          //已启用状态，可停用
          this.batchStar = false;
          this.hiddenButton = true;
          // this.selectable(row,this.sele[0]);
        } else {
          //已停用状态，可启用
          this.batchStar = true;
          this.hiddenButton = true;
          //  this.selectable(row,this.sele[0]);
        }
      } else {
        this.hiddenButton = false;
      }
    },
    //    禁止选中状态
    selectable(row, sele, ste) {
      if (sele != undefined) {
        if (
          (sele.states == "1" &&
            row.states != sele.states &&
            row.states == "2") || //已启用状态下，已停用状态的行不被选中。
          (sele.states == "2" && row.states != sele.states && row.states == "1")
        ) {
          //已停用状态下，已启用状态的行不被选中。
          this.$refs.doctorTable.toggleRowSelection(row, false);
          return false;
        }
      }
      return true;
    },
    //新增表单保存
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              this.addLoading = true;
              NProgress.start();
              // this.addForm.content = this.content;
              // this.addForm.content = this.uediter.value;
              let para = Object.assign({}, this.addForm);

              //可以增加适量的数据过滤
              addTemplate(para).then(res => {
                let msg = res.data.message;
                let suc = res.data.success;
                let type = "false";
                if (suc == true) {
                  type = "success";
                } else {
                  type = "error";
                }
                var _this = this;
                this.$message({
                  showClose: true,
                  duration: 500,
                  message: msg,
                  type: type,
                  onClose: function() {
                    if (suc == true) {
                      _this.$refs["addForm"].resetFields();
                      _this.addFormVisible = false;
                      _this.getTemplates("templateForm", 1, 1);
                    }
                  }
                });
                this.addLoading = false;
              });
            })
            .catch(() => {
              NProgress.done();
              this.$message({
                message: "提交超时",
                type: "error"
              });
              this.addLoading = false;
            });
        }
      });
    },

    //    编辑界面提交编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交？", "提交", {})
            .then(() => {
              this.editLoading = true;
              // this.editForm.content = this.content;
              let para = Object.assign({}, this.editForm);
              addTemplate(para).then(res => {
                let msg = res.data.message;
                let suc = res.data.success;
                let type = "false";
                if (suc == true) {
                  type = "success";
                } else {
                  type = "error";
                }
                var _this = this;
                this.$message({
                  duration: 500,
                  message: msg,
                  type: type,
                  onClose: function() {
                    if (suc == true) {
                      _this.editFormVisible = false;
                      _this.getTemplates("templateForm", 1, 1);
                      _this.editLoading = false; 
                    }
                  }
                });
              });
              this.editLoading = false; 
            })
            .catch(() => {
              NProgress.done();
              this.$message({
                message: "提交超时",
                type: "error"
              });
              this.editLoading = false;
            });
        }
      });
    },
    //    对当前数据的状态进行管理停用
    handleStop: function(index, row) {
      this.$confirm("确认将当前状态停用？", "提交", {})
        .then(() => {
          this.addLoading = true;
          let para = {
            ids: this.users[index].id,
            states: "2"
          };
          templateUpdateState(para).then(res => {
            let msg = res.data.message;
            let suc = res.data.success;
            let type = "false";
            if (suc == true) {
              type = "success";
            } else {
              type = "error";
            }
            var _this = this;
            this.$message({
              duration: 500,
              showClose: true,
              message: msg,
              type: type,
              onClose: function() {
                if (suc == true) {
                  _this.editFormVisible = false;
                  _this.getTemplates("templateForm", 1, 1);
                }
              }
            });
            this.addLoading = false;
          });
        })
        .catch(() => {
          NProgress.done();
          this.$message({
            message: "提交超时",
            type: "error"
          });
          this.addLoading = false;
        });
    },
    handleStar: function(index, row) {
      this.$confirm("确认将当前状态启用？", "提交", {}).then(() => {
        let para = {
          ids: this.users[index].id,
          states: "1"
        };
        templateUpdateState(para)
          .then(res => {
            let msg = res.data.message;
            let suc = res.data.success;
            let type = "false";
            if (suc == true) {
              type = "success";
            } else {
              type = "error";
            }
            var _this = this;
            this.$message({
              duration: 500,
              showClose: true,
              message: msg,
              type: type,
              onClose: function() {
                if (suc == true) {
                  _this.editFormVisible = false;
                  _this.getTemplates("templateForm", 1, 1);
                }
              }
            });
            this.addLoading = false;
          })
          .catch(() => {
            NProgress.done();
            this.$message({
              message: "提交超时",
              type: "error"
            });
            this.addLoading = false;
          });
      });
    },
    //    批量启用（1）、 停用（2）
    templatesBatchSets: function(batchzt) {
      var currPage = this.currentPage;
      console.log(currPage);
      var ids = this.sele.map(item => item.id).toString();
      this.$confirm("确认修改选中状态吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          NProgress.start();
          let para = {
            ids: ids,
            states: batchzt,
            currentPage: currPage
          };
          templateBatchSets(para).then(res => {
            NProgress.done();
            let msg = res.data.message;
            let suc = res.data.success;
            let cpg = res.data.result.currentPage;
            let type = "false";
            if (suc == true) {
              type = "success";
            } else {
              type = "error";
            }
            var _this = this;
            this.$message({
              duration: 500,
              showClose: true,
              message: msg,
              type: type,
              onClose: function() {
                if (suc == true) {
                  _this.editFormVisible = false;
                  _this.getTemplates("templateForm", cpg, cpg);
                }
              }
            });
          });
          this.listLoading = false;
        })
        .catch(() => {
          NProgress.done();
          this.$message({
            message: "提交超时",
            type: "error"
          });
          this.listLoading = false;
        });
    },
    //    对当前数据的状态进行管理停用
    handleNonDefault: function(index, row) {
      this.$confirm("确认取消默认吗？", "提交", {})
        .then(() => {
          this.addLoading = true;
          let para = {
            ids: this.users[index].id,
            defaulte: false
          };
          templateUpdateDefaulte(para).then(res => {
            let msg = res.data.message;
            let suc = res.data.success;
            let type = "false";
            if (suc == true) {
              type = "success";
            } else {
              type = "error";
            }
            var _this = this;
            this.$message({
              duration: 500,
              showClose: true,
              message: msg,
              type: type,
              onClose: function() {
                if (suc == true) {
                  _this.editFormVisible = false;
                  _this.getTemplates("templateForm", 1, 1);
                }
              }
            });
            this.addLoading = false;
          });
        })
        .catch(() => {
          NProgress.done();
          this.$message({
            message: "提交超时",
            type: "error"
          });
          this.addLoading = false;
        });
    },
    handleDefaulte: function(index, row) {
      this.$confirm("确认设为默认吗？", "提交", {}).then(() => {
        let para = {
          ids: this.users[index].id,
          defaulte: true
        };
        templateUpdateDefaulte(para)
          .then(res => {
            let msg = res.data.message;
            let suc = res.data.success;
            let type = "false";
            if (suc == true) {
              type = "success";
            } else {
              type = "error";
            }
            var _this = this;
            this.$message({
              duration: 500,
              showClose: true,
              message: msg,
              type: type,
              onClose: function() {
                if (suc == true) {
                  _this.editFormVisible = false;
                  _this.getTemplates("templateForm", 1, 1);
                }
              }
            });
            this.addLoading = false;
          })
          .catch(() => {
            NProgress.done();
            this.$message({
              message: "提交超时",
              type: "error"
            });
            this.addLoading = false;
          });
      });
    }
    //    富文本编辑器
  },
  mounted() {
    //dom加载完毕，渲染数据初始化
    this.getTemplates("templateForm", 1);
  }
};
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
</style>
