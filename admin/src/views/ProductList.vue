<template>
  <div class="categoryEdit">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 0 0 30px;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <Subheader pageTitle="產品列表"></Subheader>

    <div class="panel">
        <el-table :data="tableData">
            <el-table-column prop="product._id" label="ID" width="250"></el-table-column>
            <el-table-column prop="product.name" label="商品名稱" width="250"></el-table-column>
            <el-table-column label="分類" prop="categoryName"></el-table-column>
            <el-table-column prop="img" label="圖片">
                <template slot-scope="scope">
                    <img :src="scope.row.product.img" style="width:7rem">
                </template>
            </el-table-column>
            <el-table-column prop="product.stock" label="庫存"></el-table-column>
            <el-table-column prop="product.price" label="原價"></el-table-column>
            <el-table-column prop="product.discountPrice" label="特價"></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button 
                        @click="$router.push(`/products/edit/${scope.row.product._id}`)" 
                        type="primary"
                         size="small">編輯</el-button>
                        
                    <el-button 
                        type="danger"
                        size="small" 
                        @click="remove(scope.row.product.name,scope.row.product._id)">刪除</el-button>
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
        async getItemsList() {
            const res = await this.$http.get("products");
            this.tableData = res.data;
            console.log('this.tableData',this.tableData)
        },
        async remove(name,id) {
            this.$confirm(`是否要刪除分類"${name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const res = await this.$http.delete(`products/${id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getItemsList();
            })
        }
    },
    created() {
        this.getItemsList();
    }
};
</script>
