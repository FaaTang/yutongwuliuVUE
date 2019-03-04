<template>
    <div>
    <div>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="showAddTT">添加车队信息</el-button>
      <el-input
        placeholder="请输入关键字进行搜索..."
        prefix-icon="el-icon-search"
        style="width: 300px"
        clearable
        @clear="initTruckTeams"
        @keydown.enter.native="initTruckTeams"
        v-model="keyword">
      </el-input>
      <el-date-picker
        @change="daterangeChange"
        v-model="daterange"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
      <el-dialog
        :title="dialogtitle"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        v-loading="loading"
        width="400px">
        <div>
          <table>
            <tr>
              <td>
                <el-tag>车队名称</el-tag>
              </td>
              <td>
                <el-input v-model="truckTeam.teamname"></el-input>
              </td>
            </tr>
              <tr>
              <td>
                <el-tag>车队负责人</el-tag>
              </td>
              <td>
                <el-input v-model="truckTeam.leader"></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <el-tag>建队时间</el-tag>
              </td>
              <td>
                <el-date-picker
                  v-model="truckTeam.checkintime"
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
                    v-model="truckTeam.remark">
                  </el-input>
                </td>

            </tr>

          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addTruckTeam">确 定</el-button>
  </span>
      </el-dialog>
      <div>
        <el-table
          :data="truckTeams"
          stripe
          style="width: 100%"
          v-loading="loading">
          <el-table-column
            prop="teamid"
            label="车队编号"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="teamname"
            label="车队名称"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="checkintime"
            label="创队时间"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="leader"
            label="负责人"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="操作"
            width="200px"
          >
            <template slot-scope="scope">
              <el-button type="info" @click="editTruck(scope.$index,scope.row)" size="mini" icon="el-icon-edit">修改</el-button>
              <el-button type="danger" @click="deleteTruck(scope.$index,scope.row)" size="mini" icon="el-icon-delete">删除</el-button>
            </template>

          </el-table-column>
        </el-table>
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
        name: "TruckTeam",
      data(){
          return{
            currentPage:1,
            pageSize:5,
            total:0,
            keyword:null,
            daterange:null,
            loading:true,
            truckTeams:[],
            dialogtitle:'',
            dialogVisible:false,
            truckTeam: {
              teamid:'',
              teamname:'',
              leader:'',
              remark:'',
              checkintime:null,
              isdelete:-1,
              altertime:null
            },
          }
      },
      mounted(){
        this.initTruckTeams();
      },
      methods:{
        daterangeChange(v){
          this.initTruckTeams();
        },
        currentChange(val){
          this.currentPage=val;
          this.initTruckTeams();
        },
        sizeChange(val){
          this.pageSize=val;
          this.initTruckTeams();
        },

        initTruckTeams(){
          let url="/truck/team/?page="+this.currentPage+"&size="+this.pageSize;
          if (this.daterange){
            url += "&daterange="+this.daterange[0]+"&daterange="+this.daterange[1];
          }
          if (this.keyword){
            url +="&keyword="+this.keyword;
          }
          if (this.daterange!=null && this.keyword!=null){
            url += "&daterange="+this.daterange[0]+"&daterange="+this.daterange[1]+"&keyword="+this.keyword;
          }
          this.getRequest(url).then(resp=> {
            if (resp) {
            this.truckTeams = resp.data;
            this.total = resp.total;
            this.loading=false;
          }
          })
        },
        showAddTT(){
          this.dialogtitle="添加车队信息";
          this.dialogVisible=true;
          this.truckTeam= {
            teamid:'',
              teamname:'',
              leader:'',
              remark:'',
              checkintime:null,
              isdelete:-1,
              altertime:null
          }
        },
        addTruckTeam(){
          if (this.truckTeam.teamid){
            //更新
            this.putRequest("/truck/team/",this.truckTeam).then(resp=>{
              if (resp){
                this.dialogVisible=false;
                this.initTruckTeams();
              }
            })
          }else {
            this.postRequest("/truck/team/",this.truckTeam).then(resp=>{
              if (resp){
                this.dialogVisible=false;
                this.initTruckTeams();
              }
            })
          }

        },
        editTruck(index,row){
          this.dialogtitle="修改车队信息";
          this.dialogVisible=true;
          this.truckTeam=row;
        },
        deleteTruck(index,row){
          this.$confirm('此操作将永久删除【'+row.teamid+'】车队的信息是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteRequest("/truck/team/"+row.teamid).then(resp=>{
              if (resp){
                this.initTruckTeams();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

        },
      }
    }
</script>

<style scoped>

</style>
