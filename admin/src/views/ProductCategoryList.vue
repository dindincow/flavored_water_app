<template>
    <div class="categoryEdit">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 0 0 30px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <Subheader pageTitle="分類列表"></Subheader>
        <div class="panel">
            <!--新增分類-->    
            <el-form ref="form" :model="form" label-width="80px" :inline="true" class="demo-form-inline">
                <el-form-item label="分類名稱">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onAdd">新增</el-button>
                </el-form-item>
            </el-form>
            <el-divider></el-divider>

            <!--分類表格-->
            <el-table :data="tableData" border>
                <el-table-column type="index" label="ID" width="50"></el-table-column>
                <el-table-column prop="_id" label="ID" width="200"></el-table-column>
                <el-table-column label="分類名稱">
                    <template slot-scope="scope">
                        <div v-show="!scope.row.isEdit">
                             {{scope.row.name}}
                        </div>
                        <div v-show="scope.row.isEdit">
                            <el-input v-model="scope.row.name"></el-input> 
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="創建時間">
                    <template slot-scope="scope">
                        {{ scope.row.createTime | moment("YYYY-MM-DD") }}
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.isEdit" 
                            @click="editSave(scope.row)" 
                            type="warning"
                            size="small">保存
                        </el-button>
                            
                        <el-button 
                            v-if="!scope.row.isEdit"
                            @click="scope.row.isEdit=true" 
                            type="primary"
                            size="small">編輯
                        </el-button>
                            
                        <el-button 
                            type="danger"
                            size="small" 
                            @click="remove(scope.row)">刪除
                        </el-button> 
                    </template>
                </el-table-column>
            </el-table>
        </div>

   
    </div>
   
    
</template>

<script>
import Subheader from '../components/Subheader'
export default {
    name: "ItemEdit",
    components: {
        Subheader
    },
    data() {
        return {
            tableData: [],
            form:{
                name:"",  
            },
            dialogTableVisible: false,
            dialogFormVisible: false,
        };
    },

    methods: {
        async getCategoryList() {
            const res = await this.$http.get("category");
            this.tableData = res.data;
            for(var i=0;i<this.tableData.length;i++){
                this.$set(this.tableData[i],'isEdit',false)
            }
        },
        async onAdd(){
            const res = await this.$http.post(`category`,this.form);
            this.form.name="";
            this.getCategoryList()
        },
        async remove(row) {
            this.$confirm(`是否要刪除分類"${row.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const res = await this.$http.delete(`category/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getCategoryList();
            })
        },
       
        async editSave(row){
            row.isEdit = false;
            let data={
                name:row.name
            }
            const res = await this.$http.put(`category/${row._id}`,data)
            this.$message({
                type: 'success',
                message: '編輯成功!'
            });
            this.getCategoryList()
        },
     
    },
    created() {
        this.getCategoryList();
    }
};
</script>
