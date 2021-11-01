import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteMockServe as mock } from 'vite-plugin-mock';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import windiCSS from 'vite-plugin-windicss';

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
    mock(),
    // https://github.com/fi3ework/vite-plugin-checker
    checker({ typescript: true }),
    // https://github.com/windicss/windicss
    windiCSS()
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
        // modifyVars: { '@primary-color': '#13c2c2' },
        javascriptEnabled: true
      }
    }
  }
});
