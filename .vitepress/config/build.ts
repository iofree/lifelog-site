// 构建相关配置
export const buildConfig = {
  // 生产环境构建优化
  build: {
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        // 资源文件命名
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // 构建目标
    target: 'es2015',
    // 压缩选项
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production'
      }
    }
  },
  
  // 开发服务器配置
  server: {
    port: 3000,
    host: true,
    open: true
  },
  
  // 预览服务器配置
  preview: {
    port: 4173,
    host: true
  }
}