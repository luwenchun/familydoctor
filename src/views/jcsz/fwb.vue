<template>
    <section>
        <!--表单区视图-->
        <wn-row>
            <wn-col :xs="24">
                <div class="box">
                    <div class="box-content" style="padding-bottom: 0">
                        <wn-form  :model="packageForm"  ref="packageForm" label-width="80px" class="demo-ruleForm wnform">
                            <wn-row >
                                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                                    <wn-form-item label="名称"  prop="name">
                                        <wn-input type="text"  v-model="packageForm.name" ></wn-input>
                                    </wn-form-item>
                                </wn-col>
                                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                                    <wn-form-item label="检索码" >
                                        <wn-input type="text"  v-model="packageForm.searchCode" ></wn-input>
                                    </wn-form-item>
                                </wn-col>
                                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                                    <wn-form-item label="服务包类型" >
                                        <wn-select v-model="packageForm.packageType" placeholder="请选择">
                                            <wn-option v-for="item in select.fwblx" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                                        </wn-select>
                                    </wn-form-item>
                                </wn-col>
                                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                                    <wn-form-item label="适宜人群" >
                                        <wn-select v-model="packageForm.suitablePopulation" placeholder="请选择">
                                          <wn-option v-for="item in select.syrq" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                                        </wn-select>
                                    </wn-form-item>
                                </wn-col>
                                <wn-col  :xs="24"  :sm="24" :md="8" :lg="8" style="text-align: right;margin-bottom: 10px;">

                                        <wn-button type="warning" @click="searchUsers('packageForm',1)">查&nbsp;&nbsp;询</wn-button>
                                      <!--<wn-button type="warning" @click="resetForm('ruleForm2')">重&nbsp;&nbsp;置</wn-button>-->
                                        <wn-button type="warning" @click="handleAdd">新&nbsp;&nbsp;建</wn-button>
                                        <wn-button type="warning"  @click="packageBatchSets(2)" :disabled="this.sels.length===0|| (this.batchStar===true && this.hiddenButton===true)">停&nbsp;&nbsp;用</wn-button>
                                        <wn-button type="warning"  @click="packageBatchSets(1)" :disabled="this.sels.length===0|| (this.batchStar===false && this.hiddenButton===true)">启&nbsp;&nbsp;用</wn-button>

                                </wn-col>
                            </wn-row>
                            <wn-row >
                                <!--第二行-->
                                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                                    <wn-form-item label="状态审批" prop="change">
                                        <wn-select v-model="packageForm.stateOfApproval" placeholder="请选择">
                                          <wn-option v-for="item in select.spzt" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                                        </wn-select>
                                    </wn-form-item>
                                </wn-col>
                                <wn-col  :xs="24"  :sm="12" :md="8" :lg="4">
                                    <wn-form-item label="审批人" >
                                        <wn-input type="text"  v-model="packageForm.approver" ></wn-input>
                                    </wn-form-item>
                                </wn-col>
                                <wn-col  :xs="24" :sm="12" :md="8" :lg="4">
                                    <wn-form-item label="状态" prop="change">
                                        <wn-select v-model="packageForm.status" placeholder="请选择">
                                          <wn-option v-for="item in select.zt" :key="item.value" :value="item.value" :label="item.label"></wn-option>
                                        </wn-select>
                                    </wn-form-item>
                                </wn-col>
                                <wn-col  :xs="24"  :sm="24" :md="8" :lg="12" style="text-align: right;margin-bottom: 10px;">

                                  <wn-button type="warning" @click="resetForm('packageForm')">重&nbsp;&nbsp;置</wn-button>
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
                            <wn-table-column type="selection" width="55" header-align="center" align="center">
                            </wn-table-column>
                            <wn-table-column prop="name" label="名称" width="100" header-align="center" align="center">
                            </wn-table-column>
                            <wn-table-column prop="searchCode" label="检索码"  width="100"  header-align="center" align="center" >
                            </wn-table-column>
                            <wn-table-column prop="packageType" :formatter="formatPackageType" label="服务包类型" width="100" header-align="center" align="center">
                            </wn-table-column>
                            <wn-table-column prop="suitablePopulation" :formatter="formatSuitablePopulation" label="适宜人群" width="100" header-align="center" align="center">
                            </wn-table-column>
                            <wn-table-column prop="totalPrice" label="参考价格（元）" min-width="100" header-align="center" align="center">
                            </wn-table-column>
                            <wn-table-column prop="stateOfApproval" :formatter="formatStateOfApproval" label="审批状态"  min-width="100" header-align="center" align="center">
                            </wn-table-column>
                            <wn-table-column prop="approver" label="审批人" min-width="100" header-align="center" align="center">
                            </wn-table-column>
                            <wn-table-column prop="status" label="状态" :formatter="formatStatus"  min-width="100" header-align="center" align="center">
                            </wn-table-column>
                            <wn-table-column  label="操作" width="160" header-align="center" align="center">
                                <template slot-scope="scope">
                                    <i class="iconfont icon-xg" style="cursor:pointer" v-show="scope.row.stateOfApproval == '2' ? false : true" @click="handleEdit(scope.$index, scope.row)" title="修改"></i>
                                    <i class="iconfont icon-ty" style="cursor:pointer" v-show="scope.row.status == '1' ? true: false" @click="handleStop(scope.$index, scope.row)" title="停用"></i>
                                    <i class="iconfont icon-qy" style="cursor:pointer" v-show="scope.row.status == '2' ? true : false" @click="handleStart(scope.$index, scope.row)" title="启用"></i>
                                    <i class="iconfont icon-sp" style="cursor:pointer" v-show="showShenhe(scope.row.status,scope.row.stateOfApproval)"@click="handleCheck(scope.$index, scope.row)" title="审批"></i>
                                </template>
                            </wn-table-column>
                        </wn-table>
                        <!--分页功能-->
                        <wn-col :span="24" class="toolbar">
                            <wn-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="12" :total="total" >
                            </wn-pagination>
                        </wn-col>
                    </div>
                </div>
            </wn-col>
        </wn-row>
        <!--新建服务包模态框视图-->
        <wn-dialog title="服 务 包 信 息" v-model="addFormVisible"  :close-on-click-modal="false"  top="5%" size="large" :before-close="beforAddCancel">

            <div class="box" style="margin-bottom: 15px">
                <div class="box-content" style="padding-bottom: 0">
                    <wn-form  :model="addForm"  ref="addForm" :rules="rules2" label-width="100px" class="demo-ruleForm wnform">
                        <wn-row >
                            <wn-col  :xs="24"  :sm="12" :md="8" >
                                <wn-form-item label="名称" prop="name">
                                    <wn-input type="text"  v-model="addForm.name" @change="jsmComplete(addForm)"  ></wn-input>
                                </wn-form-item>
                            </wn-col>

                            <wn-col  :xs="24" :sm="12" :md="8" >
                                <wn-form-item label="服务包类型" prop="packageType">
                                    <wn-select v-model="addForm.packageType" placeholder="请选择">
                                        <wn-option label="基础包" value="1"></wn-option>
                                        <wn-option label="自建包" value="2"></wn-option>
                                        <wn-option label="个性包" value="3"></wn-option>
                                    </wn-select>
                                </wn-form-item>
                            </wn-col>
                            <wn-col  :xs="24"  :sm="12" :md="8" >
                                <wn-form-item label="检索编码"  prop="searchCode">
                                    <wn-input type="text"  v-model="addForm.searchCode" placeholder="默认为名称首写字母"></wn-input>
                                </wn-form-item>
                            </wn-col>
                          </wn-row>
                          <wn-row >
                            <wn-col  :xs="24" :sm="12" :md="8" >
                                <wn-form-item label="适宜人群" prop="suitablePopulation">
                                    <wn-select v-model="addForm.suitablePopulation" placeholder="请选择">
                                        <wn-option label="健康" value="1"></wn-option>
                                        <wn-option label="高血压" value="2"></wn-option>
                                        <wn-option label="糖尿病" value="3"></wn-option>
                                        <wn-option label="冠心病" value="4"></wn-option>
                                        <wn-option label="脑卒中" value="5"></wn-option>
                                    </wn-select>
                                </wn-form-item>
                            </wn-col>
                            <wn-col  :xs="24" :sm="12" :md="8" >
                                <wn-form-item label="状态" >
                                    <wn-radio class="radio" v-model="addForm.status" label="1">启用</wn-radio>
                                    <wn-radio  class="radio" v-model="addForm.status" label="2">停用</wn-radio>
                                </wn-form-item>
                            </wn-col>
                          </wn-row>
                          <wn-row>
                            <wn-col  :xs="24"  >
                                    <wn-form-item label="简介" prop="description">
                                        <wn-input type="textarea" v-model="addForm.description"></wn-input>
                                    </wn-form-item>
                            </wn-col>
                        </wn-row>
                    </wn-form>
                </div>
            </div>
            <div class="box" style="margin-bottom: 15px">
                <div class="box-header" style="margin-top: 10px">
                    <div class="box-name">
                        <span>协议项目：</span>

                      <wn-autocomplete
                        popper-class="my-autocomplete"
                        v-model="state3"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect">
                        <!--<i-->
                        <!--class="el-icon-edit el-input__icon"-->
                        <!--slot="suffix"-->
                        <!--@click="handleIconClick">-->
                        <!--</i>-->
                        <!--<template slot-scope="props">-->
                        <!--<div class="name">{{ props.item.value }}</div>-->
                        <!--<span class="addr">{{ props.item.address }}</span>-->
                        <!--</template>-->
                      </wn-autocomplete>
                    </div>
                </div>
                <div class="box-content" style="padding-bottom: 0;padding-top: 10px">
                    <wn-table
                            :data="tableData"
                            style="width: 100%" :row-class-name="tableRowClassName">
                        <wn-table-column
                                prop="name"
                                label="项目名称"
                                width="180" header-align="center" align="center">
                        </wn-table-column>
                        <wn-table-column
                                prop="itemType"
                                label="适宜人群"
                                :formatter="formatrenqun" width="180" header-align="center" align="center">
                        </wn-table-column>
                        <wn-table-column label="操作" header-align="center" align="center">
                          <template scope="scope">
                            <i class="iconfont icon-delete"  @click="handleDelte(scope.$index, scope.row)" title="删除"></i>
                        </template>
                        </wn-table-column>
                    </wn-table>
                </div>
                <div class="box-footer clearfix">
                  <!--<wn-form  class="demo-ruleForm wnform">-->
                    <!--<wn-row>-->
                      <!--<wn-col  :xs="24"  :sm="12" :md="8" >-->
                        <!--<wn-form-item label="参考金额" prop="totalPrice">-->
                          <!--<wn-input type="text"  v-model="addForm.totalPrice" ></wn-input>-->
                        <!--</wn-form-item>-->
                      <!--</wn-col>-->
                      <!--<wn-col  :xs="24"  :sm="12" :md="8" >-->
                        <!--<wn-form-item label="补足金额" prop="subsidyPrice">-->
                          <!--<wn-input type="text"  v-model="addForm.subsidyPrice" ></wn-input>-->
                        <!--</wn-form-item>-->
                      <!--</wn-col>-->
                    <!--</wn-row>-->
                  <!--</wn-form>-->

                    <label class="el-form-item__label" style="width: 100px;">参考金额</label>

                    <wn-input v-model="addForm.totalPrice" :readOnly="true"  style="width: 217px;float: left" placeholder="自动根据项目对应服务价" ></wn-input>

                    <label class="el-form-item__label" style="width: 100px;">补足金额</label>


                    <wn-input v-model="addForm.subsidyPrice" prop="subsidyPrice"   @change="getActualPrice" style="width: 217px;float: left"></wn-input>
                </div>
            </div>


            <!--<div class="box" style="margin-bottom: 0">-->
                <!--<div class="box-header" style="margin-top: 10px">-->
                    <!--<div class="box-name">-->
                        <!--<span>审批信息</span>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="box-content"  style="padding-top: 0">-->
                    <!--<wn-table-->
                            <!--:data="tableData1"-->
                            <!--style="width: 100%" :row-class-name="tableRowClassName">-->
                        <!--<wn-table-column-->
                                <!--prop="czr"-->
                                <!--label="操作人"-->
                                <!--width="180" header-align="center" align="center">-->
                        <!--</wn-table-column>-->
                        <!--<wn-table-column-->
                                <!--prop="spzt"-->
                                <!--label="审批状态"-->
                                <!--width="180" header-align="center" align="center">-->
                        <!--</wn-table-column>-->
                      <!--<wn-table-column-->
                        <!--prop="spsj"-->
                        <!--label="审批时间"-->
                        <!--width="180" header-align="center" align="center">-->
                      <!--</wn-table-column>-->
                        <!--<wn-table-column-->
                                <!--prop="bz"-->
                                <!--label="备注" header-align="center" align="center">-->
                        <!--</wn-table-column>-->
                    <!--</wn-table>-->
                <!--</div>-->
            <!--</div>-->
            <div slot="footer" class="dialog-footer">
                <wn-button type="warning" @click.native="addSubmit" :loading="addLoading">保存并提交</wn-button>
                <wn-button type="warning"  @click.native="cancelForm('addForm')">取消</wn-button>

            </div>
        </wn-dialog>


        <!--表格修改功能视图-->
        <wn-dialog title="编辑"  :close-on-click-modal="false" v-model="editFormVisible"  :before-close="beforEditCancel">
          <div class="box" style="margin-bottom: 15px">
            <div class="box-content" style="padding-bottom: 0">
              <wn-form  :model="editForm"  ref="editForm" label-width="100px" class="demo-ruleForm wnform">
                <wn-row >
                  <wn-col  :xs="24"  :sm="12" :md="8" >
                    <wn-form-item label="名称" prop="name">
                      <wn-input type="text"  v-model="editForm.name" @change="jsmComplete(editForm)" ></wn-input>
                    </wn-form-item>
                  </wn-col>

                  <wn-col  :xs="24" :sm="12" :md="8" >
                    <wn-form-item label="服务包类型" prop="packageType">
                      <wn-select v-model="editForm.packageType" placeholder="请选择">
                        <wn-option label="基础包" value="1"></wn-option>
                        <wn-option label="自建包" value="2"></wn-option>
                        <wn-option label="个性包" value="3"></wn-option>
                      </wn-select>
                    </wn-form-item>
                  </wn-col>
                  <wn-col  :xs="24"  :sm="12" :md="8" >
                    <wn-form-item label="检索编码"  prop="searchCode">
                      <wn-input type="text"  v-model="editForm.searchCode" placeholder="默认为名称首写字母"></wn-input>
                    </wn-form-item>
                  </wn-col>
                </wn-row>
                <wn-row >
                  <wn-col  :xs="24" :sm="12" :md="8" >
                    <wn-form-item label="适宜人群" prop="change">
                      <wn-select v-model="editForm.suitablePopulation" placeholder="请选择">
                        <wn-option label="健康" value="1"></wn-option>
                        <wn-option label="高血压" value="2"></wn-option>
                        <wn-option label="糖尿病" value="3"></wn-option>
                        <wn-option label="冠心病" value="4"></wn-option>
                        <wn-option label="脑卒中" value="5"></wn-option>
                      </wn-select>
                    </wn-form-item>
                  </wn-col>
                  <wn-col  :xs="24" :sm="12" :md="8" >
                    <wn-form-item label="状态" >
                      <wn-radio class="radio" v-model="editForm.status" label="1">启用</wn-radio>
                      <wn-radio  class="radio" v-model="editForm.status" label="2">停用</wn-radio>
                    </wn-form-item>
                  </wn-col>
                </wn-row>
                <wn-row>
                  <wn-col  :xs="24"  >
                    <wn-form-item label="简介">
                      <wn-input type="textarea" v-model="editForm.description"></wn-input>
                    </wn-form-item>
                  </wn-col>
                </wn-row>
              </wn-form>
            </div>
          </div>
          <div class="box" style="margin-bottom: 15px">
            <div class="box-header" style="margin-top: 10px">
              <div class="box-name">
                <span>协议项目：</span>
                <wn-autocomplete
                  popper-class="my-autocomplete"
                  v-model="state3"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  @select="handleSelect">
                  <!--<i-->
                  <!--class="el-icon-edit el-input__icon"-->
                  <!--slot="suffix"-->
                  <!--@click="handleIconClick">-->
                  <!--</i>-->
                  <!--<template slot-scope="props">-->
                  <!--<div class="name">{{ props.item.value }}</div>-->
                  <!--<span class="addr">{{ props.item.address }}</span>-->
                  <!--</template>-->
                </wn-autocomplete>
              </div>
            </div>
            <div class="box-content" style="padding-bottom: 0;padding-top: 10px">
              <wn-table
                :data="tableData"
                style="width: 100%" :row-class-name="tableRowClassName">
                <wn-table-column
                  prop="name"
                  label="项目名称"
                  width="180" header-align="center" align="center">
                </wn-table-column>
                <wn-table-column
                  prop="itemType"
                  label="适宜人群"
                  :formatter="formatrenqun" width="180" header-align="center" align="center">
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

              <wn-input v-model="editForm.totalPrice"  style="width: 217px;float: left" placeholder="自动根据项目对应服务价" ></wn-input>

              <label class="el-form-item__label" style="width: 100px;">补足金额</label>

              <wn-input v-model="editForm.subsidyPrice"  style="width: 217px;float: left"></wn-input>
            </div>
          </div>

          <div class="box-content" style="padding-bottom: 0;padding-top: 10px">
            <wn-table
              :data="verifyData"
              style="width: 100%" :row-class-name="tableRowClassName">
              <wn-table-column
                prop="operator"
                label="审核人"
                width="180" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column
                prop="verifyState"
                label="审核状态"
                width="180" :formatter="formatVerify" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column
                prop="dateCreated"
                label="审核时间"
                width="180" header-align="center" align="center">
              </wn-table-column>
              <wn-table-column
                prop="note"
                label="备注"
                width="180" header-align="center" align="center">
              </wn-table-column>

            </wn-table>
          </div>

          <!--<div class="box" style="margin-bottom: 0">-->
          <!--<div class="box-header" style="margin-top: 10px">-->
          <!--<div class="box-name">-->
          <!--<span>审批信息</span>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="box-content"  style="padding-top: 0">-->
          <!--<wn-table-->
          <!--:data="tableData1"-->
          <!--style="width: 100%" :row-class-name="tableRowClassName">-->
          <!--<wn-table-column-->
          <!--prop="czr"-->
          <!--label="操作人"-->
          <!--width="180" header-align="center" align="center">-->
          <!--</wn-table-column>-->
          <!--<wn-table-column-->
          <!--prop="spzt"-->
          <!--label="审批状态"-->
          <!--width="180" header-align="center" align="center">-->
          <!--</wn-table-column>-->
          <!--<wn-table-column-->
          <!--prop="spsj"-->
          <!--label="审批时间"-->
          <!--width="180" header-align="center" align="center">-->
          <!--</wn-table-column>-->
          <!--<wn-table-column-->
          <!--prop="bz"-->
          <!--label="备注" header-align="center" align="center">-->
          <!--</wn-table-column>-->
          <!--</wn-table>-->
          <!--</div>-->
          <!--</div>-->
          <div slot="footer" class="dialog-footer">
            <wn-button type="warning" @click.native="editSubmit" :loading="addLoading">保存</wn-button>
            <wn-button type="warning"  @click.native="cancelForm('editForm')">取消</wn-button>
          </div>
        </wn-dialog>


      <wn-dialog title="服 务 包 审 核 信 息" v-model="verifyFormVisible" :close-on-click-modal="false" top="5%" size="large" >
        <div class="box" style="margin-bottom: 15px">
          <div class="box-content" style="padding-bottom: 0">
            <wn-form  :model="verifyForm"  ref="verifyForm"  label-width="100px" class="demo-ruleForm wnform">
              <wn-row >
                <wn-col  :xs="24"  :sm="12" :md="8" >
                  <wn-form-item label="操作人姓名" prop="operator">
                    <wn-input type="text"  v-model="verifyForm.operator" ></wn-input>
                  </wn-form-item>
                </wn-col>

                <wn-col  :xs="24" :sm="12" :md="8" >
                  <wn-form-item label="审核状态" prop="verifyState">
                    <wn-select v-model="verifyForm.verifyState" placeholder="请选择">
                      <wn-option label="通过" value="2"></wn-option>
                      <wn-option label="拒绝" value="3"></wn-option>
                    </wn-select>
                  </wn-form-item>
                </wn-col>
              </wn-row>
              <wn-row>
                <wn-col  :xs="24"  >
                  <wn-form-item label="备注" prop="note">
                    <wn-input type="textarea" v-model="verifyForm.note"></wn-input>
                  </wn-form-item>
                </wn-col>
              </wn-row>
            </wn-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <wn-button type="warning" @click.native="verifySubmit" :loading="addLoading">保存并提交</wn-button>
          <wn-button type="warning"  @click.native="verifyFormVisible=false">取消</wn-button>
        </div>
      </wn-dialog>

    </section>
