<template>
    <div class="home">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 0 0 30px;">
            <el-breadcrumb-item 
                v-for="(path,index) in $route.meta" 
                :key="index">{{path}}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="header">
            <Subheader pageTitle="會員列表"></Subheader>
            <div class="text-right mb-15">
                <el-button type="primary" icon="el-icon-circle-plus" @click="isShowPopup=true">
                    新增會員
                </el-button>
            </div>
        </div>
    
        <div class="panel">
            <!--查詢新增分類-->  
           
                <el-form :inline="true" :model="queryData" class="demo-form-inline">
                    <el-form-item label="ID">
                        <el-input v-model="queryData.id" placeholder="使用者ID"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="使用者類型">
                        <el-select v-model="queryData.type" placeholder="類型">
                            <el-option label="管理者" value="admin"></el-option>
                            <el-option label="會員" value="member"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="query">查询</el-button>
                    </el-form-item>
                </el-form>     
              
            
             <!--分割線-->
            <el-divider></el-divider>
            
            <!--分類表格-->
            <el-table :data="tableData" border>
                <el-table-column prop="_id" label="ID" width="200"></el-table-column>
                <el-table-column prop="account" label="帳號"></el-table-column>
                <el-table-column prop="username" label="暱稱"></el-table-column>
                <el-table-column label="創建時間">
                    <template slot-scope="scope">
                        {{ scope.row.createTime | moment("YYYY-MM-DD hh:mm:ss") }}
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button 
                            @click="onEdit(scope.row._id)" 
                            type="primary"
                            size="small">編輯
                        </el-button>
                            
                        <el-button 
                            type="danger"
                            size="small" 
                            @click="remove(scope.row._id)">刪除
                        </el-button> 
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分頁 -->
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5]"
            :page-size="1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSize">
        </el-pagination>

         <!--修改會員-->
        <el-dialog title="修改資訊" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="120px">
                <el-form-item label="帳號">
                    <el-input v-model="form.account" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="使用者名稱">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="電話">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEdit()">确 定</el-button>
            </div>
        </el-dialog>

        <!--新增會員-->
        <AddUserPopup :isShowPopup="isShowPopup" @hidePopBox="hidePopBox"></AddUserPopup>
    </div>
</template>
  
<script>
import Subheader from '@/components/Subheader';
import AddUserPopup from '@/components/AddUserPopup';

export default {
    name: "ItemEdit",
    components: {
        Subheader,
        AddUserPopup
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
            categories:[],
            isShowPopup:false, 
            dialogFormVisible:false,
            currentPage:1, //目前所在頁數
            pageSize:1, //1次顯示幾筆
            totalSize:0, //全部資料筆數
            totalPage:0 //全部頁數
        };
    },
    methods: {
        query(){
            this.getUserList()
        },
        onAdd(){
            this.isShowAddUserPopup=true
        },
        showPopup(){
            this.isShowPopup = true;
        },
        hidePopBox(){
            this.isShowPopup = false;
        },
        handleSizeChange(val) { 
            this.pageSize = val;
            this.getUserList()
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getUserList()
        },
        async handleEdit(){
            this.dialogFormVisible = false;
            console.log('this.form',this.form)
            const {phone,address,_id,username} = this.form
            await this.$http.put(`user/${_id}`,{phone,address,username});
            this.getUserList();
        },
        async onEdit(userId){
            this.dialogFormVisible = true;
            const res = await this.$http.get(`user/${userId}`);
            this.form = res.data.user
        },
        async getUserList() {
            const res = await this.$http.get(`user?pageSize=${this.pageSize}&currentPage=${this.currentPage}&id=${this.queryData.id}`);
            this.tableData = res.data.list;
            this.totalSize = res.data.count;
            this.queryData.id="";

        },
        async remove(userId){
            const res = await this.$http.delete(`user/${userId}`);
            const result = res.data;
            if(result.code===0){
                console.log(result.message);
                this.getUserList();
            }
        }
    },
    created() {
        this.getUserList();
        console.log('===>',this.$route.meta)
    }
};
</script>
<style scoped>

</style>
