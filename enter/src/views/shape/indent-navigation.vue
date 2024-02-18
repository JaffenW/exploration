<template>
  <div class="container">
    <div class="piece"></div>
    <div class="moon-wrapper">
      <div></div>
    </div>
    <div class="hello">hello world</div>
  </div>
</template>

<script>
export default {

}

</script>

<style lang='scss' scoped>
.container {
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;

  .piece {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    // box-shadow: type x-offset y-offset blur expand color
    // blur: 模糊半径，会以阴影边距为中心将阴影模糊， expand：拓展阴影的范围
    box-shadow: inset -3px -3px 3px rgba(0,0,0, 0.3), inset 3px 3px 3px rgba(255,255,255,0.7), 3px 3px 3px rgba(0,0,0, 0.3);
  }
  .hello {
    height: 100px;
    width: 100px;
    line-height: 100px;
    color: transparent;
    outline: 1px dotted black;
    -webkit-text-stroke: 1px black; // 描边
    box-shadow: 0 0 3px 3px pink;
    text-shadow: 20px 20px 2px black;
  }
  .moon-wrapper {
    height: 100px;
    width: 150px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      box-shadow: 20px 0 0 rgba(255,255,255, 0.7);
    }
  }
}
</style>
