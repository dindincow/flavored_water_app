<template>
  <div class="categoryEdit">
   <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 0 0 30px;">
        <el-breadcrumb-item 
            v-for="(path,index) in $route.meta" 
            :key="index">{{path}}
        </el-breadcrumb-item>
    </el-breadcrumb>
    <Subheader pageTitle="活動列表"></Subheader>

    <div class="panel">
        <el-table :data="tableData">
            <el-table-column prop="_id" label="ID" width="250"></el-table-column>
            <el-table-column prop="name" label="活動名稱" width="400"></el-table-column>
            <el-table-column prop="img" label="圖片">
                <template slot-scope="scope">
                    <img :src="scope.row.img" style="width:7rem">
                </template>
            </el-table-column>
            <el-table-column prop="stock" label="創建時間">
                <template slot-scope="scope">
                    {{scope.row.createTime}}
                </template>
            </el-table-column>
      
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button 
                        @click="$router.push(`/active/edit/${scope.row._id}`)" 
                        type="primary"
                         size="small">編輯</el-button>
                        
                    <el-button 
                        type="danger"
                        size="small" 
                        @click="remove(scope.row)">刪除</el-button>
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
            form:{},
            tableData: []
        };
    },

    methods: {
        async getActiveList() {
            const res = await this.$http.get("actives");
            this.tableData = res.data;
        },
        async remove(row) {
            this.$confirm(`是否要刪除分類"${row.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const res = await this.$http.delete(`actives/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getActiveList();
            })
        }
    },
    created() {
        this.getActiveList();
    }
};
</script>
