<template>
   
    <el-dialog title="新增使用者" :visible.sync="isShowPopup" :before-close="cancel" >
        <el-form :model="form">
            <el-form-item label="帳號">
                <el-input v-model="form.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="暱稱">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密碼">   
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">確 定</el-button>
        </div>
    </el-dialog>
  
</template>

<script>
export default {
    name:'AddUserPopup',
    props:{
        isShowPopup :Boolean
    },
    data() {
        return {
            showPopup: false,   
            form: {
                account: '',
                username: '',
                password: '',
            }, 
            formLabelWidth: '120px',
            hasShow:false
        };
    },
    methods: {
        cancel(){
            this.$emit('hidePopBox')
        },
        async submit(){
            console.log('form',this.form);
            const res = await this.$http.post("user/register",this.form);
            console.log('res',res)
            
        }
    },
    mounted(){
        
    },
    
    
};
</script>