// src/tests/api/sampleApi.test.ts
import { test, expect } from '@playwright/test';
import { APIClient } from '../../utils/apiClient';
import { allure } from 'allure-playwright';

test('Validate GET API Response', async () => {
  const response = await APIClient.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);

  const jsonResponse = await response.json();
  expect(jsonResponse.id).toBe(1);
});
