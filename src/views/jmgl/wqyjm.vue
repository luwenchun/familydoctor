<template>
  <section>
    <!--表单区视图-->
    <wn-row>
      <wn-col :xs="24">
        <div class="box">
          <div class="box-content" style="padding-bottom: 0">
            <wn-form :model="uncontractPerson" :rules="rules2" ref="uncontractPerson" label-width="80px" class="demo-ruleForm wnform">
              <wn-row>
                <wn-col :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="姓名">
                    <wn-input type="text" v-model="uncontractPerson.name"></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="检索码">
                    <wn-input type="text" v-model="uncontractPerson.nameIndex"></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="身份证号">
                    <wn-input type="text" v-model="uncontractPerson.idNumber"></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="手机">
                    <wn-input type="text" v-model="uncontractPerson.phone"></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="紧急电话">
                    <wn-input type="text" v-model="uncontractPerson.tel"></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col :xs="24" :sm="24" :md={span:8,offset:8} :lg={span:4,offset:4}
                        style="text-align: right;margin-bottom: 10px;">
                  <wn-button type="warning" @click="searchUsers('uncontractPerson',1)">查&nbsp;&nbsp;询</wn-button>
                  <wn-button type="warning" @click="handleAdd">新&nbsp;&nbsp;建</wn-button>
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
            <wn-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                      :row-class-name="tableRowClassName" style="width: 100%;">
            <!--  <wn-table-column  type="selection" prop="id" label="ID"  width="50"  header-align="center" align="center">
              </wn-table-column>-->
              <wn-table-column prop="name" label="姓名" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="gender" label="性别"  :formatter="formatGender" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="birthDate" label="出生日期" :formatter="dateFormat" width="100" header-align="center" align="center">
              </wn-table-column>

              <wn-table-column prop="idNumber" label="身份证号" width="150" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="phone" label="手机" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="tel" label="紧急电话" width="150" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="contractCount" label="历史签约次数" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column label="操作" min-width="180" header-align="center" align="center">
                <template slot-scope="scope">
                  <i class="iconfont icon-xg" @click="handleEdit(scope.$index, scope.row)" title="修改"  style="cursor:pointer"></i>
                  <i class="iconfont icon-xy"  v-show="scope.row.contractCount == 0 ? true: false" @click="handleNewContract(scope.$index, scope.row)" title="签约" style="cursor:pointer"></i>
                  <i class="iconfont icon-qianyue"  v-show="scope.row.contractCount >=1 ? true: false" @click="handleCheck(scope.$index, scope.row)" title="续约" style="cursor:pointer"></i>
                </template>
              </wn-table-column>
            </wn-table>
            <!--分页功能-->
            <wn-col :span="24" class="toolbar">
              <wn-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10"
                             :total="total">
              </wn-pagination>
            </wn-col>
          </div>
        </div>
      </wn-col>
    </wn-row>
    <!--新建居民信息模态框视图-->
    <wn-dialog title="居 民 信 息" v-model="addFormVisible" :close-on-click-modal="false" top="5%" size="large">

      <div class="box" style="margin-bottom: 0">
        <div class="box-content" style="padding-bottom: 0">
          <wn-form :model="addForm" :rules="rules2" ref="addForm" label-width="100px"
                   class="demo-ruleForm wnform">
            <wn-row>
              <wn-col :xs="24" :sm="12" :md="8">
                <wn-form-item label="姓名" prop="name">
                  <wn-input type="text" v-model="addForm.name" @change="jsmComplete(addForm)"></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col :xs="24" :sm="12" :md="8">
                <wn-form-item label="性别">
                  <wn-radio class="radio" v-model="addForm.gender" label="1">男</wn-radio>
                  <wn-radio class="radio" v-model="addForm.gender" label="2">女</wn-radio>
                </wn-form-item>
              </wn-col>
              <wn-col :xs="24" :sm="12" :md="8">
                <wn-form-item label="检索编码">
                  <wn-input type="text" ref="jsmRef" :disabled="true" v-model="addForm.nameIndex"
                            placeholder="默认为名称拼音大写首字母"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row>
              <wn-col :xs="24" :sm="12" :md="8">
                <wn-form-item label="出生日期" prop="birthDate">
                  <!--<wn-input type="text" ref="jsmRef" :disabled="true" v-model="addForm.birthday" placeholder="通过身份证号自动生成"></wn-input>-->

                  <wn-date-picker :disabled="this.sel" v-model="addForm.birthDate" type="date"
                                  placeholder="选择出生日期" :picker-options="pickerOptions0" style="width: 100%;">
                  </wn-date-picker>
                </wn-form-item>
              </wn-col>
              <wn-col :xs="24" :sm="12" :md="8">
                <wn-form-item label="证件类型" prop="idType" >
                  <wn-select v-model="addForm.idType" @change="changeBirthDayDisabled(addForm)"  placeholder="请选择" >
                    <wn-option label="身份证" value="1"></wn-option>
                    <wn-option label="医保号" value="2"></wn-option>
                  </wn-select>
                </wn-form-item>
              </wn-col>
              <wn-col :xs="24" :sm="12" :md="8">
                <wn-form-item label="证件号" prop="idNumber">
                  <wn-input type="text" v-model="addForm.idNumber" @blur="updateBirthDay(addForm)"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
            <wn-row>
              <wn-col :xs="24" :sm="12" :md="8">
                <wn-form-item label="手机" prop="phone">
                  <wn-input type="text" v-model="addForm.phone"></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col :xs="24" :sm="12" :md="8" >
                <wn-form-item label="紧急电话" prop="tel">
                  <wn-input type="text" v-model="addForm.tel"></wn-input>
                </wn-form-item>
              </wn-col>
              <wn-col :xs="24" :sm="12" :md="8" >
                <wn-form-item label="地址" prop="addr">
                  <wn-input type="text" v-model="addForm.addr"></wn-input>
                </wn-form-item>
              </wn-col>
            </wn-row>
          </wn-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <wn-button type="warning" @click.native="addSubmit" :loading="addLoading">保存</wn-button>
        <wn-button type="warning" @click.native="addFormVisible = false">取消</wn-button>
      </div>
    </wn-dialog>
    <!--表格修改功能视图--><!--修改新建共用一个form-->
  <!--  <wn-dialog title="编辑" :close-on-click-modal="false" v-model="editFormVisible">
      <wn-form :model="editForm" label-width="100px" :rules="rules3" ref="editForm">
        <wn-row>
          <wn-col :xs="24" :sm="12" :md="8">
            <wn-form-item label="姓名" prop="name">
              &lt;!&ndash;<wn-input v-model="editForm.name" auto-complete="off"></wn-input>&ndash;&gt;
              <wn-input type="text" v-model="editForm.name" @change="jsmComplete(editForm)" auto-complete="off"></wn-input>
            </wn-form-item>
          </wn-col>
          <wn-col :xs="24" :sm="12" :md="8">
            <wn-form-item label="性别">
              <wn-radio class="radio" v-model="editForm.gender" label="1">男</wn-radio>
              <wn-radio class="radio" v-model="editForm.gender" label="2">女</wn-radio>
            </wn-form-item>
          </wn-col>
          <wn-col :xs="24" :sm="12" :md="8">
            <wn-form-item label="检索编码">
              <wn-input type="text" ref="jsmRef" :disabled="true" v-model="editForm.nameIndex"
                        placeholder="默认为名称拼音大写首字母"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row>
          <wn-col :xs="24" :sm="12" :md="8">
            <wn-form-item label="出生日期" prop="birthDate">
              &lt;!&ndash;<wn-input type="text" ref="jsmRef" :disabled="true" v-model="addForm.birthday" placeholder="通过身份证号自动生成"></wn-input>&ndash;&gt;

              <wn-date-picker :disabled="this.sel" v-model="editForm.birthDate" type="date"
                              placeholder="选择出生日期" :picker-options="pickerOptions0" style="width: 100%;">
              </wn-date-picker>
            </wn-form-item>
          </wn-col>
          <wn-col :xs="24" :sm="12" :md="8">
            <wn-form-item label="证件类型" prop="idType">
              <wn-select v-model="editForm.idType" @change="changeBirthDayDisabled(editForm)">
                <wn-option label="身份证" value="1"></wn-option>
                <wn-option label="医保号" value="2"></wn-option>
              </wn-select>
            </wn-form-item>
          </wn-col>
          <wn-col :xs="24" :sm="12" :md="8">
            <wn-form-item label="证件号" prop="idNumber">
              <wn-input type="text" v-model="editForm.idNumber" @blur="updateBirthDay(editForm)"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row>
          <wn-col :xs="24" :sm="12" :md="8">
            <wn-form-item label="手机" prop="phone">
              <wn-input type="text" v-model="editForm.phone"></wn-input>
            </wn-form-item>
          </wn-col>
          <wn-col :xs="24" :sm="12" :md="8" >
            <wn-form-item label="紧急电话" prop="tel">
              <wn-input type="text" v-model="editForm.tel"></wn-input>
            </wn-form-item>
          </wn-col>
          <wn-col :xs="24" :sm="12" :md="8" >
            <wn-form-item label="地址" prop="addr">
              <wn-input type="text" v-model="editForm.addr"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
      </wn-form>
      <div slot="footer" class="dialog-footer">
        <wn-button type="warning" @click.native="editFormVisible = false">取消</wn-button>
        <wn-button type="warning" @click.native="editSubmit" :loading="editLoading">提交</wn-button>
      </div>
    </wn-dialog>-->
  </section>
