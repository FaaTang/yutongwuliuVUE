<template>
  <div style="margin-top: 10px">
    <el-button type="success" @click="showAddDriverView">添加驾驶员</el-button>
    <el-input
      placeholder="请输入关键字进行搜索..."
      prefix-icon="el-icon-search"
      style="width: 300px"
      clearable
      @clear="initDrivers"
      @keydown.enter.native="initDrivers"
      v-model="keyword">
    </el-input>
    <div>
      <div style="margin-top: 5px">
        <el-table
          :data="drivers"
          stripe
          border
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%">
          <el-table-column
            prop="driverid"
            label="驾驶员编号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            label="性别">
            <template slot-scope="scope">
              {{scope.row.sex==0?'男':'女'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="birth"
            label="出生日期">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="idcard"
            label="身份证号">
          </el-table-column>
          <el-table-column
            prop="truckTeam.teamname"
            label="绑定车队">
          </el-table-column>
          <el-table-column
            label="工作状态">
            <template slot-scope="scope">
              {{scope.row.state==1?'承运中':'空闲'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="checkintime"
            label="加入时间">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="display: flex;justify-content: flex-end">
        <el-pagination
          background
          :page-sizes="[5,10,15,20]"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="currentChange"
          @size-change="sizeChange"
          style="margin-right: 10px"
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog
        :title="Title"
        :visible.sync="dialogVisible"
        :close-on-click-modal="closeOnClickModal"
        :close-on-press-escape="closeOnPressEscape"
        width="50%">
        <div>
          <table>
            <tr>
              <td>
                <el-tag>司机姓名</el-tag>
              </td>
              <td>
                <el-input v-model="driver.name"></el-input>
              </td>
              <td>
                <el-tag>性别</el-tag>
              </td>
              <td>
                <el-radio-group v-model="driver.sex">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td>
                <el-tag>出生日期</el-tag>
              </td>
              <td>
                <el-date-picker
                  v-model="driver.birth"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择出生日期">
                </el-date-picker>
              </td>
              <td>
                <el-tag>联系电话</el-tag>
              </td>
              <td>
                <el-input v-model="driver.phone"></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <el-tag>身份证号码</el-tag>
              </td>
              <td>
                <el-input v-model="driver.idcard"></el-input>
              </td>
              <td>
                <el-tag>绑定车队</el-tag>
              </td>
              <td>
                <el-select v-model="driver.fkTeamid" placeholder="请选择车队">
                  <el-option
                    v-for="item in teams"
                    :key="item.teamid"
                    :label="item.teamname"
                    :value="item.teamid">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>
                <el-tag>工作状态</el-tag>
              </td>
              <td>
                <el-radio-group v-model="driver.state">
                  <el-radio :label="1">承运中</el-radio>
                  <el-radio :label="2">空闲</el-radio>
                </el-radio-group>
              </td>
              <td>
                <el-tag>绑定日期</el-tag>
              </td>
              <td>
                <el-date-picker
                  v-model="driver.checkintime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </td>
            </tr>
            <tr>
              <td>
                <el-tag>备注</el-tag>
              </td>
              <td colspan="3">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="driver.remark">
                </el-input>
              </td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
     <el-button @click="dialogVisible = false">取 消</el-button>
     <el-button type="primary" @click="addDriverView">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Drivers",
    data() {
      return {
        Title:'',
        teams:[],
        numbers:[],
        keyword:null,
        pageSize:5,
        currentPage:1,
        total:0,
        drivers:[],
        dialogVisible: false,
        closeOnClickModal: true,
        closeOnPressEscape: true,
        driver: {
          driverid: '',
          name: '',
          sex: '',
          birth: null,
          phone: '',
          idcard: '',
          fkTeamid: '',
          state: 2,
          remark: '',
          checkintime: null,
          isdelete: 0,
          altertime: null
        }
      }
    },
    mounted() {
      this.initDrivers();
      this.initTruck();
      this.initTruckTeams();
    },
    methods: {
      initTruck(){
        this.getRequest("/truck/numbers").then(resp=>{
          if(resp){
            this.numbers=resp.data;
          }
        })
      },
      initTruckTeams(){
        this.getRequest("/truck/team/").then(resp=>{
          this.teams=resp.data;
        })
      },
      handleEdit(index,row){
        //这里要注意顺序，先弹出对话框
        this.Title="修改驾驶员信息";
        this.dialogVisible=true;
        //这是对数据进行回写
        this.driver=row;
        this.initDrivers();

      },
      currentChange(val){
        this.currentPage=val;
        this.initDrivers();
      },
      sizeChange(val){
        this.pageSize=val;
        this.initDrivers();
      },
      handleDelete(index,row){
        this.$confirm('此操作将永久删除编号为【' + row.name+ '】的驾驶员信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest("/driver/" + row.driverid).then(resp=>{
            if(resp){
              this.initDrivers();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      initDrivers() {
        //这里的变量顺序必须和后台的一致
        if(this.keyword){
          this.getRequest("/driver/?page="+this.currentPage+"&size="+this.pageSize+"&keyword="+this.keyword).then(resp=>{
            if(resp){
              this.drivers=resp.data;
              this.total=resp.total;
            }
          })
        }else{
          this.getRequest("/driver/?page="+this.currentPage+"&size="+this.pageSize).then(resp => {
            if (resp) {
              //如果进入到这里面说明返回数据成功，则把当前数据赋值给drivers
              this.drivers=resp.data;
              this.total=resp.total;
            }
          })
        }
      },
      showAddDriverView() {
        //这是为了每次添加完信息之后对添加框进行初始化
        this.driver= {
          driverid: '',
            name: '',
            sex: '',
            birth: null,
            phone: '',
            idcard: '',
            fkTeamid: '',
            state:1,
            remark: '',
            checkintime: null,
            isdelete:1,
            altertime: null
        }
        this.Title="添加驾驶员信息";
        this.dialogVisible = true;
        this.closeOnClickModal = false;
        this.closeOnPressEscape = false;
      },
      addDriverView() {
        if(this.driver.driverid){
          //更新
          this.putRequest("/driver/",this.driver).then(resp=>{
            if(resp){
              this.dialogVisible=false;
              this.initDrivers();
            }
          })
        }else{
        this.postRequest("/driver/", this.driver).then(resp => {
          if (resp) {
            this.dialogVisible = false;
            this.initDrivers();
          }
        })
        }
      }
    }
  }
</script>

<style scoped>

</style>
