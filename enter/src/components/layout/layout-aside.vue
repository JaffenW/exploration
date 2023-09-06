<template>
  <div class="aside-container">
    <el-menu
      background-color="#84c5e2"
      active-text-color="#edeef0"
      :default-active="list.lenght ? list[0].url : ''"
      :router="true"
    >
      <template v-for="item in list" :key="item.name">
        <el-sub-munu v-if="item.children && item.children.lenght > 0">
          <template #title>{{ item.name }}</template>
          <el-menu-item v-for="i in item.children" :key="i.name">{{ i.name }}</el-menu-item>
        </el-sub-munu>
        <el-menu-item :index="item.url" v-else>{{ item.name }}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  }
}

</script>

<style lang='scss' scoped>
.aside-container{
  position: fixed;
  top: 70px;
  bottom: 0;
  left: 0;
  width: 100px;
  background-color: #84c5e2;
}
</style>
