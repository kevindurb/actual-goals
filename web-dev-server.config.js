import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  open: true,
  watch: true,
  nodeResolve: true,
  appIndex: 'index.html',
  rootDir: './public',
  plugins: [esbuildPlugin({ ts: true, target: 'auto-always' })],
};