</template>
<script type="text/javascript">
  import hypy from '../../common/js/hypy'
  import util from '../../common/js/util'
  import NProgress from 'nprogress'
  import {
    getUncontractPersonList,
    addPersonForm
  } from '../../api/api'

  export default {
    data () {
// 自定义验证规则
      var checkName = (rule, value, callback) => {
        var reg = /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/
        if (!value) {
          return callback(new Error('名称不能为空'))
        }
        else if (reg.test(value) == false) {
          callback(new Error('名称为中文或者英文！长度为10以内！'))
        } else {
          callback()
        }

      }
 //校验证件号码
      var checkIdNumber = (rule,value,callback) =>{
        if(this.addForm.idType ==''){
          //必须先选择证件类型才能填号码
          callback(new Error('请选择证件类型'));
        }
        else if(this.addForm.idType =='1'){
          if(value==''){
            callback(new Error('请输入身份账号'));
          }else{
            let reg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
            if (reg.test(value) == false) {
              callback(new Error('身份证号码有误'));
            } else{
              callback();
            }
          }
        }

      else  if(this.addForm.idType =='2'){
          if(value==''){
            callback(new Error('请输入医保账号'));
          }else{
            var reg =/^[A-Za-z0-9]+$/;
            if (reg.test(value) == false) {
              callback(new Error('医保号码有误'));
            } else{
              callback();
            }
          }

        }else{
          callback(new Error('证件类型有问题'));
        }

      }
//校验手机号
      var checkPhone = (rule, value, callback) => {
        var reg = /^[\d]{11}$/
        if (value == '') {
          callback(new Error('请输入手机号码'))
        } else if (reg.test(value) == false) {
          callback(new Error('手机号码有误'))
        } else {
          callback()
        }
      }
//校验紧急电话
      var checkUrgentTel = (rule, value, callback) => {
        var regPhone =/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
        var regMobile = /^[\d]{11}$/
        var resultPhone = regPhone.test(value)
        var resultMobile = regMobile.test(value)
        if (value == '') {
          callback(new Error('请输入紧急电话'))
        } else if (resultPhone== false&&resultMobile==false) {
          callback(new Error('紧急电话有误'))
        } else {
          callback()
        }
      }
//校验出生日期
      var checkBirthday = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择出生日期'))
        }else{
          callback()
        }
      }
