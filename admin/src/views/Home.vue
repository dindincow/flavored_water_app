<template>
    <div class="home">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="card"> 
                    <div class="card-body d-flex align-center">
                        <div class="icon bg-orangn"><i class="iconfont icon-7"></i></div>
                        <div class="info">
                            <p class="title">會員人數</p>
                            <p class="num">15</p>
                        </div>
                    </div> 
                </div>
            </el-col>

            <el-col :span="6">
                <div class="card">
                    <div class="card-body d-flex align-center">
                        <div class="icon bg-green"><i class="iconfont icon-12"></i></div>
                        <div class="info">
                            <p class="title">總收入</p>
                            <p class="num">150,000</p>
                        </div>
                    </div> 
                </div>
            </el-col>

            <el-col :span="6">
                <div class="card">
                    <div class="card-body d-flex align-center">
                        <div class="icon bg-blue"><i class="iconfont icon-Dropbox"></i></div>
                        <div class="info">
                            <p class="title">全部商品</p>
                            <p class="num">250</p>
                        </div>
                    </div> 
                </div>
            </el-col>

            <el-col :span="6">
                <div class="card">
                    <div class="card-body d-flex align-center">
                        <div class="icon bg-purple"><i class="iconfont icon-6"></i></div>
                        <div class="info">
                            <p class="title">訂單數量</p>
                            <p class="num">25</p>
                        </div>
                    </div> 
                </div>
            </el-col>
        </el-row>


        <el-row :gutter="20" class="d-flex">
            <el-col :span="8" class="cicleBox">
                <RingChart></RingChart>
            </el-col>
            <el-col :span="16" class="barBox">
                <BarChart></BarChart>
            </el-col>  
        </el-row>
      
       
    </div>
</template>

<script>
import Subheader from '../components/Subheader';
import BarChart from '../components/BarChart';
import RingChart from '../components/RingChart';
import { VueEditor } from "vue2-editor";

export default {
    name: "ItemEdit",
    components: {
        Subheader,
        VueEditor,
        BarChart,
        RingChart
    },
    props: {
        id: {}
    },
    data() {
        return {
            form: {
                name: "",
                img:"",
                desc:"",
                price:"",
                discountPrice:"",
                category:"",
                status:"",
                detail:"",
                stock:""
            },
            categories:[]    
        };
    },
    methods: {
        afterUpload(res){
            this.form.img = res.url;
        },
        async onSubmit() {
            let res;
            if (this.id) {
                const res = await this.$http.put(`products/${this.id}`, this.form);
            } else {
                const res = await this.$http.post("products", this.form);
            }
            this.$router.push("/products/list");
            this.$message({
                type: "success",
                message: "保存成功"
            });
        },
        async getProduct() {
         
            const res = await this.$http.get(`products/${this.id}`);
            this.form = res.data;
        },
        async getCategory() {
            const res = await this.$http.get('category');
            this.categories = res.data;
        },
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {

            // 提交表單數據用
            const formData = new FormData();
            formData.append("file", file);
        
            const res = await this.$http.post('uploads',formData)
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        }
    },
    created() {
        this.id && this.getProduct();
        this.getCategory();

    }
};
</script>
<style>
    .card{
        border: 1px solid #e5e9ec;
        background: #fff;
    }

    .card .card-body{
        flex: 1 1 auto;
        padding: 1.25rem;
    }
    .card .icon{
        width: 60px;
        height: 60px;
        border-radius: 50%;

    }
    .info{
        margin-left: 15px;
    }

    .title{
        font-size: 14px;
        letter-spacing: 1px;
        margin-bottom:5px;
        color: #696969;
       
    }

    p{
        margin: 0px;
    }
    .num{
        font-size: 28px;
        letter-spacing: 1px; 
        font-weight: bold;  
    }

    .card .card-body .icon i{
        font-size: 27px;
        display: block;
        text-align: center;
        color: #fff;
        line-height: 60px;
    }
    .barBox{
        padding-left: 10px;
        padding-right: 10px;
        background: #fff;
        margin: 30px 0;
         box-sizing: content-box;
    }
    .cicleBox{
        padding-left: 10px;
        padding-right: 10px;
        background: #fff;
          margin: 30px 0;
        margin-right: 30px;
        box-sizing: content-box;
    }


    
</style>
  

