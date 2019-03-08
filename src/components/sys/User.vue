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
              <el-tag v-if="scope.row.sex==1" style="color: #0072ff">先生</el-tag>
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
              <el-tag v-if="scope.row.fkRoleid==1" type="warning" class="el-icon-star-on">承运部</el-tag>
              <el-tag v-else-if="scope.row.fkRoleid==2" type="warning" class="el-icon-star-on">调度部</el-tag>
              <el-tag v-else-if="scope.row.fkRoleid==3" type="warning" class="el-icon-star-on">财务部</el-tag>
              <el-tag v-else-if="scope.row.fkRoleid==4" type="warning" class="el-icon-star-on">运输部</el-tag>
              <el-tag v-else-if="scope.row.fkRoleid==5" style="color: #bf00ff" class="el-icon-star-on">超&nbsp;&nbsp;&nbsp;&nbsp;管</el-tag>
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
              <el-button type="info" @click="authorizeUser(scope.row)" size="mini" icon="el-icon-check">授权</el-button>
              <el-button type="danger" @click="updateUser(scope.row)" size="mini" icon="el-icon-edit">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection([userData[1], userData[2]])">切换第二、第三行的选中状态</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button @click="deleteById">删除已选</el-button>
        </div>
        <div>
          <el-pagination
            @current-change="currentChange"
            @size-change="sizeChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[5,10,15,20]"
            style="display: flex;justify-content: flex-end;margin-right: 10px"
            layout="sizes,prev,pager,next,jumper,->,total,slot"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "User",
      data() {
        return {
          multipleSelection: [],
          userData:[],
          total:0,
          pageSize:5,
          currentPage:1,
          loading: true
        }
      },
      mounted() {
          //项目启动时自动执行
        this.initUserData();
      },
      methods: {
        updateUser(row) {
          //更新方法
        },
        authorizeUser(row) {
          //授权方法
          this.putRequest("/user/authorize/"+row.userid).then()
        },
/*        selectRow(selection,row) {
          while (row.userid) {
            this.deleteRequest("/user/"+row.userid).then(resp=>{
              if (resp) {

              }
            })
          }
        },*/
        toggleSelection(rows) {
          //console.log(rows)
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
          this.postRequest("/user/",this.multipleSelection).then(resp=>{
            if (resp) {
              this.initUserData();
            }
          })
        },
        initUserData() {
          //初始化查询参数
          let url = "/user/?page=" + this.currentPage + "&size=" + this.pageSize;
            this.getRequest(url).then(resp=>{
              if (resp) {
                this.userData = resp.data;
                this.total = resp.total;
                this.loading = false;
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
