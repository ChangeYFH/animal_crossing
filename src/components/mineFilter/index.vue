<template>
  <div class="filter">
    <div class="filter-header">
      <span class="filter-condition">{{filterConditions}}</span>
      <div class="filter-owned" @click="changeOwnedStatus">
        <span class='active'>全部</span><span>已拥有</span><span>未拥有</span>
      </div>
      <div class="filter-button" @click="toggleInterface">
        <span class="iconfont" :class="icon"></span><span>筛选</span>
      </div>
    </div>
    <transition-group tag="div" name="interface" class="filter-interface" v-if="displayInterface">
      <ul class="condition-list" :key="1">
        <li class="condition-item" v-for="(item,key) in conditions" :key="key">
          <span class="condition-item-name">{{conditions[key].name}}</span>
          <div class="condition-item-item">
            <span class="block"
                  v-for="(innerItem,innerIndex) in conditions[key].item" :key="innerIndex"
                  @click="addToCurConditions(key,innerItem)"
                  :class="{'active':curConditions[key] && curConditions[key].indexOf(innerItem)!==-1}"
            >{{innerItem}}</span>
          </div>
        </li>
      </ul>
      <div class="search" @click="search" :key="2">搜索</div>
      <div class="layer"  @click="displayInterface=!displayInterface" :key="3"></div>
    </transition-group>
  </div>
</template>

