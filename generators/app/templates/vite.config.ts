/*
 * @Author: LYM
 * @Date: 2022-04-12 11:12:09
 * @LastEditors: LYM
 * @LastEditTime: 2022-11-16 13:53:12
 * @Description: vite配置
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import viteCompression from 'vite-plugin-compression'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'
import vitePluginZipDist from 'vite-plugin-dist-zip'
import { name } from './package.json'
import { createHtmlPlugin } from 'vite-plugin-html'

import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const __DEV__ = mode === 'development'
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    base: env.VITE_APP_BASE_URL, //打包路径.
    plugins: [
      vue(),
      copy({
        targets: [{ src: 'src/index.html', dest: 'dist/assets' }]
      }),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      // 自动引入element plus
      AutoImport({
        dts: './auto-imports.d.ts',
        imports: ['vue', 'vue-router', 'pinia'], // 自动导入vue和vue-router相关函数
        resolvers: [ElementPlusResolver()],
        // 解决eslint报错问题
        eslintrc: {
          enabled: true
        }
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        directoryAsNamespace: true
      }),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()]
      }),
      vitePluginZipDist({ zipName: name, includeDistDir: true }),
      createHtmlPlugin({
        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            title: 'vue3-vite-ts-pinia-template'
          }
        }
      })
    ],
    // 配置别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/index.scss";',
          charset: false // 去掉打包警告 warning: "@charset" must be the first rule in the file
        },
        less: {
          additionalData: '@import "@/styles/global.less";',
          charset: false // 去掉打包警告 warning: "@charset" must be the first rule in the file
        }
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
        ]
      }
    },
    //启动服务配置
    server: {
      host: '0.0.0.0',
      port: 9094,
      open: true,
      https: false,
      // 反向代理
      proxy: {
        '/api': {
          target: 'http://192.168.52.65:21000/', // 接口基地址
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    // 生产环境打包配置
    build: {
      assetsDir: 'static',
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
        output: {
          entryFileNames: `static/app.js`,
          chunkFileNames: `static/[name].[hash].js`,
          assetFileNames: `static/[name].[hash].[ext]`
        }
      },
      cssCodeSplit: false
    },
    //去除 console debugger
    esbuild: __DEV__ ? {} : { drop: ['debugger', 'console'] }
  })
}
