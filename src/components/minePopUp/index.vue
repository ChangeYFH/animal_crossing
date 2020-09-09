<template>
    <div appear name="popUp" class="popUp hidden" v-show="display" @click="hide" ref="popUp">
      <div class="content-container">    <!-- 由于不知道子元素的大小，父元素不能用flex，子元素不能用transform:translate3d(-50%,-50%,0)，所以添加一个中间元素，在该元素上使用flex布局 -->
        <div class="content shrink" :key="1" ref="content">
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
        setTimeout(()=>{                                        //延迟添加hidden和shrink类，因为当元素完全显示时，添加类才会出现动画
          this.$refs.popUp.classList.remove("hidden");
          this.$refs.content.classList.remove("shrink");
        },100);
        
      },
      hide(event){
        if(event.target.getAttribute("class")==="content-container"){       //单击背景部分触发隐藏，单击内容部分不会触发
          this.$refs.popUp.classList.add("hidden");
          this.$refs.content.classList.add("shrink");
          var that=this;
          this.$refs.popUp.ontransitionend=function(){                      //当动画结束后再隐藏元素
            that.display=false;
            that.$refs.popUp.ontransitionend=null;                          //如果不解除事件的绑定，所有popUp上的动画结束都会执行该函数，包括显示和隐藏
          };
        };
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
