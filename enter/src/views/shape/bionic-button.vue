<template>
  <div class="container">
    <div class="button">拟态按钮</div>
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
  justify-content: center;
  align-items: center;
  background-color: #f0f0ee;

  .button {
    padding: 20px;
    font-size: 30px;
    color: #333;
    text-shadow: 2px 2px 2px #ccc;
    border-radius: 20px;
    background-color: #fff;
    cursor: pointer;
    user-select: none;
    box-shadow:
      20px 20px 30px rgba(0,0,0, 0.2),
      -20px -20px 30px rgba(255,255,255,1);
    transition: all 0.4 ease-out;
  }
  .button:hover {
    font-size: 26px;
    box-shadow:
      0 0 0 rgba(0,0,0, 0.2),
      0 0 0 rgba(255,255,255,0.8),
      inset 10px 10px 20px rgba(0,0,0, 0.1),
      inset -10px -10px 20px rgba(255,255,255,1);
  }
}
</style>