//校验地址
      var checkAddr = (rule, value, callback) => {
        var str = /^[\u4E00-\u9FA5A-Za-z\d\-\_]{1,100}$/
        if (value == '') {
          callback(new Error('请输入地址'))
        }else if(!str.test(value)){
          callback(new Error('地址有误'))
        }else
          {
          callback()
        }
      }
      return {
        sel: true,
        listLoading: false,
        page: 1,
        users: [],//用户
        sels: [],//列表选中列
        total: 0,
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },

//                    查询条件
        uncontractPerson: {
          name: '',
          nameIndex: '',
          idNumber: '',
          tel: '',
          phone:''
        },

//                  模态框数据开始
        addFormVisible: false,
//                    新增界面表单
        addForm: {
          id: '',
          name: '',
          gender: '',
          nameIndex: '',
          birthDate: '',
          idType: '',
          idNumber: '',
          phone: '',
          tel: '',
          addr:''
        },
        rules2: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            {validator: checkName, trigger: 'blur'}
          ],
          idType: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          idNumber: [
            { required: true, message: '请输入证件号码', trigger: 'blur' },
            {validator: checkIdNumber, trigger: 'change'},
            {validator: checkIdNumber, trigger: 'blur'}
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {validator: checkPhone, trigger: 'blur'}
          ],
          tel: [
            { required: true, message: '请输入紧急电话', trigger: 'blur' },
            {validator: checkUrgentTel, trigger: 'blur'}
          ],
          birthDate: [
            {required: true, message: '请输入出生日期'},
            {validator: checkBirthday, trigger: 'blur'}
          ],
          addr:[
            { required: true, message: '请输入地址', trigger: 'change' },
            { required: true, message: '请输入地址', trigger: 'blur' },
            {validator: checkAddr, trigger: 'blur'}]
        },
        idType: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        addLoading: false,
        input: '',

