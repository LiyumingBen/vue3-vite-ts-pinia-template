/*
 * @Author: LYM
 * @Date: 2022-06-02 16:20:14
 * @LastEditors: LYM
 * @LastEditTime: 2022-10-20 17:40:03
 * @Description: element loading重写
 */
import 'element-plus/es/components/loading/style/css'
import { ElLoading } from 'element-plus'
import { qiankunWindow } from 'vite-plugin-qiankun/es/helper'

// 判断是乾坤
const isQianKun = qiankunWindow.__POWERED_BY_QIANKUN__
// loading对象
let loading: any

// 请求合并只出现一次loading
// 当前正在请求的数量
let needLoadingRequestCount = 0

/* 显示loading */
export const showLoading = (target?: string | HTMLElement) => {
  // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
  // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
  const _el = document.querySelector('#SAS-Visual-Analytics') as HTMLElement
  const loadingStyle = !isQianKun
    ? {
        lock: true,
        text: '数据加载中，请耐心等候...',
        background: 'rgba(255, 255, 255, .9)',
        target: target || 'body'
      }
    : {
        lock: true,
        background: 'rgba(255, 255, 255, .9)',
        target: _el
      }
  if (needLoadingRequestCount === 0 && !loading) {
    loading = ElLoading.service({
      ...loadingStyle
    })
  }
  needLoadingRequestCount++
}

/* 隐藏loading */
export const hideLoading = () => {
  if (needLoadingRequestCount <= 0) {
    return
  }

  needLoadingRequestCount--

  if (needLoadingRequestCount === 0 && loading) {
    loading.close()
    loading = null
  }
}
