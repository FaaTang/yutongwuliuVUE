<template>
  <div>
    <div>
      <div>
        <el-button icon="el-icon-plus" type="primary" size="small" style="margin-top: 10px;"
                   @click="showAddCarriersView">添加承运单
        </el-button>
        <el-input
          placeholder="请输入关键字进行搜索..."
          prefix-icon="el-icon-search"
          style="width: 300px"
          clearable
          @change="initCarriers"
          @clear="initCarriers"
          @keyup.enter.native="initCarriers"
          v-model="keyword">
        </el-input>
      </div>
      <el-dialog
        :title="dialogtitle"
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
    <el-button type="primary" @click="addCarriers">确 定</el-button>
  </span>
      </el-dialog>
      <div style="margin-top: 10px">
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
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"icon="el-icon-edit">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"icon="el-icon-delete">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
    name: "ReceiveOrder",
    data() {
      return {
        dialogtitle:'',
        carriersS:[],
        total: 1,
        currentPage: 1,
        pageSize: 5,
        keyword: null,
        loading: true,
        dialogVisible: false,
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
    },
    methods: {
      handleDelete(index,row) {
        this.$confirm('此操作将永久删除编号为【'+row.carriersid+'】的承运单信息，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest("/task/"+row.carriersid).then(resp=>{
            if (resp) {
              this.initCarriers();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      handleEdit(index,row) {
        this.dialogVisible = true;
        this.dialogtitle = "修改承运单";

      },
      sizeChange(val) {
        this.pageSize = val;
        this.initCarriers();
      },
      currentChange(val) {
        this.currentPage = val;
        this.initCarriers();
      },
     initCarriers() {
        let url = "/task/?page=" + this.currentPage + "&size=" + this.pageSize;
        if (this.keyword) {
          url += "&keyword=" + this.keyword;
        }
        this.getRequest(url).then(resp => {
          if (resp) {
            this.carriersS = resp.data;
            this.total = resp.total;
            this.loading = false;
          }
        });
      },
      addCarriers() {
        if (this.carriers.carriersid) {
          //修改
          this.putRequest("/task/", this.carriers).then(resp => {
            if (resp) {
              this.dialogVisible = false;
              this.initCarriers();
            }
          });
        } else {
        this.postRequest("/task/", this.carriers).then(resp => {
          if (resp) {
            this.dialogVisible = false;
            this.initCarriers();
          }
        });
        }
      },
      showAddCarriersView() {
        this.carriers= {
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
        this.dialogVisible = true;
        this.dialogtitle = "添加承运单";
      },
    }
  }
</script>

<style scoped>

</style>
