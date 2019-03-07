<template>
    <div>
      <div></div>
      <div style="margin-top: 10px">
        <el-tag type="primary" style="margin-bottom: 5px;">待调度承运单</el-tag>
        <el-table
          :data="carriersS"
          stripe
          border
          v-loading="loading"
          style="width: 100%">
          <el-table-column
            prop="carriersid"
            label="承运单编号"
            fixed
            width="100">
          </el-table-column>
          <el-table-column
            prop="sendlinkman"
            fixed
            label="发货人">
          </el-table-column>
          <el-table-column
            prop="sendcompany"
            label="发货单位"
            width="100">
          </el-table-column>
          <el-table-column
            prop="sendaddress"
            width="150"
            label="发货单位地址">
          </el-table-column>
          <el-table-column
            prop="sendphone"
            width="150"
            label="发货人电话">
          </el-table-column>
          <el-table-column
            prop="receivecompany"
            width="150"
            label="收货单位">
          </el-table-column>
          <el-table-column
            prop="fkReceiveaddress"
            width="150"
            label="收货单位地址">
          </el-table-column>
          <el-table-column
            prop="receivelinkman"
            label="收货人">
          </el-table-column>
          <el-table-column
            prop="receivephone"
            width="150"
            label="收货人电话">
          </el-table-column>
          <el-table-column
            prop="leaverdate"
            width="150"
            label="承运日期">
          </el-table-column>
          <el-table-column
            prop="receivedate"
            width="150"
            value-format="yyyy-MM-dd"
            label="收货时间">
          </el-table-column>
          <el-table-column
            label="完成情况">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.finishedstate==0" type="danger">待调度</el-tag>
              <el-tag v-else-if="scope.row.finishedstate==1" type="info">已调度</el-tag>
              <el-tag v-else-if="scope.row.finishedstate==2" type="warning">已签收</el-tag>
              <el-tag v-else type="success">已结算</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="insurancecost"
            label="保险费">
          </el-table-column>
          <el-table-column
            prop="transportcost"
            label="运费">
          </el-table-column>
          <el-table-column
            prop="othercost"
            label="其他费用">
          </el-table-column>
          <el-table-column
            prop="totalcost"
            label="合计费用">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="checkintime"
            width="150"
            label="录入时间">
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="success" size="small" @click="showdialog(scope.row)">调度</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
        >
          <el-select v-model="truckid" placeholder="请选择">
            <el-option
              v-for="item in trucks"
              :key="item.truckid"
              :label="item.number"
              :value="item.truckid">
              <span style="float: left">{{ item.number }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.tonnage }}吨</span>
            </el-option>
          </el-select>
          <el-date-picker
            v-model="startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            placeholder="选择出发时间">
          </el-date-picker>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sche">确 定</el-button>
  </span>
        </el-dialog>
      </div>
      <div style="margin-top: 30px;border: 1px solid cadetblue;">

      </div>
      <div>
        <el-tag type="success" style="margin-top: 5px;">已调度承运单</el-tag>
        <el-table
          :data="sches"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="schedulingid"
            label="调度编号"
            fixed
            width="100">
          </el-table-column>
          <el-table-column
            prop="starttime"
            width="180"
            label="出发时间">
          </el-table-column>
          <el-table-column
            prop="fkCarriersid"
            label="承运单编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="fkTruckid"
            label="车辆编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="oilcost"
            width="150"
            label="邮费">
          </el-table-column>
          <el-table-column
            prop="toll"
            width="150"
            label="过桥费">
          </el-table-column>
          <el-table-column
            prop="fine"
            width="150"
            label="罚款">
          </el-table-column>
          <el-table-column
            prop="othercost"
            width="150"
            label="其他费用">
          </el-table-column>
          <el-table-column
            prop="totalcost"
            label="合计成本">
          </el-table-column>
          <el-table-column
            prop="remark"
            width="150"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="checkintime"
            width="150"
            label="调度时间">
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Scheduling",
      data(){
        return{
          sches:[],
          startTime:null,
          rowB:[],
          trucks:[],
          truckid:'',
          dialogVisible:false,
          visible:false,
          loading:true,
          carriersS:[],
        }
      },
      mounted(){
        this.initCarriers();
        this.initTrucks();
        this.initSches();
      },
      methods:{
        initSches() {
          this.getRequest("/sche/").then(resp=>{
            if (resp) {
              this.sches = resp.data;
              this.loading = false;
            }
          })
        },
        sche() {
          this.postKeyValueRequest("/sche/",{carriersid:this.rowB.carriersid,truckid:this.truckid,startTime:this.startTime}).then(resp=>{
            if (resp) {
              this.initCarriers()
              this.initSches();
              this.dialogVisible = false;
              this.loading = false;
            }
          })
        },
        initTrucks() {
          this.getRequest("/sche/truck").then(resp=>{
            if (resp) {
              this.trucks=resp;
              this.loading = false;
            }
          })
        },
        initCarriers() {
          this.getRequest("/sche/carriers").then(resp=>{
            if (resp) {
              this.carriersS = resp.data;
              this.loading = false;
            }
          })
        },
        showdialog(row){
          this.rowB=row;
          this.dialogVisible=true;
        }
      }
    }
</script>

<style scoped>

</style>
