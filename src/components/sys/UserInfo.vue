<template>
  <div>
    <div></div>
    <div>
      <div>
        <div style="border:1px solid green;border-radius: 30px;width: 400px;height:550px;margin-top: 20px;margin-left: 35%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);">
          <el-form :model="users" status-icon label-width="100px" class="demo-ruleForm" style="margin-top: 0px;padding-top:60px;margin-right: 20px">
            <el-form-item label="昵称" prop="username">
              <el-input v-model="users.username" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="users.sex"  disabled>
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="账号" prop="account" >
              <el-input v-model="users.account" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model.number="users.phone" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" prop="email">
              <el-input type="email" v-model="users.email" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" prop="fkRoleid">
              <el-select v-model="user.role.rolename" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="addUser('user')" style="background-color: green;color: #ffffff;margin-left: 20%">修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "UserInfo",
      data(){
          return{
            loading: false,
            user:JSON.parse(window.sessionStorage.getItem("user")),
            users: {

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
      mounted() {
        this.initUser();
      },
      methods:{
        initUser() {
          this.getRequest("/user/userbyid/?userid="+this.user.userid).then(resp=>{
            if (resp) {
              this.users = resp;
            }
          })
        },
        addUser(formName) {
        /*  this.$refs[formName].validate((valid) => {
            if (valid) {*/

              this.putRequest("/user/updateUserById",this.users).then(resp=>{
                if (resp) {
                  this.initUser();
                }
              })
            /*} else {
              alert('请按规则填写表单!!');
              return false;
            }
          });*/

        }
      }
    }
</script>

<style scoped>

</style>
