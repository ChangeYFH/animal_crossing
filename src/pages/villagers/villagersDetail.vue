<template>
    <pop-up ref='popUp'>
      <div class='detail'>
        <img :src="detail.imgUrl" :alt="detail.name" class="detail-img">
        <span class="detail-name">{{detail.name}}</span>
        <span class="detail-appear-time">性别 : {{detail.sex}}</span>
        <span class="detail-appear-place">种族 : {{detail.race}}</span>
        <span class="detail-size-shasow">性格 : {{detail.character}}</span>
      </div>
    </pop-up>
</template>

<script>
  import PopUp from "@/components/minePopUp";
  import Vue from "vue";

  export default {
    name:"villagersDetail",
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
        Vue.http.get(`http://62.234.172.175:3000/villagers/detail?id=${this.id}`).then(res => {
          let data=JSON.parse(res.bodyText);
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
        width:130px;
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
