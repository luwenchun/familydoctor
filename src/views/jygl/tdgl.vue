<template>
  <section>
    <!--表单区视图-->
    <wn-row>
      <wn-col :xs="24">
        <div class="box">
          <div class="box-content" style="padding-bottom: 0">
            <wn-form  :model="teamForm" :rules="rules2" ref="teamForm" label-width="80px" class="demo-ruleForm wnform">
              <wn-row >
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="名称"  >
                    <wn-input type="text"  v-model="teamForm.name"></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="检索码"  >
                    <wn-input type="text" ref="jsmRef" :disabled="false" placeholder="默认为名称拼音大写首字母"  v-model="teamForm.searchCode"></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="状态" prop="states">
                    <wn-select v-model="teamForm.states" placeholder="请选择">
                      <wn-option v-for="item in select.states" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                    </wn-select>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="24" :md="8" :lg="{span:6,offset:6}" style="text-align: right;margin-bottom: 10px;">
                  <wn-button type="warning" @click="getTeams('teamForm',1)">查&nbsp;&nbsp;询</wn-button>
                  <wn-button type="warning" @click="handleAdd">新&nbsp;&nbsp;建</wn-button>
                  <wn-button type="warning" @click="teamBatchSets(2)" :disabled="this.sels.length===0|| (this.batchStar===true && this.hiddenButton===true)" :loading="addLoading">停&nbsp;&nbsp;用</wn-button>
                  <wn-button type="warning" @click="teamBatchSets(1)" :disabled="this.sels.length===0|| (this.batchStar===false && this.hiddenButton===true)" :loading="addLoading">启&nbsp;&nbsp;用</wn-button>
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
              <span>团队列表</span>
            </div>
          </div>
          <div class="box-content clearfix" style="padding: 0 10px;">
            <!--表格-->
            <wn-table :data="users"  ref="teamTable" highlight-current-row v-loading="listLoading"  @select-all="selectAll" @select="selsChange" :row-class-name="tableRowClassName" style="width: 100%;">
              <wn-table-column type="selection" prop="id" label="ID" width="50" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="name" label="名称" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="searchCode" label="检索码"  width="100"  header-align="center" align="center" >
              </wn-table-column>
              <wn-table-column prop="leaderName" label="团队长" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="phone" label="值班手机" width="130" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="tel" label="值班电话" width="120" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="states" label="状态" :formatter="formatStates"   width="50" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="doctorNames" label="团队成员" width="500" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column  label="操作" min-width="20"  header-align="center" align="center">
                <template slot-scope="scope">
                  <i class="iconfont icon-xg" style="cursor:pointer"   @click="handleEdit(scope.$index, scope.row)" title="修改"></i>
                  <i class="iconfont icon-ty" style="cursor:pointer"  v-show="scope.row.states == '1' ? true: false"  @click="handleStop(scope.$index, scope.row)" title="停用"></i>
                  <i class="iconfont icon-qy" style="cursor:pointer"  v-show="scope.row.states == '2' ? true : false" @click="handleStar(scope.$index, scope.row)" title="启用"></i>
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
    <!--新建团队模态框视图-->
    <wn-dialog title="团 队 注 册 信 息" v-model="addFormVisible" :close-on-click-modal="false" top="5%" size="large" >
      <div class="box" style="margin-bottom: 15px">
        <div class="box-content" style="padding-bottom: 0">
          <wn-form  :model="addForm" :rules="rules2" ref="addForm" label-width="100px" class="demo-ruleForm wnform">
            <wn-row >
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="团队名称"  prop="name" >
                  <wn-input type="text"  v-model="addForm.name" @change="jsmComplete(addForm)"></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="值班手机" prop="phone"  >
                  <wn-input type="text"  v-model="addForm.phone" ></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="检索编码" prop="searchCode">
                  <wn-input type="text" ref="jsmRef"  v-model="addForm.searchCode" :disabled="true"  placeholder="默认为名称拼音大写首字母"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="值班电话" prop="tel">
                  <wn-input type="text"  v-model="addForm.tel" ></wn-input>
                </wn-form-item>
              </wn-col>
               <wn-col :xs="24" :sm="12" :md="8" >
               <wn-form-item label="协议模板" prop="defaultTempCode">
                <wn-select v-model="addForm.defaultTempCode" size="small" clearable filterable placeholder="请选择">
                    <wn-option 
                      v-for="item in xymbArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.tempCode">
                    </wn-option>
                  </wn-select>
                   </wn-form-item>
              </wn-col>

              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="状态" prop= "states">
                  <wn-radio class="radio" v-model="addForm.states" label="1">启用</wn-radio>
                  <wn-radio  class="radio" v-model="addForm.states" label="2">停用</wn-radio>
                </wn-form-item>
              </wn-col>
            </wn-row>
          </wn-form>
        </div>
      </div>
      <div class="box" style="margin-bottom: 0px">
        <div class="box-header" style="margin-top: 10px">
          <div class="box-name" style="position: relative;">
            <span><span style="color:#f56c6c">*&nbsp;</span>团队成员</span>
            <wn-autocomplete
                popper-class="my-autocomplete"
                v-model="teamMember"
                :fetch-suggestions="querySearch"
                placeholder="请输入检索码"
                @select="handleSelect">
            <i
              class="el-icon-edit el-input__icon"
              slot="suffix"
              @click="handleIconClick">
            </i>
            <template slot-scope="props">
              <div class="name">{{ props.item.value }}</div>
              <span class="addr">{{ props.item.id }}</span>
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
              label="医生名称"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column
              prop="gender"
              label="性别"
              width="180" header-align="center" :formatter="formatGender" align="center">
            </wn-table-column>
            <wn-table-column
              prop="searchCode"
              label="检索码"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column
              prop="idNumber"
              label="身份证号"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column
              prop="isLeader"
              label="团队长"
              width="180" header-align="center" align="center">
              <template scope="scope">
                 <i @click="setTeamLeader(scope.$index, scope.row)">
                <wn-radio class="radio" v-model="scope.row.isLeader" name= "scope.row.isLeader"  label="1">&nbsp;</wn-radio>
                 </i>
              </template>
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
    <wn-dialog title="编辑"  :close-on-click-modal="false" v-model="editFormVisible" size="large">
      <div class="box" style="margin-bottom: 15px">
        <div class="box-content" style="padding-bottom: 0">
          <wn-form  :model="editForm" :rules="rules2" ref="editForm" label-width="100px" class="demo-ruleForm wnform">
            <wn-row >
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="团队名称"  prop="name" >
                  <wn-input type="text"  v-model="editForm.name" @change="jsmComplete(editForm)"></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="值班手机" prop="phone"  >
                  <wn-input type="text"  v-model="editForm.phone" ></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="检索编码" prop="searchCode">
                  <wn-input type="text" ref="jsmRef"  v-model="editForm.searchCode" :disabled="true"  placeholder="默认为名称拼音大写首字母"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="值班电话" prop="tel">
                  <wn-input type="text"  v-model="editForm.tel" ></wn-input>
                </wn-form-item>
              </wn-col>
               <wn-col :xs="24" :sm="12" :md="8" >
                <wn-form-item label="协议模板" prop="defaultTempCode">
                  <wn-select v-model="editForm.defaultTempCode" size="small" clearable filterable placeholder="请选择">
                    <wn-option 
                      v-for="item in xymbArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.tempCode">
                     </wn-option>
                  </wn-select>
               </wn-form-item>
              </wn-col>

              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="状态" prop= "states">
                  <wn-radio class="radio" v-model="editForm.states" label="1">启用</wn-radio>
                  <wn-radio  class="radio" v-model="editForm.states" label="2">停用</wn-radio>
                </wn-form-item>
              </wn-col>
            </wn-row>
          </wn-form>
        </div>
      </div>
      <div class="box" style="margin-bottom: 0px">
        <div class="box-header" style="margin-top: 10px">
          <div class="box-name" style="position: relative;">
            <span><span style="color:#f56c6c">*&nbsp;</span>团队成员</span>
            <wn-autocomplete
                popper-class="my-autocomplete"
                v-model="teamMember"
                :fetch-suggestions="querySearch"
                placeholder="请输入检索码"
                @select="handleSelect">
            <i
              class="el-icon-edit el-input__icon"
              slot="suffix"
              @click="handleIconClick">
            </i>
            <template slot-scope="props">
              <div class="name">{{ props.item.value }}</div>
              <span class="addr">{{ props.item.id }}</span>
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
              label="医生名称"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column
              prop="gender"
              label="性别"
              width="180" header-align="center" :formatter="formatGender"  align="center">
            </wn-table-column>
            <wn-table-column
              prop="searchCode"
              label="检索码"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column
              prop="idNumber"
              label="身份证号"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column
              prop="isLeader"
              label="团队长"
              width="180" header-align="center" align="center">
              <template scope="scope">
                 <i @click="setTeamLeader(scope.$index, scope.row)">
                    <wn-radio class="radio" v-model="scope.row.isLeader" name= "scope.row.isLeader"  label="1">&nbsp;</wn-radio>
                 </i>
              </template>
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
import util from "../../common/js/util";
import hypy from "../../common/js/hypy";
import NProgress from "nprogress";
import {
  getTeamPageList,
  teamUpdateState,
  searchTeamList,
  addTeam,
  getDefaultTempCode,
  getDoctorListByOrgCode,
  teamBatchSets
} from "../../api/api";
//两端去空格函数
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, "");
};
export default {
  data() {
    //               自定义验证规则
    var checkName = (rule, value, callback) => {
      // var reg = /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
      if (!value) {
        return callback(new Error("名称不能为空"));
      } else if (value.length > 45) {
        return callback(new Error("长度超长"));
      } else {
        //  else if (reg.test(value) == false) {
        //   callback(new Error("名称为中文或者英文！长度为10以内！"));
        // }
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!value && value.length > 20) {
        return callback(new Error("手机号码不正确"));
      } else {
        callback();
      }
    };
    var checkTel = (rule, value, callback) => {
      var reg = /[^/d]/g;
      if (!value && value.length > 20) {
        return callback(new Error("电话号码不正确"));
      } else {
        callback();
      }
    };
    var checkTempCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择默认模板"));
      } else {
        callback();
      }
    };

    return {
      listLoading: false,
      page: 1,
      users: [], //用户
      sels: [{ states: "" }], //列表选中列
      total: 0,
      batchStar: "",
      hiddenButton: false,
      currentPage: 1,
      xymbArr: [], //协议模板列表
      teamMember: "",
      restaurants: [],
      tableData: [],
      arr: [],
      set: new Set(),
      //询表单的select的option列表
      select: {
        states: [{ value: "1", label: "启用" }, { value: "2", label: "停用" }]
      },
      //团队列表表单
      teamForm: {
        id: "",
        name: "",
        searchCode: "",
        leaderName: "",
        phone: "",
        tel: "",
        defaultTempCode: "",
        doctorNames: "",
        orgCode: "",
        orgName: "",
        states: ""
      },
      teamFormBak: {
        id: "",
        name: "",
        searchCode: "",
        leaderName: "",
        phone: "",
        tel: "",
        defaultTempCode: "",
        doctorNames: "",
        orgCode: "",
        orgName: "",
        states: "",
        start: "0",
        limit: "10",
        page: "0",
        dir: "DESC",
        sort: "id"
      },
      rules2: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { validator: checkName, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { validator: checkTel, trigger: "blur" }
        ],
        defaultTempCode: [
          { required: true, message: "请选择模板" },
          { validator: checkTempCode, trigger: "blur" }
        ]
        // change: [
        //   { message: '请选择', trigger: 'change' }
        // ],
      },
      //  模态框数据开始
      addFormVisible: false,
      //  新增界面表单
      addForm: {
        id: "",
        name: "",
        searchCode: "",
        leaderName: "",
        phone: "",
        tel: "",
        defaultTempCode: "",
        doctors: "",
        orgCode: "",
        orgName: "",
        states: "1"
      },
      addLoading: false,
      // 模态框数据结束
      //编辑界面数据
      editFormVisible: false,
      editForm: {
        id: "",
        name: "",
        searchCode: "",
        leaderName: "",
        phone: "",
        tel: "",
        defaultTempCode: "",
        doctors: "",
        orgCode: "",
        orgName: "",
        states: ""
      },
      //  提交加载动画
      editLoading: false
    };
  },
  methods: {
     //性别显示转换
    formatGender: function(row, column) {
      return row.gender == 1 ? "男" : row.gender == 2 ? "女" : "未知";
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
    //名称拼音简写
    jsmComplete(jsmName) {
      jsmName.searchCode = hypy.getSearchCode(jsmName.name);
      // this.$refs.jsmRef.disabled = true;
    },
    //    disabledDate(time) {
    //      return {time.getTime() < Date.now() - 8.64e7}
    //  },
    //显示新建界面
    handleAdd: function() {
      this.addForm = {
        id: "",
        name: "",
        searchCode: "",
        leaderName: "",
        phone: "",
        tel: "",
        defaultTempCode: "",
        states: "1", //设置默认值 启用
        orgCode: "",
        orgName: ""
      };
      this.resetForm(this);
      this.tableData = [];
      this.addFormVisible = true;
      this.teamMember = "";
      this.addLoading = false;
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      // ES6深层拷贝当前行数据赋值给editfrom
      this.editForm = Object.assign({}, row);
      this.tableData = Object.assign({}, row).doctorList;
      this.editFormVisible = true;
      this.teamMember = "";
      this.editLoading = false;
    },
    // 查询功能
    //表格数据获取用户列表
    getTeams(formName, pageValue, currentPage) {
      if (formName == "teamForm") {
        formName = this.teamForm;
      }
      if (currentPage == undefined || currentPage == "") {
        currentPage = 1;
      }
      //搜索功能
      let page = pageValue;
      this.page = pageValue;
      this.currentPage = currentPage;
      this.teamForm.start = (this.page - 1) * 10;
      this.teamForm.limit = 10;
      this.teamForm.dir = "DESC";
      this.teamForm.sort = "id";
      /**
      var startDate = this.teamForm.startDate;
      var endDate = this.teamForm.endDate;
      if (startDate != "" && startDate != null && startDate != undefined)
        this.teamForm.startDate = util.formatDate.format(
          new Date(this.teamForm.startDate),
          "yyyy-MM-dd"
        );
      if (endDate != "" && endDate != null && endDate != undefined)
        this.teamForm.endDate = util.formatDate.format(
          new Date(this.teamForm.endDate),
          "yyyy-MM-dd"
        );
       */
      this.listLoading = true;
      // this.teamFormBak = this.teamForm;
      var teamData = JSON.stringify(this.teamForm);
      console.log(teamData);
      getTeamPageList(teamData)
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
      this.getTeams(this.teamForm, val, val);
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
    getDefaultTemp() {
      //查询模板
      let para = {};
      this.listLoading = true;
      getDefaultTempCode(para).then(res => {
        this.xymbArr = res.data;
      });
    },

    // // input下拉展示
    querySearch(queryString, cb) {
      var restaurants = this.arr;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
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
    getDoctorList() {
      let para = {};
      this.listLoading = true;
      getDoctorListByOrgCode(para).then(res => {
        // this.arr = Array.from(res.data);
        this.arr = res.data;
      });
    },
    handleSelect(selected) {
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
          if (value.doctorCode == selected.doctorCode) {
            s = true;
          }
        });
      }
      if (s) {
        this.$message({
          message: "已存在该医生",
          type: "success"
        });
      } else {
        if (this.set.size == 0) selected.isLeader = "1";
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
    handleDelte(index, row) {
      this.set = new Set(this.tableData);
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          this.set.delete(row);
          // this.tableData.splice(index, row);
          this.tableData = Array.from(this.set);
          this.listLoading = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        });
    },
    //设置团队长
    setTeamLeader(index, row) {
      this.set = this.tableData;
      this.set.forEach((value, key, s) => {
        if (
          value.dateCreatedSys != undefined &&
          value.dateCreatedSys != "" &&
          value.dateCreatedSys != null
        )
          value.dateCreatedSys = util.formatDate.format(
            new Date(value.dateCreatedSys),
            "yyyy-MM-dd"
          );
        if (
          value.updateTime != undefined &&
          value.updateTime != "" &&
          value.updateTime != null
        )
          value.updateTime = util.formatDate.format(
            new Date(value.updateTime),
            "yyyy-MM-dd"
          );

        if (row.doctorCode == value.doctorCode) {
          value.isLeader = "1";
          if (this.addForm != undefined && this.addForm.leaderName != undefined)
            this.addForm.leaderName = value.name;
          if (
            this.editForm != undefined &&
            this.editForm.leaderName != undefined
          )
            this.editForm.leaderName = value.name;
        } else {
          value.isLeader = "0";
        }
      });
      this.tableData = Array.from(this.set);
    },
    //新增表单保存
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (this.tableData != undefined && this.tableData.length == 0) {
          this.$message({
            message: "请添加团队成员",
            type: "error"
          });
          this.addLoading = false;
          valid = false;
          return;
        }
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            NProgress.start();
            let para = Object.assign({}, this.addForm);
            para.doctorList = this.tableData;

            //可以增加适量的数据过滤
            addTeam(para)
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
                      _this.$refs["addForm"].resetFields();
                      // getDoctor(JSON.stringify(_this.addForm));
                      _this.addFormVisible = false;
                      _this.getTeams(_this.teamForm, 1, 1);
                    }
                    _this.addLoading = false;
                  }
                });
              })
              .catch(() => {
                NProgress.done();
                this.addLoading = false;
                this.$message({
                  message: "提交超时",
                  type: "error"
                });
              });
          });
        }
      });
    },

    //    编辑界面提交编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (this.tableData != undefined && this.tableData.length == 0) {
          this.$message({
            message: "请添加团队成员",
            type: "error"
          });
          this.editLoading = false;
          valid = false;
          return;
        }
        if (valid) {
          this.$confirm("确认提交？", "提交", {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.editForm);
            para.doctorList = this.tableData;
            addTeam(para)
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
                      _this.getTeams(_this.teamForm, 1, 1);
                    }
                    _this.editLoading = false;
                  }
                })
              })
              .catch(() => {
                NProgress.done();
                this.$message({
                  message: "提交超时",
                  type: "error"
                });
                this.editLoading = false;
              });
          });
        }
      });
    },
    //    对当前数据的状态进行管理停用
    handleStop: function(index, row) {
      this.$confirm("确认将当前状态停用？", "提交", {}).then(() => {
        this.addLoading = true;
        let para = {
          ids: this.users[index].id,
          states: "2"
        };
        teamUpdateState(para)
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
                  _this.getTeams(_this.teamForm, 1, 1);
                }
                _this.addLoading = false;
              }
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
      });
    },
    handleStar: function(index, row) {
      this.$confirm("确认将当前状态启用？", "提交", {}).then(() => {
        let para = {
          ids: this.users[index].id,
          states: "1"
        };
        teamUpdateState(para)
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
              duration: 1000,
              showClose: true,
              message: msg,
              type: type,
              onClose: function() {
                if (suc == true) {
                  _this.editFormVisible = false;
                  _this.getTeams(_this.teamForm, 1, 1);
                }
                _this.addLoading = false;
              }
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
      });
    },
    //    批量启用（1）、 停用（2）
    teamBatchSets: function(batchzt) {
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
          teamBatchSets(para).then(res => {
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
              duration: 1000,
              showClose: true,
              message: msg,
              type: type,
              onClose: function() {
                if (suc == true) {
                  _this.editFormVisible = false;
                  _this.getTeams(_this.teamForm, cpg, cpg);
                }
                _this.listLoading = false;
              }
            });
          })
          .catch(() => {
            NProgress.done();
            this.$message({
              message: "提交超时",
              type: "error"
            });
            this.listLoading = false;
          });
        })
    }
  },
  mounted() {
    //dom加载完毕，渲染数据初始化
    this.getTeams(this.teamForm, 1);
    this.restaurants = this.getDoctorList();
    this.getDefaultTemp();
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
.input_comp {
  position: relative;
  display: inline-block;
}
.loadsuggest {
  position: absolute;
  width: 100%;
}
</style>
