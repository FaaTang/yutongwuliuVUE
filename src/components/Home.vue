
<template>
  <div>
    <el-container>
      <el-header style="background-color: #c9c9c9;display: flex;justify-content: space-between;align-items: center;">
        <div style="font-family: 华文行楷;font-size: 30px;">
          粤通物流管理系统
        </div>
        <div>
          <el-dropdown style="cursor: pointer;" @command="command">
  <span class="el-dropdown-link">
    {{user.username}},{{user.role.rolename}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="setting">设置</el-dropdown-item>
              <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
              <el-dropdown-item command="relogin" divided>重新登录</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :unique-opened="true" router>
            <el-submenu :index="index+''" v-for="(item,index) in this.$router.options.routes" :key="index"
                        v-if="!item.hidden && item.meta.role.indexOf(user.role.rolename)!=-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">{{child.name}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator="/" v-if="this.$router.currentRoute.path!='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">{{this.$router.currentRoute.name}}</a></el-breadcrumb-item>
          </el-breadcrumb>
          <div style="font-size: 40px;font-family: 华文仿宋;color: #000000;text-align: center"  v-if="this.$router.currentRoute.path=='/home'">
            欢迎使用粤通物流管理系统！
          </div>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    <div>
      <ModelLogin v-if="loginagain"></ModelLogin>
    </div>
  </div>
</template>

<script>
  import ModelLogin from '@/components/ModelLogin.vue'
  import Login from '@/components/Login.vue'
  export default {
    name: "Home",
    data() {
      return {
        loginagain:false,
        user: JSON.parse(window.sessionStorage.getItem("user"))
      }
    },
    methods: {
      command(cmd) {
        if('relogin'==cmd){
          this.$confirm('确认注销并重新登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loginagain=true;
            let item = window.sessionStorage.clear();
            this.$message({
              type: 'success',
              message: '注销成功,请重新登录!'
            });
          })

        }
        if ("usercenter"==cmd){
        }
      },
      again(){


      },
      logOFF(){
        //this.deleteRequest("/logoff").then(resp=>{
        this.$confirm('确认退出并返回到登录页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.replace("/")
          let item = window.sessionStorage.clear();
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        })/*.catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });*/

        //})
      }
    },
    components:{
      'ModelLogin':ModelLogin,
    }
  }
</script>

<style scoped>

</style>