////                  模态框数据结束
//        //编辑界面数据
//        editFormVisible: false,
//        editForm: {
//          id: '',
//          name: '',
//          gender: '',
//          nameIndex: '',
//          birthDate: '',
//          idType: '',
//          idNumber: '',
//          phone: '',
//          tel: '',
//          addr: ''
//        },
////                    提交加载动画
//        editLoading: false,
      }
    },

    methods: {
      //新建提交
      addSubmit:function() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交？', '提交', {}).then(() => {
              this.addLoading = true
//              let para = Object.assign({}, this.addForm)
              let para={
                id:  this.addForm.id,
                name:  this.addForm.name,
                gender:  this.addForm.gender,
                nameIndex: this.addForm.nameIndex,
                birthDate: this.addForm.birthDate,
                idType: this.addForm.idType,
                idNumber: this.addForm.idNumber,
                phone:  this.addForm.phone,
                tel:  this.addForm.tel,
                addr:  this.addForm.addr};
              addPersonForm(para).then((res) => {
                this.addLoading = false
                let msg = res.data.message
                let suc = res.data.success
                let type = 'false'
                if (suc == true) {
                  type = 'success'
                } else {
                  type = 'error'
                }
                var _this = this
                this.$message({
                  showClose: true,
                  message: msg,
                  type: type,
                  onClose: function () {
                    if (suc == true) {
                      _this.$refs['addForm'].resetFields();
                      _this.addFormVisible = false;
                      //刷新查询表的内容
                      _this.searchUsers('uncontractPerson',1,1);
                    }
                  }
                })
              })
            })
          }
        })
      },
      //切换证件类型、清空证件号码、设置出生日期是否只读
      changeBirthDayDisabled (addForm) {
        if (this.addForm.idNumber != '') {
          this.addForm.idNumber = ''
        }
        if (addForm.idType != '1') {
          this.sel = false
        } else {
          this.sel = true
        }
      },

      //改变出生日期
      updateBirthDay (form) {
        if (form.idType == '1') {
          if (form.idNumber != '') {
//            let reg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
//            if (reg.test(form.idNumber) == false) {
//              callback(new Error('身份证号码有误'));
//            }

            var year = form.idNumber.substr(6, 4)//年
            if (year > 0) {
              if (year.length == 1) {
                if (parseInt(year) < 2) {
                 form.birthDate = year + '900-01-01'
                } else {
                 form.birthDate = year + '000-01-01'
                }
              } else if (year.length == 2) {
              form.birthDate = year + '00-01-01'
              } else if (year.length == 3) {
               form.birthDate = year + '0-01-01'
              } else {
                form.birthDate = year + '-01-01'
              }
            }
            var month = form.idNumber.substr(10, 2)
            if (month > 0) {
              if (month.length == 1) {
               form.birthDate = year + '-0' + month + '-01'
              } else {
                form.birthDate = year + '-' + month + '-01'
              }
            }
            var day = form.idNumber.substr(12, 2)	//日
            if (day > 0) {
              if (day.length == 1) {
              form.birthDate = year + '-' + month + '-0' + day
              } else {
               form.birthDate = year + '-' + month + '-' + day
              }
            }
            //验证出生日期
            if ( form.idNumber.length > 13) {
              var bd = new Date(year + '/' + month + '/' + day)
              //年月日是否合理
              if (bd.getFullYear() == year && (bd.getMonth() + 1) == month && bd.getDate() == day) {
                 form.birthDate = year + '-' + month + '-' + day

              } else {
                form.birthDate = ''
              }

              if (parseInt(year) < 1900) {
                 form.birthDate = ''
              }
            }
            if (form.idNumber.length > 6) {
              var birthDate = new Date(form.birthDate)
              var today = new Date()
              if (birthDate > today) {
                callback(new Error('出生日期不能大于今天！'))
                form.birthDate = ''
              }
            }
          }
        }
      },
      //出生日期格式化
      dateFormat: function (row, column) {
        var birthDate = row[column.property];
        if(birthDate != '' && birthDate!= null && birthDate != undefined){
          return row.birthDate= util.formatDate.format(new Date(row[column.property]),'yyyy-MM-dd');
        }
      },
      //性别显示转换
      formatGender: function (row, column) {
        return row.gender == 1 ? '男' : row.gender == 2 ? '女' : '未知';
      },
      //名称拼音简写
      jsmComplete (jsmName) {
        jsmName.nameIndex = hypy.getSearchCode(jsmName.name)
        // this.$refs.jsmRef.disabled = true;
      },
      //判断证件类型是否是身份证 是身份证自动获取出生日期 否则 手填

