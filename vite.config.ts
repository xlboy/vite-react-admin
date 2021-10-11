import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteMockServe as mock } from 'vite-plugin-mock';
import svgr from 'vite-plugin-svgr';
import { babel } from '@rollup/plugin-babel';

const pathResolve = (dir: string) => resolve(__dirname, '.', dir);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    react(),
    // https://github.com/pd4d10/vite-plugin-svgr
    svgr(),
    // https://github.com/anncwb/vite-plugin-mock/blob/main/README.zh_CN.md
    mock()
    // babel()
  ],
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve('src') + '/'
      }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { '@primary-color': '#13c2c2' },
        javascriptEnabled: true
      }
    }
  }
});
