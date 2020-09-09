<template>
    <div class="container">
      <div class="title">
        <img src="@/assets/img/title.png">
      </div>
      <div class="nav-container" @touchstart="touch">
        <router-link to="/fish" class="fish" >
          <img src="@/assets/img/fish.png" alt="fish">
          <span>鱼类图鉴</span>
        </router-link>
        <router-link to="/insects" class="insects">
          <img src="@/assets/img/insects.png" alt="insects">
          <span>昆虫图鉴</span>
        </router-link>
        <router-link to="/villagers" class="villagers">
          <img src="@/assets/img/villagers.png" alt="villagers">
          <span>村民图鉴</span>
        </router-link>
        <router-link to="/clothes" class="clothes" >
          <img src="@/assets/img/clothes.png" alt="clothes">
          <span>衣服图鉴</span>
        </router-link>
      </div>
      <span>ICP主体备案号 冀ICP备20009190号</span>
    </div>
</template>

<script>
  export default {
    name:"index",
    data(){
      return{
        animation:false
      };
    },
    methods:{
      touch(event){
        if(event.target.nodeName==="A"){
          event.target.classList.add("active");
          setTimeout(() => { event.target.classList.remove("active"); }, 0);
        }else{
          let node=event.target.parentNode;
          while(node.nodeName!=="A"){
            node=node.parentNode;
          }
          node.classList.add("active");
          setTimeout(() => { node.classList.remove("active"); }, 0);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variables.scss';
  .container{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: url('~@/assets/img/background.png');
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    text-align:center;
    .title{
      padding:0 6%;
      img{
        width:100%;
      }
    }
    .nav-container{
      display:flex;
      flex-direction: column;
      >a{
        display:flex;
        align-items:center;
        justify-content: center;
        border-radius:15px;
        width:88%;
        height:60px;
        margin:0 6% 3% 6%;
        font-size:16px;
        img{
          width:35px;
          margin-right:20px;
          flex-basis: 35px;
        }
        p{
          display:block;
          text-align: center;
          flex-grow: 1;
        }
      }
    }
  }
  .active{
    animation: click 0.1s;
  }
  .fish{
    background-color: #6080d6;
  }
  .insects {
    background-color: #f6cc68;
  }
  .clothes{
    background-color: #f6a8b3;
  }
  .villagers{
    background-color: #eb9366;
  }
  .auth{
    display:block;
    width:94%;
    height:10%;
    background-color: #FA8072;
    margin:0 3% 3% 3%;
    border-radius: 15px;
  }
  .active{
    animation: click 0.1s;
  }
</style>
