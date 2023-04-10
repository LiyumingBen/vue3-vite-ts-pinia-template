//http.ts
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import 'element-plus/es/components/message/style/css'
import { showLoading, hideLoading } from '@/utils/loading'
import router from '@/router'
import { setStorage, removeAll } from '@/utils'

const contentType = {
  json: 'application/json; charset=utf-8',
  urlEncode: 'application/x-www-form-urlencoded; charset=UTF-8'
}

function toLogin() {
  router.replace({
    path: '/login',
    query: {
      redirect: location.pathname + location.search
    }
  })
}

// 取消重复请求
const pending: any[] = [] //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const cancelToken = axios.CancelToken
const removePending = (config: any) => {
  const index = pending.findIndex((item) => {
    return (
      item.url === config.url &&
      item.method === config.method &&
      JSON.stringify(item.params) === JSON.stringify(config.params) &&
      JSON.stringify(item.data) === JSON.stringify(config.data)
    )
  })
  if (index > -1) {
    pending[index].cancel()
    pending.splice(index, 1)
  }
}

// 设置请求头和请求路径
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10 * 60 * 1000
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.headers.common = {
  bdc_source: 'mgmt' // 后端日志统计
}

axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const token = window.sessionStorage.getItem('token')
    if (token && config?.headers) {
      // ts-ignore
      config.headers.token = token
    }

    const { url } = config || {}

    if (
      // url !== process.env.VUE_APP_BASE_URL + '/login' &&
      // url !== process.env.VUE_APP_BASE_URL + '/logout' &&
      url !== '/api/login' &&
      url !== '/api/logout' &&
      config.method !== 'get'
    ) {
      if (config?.headers) {
        config.headers = Object.assign(config.headers, {
          'X-CSRF-TOKEN': localStorage.getItem('CSRF-TOKEN')
        })
      }
    }

    // removePending(config) //在一个请求发送前执行一下取消操作
    config.cancelToken = new cancelToken((c) => {
      pending.push({
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
        cancel: c
      })
    })

    return config
  },
  (error) => {
    return error
  }
)
// 响应拦截
axios.interceptors.response.use(
  (res) => {
    removePending(res.config) //在一个请求响应后再执行一下取消操作，把已经完成的请求从pending中移除

    const { data, headers, config } = res || {}
    const { msg, code, message } = data || {}

    const tempObj = config

    switch (code) {
      case 200:
        // 存储token
        if (
          tempObj.url &&
          tempObj.url.indexOf('/login') !== -1 &&
          headers['x-auth-token']
        ) {
          setStorage('AUTHTOKEN', headers['x-auth-token'])
        }
        break
      case 304:
        break
      case 401:
      case 404:
        // 错误统一处理
        ElMessage.error({
          message: msg || message || 'error'
        })
        // 登录失效后，清除storage
        removeAll()
        // 预览页面不校验登录
        if (location.pathname.indexOf('cockpit-view/') === -1) {
          toLogin()
        }

        break
      case undefined:
        break
      default:
        // 错误统一处理
        ElMessage.error({
          message: msg || 'error'
        })
        break
    }
    hideLoading()
    return Promise.resolve(res)
  },
  (error) => {
    ElMessage.error({
      message: '网络异常，请稍后重试~'
    })
    hideLoading()
    return Promise.reject(error)
  }
)

interface ResType<T> {
  code: number
  data?: T
  msg?: string
  err?: string
}
interface Http {
  get<T>(url: string, params?: unknown, config?: any): Promise<ResType<T>>
  post<T>(url: string, params?: unknown, config?: any): Promise<ResType<T>>
  upload<T>(url: string, params: unknown): Promise<ResType<T>>
  download(url: string): void
}

const http: Http = {
  get(url: string, params: any, config?: any) {
    return new Promise((resolve, reject) => {
      const { isNoLoading } = config || {}

      !isNoLoading && showLoading()

      axios
        .get(url, { params })
        .then((res) => {
          resolve(res?.data)
        })
        .catch((err) => {
          reject(err?.data)
        })
    })
  },
  post(url: string, params: any, config?: any) {
    return new Promise((resolve, reject) => {
      const { type, isNoLoading } = config || {}
      type stringKey = Record<string, any>
      const obj: stringKey = contentType
      if (type === 'urlEncode') {
        axios.defaults.headers.post['Content-Type'] = obj[type]
        params = qs.stringify(params)
      }

      !isNoLoading && showLoading()

      axios
        .post(url, params)
        .then((res) => {
          resolve(res?.data)
        })
        .catch((err) => {
          reject(err?.data)
        })
    })
  },
  upload(url: string, file: any, config?: any) {
    const { isNoLoading } = config || {}
    !isNoLoading && showLoading()

    return new Promise((resolve, reject) => {
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => {
          resolve(res?.data)
        })
        .catch((err) => {
          reject(err?.data)
        })
    })
  },
  download(url) {
    console.log(url, 111222)
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  }
}
export default http
