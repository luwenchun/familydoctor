<template>
  <section>
    <!--表单区视图-->
    <wn-row>
      <wn-col :xs="24">
        <div class="box">
          <div class="box-content" style="padding-bottom: 0">
            <wn-form  :model="fwjlForm" ref="fwjlForm" label-width="80px" class="demo-ruleForm wnform">
              <wn-row >
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="姓名" prop="name">
                    <wn-autocomplete popper-class="my-autocomplete" v-model="fwjlForm.name" :fetch-suggestions="querySearchName" placeholder="检索码自动补齐" @select="handleSelect">
                      <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                      <template slot-scope="props">
                        <div class="name">{{ props.item.value }}</div>
                        <span class="addr">{{ props.item.id }}</span>
                      </template>
                    </wn-autocomplete>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="检索码" >
                    <wn-input type="text"  v-model="fwjlForm.nameIndex" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="身份证号" >
                    <wn-input type="text"  v-model="fwjlForm.idNumber" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="签约团队" >
                    <wn-autocomplete popper-class="my-autocomplete" v-model="fwjlForm.teamName" :fetch-suggestions="querySearchTeam" placeholder="自动补齐" @select="handleSelect">
                      <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                      <template slot-scope="props">
                        <div class="name">{{ props.item.value }}</div>
                        <span class="addr">{{ props.item.id }}</span>
                      </template>
                    </wn-autocomplete>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="签约协议" >
                    <wn-input type="text"  v-model="fwjlForm.qyxy"  placeholder="需要先选人"></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="24" :md="8" :lg="4" style="text-align: right;margin-bottom: 10px;">

                  <wn-button type="warning" @click="searchUsers()">查&nbsp;&nbsp;询</wn-button>
                  <wn-button type="warning" @click="handleAdd">新&nbsp;&nbsp;建</wn-button>
                  <wn-button type="warning" @click="BatchRemoveFwjl()">删&nbsp;&nbsp;除</wn-button>
                </wn-col>
              </wn-row>
              <wn-row >
                <!--第二行-->
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="基础服务" prop="serviceName">
                    <wn-autocomplete popper-class="my-autocomplete" v-model="fwjlForm.serviceName" :fetch-suggestions="querySearch" placeholder="检索码自动补齐"  @select="handleSelect">
                      <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                      <template slot-scope="props">
                        <div class="name">{{ props.item.value }}</div>
                        <span class="addr">{{ props.item.id }}</span>
                      </template>
                    </wn-autocomplete>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                  <wn-form-item label="服务人" >
                    <wn-input type="text"  v-model="fwjlForm.serviceDoct" ></wn-input>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                  <wn-form-item label="服务来源" prop="change">
                    <wn-select v-model="fwjlForm.sourctType" clearable placeholder="请选择">
                      <wn-option v-for="item in select.selSourctType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                    </wn-select>
                  </wn-form-item>
                </wn-col>
                <wn-col  :xs="24" :sm="12" :md="8" :lg="8">
                <wn-form-item label="服务日期">
                  <wn-col :span="10">
                    <wn-date-picker v-model="fwjlForm.startDate" type="date" placeholder="选择开始日期" :picker-options="pickerOptions0" style="width: 100%;">
                    </wn-date-picker>
                  </wn-col>
                  <wn-col class="line" :span="1">-</wn-col>
                  <wn-col :span="10">
                    <wn-date-picker v-model="fwjlForm.endDate" type="date" placeholder="选择结束日期" :picker-options="pickerOptions1" style="width: 100%;">
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
            <wn-table :data="users" highlight-current-row v-loading="listLoading" @select-all="selectAll" @select="selsChange" :row-class-name="tableRowClassName" style="width: 100%;">
              <wn-table-column type="selection" prop="id" label="ID" width="55" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="name" label="姓名" width="80" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="gender" label="性别" :formatter="formatGender"  width="80"  header-align="center" align="center" >
              </wn-table-column>
              <wn-table-column prop="birthDate" :formatter="dateFormat" label="出生日期" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="serviceName" label="基础服务" width="140" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="serviceDate" :formatter="dateFormat" label="服务日期" width="100" header-align="left" align="left">
              </wn-table-column>
              <wn-table-column prop="serviceDoct" label="服务人"  width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="sourctType" label="服务来源" :formatter="formatserviceType" width="80" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="serviceCount" label="服务次数" width="80" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="contractDate" :formatter="dateFormatDate" label="签约日期" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column prop="teamName" label="签约团队" width="100" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column  label="操作" min-width="140" header-align="center" align="center">
                <template slot-scope="scope">
                  <i class="iconfont icon-ck" v-show="scope.row.sourctType == '1' ? true: false" @click="handleView(scope.$index, scope.row)" title="查看"></i>
                  <i class="iconfont icon-xg" v-show="scope.row.sourctType == '2' ? true: false" @click="handleEdit(scope.$index, scope.row)" title="修改"></i>
                  <i class="iconfont icon-sc" v-show="scope.row.sourctType == '2' ? true: false" @click="handleDel(scope.$index, scope.row)" title="删除"></i>
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
    <wn-dialog title="服务记录信息"  :close-on-click-modal="false" v-model="addFormVisible">
      <wn-form :model="addForm" label-width="100px" :rules="rules2" ref="addForm">
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11">
            <wn-form-item label="居民姓名" prop="name">
              <wn-autocomplete popper-class="my-autocomplete" v-model="addForm.name" :fetch-suggestions="querySearchContractName" placeholder="检索码自动补齐" @select="addHandleSelect">
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                <template slot-scope="props">
                  <div class="name">{{ props.item.value }}</div>
                  <span class="addr">{{ props.item.id }}</span>
                </template>
              </wn-autocomplete>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24"  :sm="12" :md="11">
            <wn-form-item label="性别" >
              <wn-select v-model="addForm.gender" :disabled="true">
                <wn-option v-for="item in select.genderType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
              </wn-select>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="签约日期" prop="contractDate">
              <wn-date-picker v-model="addForm.contractDate" type="date" :disabled="true" style="width: 100%;">
              </wn-date-picker>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="签约团队" prop="teamName">
              <wn-input type="text" :disabled="true" v-model="addForm.teamName"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="服务日期" prop="serviceDate">
              <wn-date-picker v-model="addForm.serviceDate" type="date" :picker-options="pickerOptions0" style="width: 100%">
              </wn-date-picker>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="服务人" prop="serviceDoct">
              <wn-input type="text" v-model="addForm.serviceDoct"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col :xs="24"  :sm="12" :md="11">
            <wn-form-item label="基础服务" prop="serviceName">
              <wn-autocomplete popper-class="my-autocomplete" v-model="addForm.serviceName" :fetch-suggestions="querySearch" placeholder="检索码自动补齐协议中含有的手动考核的基础服务" @select="editHandleSelect">
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
              <wn-input type="text"  v-model="addForm.serviceCount"></wn-input>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="记录来源" prop="sourctType">
              <wn-select v-model="addForm.sourctType" :disabled="true">
                <wn-option v-for="item in select.selSourctType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
              </wn-select>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11"  :lg="22">
            <wn-form-item label="服务描述" prop="common">
              <wn-input type="textarea"  v-model="addForm.common"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
      </wn-form>
      <div slot="footer" class="dialog-footer">
        <wn-button type="warning" @click.native="addFormVisible = false">取消</wn-button>
        <wn-button type="warning" @click.native="addSubmit" :loading="editLoading">保存</wn-button>
      </div>
    </wn-dialog>
    <!--表格修改功能视图-->
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
            <wn-form-item label="签约团队" prop="teamName">
              <wn-input type="text" :disabled="true" v-model="editForm.teamName"></wn-input>
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
          <wn-col :xs="24"  :sm="12" :md="11">
            <wn-form-item label="基础服务" prop="serviceName">
              <wn-autocomplete popper-class="my-autocomplete" v-model="editForm.serviceName" :fetch-suggestions="querySearch" placeholder="请输入检索码" @select="editHandleSelect">
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
    <!--表格查看功能视图-->
    <wn-dialog title="服务记录信息"  :close-on-click-modal="false" v-model="viewFormVisible">
      <wn-form :model="viewForm" label-width="100px" ref="viewForm">
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="居民姓名" prop="name">
              <wn-input type="text" :disabled="true" v-model="viewForm.name"></wn-input>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24"  :sm="12" :md="11">
            <wn-form-item label="性别" >
              <wn-select v-model="viewForm.gender" :disabled="true">
                <wn-option v-for="item in select.genderType" :key="item.value" :value="item.value" :label="item.label"></wn-option>
              </wn-select>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="签约日期" prop="contractDate">
              <wn-date-picker v-model="viewForm.contractDate" type="date" :disabled="true" style="width: 100%;">
              </wn-date-picker>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="签约团队" prop="teamName">
              <wn-input type="text" :disabled="true" v-model="viewForm.teamName"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="服务日期" prop="serviceDate">
              <wn-date-picker v-model="viewForm.serviceDate" :disabled="true" type="date" :picker-options="pickerOptions0" style="width: 100%">
              </wn-date-picker>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="服务人" prop="serviceDoct">
              <wn-input type="text" v-model="viewForm.serviceDoct" :disabled="true"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col :xs="24"  :sm="12" :md="11" :lg="22">
            <wn-form-item label="基础服务" prop="serviceCode">
              <wn-input type="text" v-model="viewForm.serviceName" :disabled="true"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="服务次数" prop="serviceCount">
              <wn-input type="text"  v-model="viewForm.serviceCount" :disabled="true"></wn-input>
            </wn-form-item>
          </wn-col>
          <wn-col  :xs="24"  :sm="12" :md="11" >
            <wn-form-item label="记录来源" prop="sourctType">
              <wn-input type="text"  v-model="viewForm.sourctType" :disabled="true"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
        <wn-row >
          <wn-col  :xs="24"  :sm="12" :md="11" :lg="22">
            <wn-form-item label="服务描述" prop="common">
              <wn-input type="textarea"  v-model="viewForm.common" :disabled="true"></wn-input>
            </wn-form-item>
          </wn-col>
        </wn-row>
      </wn-form>
    </wn-dialog>
  </section>
