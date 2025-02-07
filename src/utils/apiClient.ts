// src/utils/apiClient.ts
import { request as playwrightRequest } from '@playwright/test';

export const APIClient = {
  get: async (url: string) => {
    // Create a new request context to enable more advanced configurations (headers, cookies, etc.)
    const context = await playwrightRequest.newContext();

    // Use the context to send the GET request
    const response = await context.get(url);

    return response; // Return the response object
  },
};
