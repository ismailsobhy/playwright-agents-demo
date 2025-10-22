import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // or './e2e' — adjust to your folder
  fullyParallel: false, // ✅ Changed to false for sequential
  workers: 1,  
  
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    launchOptions: {
      slowMo: 500, // slows down each Playwright action by 500ms
    },
  },
  
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  
  // Projects for multiple browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});