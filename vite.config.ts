import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  server: { 
    port: 2006,
    /* 反向代理 */
    proxy:{
      /* 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发 */
      // '/api': 'http://localhost:4567',
    },
    open: false, /* 浏览器自动打开 */
    https: false, /* 是否开启 https */
  },
  /* 路径别名 */
  resolve: {
    alias: {
        '@': path.resolve(__dirname,"./src")
    }
  },
  /* 插件 */
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue", "vue-router"],
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/,/\.t\?js$/],
      resolvers: [ElementPlusResolver()],
      dts:'./auto-imports.d.ts',
    }),
    Components({
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/,/\.t\?js$/],
      resolvers: [ElementPlusResolver({
        importStyle: "sass",
      })],
      dts: true,
    }),
    viteMockServe({
      supportTs:false,
      logger: false,
      mockPath: "./mock/"
    }),
  ],
  publicDir:'public',
  /* css预处理 路径最后要加上;不然会报错 */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/main.scss" as *;
        `,
      },
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
})
