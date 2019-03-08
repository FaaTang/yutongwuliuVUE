<template>
  <div>
    <div style="margin-top: 5px">
      <el-button icon="el-icon-plus" type="primary" @click="showAddView" size="small">添加车辆信息</el-button>
      <el-date-picker
        v-model="daterange"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="initTrucks">搜索</el-button>
      <el-select v-model="trucktype" placeholder="请选择" @change="initTrucks">
        <el-option
          v-for="item in types"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <div>
      <el-table
        :data="trucks"
        stripe
        style="width: 100%"
        v-loading="loading">
        <el-table-column
          prop="truckid"
          label="车辆编号"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="number"
          label="车牌号"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="buydate"
          label="购买日期"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="type"
          label="车辆类型"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="length"
          label="入队时长"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="tonnage"
          label="车辆吨位"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="truckteam.teamname"
          label="所属车队"
          width="auto">
        </el-table-column>
        <el-table-column
          label="车辆状态"
          width="auto">
          <template slot-scope="scope">
            {{scope.row.state==1?'承运中':'空闲'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="checkintime"
          label="入队时间"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注信息"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="操作"
          width="200px"
        >
          <template slot-scope="scope">
            <el-button type="info" @click="updateTruck(scope.$index, scope.row)" size="mini" icon="el-icon-edit">修改
            </el-button>
            <el-button type="danger" @click="deleteTruck(scope)" size="mini" icon="el-icon-delete">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          @current-change="currentChange	"
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
    <el-dialog
      :title="dialogtitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="50%">
      <div>
        <table>
          <tr>
            <td>
              <el-tag>车牌号</el-tag>
            </td>
            <td>
              <el-input v-model="truck.number"></el-input>
            </td>
            <td>
              <el-tag>购买日期</el-tag>
            </td>
            <td>
              <el-date-picker
                v-model="truck.buydate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <td>
              <el-tag>车辆类型</el-tag>
            </td>
            <td>
              <el-input v-model="truck.type"></el-input>
            </td>
            <td>
              <el-tag>入队时长</el-tag>
            </td>
            <td>
              <el-input v-model="truck.length"></el-input>
            </td>
          </tr>
          <tr>
            <td>
              <el-tag>车辆吨位</el-tag>
            </td>
            <td>
              <el-input v-model="truck.tonnage"></el-input>
            </td>
            <td>
              <el-tag>所属车队</el-tag>
            </td>
            <td>
              <el-select v-model="truck.fkTeamid" placeholder="请选择">
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
              <el-tag>车辆状态</el-tag>
            </td>
            <td>
              <el-radio-group v-model="truck.state">
                <el-radio :label="1">承运中</el-radio>
                <el-radio :label="2">空闲</el-radio>
              </el-radio-group>

            </td>
            <td>
              <el-tag>加入时间</el-tag>
            </td>
            <td>
              <el-date-picker
                v-model="truck.checkintime"
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
                v-model="truck.remark">
              </el-input>
            </td>
          </tr>

        </table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addTruck">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "TruckMana",
    data() {
      return {
        teams: [],
        numbers:[],
        dialogVisible: false,
        loading: true,
        dialogtitle: '',
        dialogTruck: '',
        daterange: null,
        trucktype: '全部',
        types: [],
        trucks: [],
        total: 0,
        pageSize: 5,
        currentPage: 1,

        truck: {
          truckid: '',
          number: '',
          buydate: null,
          type: '',
          length: '',
          tonnage: null,
          fkTeamid: null,
          state: -1,
          remark: '',
          checkintime: null,
          isdelete: -1,
          altertime: null
        }
      }
    },
    mounted() {
      this.initTrucks();
      this.initTypes();
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
  initTruckTeams()
  {
    this.getRequest("/truck/team/").then(resp => {
      this.teams = resp.data;
    })
  }
  ,
  currentChange(val)
  {
    this.currentPage = val;
    this.initTrucks();
  }
  ,
  sizeChange(val)
  {
    this.pageSize = val;
    this.initTrucks();

  }
  ,
  initTypes()
  {
    this.getRequest("/truck/types").then(resp => {
      if (resp) {
        this.types = resp;
      }
    })
  }
  ,
  initTrucks()
  {
    let url = "/truck/?type=" + this.trucktype + "&size=" + this.pageSize + "&page=" + this.currentPage;
    if (this.daterange) {
      url += "&daterange=" + this.daterange[0] + "&daterange=" + this.daterange[1];
    }
    this.getRequest(url).then(resp => {
      this.loading = false;
      if (resp) {
        this.total = resp.total;
        this.trucks = resp.data;

      }
    })
  }
  ,
  showAddView()
  {
    this.truck = {
      truckid: '',
      number: '',
      buydate: null,
      type: '',
      length: '',
      tonnage: null,
      fkTeamid: null,
      state: -1,
      remark: '',
      checkintime: null,
      isdelete: -1,
      altertime: null
    }
    this.dialogtitle = '添加车辆信息';
    this.dialogVisible = true;

  }
  ,
  updateTruck(index, row)
  {
    this.dialogtitle = '修改车辆信息';
    this.dialogVisible = true;
    this.truck = row;
  }
  ,
  addTruck()
  {
    if (this.truck.truckid) {
      //更新
      this.putRequest("/truck/update", this.truck).then(resp => {
        this.initTrucks();
        this.dialogVisible = false;
      })
    } else {
      this.postRequest("/truck/", this.truck).then(resp => {
        if (resp) {
          this.dialogVisible = false;
          this.initTrucks();

        }
      })
    }

  }
  ,
  deleteTruck(v)
  {
    this.$confirm('此操作将永久删除编号为【' + v.row.truckid + '】的车辆信息, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      let truckid = v.row.truckid;
      this.getRequest("/truck/deleteById?truckid=" + truckid).then(resp => {
        if (resp) {
          this.initTrucks();
        }
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });

  }
  ,


  }
  }
</script>

<style scoped>

</style>
