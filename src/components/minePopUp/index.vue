<template>
    <div appear name="popUp" class="popUp"  v-show="display" @click="hide" ref="popUp">
      <div class="content-container">    <!-- 由于不知道子元素的大小，父元素不能用flex，子元素不能用transform:translate3d(-50%,-50%,0)，所以添加一个中间元素，在该元素上使用flex布局 -->
        <div class="content" ref="content">
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name:"minePopUp",
    data(){
      return{
        display:false
      };
    },
    methods:{
      show(){
        this.display=true;
      },
      hide(event){
        if(event.target.getAttribute("class")==="content-container"){
          this.display=false;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .popUp{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    z-index:100;
    background-color: rgba(0,0,0,0.5);
    opacity: 1;
    transition: all 0.3s;
    .content-container{
      width:100%;
      height:100%;
      display:flex;
      justify-content: center;
      align-items: center;
      .content{
        z-index:101;
        transform:scale(1);
        transition: all 0.3s;
      }
    }
  }
  .hidden{
    opacity: 0 !important;
  }
  .shrink{
    transform:scale(0.9) !important;
  }
</style>
