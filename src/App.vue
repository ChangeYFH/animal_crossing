<template>
  <div id="app">
    <div class="nav">
      <router-link to="/"><span class="iconfont icon-arrow-left back"></span></router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
  #app{
    width:100%;
    height:100%;
  }
  .nav{
    width:100%;
    height:45px;
    background-color:#6fba8b;
    position:relative;
    .back{
      width:45px;
      height:45px;
      position:absolute;
      left:10px;
      top:0;
      font-size:30px;
      line-height:45px;
    }
  }
</style>
