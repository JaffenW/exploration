<template>
  <!-- 搜索栏 -->
  <el-form :model="searchData" :inline="true" class="search" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="用户名称">
          <el-input v-model="searchData.name" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="用户账号">
          <el-input v-model="searchData.account" clearable></el-input>
        </el-form-item>
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
    <el-table-column prop="code" label="用户编号" />
    <el-table-column prop="name" label="用户名称" />
    <el-table-column prop="account" label="用户账号" />
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
      <el-form-item label="用户编号" v-if="formData.code">
        <el-input v-model="formData.code" disabled/>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input v-model="formData.account"/>
      </el-form-item>
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
import { getResourceList, addResource, deleteResource } from '../../api/system'

const listData = ref([]) // 查询结果
const searchData = reactive({
  fileName: 'user.json',
  account: '',
  name: ''
}) // 搜索条件
const modelInfo = reactive({
  show: false,
  title: ''
}) // 弹框信息
const formData = ref({
  fileName: 'user.json',
  name: '',
  account: '',
  order: ''
}) // 弹框内容

// 搜索
const search = () => {
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
  modelInfo.title = '新增角色'
  formData.value = {
    fileName: 'user.json'
  }
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
  modelInfo.title = '编辑角色'
  formData.value = row
}

// 删除系统
const remove = (e, row) => {
  deleteResource(row).then(res => {
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
