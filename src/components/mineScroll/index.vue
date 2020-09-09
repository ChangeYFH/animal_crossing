<template>
  <swiper :options="swiperOptions" class="mine-scroll" ref="swiper">
    <div class="pull-down" v-if="pullDown">
      <mine-loading ref="pullDownLoading"/>
    </div>
    <swiper-slide class="scroll-slide">
      <slot></slot>
    </swiper-slide>
    <div class="pull-up" v-if="pullUp">
      <mine-loading ref="pullUpLoading" />
    </div>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
  import {Swiper, SwiperSlide} from "vue-awesome-swiper";
  import MineLoading from "@/components/mineLoading";
  import {config} from "./config";

  export default {
    name:"index",
    components:{
      Swiper,
      SwiperSlide,
      MineLoading
    },
    props:{
      scrollbar:{
        type:Boolean,
        default:true
      },
      pullDown:{
        type:Boolean,
        default:true
      },
      pullUp:{
        type:Boolean,
        default:true
      }
    },
    created() {
      this.init();
    },
    methods:{
      init(){
        this.swiperOptions = {
          direction:"vertical",   //滑动方向
          slidesPerView:"auto",   //设置slider容器能够同时显示的slides数量
          freeMode:true,          //slide会根据惯性滑动且不会贴合
          setWrapperSize:true,    //Swiper使用flexbox布局，感觉不需要
          scrollbar:{el:this.scrollbar ? ".swiper-scrollbar" : null, hide:true},    //是否使用滚动条
          on:{
            sliderMove:this.scroll,     //手指触碰Swiper并拖动slide的过程中不断执行this.scroll函数
            touchEnd:this.touchEnd      //触摸释放时执行this.touchEnd函数
          }
        };
      },
      scroll(){
        let swiper=this.$refs.swiper.$swiper;
        if(this.pullDown){
          if(swiper.translate>config.PullDownHeight){
            this.$refs.pullDownLoading.setLoadingText(config.PullDownTextIng);
          }else{
            this.$refs.pullDownLoading.setLoadingText(config.PullDownTextStart);
          }
        }
        if(this.pullUp){
          if(swiper.isEnd && swiper.height+Math.abs(swiper.translate)-parseInt(swiper.$wrapperEl.css("height"))>config.PullUpHeight){
            this.$refs.pullUpLoading.setLoadingText(config.PullUpTextIng);
          }else{
            this.$refs.pullUpLoading.setLoadingText(config.PullUpTextStart);
          }
        }
        this.$emit("scroll", swiper);
      },
      touchEnd(){
        let swiper=this.$refs.swiper.$swiper;
        if(this.pullDown){
          if(swiper.translate>config.PullDownHeight){
            swiper.allowTouchMove=false; // 禁止触摸
            swiper.setTransition(swiper.params.speed);
            swiper.setTranslate(config.PullDownHeight); // 将位置调整到PULL_DOWN_HEIGHT
            swiper.params.virtualTranslate=true; // 定住不回弹
            this.$emit("isTop");
          }
        }
        if(this.pullUp){
          if(swiper.isEnd && swiper.height+Math.abs(swiper.translate)-parseInt(swiper.$wrapperEl.css("height"))>config.PullUpHeight){
            swiper.allowTouchMove=false; // 禁止触摸
            swiper.setTransition(swiper.params.speed);
            swiper.setTranslate(-(parseInt(swiper.$wrapperEl.css("height"))+config.PullUpHeight-swiper.height)); // 将位置调整到PULL_DOWN_HEIGHT
            swiper.params.virtualTranslate=true; // 垂直方向不能移动
            this.$emit("isBottom");
          }
        }
      },
      pullDownEnd(){
        let swiper=this.$refs.swiper.$swiper;
        this.$refs.pullDownLoading.setLoadingText(config.PullDownTextEnd);
        swiper.allowTouchMove=true; // 取消禁止触摸
        swiper.setTransition(swiper.params.speed);
        swiper.params.virtualTranslate=false; // 垂直方向可以移动（需要先进行这步，再移动）
      },
      pullUpEnd(){
        let swiper=this.$refs.swiper.$swiper;
        this.pulling = false;
        this.$refs.pullUpLoading.setLoadingText(config.PullUpTextEnd);
        swiper.allowTouchMove=true; // 取消禁止触摸
        swiper.params.virtualTranslate=false; // 垂直方向可以移动（需要先进行这步，再移动）
      },
      noMore(){
        let swiper=this.$refs.swiper.$swiper;
        this.pulling = false;
        this.$refs.pullUpLoading.setLoadingText(config.PullUpTextBottom);
        swiper.allowTouchMove=true; // 取消禁止触摸
        swiper.params.virtualTranslate=false; // 垂直方向可以移动（需要先进行这步，再移动）
        setTimeout(() => {
          swiper.setTransition(swiper.params.speed);
          swiper.setTranslate(-(parseInt(swiper.$wrapperEl.css("height"))-swiper.height));
        }, 1000);
      },
      update(){
        this.$refs.swiper.$swiper.update();
      },
      toTop(){
        this.$refs.swiper.$swiper.setTranslate(0);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .mine-scroll{
    position:relative;
    height:100%;
    width:100%;
    .scroll-slide{
      height:auto;      //!!!非常重要，需要让.scroll-slide的高度为内容的高度，而不能是其父元素的高度
    }
  }
  .pull-down{
    position:absolute;
    left:0;
    bottom:100%;
    width:100%;
    height:80px;
  }
  .pull-up{
    position:absolute;
    left:0;
    top:100%;
    width:100%;
    height:80px;
  }
</style>
