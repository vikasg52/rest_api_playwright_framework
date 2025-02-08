import { test, expect } from '@playwright/test';
import { config } from '../../config/config'
import { credentials } from '../../config/testdata'

test('Login to SauceDemo with valid credentials', async ({ page }) => {
  // Navigate using baseURL from config.ts
  await page.goto(config.baseURL);

  // Enter username and password
  await page.fill('[data-test="username"]', credentials.validUser.username);
  await page.fill('[data-test="password"]', credentials.validUser.password);

  // Click the login button
  await page.click('[data-test="login-button"]');

  // Verify successful login done
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});
