import { defineConfig } from 'vite';

export default defineConfig({
  "build": {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          //node_modules模块全部輸出在一个文件
          if (id.includes('node_modules')) {
            return "modules";
          }
          // else if (id.includes('scss')) {
          //   //scss 輸出至不同文件
          //   return id.slice(id.lastIndexOf("/")+1, -3);
          // }
        },
      }
    }
  }
});