</template>
<script type="text/javascript">
    import util from '../../common/js/util';
    import hypy from "../../common/js/hypy";
    import NProgress from 'nprogress'
    import { getUserListPage,searchPackageList,packageUpdateState,verifyPackage, getItemList,editPackage,addPackage,removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
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
                var checkPackage = (rule, value, callback) =>{
                  alert(value);
                  if(!value || value==''){
                    return callback(new Error('服务包类型不能为空'));
                  }
                };
                return {
                    listLoading: false,
                    page: 1,
                    users:[],//用户
                    sels: [],//列表选中列
                    total: 0,
                    batchStar:'',
                    hiddenButton: false,
//                  查询表单的select的option列表
                  select:{
                    fwblx:[{value:'1',label:'基本包'},{value:'2',label:'自建包'},{value:'3',label:'个性包'}],
                    syrq:[{value:'1',label:'健康'},{value:'2',label:'高血压'},{value:'3',label:'糖尿病'},{value:'4',label:'冠心病'},{value:'5',label:'脑卒中'}],
                    spzt:[{value:'1',label:'审批中'},{value:'2',label:'通过'},{value:'3',label:'未通过'},],
                    zt:[{value:'1',label:'启用'},{value:'2',label:'停用'}]
                  },
//                    服务包表单
                  packageForm: {
                        name: '',
                        searchCode:'',
                        packageType:'',
                        suitablePopulation:'',
                        stateOfApproval:'',
                        approver:'',
                        status:'',
                    },
                    rules2: {
                        name: [
                            { required: true,message: '请输入服务包名称',trigger: 'blur'}
                        ],
                        packageType: [
                          { required: true, message: '请输入服务包类型', trigger: 'change'  }
                        ],
                      suitablePopulation: [
                        { required: true, message: '请选择适用人群', trigger: 'change'}
                      ],
                      description: [
                        {required: true, message: '请输入简介', trigger: 'blur'}
                      ],
                      subsidyPrice: [
                        {required: true, message: '请输入补足金额', trigger: 'blur'}
                      ]
                    },
//                  模态框数据开始
                    addFormVisible:false,
//                    新增界面表单
                    addForm: {
                        name: 'test'
                    },
                    addLoading:false,
                    input:'',
                    tableData: [],
                  verifyData: [],
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

                    },
                  verifyFormVisible:false,
                  verifyForm:{

                  },
//                    提交加载动画
                    editLoading:false,
                  restaurants: [],
                  state3: '',
                  arr:[],
                  itemCodeList:[]
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
          this.searchUsers('packageForm',1);
       },
      jsmComplete(jsmName) {
        jsmName.searchCode = hypy.getSearchCode(jsmName.name).toUpperCase();
        // this.$refs.jsmRef.disabled = true;
      },
