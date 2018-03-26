<template>
  <wn-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <wn-form-item prop="account" style="position: relative">
        <i class="el-icon-edit" style="position: absolute;top: 7px;"></i>
        <wn-input type="text" size="large" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"  style="width: 94%;float: right"></wn-input>
    </wn-form-item>
    <wn-form-item prop="checkPass">
        <i class="el-icon-edit" style="position: absolute;top: 7px;"></i>
      <wn-input type="password" size="large" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"  style="width: 94%;float: right"></wn-input>
    </wn-form-item>
    <wn-checkbox v-model="checked" checked class="remember">记住密码</wn-checkbox>
    <!--<wn-button @click.native.prevent="handleReset2">重置</wn-button>-->
    <wn-form-item style="width:100%;">
      <wn-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2"  size="large"  :loading="logining">登录</wn-button>
    </wn-form-item>
  </wn-form>
</template>

<script>
  import { requestLogin } from '../api/api';
//  import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
//      handleReset2() {
//        this.$refs.ruleForm2.resetFields();
//      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
              if (valid) {
                //_this.$router.replace('/table');
                this.logining = true;
                //NProgress.start();
                var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
                    requestLogin(loginParams).then(data => {
                  console.log(data)
                      this.logining = false;
                      //NProgress.done();
                      let { msg, code, user } = data;
                          if (code !== 200) {
                            this.$message({
                              message: msg,
                              type: 'error'
                            });
                          } else {
                            sessionStorage.setItem('user', JSON.stringify(user));
                            this.$router.push({ path: '/main' });
                          }
                    });
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
        });
      }
//      handele2结束
    }
//  medth结束
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    /*margin: 180px auto;*/
    position: absolute;
    right: 5%;
   top: 40%;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>