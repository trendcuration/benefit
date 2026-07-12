import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'rank',
  brand: {
    displayName: '내 월급·자산 상위 몇 %',
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
