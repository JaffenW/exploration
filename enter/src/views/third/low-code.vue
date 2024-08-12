<template>
  <div class="root">
    <div class="left">
      <template v-for="item of components" :key="item.tag" >
        <div class="component">
          <span>{{ item.tagName }}</span>
          <span @click="addComponent(item)">+</span>
        </div>
      </template>
    </div>
    <div class="center">
      <div v-for="item of showTree" :key="item.id" @click="containerFocus(item.id)" :class="['container', item.id === focusItem.id ? 'active':'']">
        <div v-for="i of item.children" :key="i.id" class="component">
          <span>{{ i.tagName }} |</span>
          <span @click="removeComponent(i.id)"> -</span>
        </div>
      </div>
      <div class="button-group">
        <el-button @click="modalShow = true">渲染</el-button>
      </div>
    </div>
    <div class="right"></div>
    <el-dialog v-model="modalShow">
      <lowcode-render :renderData="renderData"></lowcode-render>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import LowcodeRender from '../../components/render/lowcode-render'

const components = reactive([
  {
    tag: 'container',
    tagName: '容器组件'
  },
  {
    tag: 'el-input',
    tagName: '输入框组件'
  },
  {
    tag: 'el-select',
    tagName: '选择框组件',
    id: '0'
  }
])
const addComponent = (item) => {
  if (item.tag === 'container') {
    showTree.push({ ...item, id: '' + showTree.length, children: [] })
  } else {
    console.log('==', item)
    const children = focusItem.value.children
    const childId = children?.length ? parseInt(children[children.length - 1].id) + 1 : 0
    const id = `${focusItem.value.id}-${childId}`
    item.id = id
    children.push({ ...item })
  }
}
const removeComponent = (id) => {
  console.log('==', id)
  const ids = id?.split('-')
  showTree.forEach(i => {
    console.log('--', i.id, ids[0], i.id === ids[0])
    if (i.id === ids[0]) {
      i.children = i.children?.filter(j => j !== id)
    }
  })
}

const focusItem = ref({})
const containerFocus = (id) => {
  focusItem.value = showTree.find(i => i.id === id)
}
const showTree = reactive([])

const modalShow = ref(false)
const renderData = ref([
  {
    tag: 'container',
    tagName: '容器组件',
    children: [
      {
        tag: 'el-input',
        tagName: '输入框组件',
        name: '姓名',
        key: 'name'
      },
      {
        tag: 'el-input',
        tagName: '输入框组件',
        name: '性别',
        key: 'gender'
      },
      {
        tag: 'el-input',
        tagName: '输入框组件',
        name: '年龄',
        key: 'age'
      }
    ]
  }
])
</script>

<style scoped>
.root {
  display: flex;
  height: 100%;
}
.left,.right {
  height: 100%;
  width: 15%;
}
.center {
  height: 100%;
  width: 70%;
  border: 0.5px solid rgb(0, 0 ,0);
  border-top-width: 0;
  border-bottom-width: 0;
}
.container {
  margin: 10px;
  border: 1px solid pink;
  min-height: 100px;
}
.component {
  height: 40px;
  line-height: 40px;
  width: 200px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  margin: 5px;
  border-radius: 5px;
}
.component>span:first-child {
  flex-grow: 1;
}
.component>span:last-child {
  width: 50px;
  background-color: pink;
}
.active {
  border: 2px solid red;
}
.button-group {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100px;
}
</style>
