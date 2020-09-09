<template>
    <pop-up ref='popUp'>
      <div class='detail'>
        <img :src="detail.imgUrl" :alt="detail.enName" class="detail-img">
        <span class="detail-name">{{detail.zhName}} / {{detail.enName}}</span>
        <span class="detail-appear-time">出现时间 : {{detail.appearTime}}</span>
        <span class="detail-appear-place">出现地点 : {{detail.appearPlace}}</span>
        <span class="detail-size-shasow">出现天气 : {{detail.appearWeather}}</span>
        <div class="month">
          <span class="month-title">北半球活跃月份</span>
          <div class="month-detail">
            <span v-for="count in 12" :key="count" class="block" :class="{'active':detail.northMonth && detail.northMonth.indexOf(`${count}`)!==-1}">{{count}}</span>
          </div>
        </div>
        <div class="month">
          <span class="month-title">南半球活跃月份</span>
          <div class="month-detail">
            <span v-for="count in 12" :key="count" class="block" :class="{'active':detail.southMonth && detail.southMonth.indexOf(`${count}`)!==-1}">{{count}}</span>
          </div>
        </div>
      </div>
    </pop-up>
</template>

<script>
  import PopUp from "@/components/minePopUp";
  import Vue from "vue";

  export default {
    name:"fishDetail",
    components:{
      PopUp
    },
    props:{
      id:{
        type:Number
      }
    },
    data(){
      return{
        detail:{}
      };
    },
    methods:{
      getData(){
        Vue.http.get(`http://62.234.172.175:3000/insects/detail?id=${this.id}`).then(res => {
          let data=JSON.parse(res.bodyText);
          data.northMonth=data.northMonth.split("-");
          data.southMonth=data.southMonth.split("-");
          this.detail=data;
          this.$refs.popUp.show();
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .detail{
    height:400px;
    width:250px;
    background-color: white;
    display:flex;
    flex-direction:column;
    align-items:center;
    font-size:14px;
    justify-content:space-around;
    border-radius:15px;
    .detail-img{
      width:250px;
    }
    .detail-name{
      font-size:20px;
      padding:0 5px;
      text-align:center;
    }
    .detail-appear-time{
      padding:0 5px;
      text-align:center;
    }
    .month{
      width:100%;
      padding-left:10px;
      padding-right:10px;
      .month-detail{
        width:100%;
        display:flex;
        justify-content: space-around;
        flex-wrap:wrap;
        .block{
          width:16%;
          height:14px;
          font-size:12px;
          margin-top:5px;
          text-align:center;
          border:1px solid black;
          border-radius: 3px;
        }
        .active{
          background-color: orange;
        }
      }
    }
  }
</style>
