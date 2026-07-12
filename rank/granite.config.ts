import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'income-rank',
  brand: {
    displayName: '소득수준 판별기',
    primaryColor: '#3182F6',
    icon: 'https://static.toss.im/appsintoss/21275/a8492081-6f39-41c2-b296-926d453ed3a1.png',
  },
  web: {
    host: 'localhost',
    port: 5175,
    commands: {
      dev: 'vite dev',
      build: 'vite build',
    },
  },
  permissions: [],
  outdir: 'dist',
});
