<!--
 * @Author: LYM
 * @Date: 2022-05-16 16:48:30
 * @LastEditors: LYM
 * @LastEditTime: 2022-11-16 13:55:09
 * @Description: Please set Description
-->
<template>
  <el-config-provider>
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup></script>

<style>
/* 全局修改NProgress样式 */
#nprogress .bar {
  background: green !important;
}
</style>
