import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  timeout: 1000
})

service.interceptors.response.use(res => {
  if (res.data.code === -1) {
    ElMessage({
      type: 'error',
      message: res.data.message
    })
  }
  return res.data
})

export function get (url, params, config = {}) {
  return service.get(url, {
    params,
    ...config
  })
}

export function post (url, data, config) {
  return service.post(url, data, config)
}
