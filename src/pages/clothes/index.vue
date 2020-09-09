<template>
  <div class="clothes">
    <div class="title">即将上线...</div>
  </div>
</template>

<script>
  export default {
    name:"clothes"
  };
</script>

<style lang="scss" scoped>
  .clothes{
    width:100%;
    height:100%;
    position: relative;
    .title{
      position:absolute;
      top:50%;
      left:50%;
      transform: translate3d(-50%, -50%, 0);
      font-size:20px;
      font-weight:bold;
    }
  }
</style>