//        对表格隔行换色进调整
      tableRowClassName (row, index) {
        if (index % 2 !== 0) {
          return 'info-odd'
        } else if (index % 2 == 0) {
          return 'info-even'
        }
        return ''
      },
      //表格数据获取用户列表

//      查询功能
      //表格数据获取用户列表
      searchUsers(formName,pageValue,currentPage) {
        if(currentPage == undefined || currentPage == ''){
          currentPage = 1;
        }
        // this.formName;
        //搜索功能
        var data = '';
        let page = pageValue;
        this.page = pageValue;
        this.currentPage = currentPage;
        this.uncontractPerson.start=(this.page-1)*10;
        this.uncontractPerson.limit=10;
        this.uncontractPerson.dir='DESC';
        this.uncontractPerson.sort='id';
         let para =
          {
            contractDto:this.uncontractPerson
          };
        this.listLoading = true;
        var doc = this.uncontractPerson;
        var uncontractPersonData=JSON.stringify(this.uncontractPerson);
//        console.log(uncontractPersonData);
        getUncontractPersonList(uncontractPersonData).then((res)  => {
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
//      表单重置
      resetForm (formName) {
        if (formName != undefined && formName.$refs.addForm != null && formName.$refs.addForm.resetFields() != undefined) {formName.resetFields()}
      },
//    换页
      handleCurrentChange (val) {
        this.page = val;
        this.searchUsers('uncontractPerson',val,val);
      },
//    选中状态切换
      selsChange: function (sels) {
        this.sels = sels
      },
      //显示新建界面
      handleAdd: function () {
        this.addFormVisible = true
        this.addForm = {
          id: '',
          name: '',
          gender: '1',
          nameIndex: '',
          birthDate: '',
          idType: '',
          idNumber: '',
          phone: '',
          tel: '',
          addr:''
        }
        this.resetForm(this)
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.addFormVisible = true//this.editFormVisible = true
//  ES6深层拷贝当前行数据赋值给editfrom
        this.addForm = Object.assign({}, row)// this.editForm = Object.assign({}, row)
      },
//  编辑界面提交编辑
//      editSubmit: function () {
//        this.$refs.editForm.validate(valid => {
//          if (valid) {
//            this.$confirm("确认提交？", "提交", {}).then(() => {
//              this.editLoading = true;
////              let para = Object.assign({}, this.editForm);
//              let para={
//                id:  this.editForm.id,
//                name:  this.editForm.name,
//                gender:  this.editForm.gender,
//                nameIndex: this.editForm.nameIndex,
//                birthDate: this.editForm.birthDate,
//                idType: this.editForm.idType,
//                idNumber: this.editForm.idNumber,
//                phone:  this.editForm.phone,
//                tel:  this.editForm.tel,
//                addr:  this.editForm.addr};
////              debugger
//              addPersonForm(para)
//                .then(res => {
//                  this.addLoading = false;
//                  let msg = res.data.message;
//                  let suc = res.data.success;
//                  let type = "false";
//                  if (suc == true) {
//                    type = "success";
//                  } else {
//                    type = "error";
//                  }
//                  var _this = this;
//                  this.$message({
//                    showClose: true,
//                    message: msg,
//                    type: type,
//                    onClose: function() {
//                      if (suc == true) {
//                        // _this.$refs['addForm'].resetFields();
//                        // getDoctor(JSON.stringify(_this.addForm));
//                        _this.editFormVisible = false;
//                        _this.searchUsers("uncontractPerson", 1, 1);
//                      }
//                    }
//                  });
//                })
//                .catch(() => {
//                  NProgress.done();
//                  this.$message({
//                    message: "提交超时",
//                    type: "error"
//                  });
//                });
//            });
//          }
//        });
//      }
    },
    //    对当前数据的状态进行管理签约
    handleNewContract: function(index, row) {
      this.$confirm("确认将当前状态停用？", "提交", {}).then(() => {
        let para = {
          ids: this.users[index].id
        };
       personToNewContract(para).then(res => {
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
            duration: 1000,
            showClose: true,
            message: msg,
            type: type,
            onClose: function() {
              if (suc == true) {
                // _this.$refs['addForm'].resetFields();
                // getDoctor(JSON.stringify(_this.addForm));
               /* _this.editFormVisible = false;
                _this.getDoctors("doctorForm", 1, 1);*/
              }
            }
          });
        });
        // this.getDoctors();
      });
    },
    mounted () {
      //dom加载完毕，渲染数据初始化
      this.searchUsers('uncontractPerson',1,1);
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