//      查询功能
      searchUsers(formName,pageValue,currentPage) {
        if(currentPage == undefined || currentPage == ''){
          currentPage = 1;
        }
        let page = pageValue;
        this.page = pageValue;
        this.currentPage = currentPage;
        this.packageForm.start=(page-1)*12;
        this.packageForm.limit=12;
        this.packageForm.dir='DESC';
        this.packageForm.sort='id';
        var packageData=JSON.stringify(this.packageForm);
        this.listLoading = true;
        console.log(packageData);
        searchPackageList(packageData).then((res)  => {
          console.log(res.data);
          this.users = res.data.content;
          this.total = res.data.totalElements;
          this.page = res.data.totalPages;
          this.listLoading = false;
        });
      },
//      新建表单提交
      addSubmit:function(){
        this.$refs.addForm.validate((valid) => {
          if (valid) {
          this.$confirm('确认提交？','提交',{}).then(()=>{

              this.addLoading=true;
              this.addForm.itemList=this.tableData;
              let para=Object.assign({},this.addForm);
              addPackage(para).then((res)=>{
                this.addLoading=false;
                let msg =  res.data.message;
                let suc = res.data.success;
                let type = 'false';
                if(suc == true) {
                  type = 'success';
                  this.tableData=[];
                  this.addFormVisible=false;
                  this.getUsers();
                } else{
                  type = 'error';
                }
                var _this = this;
                this.$message({
                  showClose: true,
                  message: msg,
                  type: type

                });

              });

          });
          }
        });

      },

      verifySubmit:function (index,row) {
        this.$confirm('确认提交？','提交',{}).then(()=>{

          this.addLoading=true;
          let para=Object.assign({},this.verifyForm);
          verifyPackage(para).then((res)=>{
            this.addLoading=false;
            let msg =  res.data.message;
            let suc = res.data.success;
            let type = 'false';
            if(suc == true) {
              type = 'success';
              this.verifyFormVisible=false;
              this.getUsers();
            } else{
              type = 'error';
            }
            var _this = this;
            this.$message({
              showClose: true,
              message: msg,
              type: type

            });

          });

        });
      },

      handleStop:function(index,row){
        this.$confirm('确认将当前状态停用？','提交',{}).then(()=>{
          let para={
            ids :this.users[index].id,
            states:'2'
          };
          packageUpdateState(para).then((res)=>{
            this.addLoading=false;
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
              duration:1000,
              showClose: true,
              message: msg,
              type: type,
              onClose: function () {
                if(suc == true){
                  // _this.$refs['addForm'].resetFields();
                  // getDoctor(JSON.stringify(_this.addForm));
                  _this.editFormVisible=false;
                  _this.searchUsers('packageForm',1,1);
                }
              }
            });
          });
          // this.getDoctors();
        })
      },
      handleStart:function(index,row){
        this.$confirm('确认将当前状态启用？','提交',{}).then(()=>{
          let para={
            ids :this.users[index].id,
            states:'1'
          };
          packageUpdateState(para).then((res)=>{
            this.addLoading=false;
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
              duration:1000,
              showClose: true,
              message: msg,
              type: type,
              onClose: function () {
                if(suc == true){
                  // _this.$refs['addForm'].resetFields();
                  // getDoctor(JSON.stringify(_this.addForm));
                  _this.editFormVisible=false;
                  _this.searchUsers('packageForm',1,1);
                }
              }
            });
          });
        })
      },
      handleCheck:function (index,row) {
        this.verifyFormVisible=true;
        this.verifyForm={
          operator:'系统默认用户',
          relationCode:row.packageCode
        };
      },
      beforAddCancel:function () {
        this.tableData=[];
        this.addFormVisible=false;
      },
      beforEditCancel:function () {
        this.tableData=[];
        this.editFormVisible=false;
      },
      showShenhe: function (status,stateOfApproval) {

        if (status=='2'){
          return false;
        }
        if (stateOfApproval!='1'){
          return false;
        }
        return true;
      },

      packageBatchSets: function (batchzt) {
        var currPage =  this.currentPage ;
        console.log(currPage);
        var ids = this.sels.map(item => item.id).toString();
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
          packageUpdateState(para).then((res) => {
            this.listLoading = false;
            NProgress.done();
            let msg =  res.data.message;
            let suc = res.data.success;
            let cpg = res.data.result.currentPage;
            let type = 'false';
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
                  // _this.$refs['addForm'].resetFields();
                  // getDoctor(JSON.stringify(_this.addForm));
                  _this.editFormVisible=false;
                  _this.searchUsers('packageForm',cpg,cpg);
                }
              }
            });
          });
        }).catch(() => {
          NProgress.done();
          this.$message({
            message: '提交超时',
            type: 'false'
          });
        });
      },

