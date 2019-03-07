<template>
    <div>
      <div></div>
      <div>
        <el-table
          :data="capaTrucks"
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
              <el-tag type="primary">{{scope.row.state==1?'承运中':'空闲'}}</el-tag>
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
          <!--<el-table-column
            prop="remark"
            label="操作"
            width="200px"
          >
            <template slot-scope="scope">
              <el-button type="info" @click="updateTruck(scope.$index, scope.row)" size="mini" icon="el-icon-edit">修改</el-button>
              <el-button type="danger" @click="deleteTruck(scope)" size="mini" icon="el-icon-delete">删除</el-button>
            </template>

          </el-table-column>-->
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
          </el-pagination></div>
    </div>

    </div>
</template>

<script>
    export default {
        name: "DriverSearch",
      data(){
          return{
            currentPage:1,
            pageSize:5,
            total:'',
            capaTrucks:[],
            loading:true,
          }
      },
      mounted() {
        this.initCapaTrucks();
      },
      methods:{
        currentChange(val) {
          this.currentPage = val;
          this.initCapaTrucks();
        },
        sizeChange(val) {
          this.pageSize = val;
          this.initCapaTrucks();
        },
        initCapaTrucks() {
          let url="/capa/?page="+this.currentPage+"&size="+this.pageSize
          this.getRequest(url).then(resp=>{
            if (resp) {
              this.capaTrucks = resp.data;
              this.total = resp.total;
              this.loading = false;
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
