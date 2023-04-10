/*
 * @Author: LYM
 * @Date: 2022-05-20 10:13:07
 * @LastEditors: LYM
 * @LastEditTime: 2022-06-08 16:00:03
 * @Description: Please set Description
 */
/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
