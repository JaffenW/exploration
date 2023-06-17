<template>
  <Navigate></Navigate>
  <Aside></Aside>
  <Main></Main>
</template>

<script>
import Navigate from './Navigate.vue'
import Aside from './Aside.vue'
import Main from './Main.vue'

export default {
  name: 'Index',
  components: { Navigate, Aside, Main }
}
</script>

<style scoped>

</style>
