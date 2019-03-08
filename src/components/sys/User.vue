<template>
    <div>
      <div></div>
      <div>
        <el-table
          ref="multipleTable"
          :data="userData"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            prop="userid"
            label="ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="account"
            label="账号">
          </el-table-column>
          <el-table-column
            label="性别">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.sex==1" style="color: rgba(0,155,103,0.61)">先生</el-tag>
              <el-tag v-else style="color: #ff96de">女士</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
          <el-table-column
            label="所属部门">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.fkRoleid==1" style="background-color: #c8c9cc;color: #ffffff" class="el-icon-star-on">承运部</el-tag>
              <el-tag v-else-if="scope.row.fkRoleid==2" style="background-color: #c8c9cc;color: #ffffff" class="el-icon-star-on">调度部</el-tag>
              <el-tag v-else-if="scope.row.fkRoleid==3" style="background-color: #c8c9cc;color: #ffffff" class="el-icon-star-on">财务部</el-tag>
              <el-tag v-else-if="scope.row.fkRoleid==4" style="background-color: #c8c9cc;color: #ffffff" class="el-icon-star-on">运输部</el-tag>
              <el-tag v-else-if="scope.row.fkRoleid==5" style="color: #009966" class="el-icon-star-on">超&nbsp;&nbsp;&nbsp;&nbsp;管</el-tag>
              <el-tag v-else type="info"  class="el-icon-warning">  未授权</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="checkintime"
            label="注册日期"
            width="120">

          </el-table-column>
          <el-table-column
            prop="remark"
            label="操作"
            width="200px"
          >
            <template slot-scope="scope">
              <el-button type="info" @click="authorizeUser(scope.row)" size="small" icon="el-icon-check" disabled v-if="scope.row.fkRoleid <=5">授权</el-button>
              <el-button type="info" @click="authorizeUser(scope.row)" size="small" icon="el-icon-check" v-else>授权</el-button>
              <el-button style="background-color: rgba(0,153,102,0.98);color: rgba(255,255,255,0.98)" @click="ShowUpdateView(scope.row)" size="small" icon="el-icon-edit">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection(userData)" class="el-icon-success" style="color: #009966">&nbsp;&nbsp;全选</el-button>
          <el-button @click="toggleSelection()" class="el-icon-error" >&nbsp;&nbsp;取消选择</el-button>
          <el-button @click="deleteById" class="el-icon-warning" style="color: #009966">&nbsp;&nbsp;删除已选</el-button>
          <el-button @click="authorizeUserBatch" class="el-icon-info" >&nbsp;&nbsp;全部授权</el-button>
        </div>
        <div>
          <el-pagination
            @current-change="currentChange"
            @size-change="sizeChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[25,50,75,100]"
            style="display: flex;justify-content: flex-end;margin-right: 10px"
            layout="sizes,prev,pager,next,jumper,->,total,slot"
            :total="total">
          </el-pagination>
        </div>
        <el-dialog
          title="修改用户信息"
          :visible.sync="dialogUser"
          width="30%">
          <table>
            <tr>
              <td>
                <el-tag>用户编号</el-tag>
              </td>
              <td>
                <el-input v-model="userDataOne.userid" :disabled="true"></el-input>
              </td>
              <!--<td>
                <el-tag>昵称</el-tag>
              </td>
              <td>
                <el-date-picker
                  v-model="truck.buydate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </td>-->
            </tr>
            <tr>
              <td>
                <el-tag>昵称</el-tag>
              </td>
              <td>
                <el-input v-model="userDataOne.username" ></el-input>
              </td>
              <td>
                <el-tag>性别</el-tag>
              </td>
              <td>
                <!--<el-input v-if="userDataOne.sex==1" :disabled="true">男</el-input>
                <el-input v-else :disabled="true">女</el-input>-->
                <el-radio-group v-model="userDataOne.sex" :disabled="true">
                  <el-radio :label="1">先生</el-radio>
                  <el-radio :label="0">女士</el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td>
                <el-tag>账号</el-tag>
              </td>
              <td>
                <el-input v-model="userDataOne.account" :disabled="true"></el-input>
              </td>
              <td>
                <el-tag>手机号码</el-tag>
              </td>
              <td>
                <el-input v-model="userDataOne.phone"></el-input>

              </td>
            </tr>
            <tr>
              <td>
                <el-tag>所属部门</el-tag>
              </td>
              <td>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
              <td>
                <el-tag>电子邮箱</el-tag>
              </td>
              <td>
                <el-input v-model="userDataOne.email"></el-input>
              </td>
            </tr>

          </table>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogUser = false">取 消</el-button>
    <el-button type="primary" @click="updateUser">确 定</el-button>
  </span>
        </el-dialog>

      </div>
    </div>
</template>

<script>
    export default {
        name: "User",
      data() {
        return {
          userDataOne: {
            userid:null,
            username:'',
            sex:null,
            account:'',
            password:'',
            phone:'',
            email:'',
            fkRoleid:null,
            ckeckintime:null,
            isdelete:-1,
            altertime:'',
            role:''
          },
          dialogUser: false,
          multipleSelection: [],
          userData:[],
          total:0,
          pageSize:25,
          currentPage:1,
          loading: true,
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
          //项目启动时自动执行
        this.initUserData();
      },
      methods: {
        authorizeUserBatch() {
          //一键全部授权
          this.getRequest("/user/authorizeUserBatch").then(resp=>{
            if (resp) {
              this.initUserData();
            }
          })
        },
        updateUser() {
          this.putRequest("/user/updateUser",this.userDataOne).then(resp=>{
            if (resp) {
              this.initUserData();
              this.dialogUser = false;
            }
          })
        },
        ShowUpdateView(row) {
          //更新方法
          this.userDataOne = row;
          this.dialogUser = true;
        },
        authorizeUser(row) {
          //单个授权方法
          this.putRequest("/user/authorize/"+row.userid).then(resp=>{
            if (resp) {
              this.initUserData();
            }
          })
        },
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          //勾选发生变化时重新赋值
          this.multipleSelection = val;

        },
        deleteById() {
          //delete已选
          this.$confirm('此操作将永久删除所选数据信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.postRequest("/user/",this.multipleSelection).then(resp=>{
              if (resp) {
                this.initUserData();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

        },
        initUserData() {
          //初始化查询参数
          let url = "/user/?page=" + this.currentPage + "&size=" + this.pageSize;
            this.getRequest(url).then(resp=>{
              if (resp) {

                this.userData = resp.data;
                this.total = resp.total;
                this.loading = false;
                /*if (this.userData.fkRoleid > 5) {
                  console.log(this.userData.fkRoleid)
                  this.disabled = false;
                }*/
              }
            })
        },
        sizeChange(val){
          //每页记录数改变
          this.pageSize = val;
          this.initUserData();
        },
        currentChange(val) {
          //当前页码改变
          this.currentPage = val;
          this.initUserData();
        }
      }
    }
</script>

<style scoped>

</style>
