<template>
  <div class="insects-page">
    <mine-filter @search="refreshList" category="insects" :conditions="conditions" :list="list"></mine-filter>
    <div class="no-search-result" v-if="list.length===0">没有搜索结果</div>
    <div class="scroll-container" :style="{'height':clientHeight}">
      <mine-scroll
        ref="scroll"
        :pullDown="false"
        :pullUp="haveMoreData"
        @isBottom="getData"
        v-show="list.length!==0"
      >
        <ul class="list">
          <li class="item" v-for="(item,index) in list" :key="index" @click="showDetail(item.id)">
            <img :src="item.imgUrl" :alt="item.enName">
            <div class="item-right">
              <div class="item-title">
                <h2 class="item-name">{{item.zhName }}</h2>
                <span class="iconfont icon-selected" @click.stop="select($event, item.id)" :class="{'selected':item.owned}"></span>
              </div>
              <div class="item-detail">
                <p class="appear-time">{{item.appearTime}}</p>
                <p class="appear-place">{{item.appearPlace}}</p>
              </div>
            </div>
          </li>
        </ul>
      </mine-scroll>
    </div>
    <insects-detail  ref="detail" :id="id"/>
  </div>
</template>

<script>
  import Vue from "vue";
  import {category, conditions, recordNumInPage} from "./config";
  import MineScroll from "@/components/mineScroll";
  import router from "@/router";
  import InsectsDetail from "./insectsDetail";
  import MineFilter from "@/components/mineFilter";

  export default {
    name:"insects",
    components:{
      MineScroll,
      InsectsDetail,
      MineFilter
    },
    data(){
      return {
        list:[],
        id:null,
        conditions:conditions,    //用来记录所有搜索条件的数组
        clientHeight:null,        //用来计算scroll-container应设置的高度
        curPage:0,
        haveMoreData:true           //是否还有数据
      };
    },
    created(){
      this.getData();
    },
    mounted(){
      this.clientHeight=`${document.documentElement.clientHeight-75}px`;  //swiper的滑动的原理是一个固定宽度的窗口，里面有一个很长的内容
    },
    methods:{
      //从后端分页获取数据
      getData(){
        this.curPage++;
        const config={
          params:{
            pageId:this.curPage,
            recordNumInPage
          },
          headers:{
            "Authorization":window.localStorage.getItem("token")
          }
        };
        Vue.http.get("http://62.234.172.175:3000/insects",config).then(res => {
          if(res.body.length===0){
            this.$refs.scroll.noMore();
            this.haveMoreData=false;
          }else{
            this.list=this.list.concat(res.body);
            this.$refs.scroll.pullUpEnd();
          }
        },res=>{
          console.error(res.body.message);
          router.push("/registerAndLogin");
        });
      },

      //勾选或取消owned
      select(event, id){
        const config={
          params:{
            category:"insects",
            cid:id
          },
          headers:{
            token:window.localStorage.getItem("token")
          }
        };
        Vue.http.post("http://62.234.172.175:3000/owned",config).then(res=>{
          if(res.bodyText==="true"){
            event.target.classList.add("selected");
          }else{
            event.target.classList.remove("selected");
          }
        },res=>{
          console.error(res.body.message);
          router.push("/registerAndLogin");
        });
      },

      //显示详细信息
      showDetail(id){
        this.id=Number(id);
        setTimeout(() => {
          this.$refs.detail.getData();
        }, 0);
      },

      //获取到搜索结果后，更新列表，，
      refreshList(data){
        this.list=data;
        // this.$refs.scroll.update();     //更新滚动页面的长度
        this.$refs.scroll.toTop();      //回到顶部
        this.haveMoreData=false;        //关闭上拉的loading信息
      },
    }
  };
</script>

<style lang="scss" scoped>
  .list{
    width:100%;
    padding:0 6px 6px 6px;
    .item{
      width:100%;
      margin-top:6px;
      height:70px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius:10px;
      box-shadow: 2px 2px 2px #D3D3D3;
      img{
        width:150px;
        height:60px;
        margin-left:10px
      }
      .item-right{
        height:100%;
        margin-top:5px;
        margin-right:10px;
        display: flex;
        flex-direction:column;
        justify-content: space-around;
        flex-grow: 1;
        .item-title{
          display:flex;
          justify-content: space-between;
          align-items: center;
          .iconfont{
            color:#d4d4d4;
            font-size:20px;
          }
          .selected{
            color:green;
          }
          .item-name{
            font-size:18px;
          }
        }
        .item-detail{
          display:flex;
          justify-content: space-between;
          font-size:12px;
          .appear-time{
            max-width:140px;
          }
          .appear-place{
            flex-basis: 60px;
            text-align: end;
          }
        }
      }
    }
  }
  .no-search-result{
    padding:20px;

  }
</style>
