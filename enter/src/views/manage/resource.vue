<template>
  <!-- 搜索栏 -->
  <el-form :model="searchData" :inline="true" class="search" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="资源名称">
          <el-select v-model="searchData.fileName" placeholder="请选择资源名称" clearable>
            <el-option
              v-for="item in mouldList"
              :key="item.code"
              :label="item.name"
              :value="item.fileName"
            />
          </el-select>
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
    <el-table-column prop="code" label="资源编号" />
    <el-table-column prop="name" label="资源名称" />
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
  <el-dialog v-model="modelInfo.show" :title="modelInfo.title" destroy-on-close>
    <el-form :model="formData" label-position="right" label-width="100px">
      <el-form-item label="资源名称">
        <el-select
          v-model="formData.fileName"
          placeholder="请选择资源名称"
          style="width: 100%;"
          :disabled="formData.code"
          clearable
          @change="mouldChange"
        >
          <el-option
            v-for="item in mouldList"
            :key="item.code"
            :label="item.name"
            :value="item.fileName"
          />
        </el-select>
      </el-form-item>
      <template v-for="item in itemList">
        <el-form-item
          v-if="item.key != 'code' || formData[`${item.key}`]"
          :label="item.value"
          :key="item.key"
        >
          <el-input v-model="formData[`${item.key}`]" :disabled="item.key === 'code' && formData[`${item.key}`]"/>
        </el-form-item>
      </template>
      <el-form-item label="序号">
        <el-input v-model="formData.order"/>
      </el-form-item>
    </el-form>
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
import { getMouldList, getResourceList, addResource, deleteResource } from '../../api/system'

// 搜索条件
const searchData = reactive({
  fileName: '',
  name: ''
})
// 弹框信息
const modelInfo = reactive({
  show: false,
  title: ''
})
// 弹框内容
const formData = ref({
  name: '',
  baseUrl: '',
  order: ''
})
// 查询结果
const listData = ref([])
// 模板内容
const mouldList = ref([])
// 字项列表
const itemList = ref([])

// 搜索
const search = () => {
  if (!searchData.fileName) {
    ElMessage({
      message: '请选择资源名称',
      type: 'info'
    })
    return
  }
  getResourceList(searchData).then(res => {
    console.log('res', res)
    if (res.code === 0) {
      listData.value = res.data
    }
  })
}
// 点击新增按钮
const add = () => {
  modelInfo.show = true
  modelInfo.title = '新增系统'
  formData.value = {}
}
// 选择资源
const mouldChange = (value) => {
  const mould = mouldList.value.find(i => i.fileName === value)
  formData.value.fileName = mould.fileName
  itemList.value = mould.itemList
  console.log('=====', itemList)
}
// 点击提交
const submit = () => {
  addResource(formData.value).then(res => {
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
  modelInfo.title = '编辑系统'
  formData.value = row
  mouldChange(row.fileName)
}

// 删除系统
const remove = (e, row) => {
  deleteResource(row).then(res => {
    if (res.code === 0) {
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
    }
    search()
  })
}

onMounted(() => {
  getMouldList().then(res => {
    if (res.code === 0) {
      mouldList.value = res.data
    }
  })
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
