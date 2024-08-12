<template>
  <el-form v-for="item of renderData" :key="item.id">
    <el-form-item v-for="i of item.children" :key="i.id" :label="i.name" >
      <Component :is="i.tag" v-model="formData[`${i.key}`]" ></Component>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue'

const props = defineProps({
  renderData: {
    type: Array,
    default: () => []
  }
})
console.log('==-', props)
const formData = ref({})

watch(formData, (old, newData) => {
  console.log(old, newData)
}, { deep: true })
</script>

<style scoped>

</style>