<script>
  import Vue from "vue";

  export default {
    name:"index",
    props:{
      category:{
        type:String
      },
      conditions:{        //可供选择的条件有哪些
        type:Object
      },
      list:{
        type:Array
      }
    },
    data(){
      return{
        displayInterface:false,    //搜索菜单是否显示
        icon:"icon-arrow-bottom",   
        curConditions:{},          //搜索的条件（对象形式）
        filterConditions:"全部",   //搜索的条件（字符串形式）
        clientHeight:""           //搜索菜单下方的遮罩层的高度
      };
    },
    watch:{
      displayInterface(){         
        if(!this.displayInterface){
          this.icon="icon-arrow-bottom";
        }else{
          this.icon="icon-arrow-top";
        }
      }
    },
    methods:{
      //点击筛选按钮后，只会保留owned的搜索条件
      toggleInterface(){
        this.displayInterface=!this.displayInterface;
        if(this.curConditions.owned!==undefined){
          this.curConditions={owned:this.curConditions.owned};
        }else{
          this.curConditions={};
        }
      },
      //用来更改搜索条件
      addToCurConditions(key, value){
        if(!this.curConditions[key]){                          //判断是否存在该搜索类型，例如 northMonth,appearTime,appearPlace
          this.$set(this.curConditions, key, [value]);         //如果不存在该类型，创建一个该类型的键，值为一个包含value的数组
        }else{
          if(this.curConditions[key].indexOf(value)!==-1){     //如果该类型存在，则继续判断该类型的值对应的数组中是否有value
            this.$set(this.curConditions, key, this.curConditions[key].filter(item => { return item !== value; }));   //如果有则返回一个除了该value的数组
          }else{
            this.$set(this.curConditions, key, [...this.curConditions[key], value]);      //如果没有则添加该value到数组中
          }
        }
      },
      search(){
        let query=this.generateQuery();      //生成query字符串
        const config={headers:{"Authorization":window.localStorage.getItem("token")}};
        Vue.http.get(`http://62.234.172.175:3000/${this.category}/search${query}`,config).then(res=>{
          this.filterConditions=this.generateDescription();       //生产描述当前选择的条件的字符串
          this.displayInterface=false;          //隐藏搜索菜单
          this.$emit("search",res.body);
        });
      },
      changeOwnedStatus(event){
        const ownedList=document.querySelector(".filter-owned").childNodes;
        for(let item of ownedList){                           //移除已拥有，未拥有，全部的激活状态
          item.classList.remove("active");
        };
        event.target.classList.add("active");                 //将当前点击的元素设置为激活状态
        switch(event.target.innerText){                       //根据点击的元素，设置owned的属性
          case "已拥有":
            this.curConditions.owned=true;
            break;
          case "未拥有":
            this.curConditions.owned=false;
            break;
          case "全部":
            delete this.curConditions.owned;
            break;
        }
        if(this.displayInterface===false){        //当搜索菜单显示时，只是将owned的状态添加到搜索条件中，而不会去服务器搜索结果
          this.search();
        }
      },

      //生成query字符串
      generateQuery(){
        let curConditionsKeys=Object.keys(this.curConditions);
        let query="?";
        curConditionsKeys.forEach((itemOuter)=>{
          if(Array.isArray(this.curConditions[itemOuter])){
            this.curConditions[itemOuter].forEach((itemInner)=>{
              query+=itemOuter+"="+itemInner+"&";
            });
          }else{
            query+=itemOuter+"="+this.curConditions[itemOuter]+"&";
          }
        });
        query=query.slice(0,-1);
        return query;
      },

      //生产描述当前选择的条件的字符串
      generateDescription(){
        let curConditionsKeys=Object.keys(this.curConditions);
        let str="";
        curConditionsKeys.forEach((item)=>{
          if(item!=="owned"){                       //字符串中没有owned
            str+=this.conditions[item].name+":";
            this.curConditions[item].forEach((item)=>{
              str+=item+",";
            });
            str=str.slice(0,-1);
            str+="  ";
          }
        });
        if(str.length===0){                         //如果条件只有owned
          switch(this.curConditions.owned){
            case true:
              str="已拥有";
              break;
            case false:
              str="未拥有";
              break;
            default:
              str="全部";
          }
        }
        return str;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .filter{
    width:100%;
    position:relative;
    .filter-header{
      width:100%;
      height:30px;
      display:flex;
      justify-content:flex-end;
      align-items:center;
      padding:15px;
      font-size:14px;
      line-height:18px;
      span{
        margin:0;
      }
      .filter-condition{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size:12px;
        flex:1;
      }
      .filter-owned{
        border-radius:5px;
        span{
          font-size:12px;
          padding:1px;
          border-left:1px solid black;
          border-top:1px solid black;
          border-bottom:1px solid black;
          &:last-child{
            border:1px solid black;
          }
        }
      }
      .filter-button{
        margin-left:5px;
        font-size:12px;
        min-width:40px;
        &>*{
          vertical-align: bottom;
        }
      }
    }
    .filter-interface{
      width:100%;
      display:flex;
      flex-direction:column;
      position:absolute;
      top:30px;
      left:0;
      z-index:100;
      .condition-list{
        width:100%;
        background-color: transparent;
        .condition-item{
          width:100%;
          border-bottom:1px solid black;
          display: flex;
          justify-content: space-around;
          align-items: flex-start;
          flex-direction:column;
          padding:20px;
          background-color:#F2F2F2;
          &:last-child{
            border-bottom:none;
          }
          .condition-item-name{
            font-size:16px;
          }
          .condition-item-item{
            width:100%;
            display:flex;
            flex-wrap:wrap;
            .block{
              min-width:15%;
              height:18px;
              font-size:12px;
              border:1px solid black;
              border-radius:3px;
              margin:5px 5px 5px 0;
              text-align: center;
              line-height:16px;
            }
          }
        }
      }
      .search{
        width:100%;
        height:40px;
        font-size:18px;
        background-color:red;
        color:white;
        line-height:40px;
        text-align:center;
      }
      .layer{
        background-color:rgba(0,0,0,0.5);
        height:100vh;
      }
    }
  }
  .active{
    background-color: orange !important;
  }
  .interface-enter,.interface-leave-to{
    bottom:100%;
  }
  .interface-enter-active,.interface-leave-active{
    transition:all 10s;
  }
</style>
