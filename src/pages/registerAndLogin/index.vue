<template>
  <div class="registerAndLogin">
    <div class="container">
      <div class="title-container">
        <div class="title" @click="isLogin=true,isRegister=false" :class="{'active':isLogin}">登录</div>
        <div class="title" @click="isLogin=false,isRegister=true" :class="{'active':isRegister}">注册</div>
      </div>
      <div class="content">
        <div class="login" v-if="isLogin">
          <div class="input-box">
            <input type="text" id="email" placeholder="请输入邮箱号" v-model="loginEmail"/>
            <span :key="1"></span>
            <input type="password" id="password" placeholder="请输入密码" v-model="password"/>
            <span :key="2"></span>
          </div>
          <button class="button" @click="login">登录</button>
        </div>
        <div class="register" v-if="isRegister">
          <div class="input-box">
            <input type="text" id="email" placeholder="请输入邮箱号" v-model="registerEmail" @blur="checkEmail"/>
            <span :key="3">{{registerEmailSpan}}</span>
            <input type="password" id="password1" placeholder="请输入密码" v-model="password1" @blur="checkPassword"/>
            <span :key="4">{{password1Span}}</span>
            <input type="password" id="password2" placeholder="请确认密码" v-model="password2" @blur="checkRepetPassword"/>
            <span :key="5">{{password2Span}}</span>
          </div>
          <button class="button" @click="register">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Vue from "vue";

export default {
  name: "registerAndLogin",
  data() {
    return {
      isLogin: true,
      isRegister: false,
      loginEmail:"",
      password:"",
      registerEmail:"",
      password1:"",
      password2:"",
      registerEmailSpan:"",
      password1Span:"",
      password2Span:""
    };
  },
  methods: {
    register() {
      if(this.registerEmailSpan.length===0 && this.password1Span.length===0 && this.password2Span.length===0){
        var password=this.password1;
        Vue.http.post("http://62.234.172.175:3000/user/register",{params:{email:this.registerEmail,password:password}}).then(res=>{
          this.loginEmail=this.registerEmail;     //将注册时填写的邮箱和密码赋值给登录界面
          this.password=this.password1;
          this.login();       //邮箱密码验证成功后自动登录
        },res=>{
          alert(res.body.message);
        });
      }
    },
    login(){
      Vue.http.post( "http://62.234.172.175:3000/user/login",{params:{email:this.loginEmail,password:this.password}}).then(res=>{
        window.localStorage.setItem("token",res.bodyText);
        router.go(-1);
      },res=>{
        alert(res.body.message);
      });
    },
    checkEmail(){       //检查邮箱的格式
      var email=event.target.value;
      var span=event.target.nextElementSibling;
      var pattern=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      if(email.length===0){
        span.innerText="邮箱不能为空";
      }else if(!pattern.test(email)){
        span.innerText="邮箱格式不正确";
      }else{
        span.innerText="";
      }
    },
    checkPassword(){      //检查密码的格式
      var pass=event.target.value;
      var span=event.target.nextElementSibling;
      if(pass.length===0){
        span.innerText="密码不能为空";
      }else if(pass.length<6){
        span.innerText="密码长度不能小于6位";
      }else{
        span.innerText="";
      }
    },
    checkRepetPassword(){       //检查两次密码输入的是否相同
      var span=event.target.nextElementSibling;
      if(this.password1!==this.password2){
        span.innerText="两次密码输入的不相同";
      }else{
        span.innerText="";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.registerAndLogin{
  width:100%;
  height:100%;
  background-color:#89caa2;
  position:absolute;
  top:0;
  left:0;
}
.container {
  width: 260px;
  height: 300px;
  background-color: white;
  border-radius: 15px;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate3d(-50%,-50%,0);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 35px;
  .title-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    margin: 15px 10px 20px 10px;
  }
  .content {
    width: 100%;
    margin-bottom:20px;
    flex-grow:1;
    .login,
    .register {
      height:100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      font-size:0;
      .input-box{
        -webkit-user-select:text !important;
        input {
          -webkit-user-select:text !important;
          font-size: 16px;
          background-color: #f2f2f2;
          border-radius: 5px;
          display: block;
          height: 40px;
          width: 200px;
          padding-left:20px;
          // margin-bottom:18px;
        }
      }
      .button {
        width: 200px;
        height: 45px;
        border-radius: 5px;
        background-color: red;
        color: white;
        font-size: 16px;
      }
      span{
        height:12px;
        display:block;
        font-size:12px;
        color:red;
        line-height:12px;
        margin-bottom: 6px;
      }
    }
  }
}
.active {
  color: red;
}
</style>
