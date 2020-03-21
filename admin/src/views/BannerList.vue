<template>
    <div class="banner-list">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 0 0 30px;">
            <el-breadcrumb-item 
                v-for="(path,index) in $route.meta" 
                :key="index">{{path}}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <Subheader pageTitle="廣告列表"></Subheader>
        <div class="panel">
            <el-table :data="bannerList">
                <el-table-column prop="_id" label="ID" width="250"></el-table-column>
                <el-table-column prop="name" label="廣告名稱" width="150" ></el-table-column>
                <el-table-column prop="img" label="圖片">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" style="width:7rem">
                    </template>
                </el-table-column>
                 <el-table-column prop="link" label="廣告連結" width="400"></el-table-column>
                <el-table-column prop="stock" label="創建時間">
                    <template slot-scope="scope">
                        {{scope.row.createTime | moment("YYYY-MM-DD")}}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button 
                            @click="$router.push(`/banner/edit/${scope.row._id}`)" 
                            type="primary"
                            size="small">編輯</el-button>
                            
                        <el-button 
                            type="danger"
                            size="small" 
                            @click="remove(scope.row._id)">刪除</el-button>
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
            bannerList:[]
        };
    },
    methods: {
        async getBanner() {
            const res = await this.$http.get('banner');
            this.bannerList = res.data;
           
        },


        async remove(id){
            const res = await this.$http.delete(`banner/${id}`);
            this.$message({
                type: "success",
                message: res.data.message
            });
             this.getBanner();
        }
    },
    created() {
        this.getBanner();
    }
};
</script>
<style>

</style>
