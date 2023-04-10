<!--
 * @Author: LYM
 * @Date: 2022-11-16 13:43:36
 * @LastEditors: LYM
 * @LastEditTime: 2022-11-16 13:57:28
 * @Description: Home
-->
<template>
  <div class="home-wrap">home-{{ home }}-pinia</div>
</template>

<script setup lang="ts">
const home = ref('page')
</script>

<style lang="scss" scoped>
.home-wrap {
  color: $font-color;
}
</style>
