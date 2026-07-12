import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'income-rank',
  brand: {
    displayName: '소득수준 판별기',
    primaryColor: '#3182F6',
    icon: './rank.png',
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
