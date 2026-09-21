import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'benefit',
  brand: {
    displayName: '나의 지원금',
    primaryColor: '#3182F6',
    icon: 'https://static.toss.im/appsintoss/21275/4861ab12-a025-4f2e-81d0-467fd390feb0.png',
  },
  web: {
    host: 'localhost',
    port: 5174,
    commands: {
      dev: 'vite dev',
      build: 'vite build',
    },
  },
  permissions: [],
  outdir: 'dist',
});
