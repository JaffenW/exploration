<template>
  <div class="wrapper">
    <div class="item"></div>
    <div class="item1">hello world</div>
  </div>
</template>

<script>
export default {

}

</script>

<style lang='scss' scoped>
.wrapper {
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  // background-color: black;

  .item {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    box-shadow: inset -3px -3px 3px rgba(0,0,0, 0.3), inset 3px 3px 3px rgba(255,255,255,0.7), 3px 3px 3px rgba(0,0,0, 0.3);
    // box-shadow: 25px 0px 3px 0 rgba(255,255,255, 0.7);
  }
  .item1 {
    height: 100px;
    width: 100px;
    line-height: 100px;
    color: transparent;
    outline: 1px dotted black;
    -webkit-text-stroke: 1px black;
    box-shadow: 0 0 3px 3px pink;
    text-shadow: 20px 20px 2px black;
  }
}
</style>
