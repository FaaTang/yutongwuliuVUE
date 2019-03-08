<template>
  <div style="margin-top: 10px">
    <el-tag type="primary">承运单</el-tag>
    <div>
      <el-table
        :data="carriersS"
        stripe
        border
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
            <!--<el-dialog
              title="结算承运单"
              :visible.sync="dialogVisible2"
              modal-append-to-body="false"
              append-to-body="false"
              width="40%">
              <table>
                <el-table
                  :data="carriersS"
                  stripe
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="carriersid"
                    label="承运单编号"
                    fixed
                    width="100">
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
                </el-table>
              </table>
              <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="count">确 定</el-button>
          </span>
            </el-dialog>-->
            <el-button type="primary" size="small" @click="corr(scope.$index, scope.row)">结算</el-button>
            <el-button type="success" size="small" @click="modifyCost1(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex;justify-content: flex-end">
      <el-pagination
        background
        :page-sizes="[5,10,15,20]"
        :page-size="pageSize1"
        :current-page="currentPage1"
        @current-change="currentChange1"
        @size-change="sizeChange1"
        style="margin-right: 10px"
        layout="sizes, prev, pager, next, jumper, ->, total, slot"
        :total="total1">
      </el-pagination>
    </div>
    <el-dialog
      title="修改承运单"
      :visible.sync="dialogVisible"
      width="60%">
      <div>
        <table class="addTaskTable">
          <tr>
            <td>发货单位</td>
            <td>
              <el-input v-model="carriers.sendcompany"></el-input>
            </td>
            <td>发货单位地址</td>
            <td>
              <el-input v-model="carriers.sendaddress"></el-input>
            </td>
          </tr>
          <tr>
            <td>发货人</td>
            <td>
              <el-input v-model="carriers.sendlinkman"></el-input>
            </td>
            <td>发货人电话</td>
            <td>
              <el-input v-model="carriers.sendphone"></el-input>
            </td>
          </tr>
          <tr>
            <td>收货单位</td>
            <td>
              <el-input v-model="carriers.receivecompany"></el-input>
            </td>
            <td>收货单位地址</td>
            <td>
              <el-input v-model="carriers.fkReceiveaddress"></el-input>
            </td>
          </tr>
          <tr>
            <td>收货人</td>
            <td>
              <el-input v-model="carriers.receivelinkman"></el-input>
            </td>
            <td>收货人电话</td>
            <td>
              <el-input v-model="carriers.receivephone"></el-input>
            </td>
          </tr>
          <tr>
            <td>承运日期</td>
            <td>
              <el-date-picker
                v-model="carriers.leaverdate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </td>
            <td>收货时间</td>
            <td>
              <el-date-picker
                v-model="carriers.receivedate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <td>完成状态</td>
            <td>
              <el-select v-model="carriers.finishedstate" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td>保险费</td>
            <td>
              <el-input v-model="carriers.insurancecost"></el-input>
            </td>
          </tr>
          <tr>
            <td>运费</td>
            <td>
              <el-input v-model="carriers.transportcost"></el-input>
            </td>
            <td>其他费用</td>
            <td>
              <el-input v-model="carriers.othercost"></el-input>
            </td>
          </tr>
          <tr>
            <td>合计费用</td>
            <td>
              <el-input v-model="carriers.totalcost"></el-input>
            </td>
            <td>备注</td>
            <td>
              <el-input v-model="carriers.remark"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleDelete">确 定</el-button>
  </span>
    </el-dialog>
    <div style="margin-top: 5px">
      <el-tag type="primary">调度单</el-tag>
      <div>
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
            prop="receivedate"
            width="150"
            label="调度时间">
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="count1(scope.$index, scope.row)">结算</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="display: flex;justify-content: flex-end">
        <el-pagination
          background
          :page-sizes="[5,10,15,20]"
          :page-size="pageSize2"
          :current-page="currentPage2"
          @current-change="currentChange2"
          @size-change="sizeChange2"
          style="margin-right: 10px"
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="total2">
        </el-pagination>
      </div>
      <div>
        <el-dialog
          title="结算调度单"
          :visible.sync="dialogVisible3"
          width="40%">
          <span>已经结算</span>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="count2">确 定</el-button>
  </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Coststatistic",
    data() {
      return {
        dialogVisible3:false,
        pageSize2:5,
        currentPage2:1,
        total2:0,
        sches:[],
        carriersS: [],
        carriersid: '',
        totalcosts: [],
        pageSize1: 5,
        currentPage1: 1,
        total1: 0,
        dialogVisible:false,
        dialogVisible2:false,
        carrier: [],
        options: [
          {
            value: 0,
            label: "待调度"
          },
          {
            value: 1,
            label: "已调度"
          },
          {
            value: 2,
            label: "已签收"
          }, {
            value: 3,
            label: "已结算"
          }],
        carriers: {
          carriersid: '',
          sendcompany: '',
          sendaddress: '',
          sendlinkman: '',
          sendphone: '',
          receivecompany: '',
          fkReceiveaddress: '',
          receivelinkman: '',
          receivephone: '',
          leaverdate: '',
          receivedate: '',
          finishedstate: 0,
          insurancecost: '',
          transportcost: '',
          othercost: '',
          totalcost: '',
          remark: ''
        }



      }
    },
    mounted() {
      this.initCarriers();
      this.initCarrier();
      this.initSches();

    },
    methods: {
      count2(){
        this.dialogVisible3=false;
      },
      count1(index,row){
        //这里是结算调度单
     this.dialogVisible3=true;

      },
      sizeChange2(val){
        this.pageSize2=val;
        this.initSches();
      },
      currentChange2(val){
        this.currentPage2=val;
        this.initSches();
      },
      initSches(){
        this.getRequest("/cost/sche/?page=" + this.currentPage2 + "&size=" + this.pageSize2).then(resp=>{
          if(resp){
            this.sches=resp.data;
            this.total2=resp.total;
          }
        })
      },
      corr(index,row){
        //这里是结算承运单,存在一个问题如何将该id传回后端并修改数据库的状态
        //这个结算要有两个状态：1是改变承运单状态，2是新增记录，现在没有表
        if(row.finishedstate==2){
          this.dialogVisible2=true;
          //这里利用key-value的形式进行传递
          this.postKeyValueRequest("/cost/count/",{carriersid:row.carriersid,totalcost:row.totalcost}).then(resp=>{
            if(resp){
              this.initCarriers();
              //刷新之后该条记录不存在了，
            }
          })
        }else{
          this.$confirm('对不起，该【'+row.carriersid+'】承运单未签收，不能结算', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }

      },

      initCarrier() {
        this.getRequest("/cost/carriers").then(resp => {
          if (resp) {
            this.totalcosts = resp;
          }
        })
      },
      handleDelete() {
        this.putRequest("/cost/", this.carriers).then(resp => {
          if (resp) {
            this.dialogVisible = false;
            this.initCarriers();
          }
        })
      },
      modifyCost1(index, row) {
        //这里是修改承运单
        this.dialogVisible = true;
        this.carriers = row;
      },
      sizeChange1(val) {
        this.pageSize1 = val;
        this.initCarriers();
      },
      currentChange1(val) {
        this.currentPage1 = val;
        this.initCarriers();
      },
      initCarriers() {
        this.getRequest("/cost/?page=" + this.currentPage1 + "&size=" + this.pageSize1).then(resp => {
          if (resp) {
            this.carriersS = resp.data;
            this.total1 = resp.total;
          }
        })
      },

    }
  }
</script>

<style scoped>

</style>
