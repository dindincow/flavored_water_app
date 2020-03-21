<template>
    <div class="categoryEdit">
        
        <Subheader :pageTitle="id ? '編輯活動': '新增活動'"></Subheader>

        <div class="panel">
            <el-row>
                <el-col :span="12">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="活動名稱">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="活動圖片">
                            <el-upload
                                class="img-uploader"
                                :action="$http.defaults.baseURL+'/uploads'"
                                :show-file-list="false"
                                :on-success="afterUpload"
                            >
                            <img v-if="form.img" :src="form.img" class="avatar" />
                            <i v-else class="el-icon-plus img-uploader-icon" style="line-height: 178px;"></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="詳情">
                            <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="form.detail"></vue-editor>
                        </el-form-item>

                        <el-form-item class="btn-wrapper">
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Subheader from '../components/Subheader';
import { VueEditor } from "vue2-editor";

export default {
    name: "ItemEdit",
    components: {
        Subheader,
        VueEditor
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
                const res = await this.$http.put(`actives/${this.id}`, this.form);
            } else {
                const res = await this.$http.post("actives", this.form);
            }
            this.$router.push("/active/list");
            this.$message({
                type: "success",
                message: "保存成功"
            });
        },
        async getActiveItem() {
            const res = await this.$http.get(`actives/${this.id}`);
            this.form = res.data;
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
        this.id && this.getActiveItem();
    }
};
</script>
<style>
.img-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-align: left;
    width: 15rem;
}
.img-uploader .el-upload:hover {
    border-color: #409EFF;
}
.img-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.btn-wrapper{
    text-align: right;
}
.el-icon-plus,.avatar{
    width: 15rem;
} 

</style>
