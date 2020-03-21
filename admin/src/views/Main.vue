<template>
    <el-container style="height: 100vh;">
        <el-aside width="200px" class="aside">
            <div class="logo">ADMIN</div>
            <el-menu
                background-color="#2e323a"
                text-color="rgb(236, 236, 236)"
                active-text-color="#ffd04b"
                :default-active="$route.path"
                router 
                >
                <el-menu-item index="/home" >
                    <i class="el-icon-menu"></i>
                    <span slot="title" >首頁</span>
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-user-solid"></i>會員管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="/user/list">會員列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-s-goods"></i>商品管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="/products/categoryList" >分類列表</el-menu-item>
                        <el-menu-item index="/products/create">新增商品</el-menu-item>
                        <el-menu-item index="/products/list">商品列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-s-order"></i>訂單管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="/order/list">訂單列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title"><i class="el-icon-picture"></i>廣告管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="/banner/list">廣告列表</el-menu-item>
                        <el-menu-item index="/banner/create">廣告編輯</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title"><i class="el-icon-s-goods"></i>活動管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="/active/list" >活動列表</el-menu-item>
                
                        <el-menu-item index="/active/create">活動編輯</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                
            </el-menu>
        </el-aside>
        
        <el-container>
            <el-header>
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>
            
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<style>
.logo{
      height: 60px;
    background: #242528;
    line-height: 60px;
    text-align: center;
    color: #fff;
}
.el-menu{
    border-right: none !important;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    background: #fff;
    box-shadow: 0 0 28px 0 rgba(61,78,124,.13);
    text-align: right;
    font-size: 12px;
}
  
.aside {
    color: #333;
    background: #2e323a;
}

.aside ul li,.aside .el-submenu__title{
    font-size: 16px;
    letter-spacing: 1px;
}

.el-main{
    padding:2rem !important;
}   
</style>

<script>
export default {
    methods: {
        
    },
    data() {
        const item = {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
            tableData: Array(20).fill(item)
        }
    }
};
</script>