</template>
<script type="text/javascript">
  import util from '../../common/js/util'
  import NProgress from 'nprogress'
  import { getFwjlListPage,getJcServiceList,getNameList,getTeamList,editFwjl, removeFwjl,getcontractNameList,batchRemoveFwjl} from '../../api/api';
  export default {
    data()
  {
//  自定义验证规则
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
    //服务次数
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
      if (!value) {
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
      users:[],//用户
      nameArr:[],
      arr: [],
      serviceName:'',
      teamArr:[],
      contractNameArr:[],
      currentPage:1,
      sele:'',
      total: 0,
//    查询表单的select的option列表
      select:{
        genderType:[{value:"1",label:"男"},{value:"2",label:"女"}],
        selSourctType:[{value:"1",label:"系统生成"},{value:"2",label:"手动输入"}]
      },
      pickerOptions0: {
        disabledDate:(time) => { //只能用箭头函数，才能取到值。
          let t= false;
          let aft = this.fwjlForm.endDate;
          if(time.getTime() > Date.now()) t = true;
          if(aft != undefined && aft != ''){
            if(  typeof aft == 'string')
              aft= new Date(Date.parse(aft.replace(/-/g,  "/")));
            if(time.getTime() > aft.getTime()) t= true;
          }
          return t;
        }
      },
      pickerOptions1: {
        disabledDate:(time) =>{ //
          let t =false;
          let bef = this.fwjlForm.startDate;
          if(time.getTime() > Date.now()) t = true;
          if(bef != undefined && bef != '' && bef != null){
            if( typeof bef =='string')
             bef= new Date(Date.parse(bef.replace(/-/g,  "/")));
            if(time.getTime() < bef.getTime()) t= true;
          }
          return t;
        }
      },

//    服务记录表单
      fwjlForm: {
        personCode: '',
        nameIndex:'',
        idNumber:'',
        teamCode:'',
   //     qyxy:'',
        serviceCode:'',
        serviceDoct:'',
        sourctType: '',
        startDate: '',
        endDate: '',
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
//    模态框数据开始
      addFormVisible:false,
//    新增界面表单
      addForm: {
        personCode:'',
        name:'',
        gender:'',
        contractCode:'',
        contractDate:'',
        teamCode:'',
        teamName:'',
        serviceDate:'',
        serviceDoct:'',
        serviceName:'',
        serviceCode:'',
        serviceCount:'',
        sourctType:'2',
        common:''
      },
      addLoading:false,
      //模态框数据结束
      //编辑界面数据
      editFormVisible:false,
      editForm: {
        id:'',
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
    // 提交加载动画
      editLoading:false,
      //查看界面数据
      viewFormVisible:false,
      viewForm: {
        id:'',
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
      // 提交加载动画
      viewLoading:false,
    }
  },
  methods: {
    //表单重置
    resetForm(formName) {
      if (
        formName != undefined &&
        formName.$refs.addForm != null &&
        formName.$refs.addForm.resetFields() != undefined
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
      this.fwjlForm.start=(page-1)*10;
      this.fwjlForm.limit=10;
      this.fwjlForm.dir='DESC';
      this.fwjlForm.sort='id';
      var startDate = this.fwjlForm.startDate;
      var endDate = this.fwjlForm.endDate;
      if(startDate != '' && startDate!= null && startDate != undefined)
        this.fwjlForm.startDate = util.formatDate.format(new Date(this.fwjlForm.startDate),'yyyy-MM-dd');
      if(endDate != '' && endDate!= null && endDate != undefined)
        this.fwjlForm.endDate = util.formatDate.format(new Date(this.fwjlForm.endDate),'yyyy-MM-dd');
      let para = {
        ServiceRecordDto:this.fwjlForm
      };
      this.listLoading = true;
      var doc = this.fwjlForm;
      var fwjlListData=JSON.stringify(this.fwjlForm);
      console.log(fwjlListData);
      getFwjlListPage(fwjlListData).then((res)  => {
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
      this.searchUsers('fwjlForm',val,val);
    },
    //全选中
    selectAll : function (seles) {
      this.sele = seles;
      this.hiddenButton = false;
    },
    //选中状态切换
    selsChange: function(sele, row) {
      this.sele = sele;

    },
    //性别显示转换
    formatGender: function (row, column) {
      return row.gender == 1 ? '男' : row.gender == 2 ? '女' : '未知';
    },
    //服务来源显示转换
    formatserviceType: function (row, column) {
      return row.sourctType == 1 ? '系统生成' : row.sourctType == 2 ? '手动输入':'手动输入';
    },
    //出生日期格式化
    dateFormat: function (row, column) {
      var birthDate = row[column.property];
      var serviceDate = row[column.property];
      var contractDate = row[column.property];
      if(birthDate != '' && birthDate!= null && birthDate != undefined){
        return row.birthDate= util.formatDate.format(new Date(birthDate),'yyyy-MM-dd');
      }
      if(serviceDate != '' && serviceDate!= null && serviceDate != undefined){
        return row.serviceDate= util.formatDate.format(new Date(serviceDate),'yyyy-MM-dd');
      }
      if(contractDate != '' && contractDate!= null && contractDate != undefined){
        return row.contractDate= util.formatDate.format(new Date(contractDate),'yyyy-MM-dd');
      }
    },
    dateFormatDate: function (row, column) {
      var contractDate = row[column.property];
      if(contractDate != '' && contractDate!= null && contractDate != undefined){
        return row.contractDate= util.formatDate.format(new Date(contractDate),'yyyy-MM-dd');
      }
    },
    //查询签约团队名称
    getTeamName() {
      let para = {};
      this.listLoading = true;
      getTeamList(para).then(res => {
        this.teamArr = res.data;
      });
    },
    //下拉框基础服务
    querySearchTeam(queryString, cb) {
      var restaurants = this.teamArr;
      var results = queryString
        ? restaurants.filter(this.createFilterTeam(queryString))
        : restaurants;
      cb(results);
    },
    createFilterTeam(queryString) {
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
      this.fwjlForm.serviceCode = selected.serviceCode;
      this.fwjlForm.personCode = selected.personCode;
      this.fwjlForm.teamCode = selected.teamCode;
    },
    editHandleSelect(selected) {
      this.editForm.serviceCode = selected.serviceCode;
      this.addForm.serviceCode = selected.serviceCode;
    },
    //查询姓名
    getNameList() {
      let para = {};
      this.listLoading = true;
      getNameList(para).then(res => {
        this.nameArr = res.data;
      });
    },
    //下拉框姓名
    querySearchName(queryString, cb) {
      var restaurants = this.nameArr;
      var results = queryString
        ? restaurants.filter(this.createFilterName(queryString))
        : restaurants;
      cb(results);
    },
    createFilterName(queryString) {
      return restaurant => {
        return (
          restaurant.nameIndex
            .toUpperCase()
            .indexOf(queryString.toUpperCase()) === 0 ||
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },

    //查询姓名
    getcontractName() {
      let para = {};
      this.listLoading = true;
      getcontractNameList(para).then(res => {
        this.contractNameArr = res.data;
      });
    },
    //下拉框姓名
    querySearchContractName(queryString, cb) {
      var restaurants = this.contractNameArr;
      var results = queryString
        ? restaurants.filter(this.createFilterContractName(queryString))
        : restaurants;
      cb(results);
    },
    createFilterContractName(queryString) {
      return restaurant => {
        return (
          restaurant.nameIndex
            .toUpperCase()
            .indexOf(queryString.toUpperCase()) === 0 ||
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    addHandleSelect(selected) {
      this.addForm.gender = selected.gender;
      this.addForm.contractDate = selected.contractDate;
      this.addForm.teamName = selected.teamName;
      this.addForm.teamCode = selected.teamCode;
      this.addForm.contractCode = selected.contractCode;
      this.addForm.personCode =selected.personCode;
    },

    //显示新建界面
    handleAdd: function () {
      this.getcontractName();
      this.addFormVisible = true;
      this.addForm = {
        personCode:'',
        name:'',
        gender:'',
        contractCode:'',
        contractDate:'',
        teamCode:'',
        teamName:'',
        serviceDate:'',
        serviceDoct:'',
        serviceName:'',
        serviceCode:'',
        serviceCount:'',
        sourctType:'2',
        common:''
      };
      this.listLoading = false;
      this.resetForm(this);
    },
    //新增表单保存
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if(valid){
          this.$confirm('确认提交？','提交',{}).then(()=>{
            var serviceDate = this.addForm.serviceDate;
            if(serviceDate != '' && serviceDate!= null && serviceDate != undefined){
              this.addForm.serviceDate = util.formatDate.format(new Date(this.addForm.serviceDate),'yyyy-MM-dd');
            }
            this.addLoading=true;
            let para=Object.assign({},this.addForm);
            editFwjl(para).then((res)=>{
              this.addLoading=false;
              this.$message({
                message:'提交成功',
                type:'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible=false;
              this.searchUsers();
            })
          })
        }
      });
    },

    //显示查看界面
    handleView: function (index, row) {
      this.viewFormVisible = true;
      //ES6深层拷贝当前行数据赋值给editfrom
      this.viewForm = Object.assign({}, row);
      if(this.viewForm.sourctType == 1){
        this.viewForm.sourctType='系统生成';
      }
      this.listLoading = false;
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true;
    //ES6深层拷贝当前行数据赋值给editfrom
      this.editForm = Object.assign({}, row);
      this.editForm.sourctType='2';
      this.listLoading = false;
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
            editFwjl(para).then((res)=>{
              this.editLoading=false;
              this.$message({
                message:'提交成功',
                type:'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible=false;
              this.searchUsers();
            })
          })
        }
      })
    },
    //编辑删除
    handleDel:function(index, row){
        this.$confirm('确认删除？','提交',{}).then(()=>{
          this.listLoading=true;
          var id= row.id;
          let para={id};
          removeFwjl(para).then((res)=>{
            this.listLoading=false;
            this.$message({
              message:'删除成功',
              type:'success'
            });
            this.searchUsers();
          })
        })
    },
    //批量删除
    BatchRemoveFwjl:function(){
      var ids = this.sele.map(item => item.id).toString();
      this.$confirm('确认删除？','提交',{}).then(()=>{
        this.listLoading=true;
        let para={ids};
        batchRemoveFwjl(para).then((res)=>{
          this.listLoading=false;
          this.$message({
            message:'删除成功',
            type:'success'
          });
          this.searchUsers();
        })
      })
    },
  },
    //dom加载完毕，渲染数据初始化
    mounted(){
      this.searchUsers();
      this.getNameList();//下拉框查询服务人姓名
      this.getTeamName();//下拉框查询团队姓名
      this.getJcServiceList();//下拉框查询基础服务
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
