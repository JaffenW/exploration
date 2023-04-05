<template>
  <Header/>
  <Aside/>
  <Main/>
</template>

<script>
import Header from '@/components/layout/Header'
import Aside from '@/components/layout/Aside'
import Main from '@/components/layout/Main'
export default {
  name: 'Index',
  components: { Header, Aside, Main }
}
</script>

<style scoped>

</style>
