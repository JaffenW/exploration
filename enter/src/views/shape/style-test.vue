<template>
  <div class="container">
    <div class="child" @click="changeColor">11</div>
    <el-button @click="changeColor(1)">默认</el-button>
    <el-button @click="changeColor(2)">蓝色</el-button>
    <el-button @click="changeColor(3)">黄色</el-button>
    <el-progress :percentage="50" />
  </div>
</template>

<script>
export default {
  name: 'style-test',
  mounted () {
  },
  methods: {
    changeColor (type) {
      if (type === 1) {
        document.documentElement.setAttribute('data-theme', 'default')
      } else if (type === 2) {
        document.documentElement.setAttribute('data-theme', 'blue')
      } else {
        document.documentElement.setAttribute('data-theme', 'yellow')
      }
    }
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
  background-color: var(--color-primary);
}
</style>
