<template>
    <div class="login">
        <div class="login_header">
            <div class="login_img"><img src="../../assets/images/logo.png"/></div>
            <h2 class="login_logo">果乾水商城</h2>
            <div class="login_header_title">
                <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">登入</a>
                <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">注冊</a>
            </div>
        </div>
        <div class="login_content">
            <form>
                <!-- 登入 -->
                <div v-show="loginWay">
                    <section class="login_message">
                        <input type="text" placeholder="帳號" v-model="account">
                    </section>
                    <section class="login_verification">
                        <input type="text" placeholder="密碼" v-model="password">
                    </section>
                    <button class="login_submit" @click="login">登陸</button>
                </div>

                <!-- 注冊 -->
                <div v-show="!loginWay">
                    <section class="login_message">
                        <input type="tel" placeholder="帳號" v-model="account">
                    </section>
                    <section class="login_verification">
                        <input type="password" placeholder="密碼1" v-if="!showPwd" v-model="password">
                        <input type="text" placeholder="密码" v-else v-model="password">
                        <div class="switch_button off" :class="showPwd?'on':'off'" @click="showPwd = !showPwd">
                            <div class="switch_circle" :class="{right:showPwd}"></div>
                            <span class="switch_text">{{showPwd?'abc' : ''}}</span>
                        </div>
                    </section>
                    <button class="login_submit" @click="register">注冊</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import jwt_decode from "jwt-decode";
import { reqRegister ,reqLogin} from '@/api/index'
export default {
   
    data(){
        return{
            loginWay:true, //true:登入: false:注冊
            account:'',//cow@gmail.com
            password:'',//123
            showPwd:true,
            alertText:'hi',
           
        }
    },
    methods:{
 
        // 註冊
        async register(){
            
            if(this.account ==='' || this.password ===''){
                this.$alertTip.show('帳號密碼不能空');
                return
            }

            const data={
                account:this.account,
                password:this.password
            }
            const result = await reqRegister(data);
            this.$alertTip.show(result.message)

        },

        // 登入
        async login(){

            if(this.account ==='' || this.password ===''){
                this.$alertTip.show('帳號密碼不能空');
                return
            }

            const data={
                account:this.account,
                password:this.password
            }

            const result = await reqLogin(data);
              
           
            if(result.code===0){
                localStorage.token = result.token;
                console.log('localStorage.token',localStorage.token)

                // 解析 token
                const decode = jwt_decode(result.token);
                console.log("decode",decode);

                // 獲取 user 資訊
                this.$store.dispatch('getUserInfo',decode.id)

                this.$router.push('/home');
            }
        },
    },

}
</script>

<style lang="scss" scoped>
.login{
    overflow: hidden;
}
.login_header{
    padding: 15px;
    margin: 50px auto 20px auto;
    text-align: center;

}

.login_img{
    width: 100px;
    margin: 15px auto;
}
.login_logo{
    font-size: 35px;
    color:#525252;
    font-weight: 600;
    margin-bottom:15px; 
}

.login_header_title{
    display: flex;
    justify-content: center;
}

.login_header_title a{
    margin: 0 15px;
    padding: 5px 2px;
    color: #4b4b4b;
}

.login_header_title a.on{
    border-bottom: #02a774 3px solid;
    color: #02a774;
}

/*登入表單*/
.login_content{
 padding: 0 30px;
}

.login_message{
    position: relative;
    height: 48px;
    font-size: 14px;
    background: #fff;
} 

input{
    width: 100%;
    height: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: 0;
    font: 400 14px Arial;
}

.login_verification {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
}

.get_verification {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border: 0;
    color: #ccc;
    font-size: 14px;
    background: transparent;
}

.get_verification.right_phone{
    color: #02a774;
}

.login_submit {
    display: block;
    width: 100%;
    height: 42px;
    margin-top: 30px;
    border-radius: 4px;
    background-color: #71a28d;
    color: #fff;
    text-align: center;
    font-size: 16px;
    line-height: 42px;
    border: 0;
}


/*回上頁箭頭*/
.go_back{
    position: absolute;
    top: 20px;
    left: 10px;
    
}

.go_back i{
    font-size: 30px;
}


/*switch_button*/
.switch_button{
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: background-color 0.3s, border-color 0.3s;
    padding: 0 6px;
    width: 30px;
    height: 16px;
    line-height: 16px;
    color: #fff;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
}
.switch_button.off {
  background: #fff;
}

.switch_button.on {
  background: #02a774;
}

.switch_circle {
    position: absolute;
    top: -1px;
    left: -1px;
    width: 16px;
    height: 16px;
    border: 1px solid #ddd;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
    transition: transform 0.3s;
}


.switch_circle.right{
    transform: translateX(30px)
}
</style>