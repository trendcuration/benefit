import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'benefit',
  brand: {
    displayName: '지원금 찾기',
    primaryColor: '#3182F6',
    icon: './benefit.png',
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
