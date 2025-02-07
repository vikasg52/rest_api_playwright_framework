import { test, expect } from '@playwright/test';

test('POST /booking - Create a new booking', async ({ request }) => {
  // Sample request body for the POST /booking API
  const bookingData = {
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-02-01',
      checkout: '2025-02-05',
    },
    additionalneeds: 'Breakfast',
  };

  // Send the POST request using Playwright's API request fixture
  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: bookingData,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Assert the response status is 200
  expect(response.status()).toBe(200);

  // Parse the response JSON
  const jsonResponse = await response.json();

  // Assert that the response contains an ID for the new booking
  expect(jsonResponse).toHaveProperty('bookingid');
  expect(typeof jsonResponse.bookingid).toBe('number');
});
