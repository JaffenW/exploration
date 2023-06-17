<template>
  <div class="aside">
    left
  </div>
</template>

<script>
export default {
  name: 'Aside'
}
</script>

<style scoped>
.aside{
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 70px;
  height: 200px;
  background-color: rgb(255,255,255);
  text-align: center;
  box-shadow: 0 1px 3px 1px rgb(232, 225, 225);
  border-radius: 8px;
  padding: 5px 2px;
}
</style>
