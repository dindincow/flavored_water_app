<template>
    <div class="categoryEdit">
        
        <Subheader :pageTitle="id ? '編輯廣告': '新增廣告'"></Subheader>

        <div class="panel">
            <el-row>
                <el-col :span="12">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="廣告名稱">
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

                        <el-form-item label="活動連結">
                            <el-input v-model="form.link"></el-input>
                        </el-form-item>
                       

                        <el-form-item class="btn-wrapper">
                            <el-button  @click="$router.history.go(-1)">取消</el-button>
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
            form: {
                name: "",
                img:"",
                link:""
            },
        };
    },
    methods: {
        afterUpload(res){
            this.form.img = res.url;
        },
        async onSubmit() {
            let res;
            let msg="";

            if (this.id) {
                const res = await this.$http.put(`banner/${this.id}`, this.form);
                msg="修改成功";
            } else {
                const res = await this.$http.post("banner", this.form);
                msg="新增成功";
            }

            this.$router.push("/banner/list");

            this.$message({
                type: "success",
                message: msg
            });
        },
        async getBannerItem() {
            const res = await this.$http.get(`banner/${this.id}`);
            this.form = res.data.banner;
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
        this.id && this.getBannerItem();
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
