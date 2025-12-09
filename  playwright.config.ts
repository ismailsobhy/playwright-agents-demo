import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['html', { outputFolder: path.resolve(__dirname, 'playwright-report') }],
  ],
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        launchOptions: {
          slowMo: 500,
        },
      },
    },
  ],
});
