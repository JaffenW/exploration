<template>
  <div class="navigate-container">
    <div class="left">
      <div
        v-for="(item, index) of props.list"
        :key="item.code"
        :class="['item', activeIndex === index ? 'active-item' : '']"
        @click="changeSystem(index,item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="right">
      <span @click="updatePassword">修改密码</span>
      <span @click="loginout">退出登录</span>
      <span>设置</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['onChange'])
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
const activeIndex = ref(0)
const $router = useRouter()

const changeSystem = (index, item) => {
  activeIndex.value = index
  emit('onChange', item.code)
}

const updatePassword = () => {
  $router.push('/updatePassword')
}

const loginout = () => {
  $router.push('/login')
}
</script>

<style lang='scss' scoped>
.navigate-container {
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: #0280AF;
  padding: 0 20px;
  display: flex;
  align-items: center;

  .left{
    display: flex;
    flex-grow: 1;
  }

  .right{
    display: flex;
    margin-right: 30px;

    span{
      margin-right: 10px;
      color: white;
      cursor: pointer;
    }
  }

  .item {
    color: white;
    height: 30px;
    line-height: 30px;
    width: 100px;
  }
  .active-item {
    box-shadow: 0 0 5px #84c5e2 ;
    border-radius: 20px;
    color: #edeef0;
  }
}
</style>
