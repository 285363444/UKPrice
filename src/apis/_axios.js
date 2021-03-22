import axios from 'axios'
import { Toast } from 'antd-mobile'
import 'antd-mobile/lib/toast/style/css'
import handleResponse from './handleResponse'
import config from '../config'
import { HashRouter } from 'react-router-dom';
const hashRouter = new HashRouter()
const env = process.env.NODE_ENV

const instance = axios.create({
  ...config[env]
})

// 请求拦截
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
instance.interceptors.response.use(
  response => {
    const { headers, url } = response.config
    var str = url.substring(url.length - 5)
    if (str === 'token') {
      return response.data
    }
    if (response.data.status == 0) {
      return response.data
    } else {
      return response.data && response.data.status === 0 || response.data.status === 1 ? response.data : Toast.info(response.data.message || '系统异常！', 2)
    }
  },
  error => {
    handleResponse(error)
    return Promise.reject(error)
  }
)

export default instance