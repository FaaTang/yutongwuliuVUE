<template>
    <div>
      <div></div>
      <div style="margin-top: 20px">
        <el-table
          :data="carriers"
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
            prop="scheduling.oilcost"
            width="150"
            label="油费">
          </el-table-column>
          <el-table-column
            prop="scheduling.toll"
            width="150"
            label="过桥费">
          </el-table-column>
          <el-table-column
            prop="scheduling.fine"
            width="150"
            label="罚款">
          </el-table-column>
          <el-table-column
            prop="scheduling.othercost"
            label="其他调度费用">
          </el-table-column>
          <el-table-column
            prop="scheduling.totalcost"
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
          <!--<el-table-column label="操作" width="150" fixed="right">
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
          </el-table-column>-->
        </el-table>
      </div>
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
</template>

<script>
    export default {
        name: "History",
      data(){
          return{
            carriers:[],
            total:0,
            loading:true,
            pageSize:5,
            currentPage:1,
          }
      },
      mounted() {
        this.initCarriers();
      },
      methods:{
        currentChange(val) {
          this.currentPage = val;
          this.initCarriers();
        },
        sizeChange(val) {
          this.pageSize = val;
          this.initCarriers();
        },
        initCarriers() {
          let url = "/sche/carriers4/?page=" + this.currentPage + "&size=" + this.pageSize;

          this.getRequest(url).then(resp => {
            if (resp) {
              this.carriers = resp.data;
              this.total = resp.total;
              this.loading = false;
            }
          });
        },
      }
    }
</script>

<style scoped>

</style>
