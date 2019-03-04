<template>
  <div style="display: flex;justify-content: center;margin-top: 150px">
    <el-card class="box-card" style="width: 350px;" shadow="always">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <table>
        <tr>
          <td> 账号：</td>
          <td><el-input v-model="user.account" placeholder="请输入账号"></el-input></td>
        </tr>
        <tr>
          <td>密码：</td>
          <td><el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input></td>
        </tr>
        <tr>
          <td colspan="2">
            <el-button type="primary" @keyup.native.enter="doLogin" @click="doLogin" style="width: 300px"v-loading="loading">登录</el-button>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-button type="info" @click="registerUser" style="width: 300px">注册</el-button>
          </td>
        </tr>
      </table>

      <div>
        <el-dialog
          title="注册新用户"
          :visible.sync="registerdialog"
          width="50%">
          <div>
            <el-form :model="user" status-icon :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
              <el-form-item label="昵称" prop="username">
                <el-input v-model="user.username" autocomplete="on"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="username">
                <el-radio-group v-model="user.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="账号" prop="account">
                <el-input v-model="user.account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkpass">
                <el-input type="password" v-model="user.checkpass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model.number="user.phone" autocomplete="on"></el-input>
              </el-form-item>
              <el-form-item label="邮箱地址" prop="email">
                <el-input type="email" v-model="user.email" autocomplete="on"></el-input>
              </el-form-item>
              <el-form-item label="所属部门" prop="fkRoleid">
                <el-select v-model="user.fkRoleid" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addUser('user')">提交</el-button>
                <el-button @click="resetForm('user')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>

  export default {
  name: 'Login',
  data () {
    var validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入昵称'));
      }
      callback()
    };

    var validateAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入账号'));
      }
      callback()
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.user.checkpass !== '') {
          this.$refs.user.validateField('checkpass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      var phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    };
    var checkEmail = (rule, value, callback) => {
      var mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    };
      var validateRole = (rule, value, callback) => {

      if (!value) {
        callback(new Error('请选择一个部门'));
      }
        callback()
    };
    return {
      registerdialog:false,
      loading:false,
      loginA:true,
      user: {
        username:'',
        sex:null,
        account:'',
        password:'',
        checkpass:'',
        phone:'',
        email:'',
        fkRoleid:'',
        checktime:'',
        isdelete:'',
        altertime:''
      },
      rules: {
        username: [
          { validator: validateName, trigger: 'blur' }
        ],
        account: [
          { validator: validateAccount, trigger: 'blur' }
        ],
        password:[
          { validator: validatePass, trigger: 'blur' }
        ],
        checkpass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone:[
          { validator: checkPhone, trigger: 'blur' }
        ],
        fk_roleid:[
              { required: true, validator: validateRole, trigger: 'change' }
          ],
        email:[
          { validator: checkEmail, trigger: 'blur'}
        ]
      },
      options: [{
        value: '1',
        label: '承运部'
      }, {
        value: '2',
        label: '调度部'
      }, {
        value: '3',
        label: '财务人员'
      }, {
        value: '4',
        label: '运输管理员'
      }, {
        value: '5',
        label: '系统管理员'
      }],
      value: ''
    }
  },
    created(){

      this.keyupSubmit()
    },
  methods: {
    keyupSubmit(){
      document.onkeydown=e=>{
        let _key=window.event.keyCode;
        if(_key===13){
          this.doLogin()
        }
      }
    },
    doLogin () {
      this.loading=true;
      this.postRequest("/doLogin",this.user).then(data=>{
        if (data){
          window.sessionStorage.setItem("user",JSON.stringify(data.obj));
          this.loading=false;
          this.$router.replace("/home");
        }
        this.loading=false;
      })
    },
    registerUser(){
      this.registerdialog=true
    },
    addUser(formName){
      this.$refs[formName].validate((valid) => {
        console.log(this.user)
        if (valid) {
          this.postRequest("/register",this.user).then(data=>{
            this.registerdialog=false

          })
        } else {
          alert('请按规则填写表单!!');
          return false;
        }
      });

    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
