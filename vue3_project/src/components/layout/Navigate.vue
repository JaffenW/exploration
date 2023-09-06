<template>
  <div class="navigate">
    <div class="left">
      <div class="img-wrapper">
        <img src="../../assets/img/logo.png" alt="logo" />
      </div>
    </div>
    <div class="center">
      <div class="menu-wrapper">
        <div
          v-for="item of menuList"
          :key="item.name" class="menu-item"
          @mouseenter="onMouseEnter(item)"
          @mouseleave="onMouseLeave">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="right">
      <div class="img-wrapper">
        <img src="../../assets/svg/search.svg" alt="search" />
      </div>
    </div>
  </div>
  <div :class="['menu-content', activeItem ? 'active': '']">

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup (props) {
    const menuList = ref([
      {
        name: '首页',
        url: ''
      },
      {
        name: '商业生态',
        url: '',
        children: []
      },
      {
        name: '公司简介',
        url: '',
        children: []
      },
      {
        name: '投资者关系',
        url: ''
      },
      {
        name: '新闻咨询',
        url: ''
      },
      {
        name: '人才关系',
        url: ''
      }
    ])
    const activeItem = ref(null)

    const onMouseEnter = (item) => {
      console.log('--', activeItem.value)
      console.log('鼠标移入了', item)
      if (item.children) {
        activeItem.value = item
      }
    }

    const onMouseLeave = () => {
      console.log('鼠标移出了')
      activeItem.value = null
    }

    return {
      menuList,
      activeItem,
      onMouseEnter,
      onMouseLeave
    }
  }
}
</script>

<style lang="scss" scoped>
$navigateHeight: 10vh;

.navigate{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: $navigateHeight;
  text-align: center;
  background-color: pink;
  color: white;
  display: flex;
  border-bottom: 1px solid rgb(226, 226, 226);

  .left{
    height: $navigateHeight;
    border-right: 1px solid rgb(226, 226, 226);

    .img-wrapper img{
      height: 100%;
    }
  }
  .center {
    height: $navigateHeight;
    flex-grow: 2;
    .menu-wrapper{
      width: 70rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .menu-item{
        height: $navigateHeight;
        font-size: 2rem;
        line-height: $navigateHeight;
        border-bottom: 2px solid transparent;
        position: relative;
      }
      .menu-item::before{
        content: '';
        display: block;
        height: 2px;
        width: 0;
        background-color: black;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 auto;
        transition: all 0.2s;
      }
      .menu-item:hover::before{
        width: 100%;
      }
    }
  }
  .right{
    border-left: 1px solid rgb(226, 226, 226);
    height: $navigateHeight;
  }
  .img-wrapper{
      height: 10vh;
      line-height: 10vh;
      text-align: center;
      padding: 1rem 3rem;
      box-sizing: border-box;
    }
}
.navigate:hover{
  background-color: antiquewhite;
  color: black;
}
.menu-content{
  background-color: aqua;
  height: 0;
  position: relative;
  top: $navigateHeight;
  transition: all 0.2s;
}
.active {
  height: $navigateHeight;
}
</style>
