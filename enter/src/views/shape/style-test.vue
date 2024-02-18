<template>
  <div class="container">
    <div class="child">11</div>
    <el-progress :percentage="50" />
  </div>
</template>

<script>
export default {
  name: 'style-test',
  mounted () {
  }
}
</script>

<style scoped lang="less">
:root {
  --red: red;
  --blue: blue;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
}
/deep/.el-progress__text {
  color: var(--red);
}
.child {
  height: 200px;
  line-height: 200px;
  width: 200px;
  background-color: var(--red);
}
</style>
