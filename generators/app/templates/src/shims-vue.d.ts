/*
 * @Author: LYM
 * @Date: 2022-05-20 10:13:07
 * @LastEditors: LYM
 * @LastEditTime: 2022-11-16 13:38:46
 * @Description: Please set Description
 */
declare module '*.vue' {
  import type { defineComponent, App } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }

  export default component
}

declare interface Window {
  fullScreen: any
  isFullscreen: any
}

declare interface Document {
  webkitIsFullScreen: any
  msFullscreenEnabled: any
}
