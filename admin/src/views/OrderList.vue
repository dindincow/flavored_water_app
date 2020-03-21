<template>
    <div class="orderList">

        <div class="panel">
            
            <!--分類表格-->
            <el-table :data="tableData" border>
                <el-table-column prop="_id" label="定單ID" width="200"></el-table-column>
                <el-table-column prop="userId" label="會員ID"></el-table-column>
                <el-table-column prop="totals" label="訂單金額"></el-table-column>
                <el-table-column label="創建定單時間">
                    <template slot-scope="scope">
                        {{ scope.row.createTime | moment("YYYY-MM-DD hh:mm:ss") }}
                    </template>
                </el-table-column>
                <el-table-column label="訂單狀態">
                    <template slot-scope="scope">
                        <el-tag :type="orderStyle(scope.row.status)">{{orderStatus(scope.row.status)}}</el-tag>
                    </template>
                </el-table-column>
                
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button 
                            @click="onChangeStatus(scope.row._id,2)" 
                            type="primary"
                            size="small">成功
                        </el-button>
                            
                        <el-button 
                            type="danger"
                            size="small" 
                            @click="onChangeStatus(scope.row._id,3)">失敗
                        </el-button> 
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Subheader from '../components/Subheader';


export default {
    name: "ItemEdit",
    components: {
        Subheader, 
    },
    props: {
        id: {}
    },
    data() {
        return {
            queryData:{
                id:'',
                type:'member'
            },
            tableData:[],
            form: {},
        };
    },
    methods: {
        async getOrderList(){
            const result =  await this.$http.get('order');
            this.tableData = result.data.orderList
        },
        async onChangeStatus(orderId,status){
  
            await this.$http.put(`order/${orderId}`,{status});
            this.getOrderList();
        },

        orderStatus(Status){
            switch(Status){
                case 1:
                    return "處理中";
                case 2:
                    return "成功";
                case 3:
                    return "失敗";
            }  
        },
        orderStyle(Status){
           switch(Status){
                case 1:
                    return "";
                case 2:
                    return "success";
                case 3:
                    return "danger";
            }  
        }
        
    },
    created() {
        this.getOrderList();
        
    }
};
</script>
<style>

</style>
