import { esbuildPlugin } from '@web/dev-server-esbuild';
import proxy from 'koa-proxies';

export default {
  open: true,
  watch: true,
  nodeResolve: true,
  appIndex: './public/index.html',
  rootDir: './public',
  middleware: [proxy('/api/', { target: 'http://localhost:1337' })],
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'auto-always',
      tsconfig: './tsconfig.json',
    }),
  ],
};
