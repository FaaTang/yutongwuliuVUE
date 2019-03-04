<template>
    <div>
    <div></div>
    <div style="margin-top: 10px">
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
              <el-tag v-else-if="scope.row.finishedstate==1" type="danger">已调度</el-tag>
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
                type="primary"
                @click="receipted(scope.row)">签收
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
    export default {
        name: "WriteOrder",
      data() {
          return {
            carriers:[],
            loading: true
          }
      },
      mounted() {
        this.initCarriers();
      },
      methods: {
          //签收
        receipted(row) {
          console.log(this.carriers)
          this.putRequest("/task/rece/?carriersid="+row.carriersid).then(resp=>{
            if (resp) {
              this.initCarriers();

            }
          })

        },
        initCarriers() {
          this.getRequest("/task/rece/").then(resp=>{
            if (resp) {
              this.carriers = resp.data;
              this.loading = false;
            }
          })
        },
      }
    }
</script>

<style scoped>

</style>
