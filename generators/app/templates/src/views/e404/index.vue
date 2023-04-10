<!--
 * @Author: LYM
 * @Date: 2022-06-01 08:29:43
 * @LastEditors: LYM
 * @LastEditTime: 2022-11-16 13:58:53
 * @Description: 404页面
-->
<template>
  <div class="e404">
    <E404 class="e404-icon" />
    <div class="e404-content">
      <p class="errorTitle">404</p>
      <p class="errorTro">抱歉，你访问的页面不存在。</p>
      <el-button type="primary" class="btn" @click="handleGoHome">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { E404 } from '@/icons'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.e404 {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -60px;
  &-icon {
    width: 450px;
    height: 450px;
  }

  &-content {
    text-align: center;
    .errorTitle {
      color: rgba(0, 0, 0, 0.85);
      font-size: 24px;
    }

    .errorTro {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }

    p {
      line-height: 30px;
    }

    .btn {
      margin-top: 10px;
    }
  }
}
</style>
