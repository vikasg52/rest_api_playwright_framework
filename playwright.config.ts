import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from `.env` file
dotenv.config();

export default defineConfig({
  testDir: './src/tests',
  timeout: 30 * 1000, // 30 seconds timeout for each test
  expect: {
    timeout: 5000, // Expect timeout for assertions
  },
  fullyParallel: true, // Run tests in parallel
  retries: process.env.CI ? 2 : 0, // Retry failed tests twice in CI, none locally

  use: {
    headless: process.env.HEADLESS === 'false' ? false : true, // Toggle headless mode properly
    browserName: 'chromium', // Default browser
    screenshot: 'on', // Capture screenshots on failure
    video: 'on',  // Keep video only on failed tests
    // video: 'retain-on-failure'?  // Keep video only on failed tests
    trace: 'on-first-retry', // ✅ Correct: Collect trace on first retry only
    timezoneId: 'Asia/Kolkata'
  },

  // ✅ Corrected Reporter Syntax
  reporter: [
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' },
    },
  ],
});
