<template>
    <div class="container">
      <div class="title">
        <img src="@/assets/img/title.png">
      </div>
      <div class="nav-container">
        <router-link to="/fish" class="fish" @touchstart.native="touchCategory">
          <img src="@/assets/img/fish.png" alt="fish">
          <span>鱼类图鉴</span>
        </router-link>
        <router-link to="/insects" class="insects" @touchstart.native="touchCategory">
          <img src="@/assets/img/insects.png" alt="insects">
          <span>昆虫图鉴</span>
        </router-link>
        <router-link to="/villagers" class="villagers" @touchstart.native="touchCategory">
          <img src="@/assets/img/villagers.png" alt="villagers">
          <span>村民图鉴</span>
        </router-link>
        <router-link to="/clothes" class="clothes" @touchstart.native="touchCategory">
          <img src="@/assets/img/clothes.png" alt="clothes">
          <span>衣服图鉴</span>
        </router-link>
      </div>
      <span>ICP主体备案号 冀ICP备20009190号</span>
    </div>
</template>

<script>
export default {
  name:"home",
  methods:{
    //点击每个分类按钮时会有跳动的动画
    touchCategory(event){
      var currentTarget=event.currentTarget;    //currentTarget是实时的，当setTimeout中调用currentTarget时，该值会变为null，所以提前用一个变量保存
      currentTarget.classList.add("active");
      setTimeout(()=>{        //当动画结束后，再执行移除class的操作
        currentTarget.classList.remove("active");
      },0);
    }
  }
};
</script>

<style lang="scss" scoped>
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
      a{
        display:flex;
        align-items:center;
        justify-content: center;
        border-radius:15px;
        width:88%;
        height:60px;
        margin:0 6% 3% 6%;
        img{
          width:35px;
          margin-right:20px;
        }
        span{
          font-size:16px;
        }
      }
    }
    span{
      font-size:10px;
    }
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
  .active{
    animation:beat 0.1s;
  }

  @keyframes beat{
  0%{
    transform: scale(1);
  }
  50%{
    transform:scale(0.9);
  }
  100%{
    transform: scale(1);
  }
}
</style>