//      表单重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.packageForm={
          name: '',
          searchCode:'',
          packageType:'',
          suitablePopulation:'',
          stateOfApproval:'',
          approver:'',
          status:''
        };
      },
//    换页
    handleCurrentChange(val) {
        this.page = val;
        this.searchUsers('packageForm',val,val);
    },
    selectAll : function (seles) {
      this.sels = seles;
    },
//    选中状态切换
    selsChange: function (seles) {
        this.sels = seles;
        console.info(seles);
        if(seles != undefined && seles.length==1){
          this.hiddenButton = false;
          if(seles[0].states=='1'){//已启用状态，可停用
            this.batchStar=false;
            this.hiddenButton = true;
            // this.selectable(row,this.sele[0]);
          }
          else{
            //已停用状态，可启用
            this.batchStar=true
            this.hiddenButton = true;
            //  this.selectable(row,this.sele[0]);
          }
        }else{
          this.hiddenButton = false;
        }
    },
//状态显示
      formatStatus: function(row, column){
        let status="启用";
        if(row.status!='1'){
          status="停用";
        }
        return status;
      },
      //
      formatSuitablePopulation: function (row,column) {
        let sp="健康";
        if (row.suitablePopulation=='2'){
          sp="高血压";
        }
        if (row.suitablePopulation=='3'){
          sp="糖尿病";
        }
        if (row.suitablePopulation=='4'){
          sp="冠心病";
        }
        if (row.suitablePopulation=='5'){
          sp="脑卒中";
        }
        return sp;
      },
      formatPackageType: function (row,column) {

        let pt="基本包";
        if (row.packageType=='2'){
          pt="自建包";
        }
        if (row.packageType=='3'){
          pt="个性包";
        }
        return pt
      },
      formatStateOfApproval:function (row,column) {
        let sa="审核中";
        if (row.stateOfApproval=='2'){
          sa="通过";
        }
        if (row.stateOfApproval=='3'){
          sa="未通过";
        }
        return sa;
      },
      formatVerify:function (row,column) {
        let ver="申请审批";
        if (row.verifyState=='2'){
          ver="通过审批";
        }
        if (row.verifyState=='3'){
          ver="拒绝审批";
        }
        return ver;
      },
      formatrenqun:function (row,column) {

        if(row.itemType=="0"){
          return "健康"
        }
        if(row.itemType=="1"){
          return "慢病"
        }
        if(row.itemType=="2"){
          return "老年人"
        }
      },
    //显示新建界面
    handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {

            dateCreated:'2018-03-15',
            totalPrice:'10',

            approver:'系统默认用户',
            stateOfApproval:'1',
            status:'1'
        };
    },
    //显示编辑界面
    handleEdit: function (index, row) {
        this.editFormVisible = true;
//        ES6深层拷贝当前行数据赋值给editfrom
        this.editForm = Object.assign({}, row);
        console.info(this.editForm.itemList);
        this.tableData=Array.from(this.editForm.itemList);
        this.verifyData=Array.from(this.editForm.verifyRecordList);
    },
