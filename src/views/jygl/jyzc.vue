<template>
  <section>
    <!--表单区视图-->
    <wn-row>
      <wn-col :xs="24">
        <div class="box">
          <div class="box-content" style="padding-bottom: 0">
            <wn-form  :model="doctorForm" :rules="rules2" ref="doctorForm" label-width="80px" class="demo-ruleForm wnform">
              <wn-row >
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="姓名"  >
                    <wn-input type="text"  v-model="doctorForm.name" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="50"  :sm="21" :md="8" :lg="7">
                  <wn-form-item label="身份证号"  >
                    <wn-input type="text"  v-model="doctorForm.idNumber" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="岗位" prop="change">
                    <wn-select v-model="doctorForm.roleType" clearable placeholder="请选择">
                      <wn-option v-for="item in select.roleType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                    </wn-select>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="24" :md="8" :lg="8" :offset="1" style="text-align: right;margin-bottom: 10px;">
                  <wn-button type="warning" @click="getDoctors('doctorForm',1)">查&nbsp;&nbsp;询</wn-button>
                  <wn-button type="warning" @click="handleAdd">新&nbsp;&nbsp;建</wn-button>
                  <wn-button type="warning"  @click="doctorBatchSets(2)" :disabled="this.sels.length===0|| (this.batchStar===true && this.hiddenButton===true)">停&nbsp;&nbsp;用</wn-button>
                  <wn-button type="warning"  @click="doctorBatchSets(1)" :disabled="this.sels.length===0|| (this.batchStar===false && this.hiddenButton===true)">启&nbsp;&nbsp;用</wn-button>
                </wn-col>
              </wn-row>
              <wn-row>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="检索码"  >
                    <wn-input type="text"  v-model="doctorForm.searchCode" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <!--  -->
                <wn-col :span="24" :xs="24" :sm="24" :md="8" :lg="7">
                  <wn-form-item label="注册时间">
                    <wn-col :span="11"> <!-- @blur="chcekDate0" -->
                      <wn-date-picker v-model="doctorForm.startDate" type="date" placeholder="选择开始日期" ref="start" :picker-options="pickerOptions0" style="width: 100%;">
                      </wn-date-picker>
                    </wn-col>
                    <wn-col class="line" :span="2" style="text-align: center;" >-</wn-col>
                    <wn-col :span="11">
                      <wn-date-picker v-model="doctorForm.endDate"  type="date" placeholder="选择结束日期" ref="end" :picker-options="pickerOptions1" style="width: 100%;">
                      </wn-date-picker>
                    </wn-col>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="状态" prop="change">
                    <wn-select v-model="doctorForm.states" clearable placeholder="请选择">
                      <wn-option v-for="item in select.zt" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                    </wn-select>
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
              <span>家医列表</span>
            </div>
          </div>
          <div class="box-content clearfix" style="padding: 0 10px;">
            <!--表格-->  <!--  -->
            <wn-table :data="users" ref="doctorTable" highlight-current-row v-loading="listLoading" @select-all="selectAll" @select="selsChange" :row-class-name="tableRowClassName" style="width: 100%;">

              <wn-table-column  type="selection" prop="id" label="ID"  width="50"  header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="name" label="姓名" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="searchCode" label="检索码" width="120" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="gender" label="性别"  :formatter="formatGender" width="60"  header-align="center" align="center" >
              </wn-table-column>
              <wn-table-column prop="idNumber" label="身份证号" width="160" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="phone" label="手机号" width="120" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="tel" label="座机"  width="90" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="roleType" label="岗位" :formatter="formatRoleType" width="80" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="states" label="状态" :formatter="formatStates"   width="50" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="dateCreatedSys" label="创建日期"   width="150" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="operator" label="创建者"   width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column  label="操作" min-width="50" max-width="50"  header-align="center" align="center">
                <template slot-scope="scope">
                  <i class="iconfont icon-xg" style="cursor:pointer"  @click="handleEdit(scope.$index, scope.row)" title="修改"></i>
                  <i class="iconfont icon-ty" style="cursor:pointer"  v-show="scope.row.states == '1' ? true: false" @click="handleStop(scope.$index, scope.row)" title="停用"></i>
                  <i class="iconfont icon-qy" style="cursor:pointer"  v-show="scope.row.states == '2' ? true : false" @click="handleStar(scope.$index, scope.row)" title="启用"></i>
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

    <!--新建家医注册信息模态框视图-->
    <wn-dialog title="家 医 注 册 信 息" v-model="addFormVisible" :close-on-click-modal="false" top="5%" size="large" >

      <div class="box" style="margin-bottom: 0">
        <div class="box-content" style="padding-bottom: 0">
          <wn-form  :model="addForm" :rules="rules2" ref="addForm" label-width="100px" class="demo-ruleForm wnform">
            <wn-row >
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="姓名" prop="name">
                  <wn-input type="text"  v-model="addForm.name" @change="jsmComplete(addForm)" ></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="性别" >
                  <wn-radio  class="radio" v-model="addForm.gender" label="1">男</wn-radio>
                  <wn-radio  class="radio" v-model="addForm.gender" label="2">女</wn-radio>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="检索编码" >
                  <wn-input type="text" ref="jsmRef" :disabled="true" v-model="addForm.searchCode" placeholder="默认为名称拼音大写首字母"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row >
            <wn-row >
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="身份证号" prop="idNumber">
                  <wn-input type="text"  v-model="addForm.idNumber" ></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="手机号" prop="phone">
                  <wn-input type="text"  v-model="addForm.phone" ></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="座机" prop="tel">
                  <wn-input type="text"  v-model="addForm.tel" ></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row >
            <wn-row >
              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="岗位" prop="roleType">
                  <wn-select v-model="addForm.roleType" placeholder="请选择">
                    <wn-option label="全科医生" value="0"></wn-option>
                    <wn-option label="社区护士" value="1"></wn-option>
                    <wn-option label="防护人员" value="2"></wn-option>
                  </wn-select>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24" :sm="12" :md="8" >
                <wn-form-item label="状态"  prop="states">
                  <wn-radio class="radio" v-model="addForm.states" label="1">启用</wn-radio>
                  <wn-radio  class="radio" v-model="addForm.states" label="2">停用</wn-radio>
                </wn-form-item>
              </wn-col>
            </wn-row >
          </wn-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <wn-button type="warning" @click.native="addSubmit" :loading="addLoading">保存</wn-button>
        <wn-button type="warning"  @click.native="addFormVisible = false">取消</wn-button>
      </div>
    </wn-dialog>
    <!--表格修改功能视图-->
    <wn-dialog title="编辑"  :close-on-click-modal="false" v-model="editFormVisible">
      <wn-form :model="editForm" label-width="100px" :rules="rules2" ref="editForm">
        <wn-form-item label="名称"  prop="name">
          <wn-input v-model="editForm.name" auto-complete="off" @change="jsmComplete(editForm)" ></wn-input>
        </wn-form-item>
        <wn-form-item label="性别" >
          <wn-radio  class="radio" v-model="editForm.gender" label="1">男</wn-radio>
          <wn-radio  class="radio" v-model="editForm.gender" label="2">女</wn-radio>
        </wn-form-item>
        <wn-form-item label="检索码" >
          <wn-input type="text" ref="jsmRefs" :disabled="true" v-model="editForm.searchCode" placeholder="默认为名称拼音大写首字母"></wn-input>
        </wn-form-item>
        <wn-form-item label="身份证号" prop="idNumber">
          <wn-input type="text"  v-model="editForm.idNumber" ></wn-input>
        </wn-form-item>
        <wn-form-item label="手机号" prop="phone">
          <wn-input type="text"  v-model="editForm.phone" ></wn-input>
        </wn-form-item>
        <wn-form-item label="座机" prop="tel">
          <wn-input type="text"  v-model="editForm.tel" ></wn-input>
        </wn-form-item>
        <wn-form-item label="岗位" prop="roleType">
          <wn-select v-model="editForm.roleType" placeholder="请选择">
            <wn-option label="全科医生" value="0"></wn-option>
            <wn-option label="社区护士" value="1"></wn-option>
            <wn-option label="防护人员" value="2"></wn-option>
          </wn-select>
        </wn-form-item>
        <wn-form-item label="状态">
          <wn-radio class="radio" v-model="editForm.states" label="1">启用</wn-radio>
          <wn-radio class="radio" v-model="editForm.states" label="2">停用</wn-radio>
        </wn-form-item>
        <wn-form-item label="创建日期" prop="dateCreatedSys">
          <wn-input type="text"  :disabled="true" v-model="editForm.dateCreatedSys" ></wn-input>
        </wn-form-item>
        <wn-form-item label="更新日期" prop="updateTime">
          <wn-input type="text"  :disabled="true" v-model="editForm.updateTime" ></wn-input>
        </wn-form-item>
        <wn-form-item label="操作人" prop="operator">
          <wn-input type="text"  :disabled="true" v-model="editForm.operator" ></wn-input>
        </wn-form-item>
        <wn-form-item label="操作人ID" prop="operatorId">
          <wn-input type="text"  :disabled="true" v-model="editForm.operatorId" ></wn-input>
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
import util from "../../common/js/util";
import hypy from "../../common/js/hypy";
import NProgress from "nprogress";
import qs from "qs";
import {
  getDoctorPageList,
  addDoctor,
  getDoctor,
  doctorBatchSets,
  doctorHandleStar,
  doctorUpdateState,
  removeUser,
  batchRemoveUser,
  editUser,
  addUser
} from "../../api/api";
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
        callback();
      }
    };
    var checkIdNum = (rule, value, callback) => {
      var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      if (!value) {
        return callback(new Error("身份证号码不能为空"));
      } else if (reg.test(value) == false) {
        return callback(new Error("身份证号码不正确"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!value && value.length > 20) {
        return callback(new Error("手机号太长"));
      } else if (value && value != "" && reg.test(value) == false) {
        return callback(new Error("手机号码不正确"));
      } else {
        callback();
      }
    };
    var checkTel = (rule, value, callback) => {
      var reg = /[^/d]/g;
      if (!value && value.length > 20) {
        return callback(new Error("电话号码太长"));
      } else if (value && value != "" && reg.test(value) == false) {
        return callback(new Error("电话号码不正确"));
      } else {
        callback();
      }
    };
    var checkRoleType = (rule, value, callback) => {
      if (!value || value == "") {
        callback(new Error("请选择岗位"));
      } else {
        callback();
      }
    };

    return {
      listLoading: false,
      page: 1,
      users: [], //用户
      sels: [{ states: "" }], //列表选中列
      batchStar: "",
      hiddenButton: false,
      currentPage: 1,
      total: 0,
      ed: "",
      sd: "",
      //家庭医生表单
      doctorForm: {
        name: "",
        searchCode: "",
        gender: "",
        idNumber: "",
        phone: "",
        tel: "",
        states: "",
        roleType: "",
        orgCode: "",
        orgName: "",
        doctorCode: "",
        startDate: "",
        endDate: ""
      },
      pickerOptions0: {
        disabledDate: time => {
          //只能用箭头函数，才能取到值。
          let t = false;
          let aft = this.doctorForm.endDate;
          if (time.getTime() > Date.now()) t = true;
          if (aft != undefined && aft != "") {
            if (typeof aft == "string")
              aft = new Date(Date.parse(aft.replace(/-/g, "/")));
            if (time.getTime() > aft.getTime()) t = true;
          }
          return t;
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          //
          let t = false;
          let bef = this.doctorForm.startDate;
          if (time.getTime() > Date.now()) t = true;
          if (bef != undefined && bef != "") {
            if (typeof bef == "string")
              bef = new Date(Date.parse(bef.replace(/-/g, "/")));
            if (time.getTime() < bef.getTime()) t = true;
          }
          return t;
        }
      },
      //家庭医生表单BAK
      doctorFormBak: {
        name: "",
        searchCode: "",
        gender: "",
        idNumber: "",
        phone: "",
        tel: "",
        states: "",
        roleType: "",
        orgCode: "",
        orgName: "",
        doctorCode: "",
        startDate: "",
        endDate: "",
        dateCreatedSys: "",
        updateTime: "",
        operator: "",
        operatorId: ""
      },
      //    查询表单的select的option列表
      select: {
        zt: [{ value: "1", label: "启用" }, { value: "2", label: "停用" }],
        roleType: [
          { value: "0", label: "全科医生" },
          { value: "1", label: "社区护士" },
          { value: "2", label: "防保人员" }
        ]
      },

      rules2: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { validator: checkName, trigger: "blur" }
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        tel: [{ validator: checkTel, trigger: "blur" }],
        idNumber: [
           { required: true, message: "请输入身份证号码", trigger: "blur" },
           { validator: checkIdNum, trigger: "blur" }
          ],
        roleType: [
            { required: true, message: "请选择岗位", trigger: "blur" },
            { validator: checkRoleType, trigger: "blur" }
          ],
        gender: [
            { required: true, message: "请选择性别", trigger: "blur" }
          ],
        searchCode: [
        { required: true, message: "请填写检索码", trigger: "blur" }
        ]
      },
      //模态框数据开始
      addFormVisible: false,
      //新增界面表单
      addForm: {
        id: "",
        name: "",
        searchCode: "",
        gender: "",
        idNumber: "",
        phone: "",
        tel: "",
        states: "",
        roleType: "",
        orgCode: "",
        orgName: ""
      },
      addLoading: false,
      input: "",

      //模态框数据结束
      //编辑界面数据
      editFormVisible: false,
      editForm: {
        id: "",
        name: "",
        searchCode: "",
        gender: "",
        idNumber: "",
        phone: "",
        tel: "",
        states: "",
        roleType: "",
        orgCode: "",
        orgName: "",
        dateCreatedSys: "",
        updateTime: "",
        operator: "",
        operatorId: ""
      },
      //提交加载动画
      editLoading: false
    };
  },
  methods: {
    chcekDate0(v) {
      this.ed = this.doctorForm.endDate;
      this.sd = this.doctorForm.startDate;
      if (this.sd > this.ed) {
        this.doctorForm.startDate = "";
        return false;
      }
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
    //性别显示转换
    formatGender: function(row, column) {
      return row.gender == 1 ? "男" : row.gender == 2 ? "女" : "未知";
    },
    formatStates: function(row, column) {
      return row.states == 1 ? "启用" : row.states == 2 ? "停用" : "停用";
    },
    formatRoleType: function(row, column) {
      return row.roleType == 0 ? "全科医生" : row.roleType == 1 ? "社区护士" : "防保人员";
    },
    //名称拼音简写
    jsmComplete(jsmName) {
      jsmName.searchCode = hypy.getSearchCode(jsmName.name);
      // this.$refs.jsmRef.disabled = true;
    },
    //显示新建界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        id: "",
        name: "",
        searchCode: "",
        gender: "1", //设置默认值 男
        idNumber: "",
        phone: "",
        tel: "",
        states: "1", //设置默认值 启用
        roleType: "",
        orgCode: "",
        orgName: ""
      };
      this.resetForm(this);
      this.addLoading = false;
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      //ES6深层拷贝当前行数据赋值给editfrom
      this.editForm = Object.assign({}, row);
      this.editLoading = false;
    },

    //对表格隔行换色进调整
    tableRowClassName(row, index) {
      if (index % 2 !== 0) {
        return "info-odd";
      } else if (index % 2 == 0) {
        return "info-even";
      }
      return "";
    },
    // 查询功能
    //表格数据获取用户列表
    getDoctors(formName, pageValue, currentPage) {
      if (currentPage == undefined || currentPage == "") {
        currentPage = 1;
      }
      // this.formName;
      //搜索功能
      var data = "";
      let page = pageValue;
      this.page = pageValue;
      this.currentPage = currentPage;
      this.doctorForm.start = (this.page - 1) * 10;
      this.doctorForm.limit = 10;
      this.doctorForm.dir = "DESC";
      this.doctorForm.sort = "id";
      var startDate = this.doctorForm.startDate;
      var endDate = this.doctorForm.endDate;
      if (startDate != "" && startDate != null && startDate != undefined)
        this.doctorForm.startDate = util.formatDate.format(
          new Date(this.doctorForm.startDate),
          "yyyy-MM-dd"
        );
      if (endDate != "" && endDate != null && endDate != undefined)
        this.doctorForm.endDate = util.formatDate.format(
          new Date(this.doctorForm.endDate),
          "yyyy-MM-dd"
        );
      // let para = {
      //   doctorDto: this.doctorForm
      // };
      this.listLoading = true;
      // var doc = this.doctorForm;
      this.doctorFormBak = this.doctorForm;
      var doctorData = JSON.stringify(this.doctorForm);
      console.log(doctorData);
      getDoctorPageList(doctorData)
        .then(res => {
          this.users = res.data.content;
          this.total = res.data.totalElements;
          this.page = res.data.totalPages;
          this.listLoading = false;
        })
        .catch(error => {
          NProgress.done();
          this.$message({
            message: "提交超时",
            type: "error"
          });
          // console.log(this);
          // console.log(error);
        });
    },
    //    换页
    handleCurrentChange(val) {
      this.page = val;
      this.getDoctors("doctorForm", val, val);
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
    //    新建界面提交编辑
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交？", "提交", {}).then(() => {
            this.addLoading = true;
            let para = Object.assign({}, this.addForm);
            addDoctor(para)
              .then(res => {
                this.addLoading = false;
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
                      _this.getDoctors("doctorForm", 1, 1);
                    }
                    _this.editLoading = false;
                  }
                });
              })
              .catch(error => {
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
    //    编辑界面提交编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交？", "提交", {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.editForm);
            addDoctor(para)
              .then(res => {
                this.editLoading = false;
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
                      // _this.$refs['addForm'].resetFields();
                      // getDoctor(JSON.stringify(_this.addForm));
                      _this.editFormVisible = false;
                      _this.getDoctors("doctorForm", 1, 1);
                    }
                    _this.editLoading = false;
                  }
                });
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
        doctorUpdateState(para)
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
                  // _this.$refs['addForm'].resetFields();
                  // getDoctor(JSON.stringify(_this.addForm));
                  _this.editFormVisible = false;
                  _this.getDoctors("doctorForm", 1, 1);
                  _this.addLoading = false;
                }
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
        this.addLoading = true;
        let para = {
          ids: this.users[index].id,
          states: "1"
        };
        doctorUpdateState(para)
          .then(res => {
            this.addLoading = false;
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
                  // _this.$refs['addForm'].resetFields();
                  // getDoctor(JSON.stringify(_this.addForm));
                  _this.editFormVisible = false;
                  _this.getDoctors("doctorForm", 1, 1);
                  _this.addLoading = false;
                }
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
    doctorBatchSets: function(batchzt) {
      var currPage = this.currentPage;
      // console.log(currPage);
      var ids = this.sele.map(item => item.id).toString();
      this.$confirm("确认修改选中状态吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.listLoading = true;
        NProgress.start();
        let para = {
          ids: ids,
          states: batchzt,
          currentPage: currPage
        };
        doctorBatchSets(para)
          .then(res => {
            this.listLoading = false;
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
                  // _this.$refs['addForm'].resetFields();
                  // getDoctor(JSON.stringify(_this.addForm));
                  _this.editFormVisible = false;
                  _this.getDoctors("doctorForm", cpg, cpg);
                }
              }
            });
          })
          .catch(() => {
            NProgress.done();
            this.$message({
              message: "提交超时",
              type: "error"
            });
          });
      });
    }
  },
  mounted() {
    //dom加载完毕，渲染数据初始化
    this.getDoctors("doctorForm", 1, 1);
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
