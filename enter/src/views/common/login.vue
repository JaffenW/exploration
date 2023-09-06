<template>
  <div>登录页面</div>
  <el-button @click="$router.push('/welcome')">登录</el-button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const $router = useRouter()

</script>

<style lang='scss' scoped>

</style>