//    编辑界面提交编辑
    editSubmit:function(){
      this.$refs.editForm.validate((valid)=>{
        if(valid){
        this.$confirm('确认提交？','提交',{}).then(()=>{
          this.editLoading=true;
          this.editForm.itemList=this.tableData;
        let para=Object.assign({},this.editForm);
        console.info("这是修改"+this.editForm);
          editPackage(para).then((res)=>{
            this.editLoading=false;
            let suc = res.data.success;
            let type = 'false';
            if(suc == true) {
              type = 'success';
            } else{
              type = 'false';
            }
            this.$message({
              message:res.data.message,
              type:type
            });
            this.$refs['editForm'].resetFields();
            this.editFormVisible=false;
            this.searchUsers();


          });
        });
      }
      });
    },
      getActualPrice:function () {

        this.addForm.actualPrice=this.addForm.totalPrice-this.addForm.subsidyPrice;
        console.info(this.addForm.actualPrice);
      },

      loadAll() {
        let para = {
          name:'zz'
        };
//      this.listLoading = true;

        getItemList(para).then((res)  => {
          this.arr = Array.from(res.data);
        });
      },
      querySearch(queryString, cb) {

        var restaurants = this.arr;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

      handleSelect(selected) {
        console.log("handleSelect"+selected);
        console.info(selected);
        this.tableData.push(selected);
      },
      handleIconClick(ev) {
        console.log("handleIconClick");
        console.log(ev);
      },
      handleDelte(asd,bcc){
        this.tableData.splice(asd,1);
        console.info(this.tableData);
      },

      cancelForm(formName){
        if(formName=='addForm'){
            this.addFormVisible=false;
        }
        if(formName=='editForm'){
            this.editFormVisible=false;
        }
        this.tableData=[];
      }


    },

    mounted(){//dom加载完毕，渲染数据初始化
        this.getUsers();
        this.restaurants=this.loadAll();

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
