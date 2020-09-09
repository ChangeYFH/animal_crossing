<template>
  <div class="mine-loading">
    <img src="./loading.gif" alt="loading" class="loading-img">
    <span class="loading-text">{{text}}</span>
  </div>
</template>

<script>
  export default {
    name:"MineLoading",
    props:{
      loadingText:{                 //由于loading-text的值会更改，而loadingText是从父元素获得的，不能更改，所以定义了一个新的变量text
        type:String,
        default:"正在加载..."
      }
    },
    data(){
      return{
        text:""                     
      };
    },
    mounted(){
      this.text=this.loadingText;
    },
    methods:{
      setLoadingText(text){         //提供给父元素调用的，用来改变loading-text的值的函数
        this.text=text;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .mine-loading{
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .loading-img{
      margin-right:10px;
    }
  }
</style>