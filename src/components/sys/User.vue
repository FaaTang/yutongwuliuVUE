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
              <el-tag v-else style="color: #bf00ff" class="el-icon-star-on">超&nbsp;&nbsp;&nbsp;&nbsp;管</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="checkintime"
            label="注册日期"
            width="120">

          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection([userData[1], userData[2]])">切换第二、第三行的选中状态</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
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
        this.initUserData();
      },
      methods: {
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
        handleSelectionChange(val2) {
          console.log(val2);
          this.multipleSelection = val2;

        },
        deleteById() {
          this.postRequest("/user/abc",this.multipleSelection).then()
        },
        initUserData() {
            this.getRequest("/user/").then(resp=>{
              if (resp) {
                this.userData = resp.data;
                console.log(resp.data)
                this.total = resp.total;
                this.loading = false;
              }
            })
        },
        sizeChange(val){
          this.pageSize = val;
          this.loading = false;
        },
        currentChange(val) {
          this.currentPage = val;
          this.loading = false;
        }
      }
    }
</script>

<style scoped>

</style>
