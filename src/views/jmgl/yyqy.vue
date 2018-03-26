<template>
  <section>
    <!--表单区视图-->
    <wn-row>
      <wn-col :xs="24">
        <div class="box">
          <div class="box-content" style="padding-bottom: 0">
            <wn-form  :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm wnform">
              <wn-row >
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="姓名"  >
                    <wn-input type="text"  v-model="ruleForm2.name" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="检索码" >
                    <wn-input type="text"  v-model="ruleForm2.jsm" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="身份证号" >
                    <wn-input type="text"  v-model="ruleForm2.jsm" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24" :sm="12" :md="16" :lg="8">
                  <wn-form-item label="签约日期">
                    <wn-col :span="10">
                      <wn-date-picker v-model="ruleForm2.name" type="date" placeholder="选择开始日期"  style="width: 100%;">
                      </wn-date-picker>
                    </wn-col>
                    <wn-col class="line" :span="1">-</wn-col>
                    <wn-col :span="10">
                      <wn-date-picker v-model="ruleForm2.jsm" type="date" placeholder="选择开始日期"  style="width: 100%;">
                      </wn-date-picker>
                    </wn-col>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="24" :md="8" :lg="4" style="text-align: right;margin-bottom: 10px;">
                  <wn-button type="warning" @click="searchUsers()">查&nbsp;&nbsp;询</wn-button>
                  <wn-button type="warning" @click="handleAdd">废&nbsp;&nbsp;弃</wn-button>
                </wn-col>
              </wn-row>
              <wn-row >
                <!--第二行-->
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="手机" >
                    <wn-input type="text"  v-model="ruleForm2.spr" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="处理医生" >
                    <wn-input type="text"  v-model="ruleForm2.spr" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="签约人" >
                    <wn-input type="text"  v-model="ruleForm2.spr" ></wn-input>
                  </wn-form-item>
                </wn-col>

                <wn-col  :xs="24" :sm="12" :md="16" :lg="8">
                  <wn-form-item label="处理止日">
                    <wn-col :span="10">
                      <wn-date-picker v-model="ruleForm2.name" type="date" placeholder="选择开始日期"  style="width: 100%;">
                      </wn-date-picker>
                    </wn-col>
                    <wn-col class="line" :span="1">-</wn-col>
                    <wn-col :span="10">
                      <wn-date-picker v-model="ruleForm2.jsm" type="date" placeholder="选择开始日期"  style="width: 100%;">
                      </wn-date-picker>
                    </wn-col>
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
          <div class="box-content clearfix" style="padding: 0 10px;">
            <!--表格-->
            <wn-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" :row-class-name="tableRowClassName" style="width: 100%;">
              <wn-table-column type="selection" width="55" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="name" label="姓名" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="servicedate" label="预约日期" width="100"  header-align="center" align="center" >
              </wn-table-column>
              <wn-table-column prop="sex" label="性别" width="100" header-align="center" align="center">
              </wn-table-column>

              <wn-table-column prop="birth" label="出生日期" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="ID" label="身份证号" width="150" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="phone" label="手机"  width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="telphone" label="紧急电话" width="150" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="yyqyzt" label="状态" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="spr" label="处理医生" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="servicedate" label="处理日期" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column  label="操作" min-width="180" header-align="center" align="center">
                <template slot-scope="scope">
                  <i class="iconfont icon-qianyue"  @click="handleEdit(scope.$index, scope.row)" title="签约"></i>
                  <i class="iconfont icon-fq" @click="handleStop(scope.$index, scope.row)" title="废弃"></i>
                  <i class="iconfont icon-ck" @click="handleCheck(scope.$index, scope.row)" title="查看"></i>
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
    <wn-dialog title="协 议 信 息" v-model="addFormVisible" :close-on-click-modal="false" top="5%" size="large" >

      <div class="box" style="margin-bottom: 15px">
        <div class="box-content" style="padding-bottom: 0">
          <wn-form  :model="addForm" :rules="rules2" ref="addForm" label-width="100px" class="demo-ruleForm wnform">
            <wn-row >
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="协议编码" prop="name" placeholder="年(2位)+机构码+流水号">
                  <wn-input type="text"  v-model="addForm.name" ></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="甲方（居民）" >
                  <wn-input type="text"  v-model="addForm.name" placeholder="姓名+检索码自动补全"></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="签约团队" >
                  <wn-input type="text"  v-model="addForm.name" placeholder="姓名+检索码自动补全"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row >
            <wn-row >
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="签约日期" >
                  <wn-date-picker v-model="addForm.name" type="date" placeholder="选择日期" style="width: 100%">
                  </wn-date-picker>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="有效年限" >
                  <wn-input type="text"  v-model="addForm.name" ></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="协议起日" >
                  <wn-date-picker v-model="addForm.name" type="date" placeholder="选择日期" style="width: 100%">
                  </wn-date-picker>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="协议止日" >
                  <wn-date-picker v-model="addForm.name" type="date" placeholder="选择日期" style="width: 100%">
                  </wn-date-picker>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="解约日期" >
                  <wn-date-picker v-model="addForm.name" type="date" placeholder="2017-10-26" style="width: 100%">
                  </wn-date-picker>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="解约人" >
                  <wn-input type="text"  v-model="addForm.name" placeholder="张三"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="解约原因" >
                  <wn-input type="text"  v-model="addForm.name" placeholder="协议到期自动解约"></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="总计费用" >
                  <wn-input type="text"  v-model="addForm.name" placeholder="300元"></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="补助金额" >
                  <wn-input type="text"  v-model="addForm.name" placeholder="100元"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row>
              <wn-col  :xs="24"  :sm="12" :md="8" >
                <wn-form-item label="应付金额" >
                  <wn-input type="text"  v-model="addForm.name" placeholder="200元"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
          </wn-form>
        </div>
      </div>
      <div class="box" style="margin-bottom: 15px">
        <div class="box-header" style="margin-top: 10px">
          <div class="box-name">
            <span>服务包</span>
            <wn-input v-model="input" placeholder="检索码查询，回车自动添加" style="width: 217px"></wn-input>
            &nbsp;&nbsp;
            <wn-dropdown>
                              <span class="el-dropdown-link">
                                 <i class="iconfont icon-button-add" style="vertical-align: middle;"></i>
                              </span>
              <wn-dropdown-menu slot="dropdown">
                <wn-dropdown-item>项目1</wn-dropdown-item>
                <wn-dropdown-item>项目2</wn-dropdown-item>
                <wn-dropdown-item>项目3</wn-dropdown-item>
                <wn-dropdown-item >项目4</wn-dropdown-item>
              </wn-dropdown-menu>
            </wn-dropdown>
          </div>
        </div>
        <div class="box-content" style="padding-bottom: 0;padding-top: 10px">
          <wn-table
            :data="tableData"
            style="width: 100%" :row-class-name="tableRowClassName">
            <wn-table-column
              prop="xmmc"
              label="项目名称"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column
              prop="xmlx"
              label="项目类型"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column label="操作" header-align="center" align="center">
              <template scope="scope">
                <i class="iconfont icon-delete"  @click="handleDelte(scope.$index, scope.row)" title="删除"></i>
              </template>
            </wn-table-column>
          </wn-table>
        </div>
        <div class="box-footer clearfix">
          <label class="el-form-item__label" style="width: 100px;">参考金额</label>

          <wn-input v-model="input"  style="width: 217px;float: left" placeholder="自动根据项目对应服务价" ></wn-input>

          <label class="el-form-item__label" style="width: 100px;">补足金额</label>

          <wn-input v-model="input"   style="width: 217px;float: left"></wn-input>
        </div>
      </div>
      <div class="box" style="margin-bottom: 15px">
        <div class="box-header" style="margin-top: 10px">
          <div class="box-name">
            <span>协议项目</span>
            <wn-input v-model="input" placeholder="检索码查询，回车自动添加" style="width: 217px"></wn-input>
            &nbsp;&nbsp;
            <wn-dropdown>
                              <span class="el-dropdown-link">
                                 <i class="iconfont icon-button-add" style="vertical-align: middle;"></i>
                              </span>
              <wn-dropdown-menu slot="dropdown">
                <wn-dropdown-item>项目1</wn-dropdown-item>
                <wn-dropdown-item>项目2</wn-dropdown-item>
                <wn-dropdown-item>项目3</wn-dropdown-item>
                <wn-dropdown-item >项目4</wn-dropdown-item>
              </wn-dropdown-menu>
            </wn-dropdown>
          </div>
        </div>
        <div class="box-content" style="padding-bottom: 0;padding-top: 10px">
          <wn-table
            :data="tableData"
            style="width: 100%" :row-class-name="tableRowClassName">
            <wn-table-column
              prop="xmmc"
              label="项目名称"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column
              prop="xmlx"
              label="项目类型"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column label="操作" header-align="center" align="center">
              <template scope="scope">
                <i class="iconfont icon-delete"  @click="handleDelte(scope.$index, scope.row)" title="删除"></i>
              </template>
            </wn-table-column>
          </wn-table>
        </div>
        <div class="box-footer clearfix">
          <label class="el-form-item__label" style="width: 100px;">参考金额</label>

          <wn-input v-model="input"  style="width: 217px;float: left" placeholder="自动根据项目对应服务价" ></wn-input>

          <label class="el-form-item__label" style="width: 100px;">补足金额</label>

          <wn-input v-model="input"   style="width: 217px;float: left"></wn-input>
        </div>
      </div>
      <div class="box" style="margin-bottom: 0px">
        <div class="box-header" style="margin-top: 10px">
          <div class="box-name">
            <span>基础服务</span>
            <wn-input v-model="input" placeholder="检索码查询，回车自动添加" style="width: 217px"></wn-input>
            &nbsp;&nbsp;
            <wn-dropdown>
                              <span class="el-dropdown-link">
                                 <i class="iconfont icon-button-add" style="vertical-align: middle;"></i>
                              </span>
              <wn-dropdown-menu slot="dropdown">
                <wn-dropdown-item>项目1</wn-dropdown-item>
                <wn-dropdown-item>项目2</wn-dropdown-item>
                <wn-dropdown-item>项目3</wn-dropdown-item>
                <wn-dropdown-item >项目4</wn-dropdown-item>
              </wn-dropdown-menu>
            </wn-dropdown>
          </div>
        </div>
        <div class="box-content" style="padding-bottom: 0;padding-top: 10px">
          <wn-table
            :data="tableData"
            style="width: 100%" :row-class-name="tableRowClassName">
            <wn-table-column
              prop="xmmc"
              label="项目名称"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column
              prop="xmlx"
              label="项目类型"
              width="180" header-align="center" align="center">
            </wn-table-column>
            <wn-table-column label="操作" header-align="center" align="center">
              <template scope="scope">
                <i class="iconfont icon-delete"  @click="handleDelte(scope.$index, scope.row)" title="删除"></i>
              </template>
            </wn-table-column>
          </wn-table>
        </div>
        <div class="box-footer clearfix">
          <label class="el-form-item__label" style="width: 100px;">参考金额</label>

          <wn-input v-model="input"  style="width: 217px;float: left" placeholder="自动根据项目对应服务价" ></wn-input>

          <label class="el-form-item__label" style="width: 100px;">补足金额</label>

          <wn-input v-model="input"   style="width: 217px;float: left"></wn-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <wn-button type="warning" @click.native="addSubmit" :loading="addLoading">协议书</wn-button>
        <wn-button type="warning" @click.native="addSubmit" :loading="addLoading">保存</wn-button>
        <wn-button type="warning"  @click.native="addFormVisible = false">取消</wn-button>

      </div>
    </wn-dialog>
    <!--表格修改功能视图-->
    <wn-dialog title="编辑"  :close-on-click-modal="false" v-model="editFormVisible">
      <wn-form :model="editForm" label-width="100px" :rules="rules2" ref="editForm">
        <wn-form-item label="名称"  prop="name">
          <wn-input v-model="editForm.illness" auto-complete="off" ></wn-input>
        </wn-form-item>
        <wn-form-item label="检索码" >
          <wn-input v-model="editForm.jsm" auto-complete="off" ></wn-input>
        </wn-form-item>
        <wn-form-item label="服务包类型" prop="change">
          <wn-select v-model="editForm.fwblx" placeholder="请选择">
            <wn-option label="基础包" value="1"></wn-option>
            <wn-option label="非基础包" value="0"></wn-option>
          </wn-select>
        </wn-form-item>
        <wn-form-item label="适宜人群" prop="change">
          <wn-select v-model="editForm.syrq" placeholder="请选择">
            <wn-option label="健康" value="1"></wn-option>
            <wn-option label="非健康" value="0"></wn-option>
          </wn-select>
        </wn-form-item>
        <wn-form-item label="参考价格">
          <wn-input-number v-model="editForm.price" :min="0" :max="2000"></wn-input-number>
        </wn-form-item>
        <wn-form-item label="审批状态" >
          <wn-select v-model="editForm.spzt" >
            <wn-option label="通过" value="1"></wn-option>
            <wn-option label="未通过" value="0"></wn-option>
          </wn-select>
        </wn-form-item>

        <wn-form-item label="审批人">
          <wn-input v-model="editForm.spr" auto-complete="off" ></wn-input>
        </wn-form-item>
        <wn-form-item label="状态" >
          <wn-radio class="radio" v-model="editForm.state" label="启用">启用</wn-radio>
          <wn-radio  class="radio" v-model="editForm.state" label="停用">停用</wn-radio>
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
  import { getUserListPage,getUserList, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
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
    return {
      listLoading: false,
      page: 1,
      users:[],//用户
      sels: [],//列表选中列
      total: 0,
//                  查询表单的select的option列表
      select:{
        fwblx:[{value:'自建包',label:'自建包'},{value:'基本包',label:'基本包'},{value:'个性包',label:'个性包'}],
        syrq:[{value:'健康',label:'健康'},{value:'糖尿病',label:'糖尿病'},{value:'老年人',label:'老年人'},{value:'儿童',label:'儿童'},{value:'高血压',label:'高血压'}],
        spzt:[{value:'通过',label:'通过'},{value:'未通过',label:'未通过'},{value:'审批中',label:'审批中'},],
        zt:[{value:'启用',label:'启用'},{value:'停用',label:'停用'}]
      },
//                    服务包表单
      ruleForm2: {
        name: '',
        jsm:'',
        fwblx:'',
        syrq:'',
        ztsp:'',
        spr:'',
        zt:'',
      },
      rules2: {
        name: [
          {validator: checkName, trigger: 'blur'}
        ],
        change: [
          { message: '请选择', trigger: 'change' }
        ],
      },
//                  模态框数据开始
      addFormVisible:false,
//                    新增界面表单
      addForm: {
        name: '',
        jsm:'',
        fwblx:'',
        syrq:'',
        ztsp:'',
        spr:'',
        zt:'',
        desc:''
      },
      addLoading:false,
      input:'',
      tableData: [{
        xmmc: '血常规',
        xmlx: '基本治疗'
      }, {
        xmmc: '随访服务',
        xmlx: '公共卫生'
      }],
      tableData1: [{
        czr: '张三',
        spzt: '提交审批',
        spsj:'2016-05-04',
        bz: '提交审批由系统自动生成'
      }, {
        czr: '张姐',
        spzt: '通过',
        spsj:'2016-05-04',
        bz: '同意'
      }],
//                  模态框数据结束
      //编辑界面数据
      editFormVisible:false,
      editForm: {
        illness:'',
        jsm:'',
        fwblx:'',
        syrq:'',
        price:'',
        spzt:'',
        spr:'',
        state:'',
        sex:''
      },
//                    提交加载动画
      editLoading:false,
    }
  },
  methods: {
//        对表格隔行换色进调整
    tableRowClassName(row, index) {
      if (index%2 !==0) {
        return 'info-odd';
      } else if (index%2 ==0) {
        return 'info-even';
      }
      return '';
    },
    //表格数据获取用户列表
    getUsers() {
      //搜索功能
      let para = {
        page: this.page,
      };
      this.listLoading = true;
      getUserListPage(para).then((res)  => {
        this.total = res.data.total;
        this.users = res.data.users;
        this.listLoading = false;
      });
    },
//      查询功能
    searchUsers(formName) {
      let para = {
        page: this.page,
        name: this.ruleForm2.name,
        jsm:this.ruleForm2.jsm,
      };
      this.listLoading = true;
      getUserList(para).then((res)  => {
        this.users = res.data.users;
        this.total = res.data.total;
        this.listLoading = false;
      });
    },
//      表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
//    换页
    handleCurrentChange(val) {
      this.page = val;
//        通过判断ruleForm2的value为不空时判断在查询状态
      if(this.ruleForm2.name&&this.ruleForm2.jsm){
        this.searchUsers();
      }else{
        this.getUsers();
      }
    },
//    选中状态切换
    selsChange: function (sels) {
      this.sels = sels;
    },
    //显示新建界面
    handleAdd: function () {
      this.addFormVisible = true;
      this.addForm = {
        name: '血常规',
        jsm:'',
        fwblx:'',
        syrq:'',
        ztsp:'',
        spr:'',
        zt:'',
        radio:'1',
        desc:''
      };
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true;
//        ES6深层拷贝当前行数据赋值给editfrom
      this.editForm = Object.assign({}, row);
    },
//    编辑界面提交编辑
    editSubmit:function(){
      this.$refs.editForm.validate((valid)=>{
        if(valid){
          this.$confirm('确认提交？','提交',{}).then(()=>{
            this.editLoading=true;
            let para=Object.assign({},this.editForm);
            editUser(para).then((res)=>{
              this.editLoading=false;
              this.$message({
                message:'提交成功',
                type:'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible=false;
              this.getUsers();

            })
          })
        }
      })
    }
  },
  mounted(){//dom加载完毕，渲染数据初始化
    this.getUsers();
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
</style>
