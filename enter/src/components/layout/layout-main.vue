<template>
  <div class="main-container">
    <router-view/>
  </div>
</template>

<script>
export default {

}

</script>

<style lang='scss' scoped>
.main-container{
  position: fixed;
  left: 100px;
  top: 70px;
  bottom: 0;
  right: 0;
  background-color: #edeef0;
  padding: 10px 20px;
}
</style>
