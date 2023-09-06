<template>
  <!-- 搜索栏 -->
  <el-form :model="searchData" :inline="true" class="search" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="模板名称">
          <el-input v-model="searchData.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
      </el-col>
      <el-col :span="8">
        <el-form-item>
          <el-button @click="search" type="primary">查询</el-button>
          <el-button @click="add" type="primary">新增</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <!-- 查询结果 -->
  <el-table :data="listData" style="width: 100%" class="result">
    <el-table-column prop="code" label="模板编号" />
    <el-table-column prop="name" label="模板名称" />
    <el-table-column prop="fileName" label="文件名称" />
    <el-table-column prop="order" label="排序" />
    <el-table-column label="操作" >
      <template #default="scope">
        <el-button @click="edit(scope.$event, scope.row)" type="primary">编辑</el-button>
        <el-popconfirm
          title="您确定要删除吗?"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="remove(scope.$event, scope.row)">
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!-- 弹出框 -->
  <el-dialog v-model="modelInfo.show" :title="modelInfo.title">
    <el-form :model="formData" label-position="right" label-width="100px">
      <el-form-item label="模板名称">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="文件名称">
        <el-input v-model="formData.fileName"/>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="formData.order"/>
      </el-form-item>
      <el-form-item label="字段码值">
        <el-input v-model="formData.key"/>
      </el-form-item>
      <el-form-item label="字段中文">
        <el-input v-model="formData.value"/>
      </el-form-item>
    </el-form>
    <el-button @click="addItem">新增</el-button>
    <div>
      <div v-for="(i,index) of itemList" :key="i.key">
        {{ `${i.key}---${i.value}` }}
        <el-button @click="deleteItem(index)">删除</el-button>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modelInfo.show = false">取消</el-button>
        <el-button type="primary" @click="submit">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getMouldList, addMould, deleteMould } from '../../api/system'

const searchData = reactive({
  name: ''
}) // 搜索条件
const listData = ref([]) // 查询结果
const modelInfo = reactive({
  show: false,
  title: ''
}) // 弹框信息
const formData = ref({
  name: '',
  fileName: '',
  order: ''
}) // 弹框内容
const itemList = ref([])

// 搜索
const search = () => {
  getMouldList(searchData).then(res => {
    console.log('res', res)
    if (res.code === 0) {
      listData.value = res.data
    }
  })
}
// 添加字段项
const addItem = () => {
  itemList.value.push({ key: formData.value.key, value: formData.value.value })
  formData.value.key = ''
  formData.value.value = ''
}
// 删除字段项
const deleteItem = (index) => {
  itemList.value.splice(index, 1)
}
// 点击新增按钮
const add = () => {
  modelInfo.show = true
  modelInfo.title = '新增模板'
  formData.value = {}
}
// 点击提交
const submit = () => {
  const params = {
    code: formData.value.code,
    name: formData.value.name,
    fileName: formData.value.fileName,
    order: formData.value.order,
    itemList: itemList.value
  }
  addMould(params).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: '提交成功',
        type: 'success'
      })
      search()
    }
    modelInfo.show = false
  })
}
// 点击编辑
const edit = (e, row) => {
  console.log(e, row)
  modelInfo.show = true
  modelInfo.title = '编辑模板'
  formData.value = row
  itemList.value = row.itemList
}

// 删除系统
const remove = (e, row) => {
  deleteMould(row).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
    } else {
      ElMessage({
        message: res.message,
        type: 'error'
      })
    }
    search()
  })
}

onMounted(() => {
  search()
})
</script>

<style lang='scss' scoped>
.search{
  background-color: white;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
.result{
  margin-top: 20px;
}
</style>
