<template class="app-wrapper">
  <layout-navigate :list="navList" @on-change="searchMenu"></layout-navigate>
  <layout-aside :list="asideList"></layout-aside>
  <layout-main></layout-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LayoutNavigate from '@/components/layout/layout-navigate.vue'
import LayoutAside from '@/components/layout/layout-aside.vue'
import LayoutMain from '@/components/layout/layout-main.vue'
import { getSystemList, getMenuList } from '@/api/system'

const navList = ref([])
const asideList = ref([])

const searchMenu = (code) => {
  getMenuList({ sCode: code }).then(res => {
    if (res.code === 0) {
      asideList.value = res.data
    }
  })
}

onMounted(() => {
  getSystemList().then(res => {
    if (res.code === 0 && res.data.length > 0) {
      navList.value = res.data
      searchMenu(res.data[0].code)
    }
  })
})
</script>

<style lang='scss' scoped>
.app-wrapper{
  position: relative;
}
</style>
