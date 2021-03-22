import { HashRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import config from '../config'
import 'antd-mobile/lib/toast/style/css'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

const hashRouter = new HashRouter()
function delect () {
  sessionStorage.clear()
  window.location.href = config.outE2url
}
export default error => {
  if (error.response) {
    const {
      status,
      data = {},
    } = error.response
    switch (status) {
      case 400:
        var str = error.response.config.url
        str = str.substring(str.length - 5)
        if (str == 'token') {
          Toast.info('用户名或密码错误', 2)
        } else {
          // Toast.info(codeMessage[400], 2)
        }
        delect()
        break;
      case 401:
        var strs = error.response.config.url
        strs = strs.substring(strs.length - 5)
        if (strs == 'token') {
          Toast.info('用户名或密码错误', 2)
          return
        } else {
          // Toast.info(codeMessage[400], 2)
        }
        var str = error.response.config.url
        str = str.substring(str.length - 15)
        if (str == 'getopenidbycode') {
          //Toast.info('用户名或密码错误',2)
        } else {
          Toast.info(data.message, 2)
          //hashRouter.history.push('/login')
        }
        delect()
        break;
      case 403 || 404:
        // Toast.info(codeMessage[status], 2)
        // hashRouter.history.push('/sfeaefasefas')
        delect()
        break;
      default:
        // Toast.info('未知错误', 2)
        delect()
        break;
    }
  } else {
    // 未知错误，弹出提示消息
    Toast.info(error.message)
  }
}