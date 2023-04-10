/*
 * @Author: LYM
 * @Date: 2022-04-12 11:12:09
 * @LastEditors: LYM
 * @LastEditTime: 2022-11-16 13:46:11
 * @Description: 公共数据仓库
 */

import { defineStore } from 'pinia'

export const useIndxStore = defineStore({
  id: 'index',
  state: () => ({
    name: '游客模式'
  }),
  getters: {},
  actions: {},
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'index', // 自定义 Key值
        storage: localStorage, // 选择存储方式  默认保存在sessionStorage  可选localStorage或sessionStorage
        paths: ['name'] // paths 指定要持久化的字段，其他的则不会进行持久化
      }
    ]
  }
})
