
import { test, expect  } from '@playwright/test';
import fs from 'fs';

test('Transfer', async ({ request }) => {
  const rawData = fs.readFileSync('customerData.json');
  const items = JSON.parse(rawData)
  const newAccountId = items.newAccountId;
  const accountId = items.accountId;

  console.log('Using Account ID:', accountId);
  console.log('Using New Account ID:', newAccountId);

  const startTime = Date.now();
  const response = await request.post(`https://parabank.parasoft.com/parabank/services/bank/transfer?fromAccountId=${accountId}&toAccountId=${newAccountId}&amount=500`);
  const responseTime = Date.now() - startTime;
  // Post-response Script (Tests)

  // Status code is 2xx
  const respText = await response.text();
  await expect(response).toBeOK();

  // Test: Content-Type header is present
  const contentType = response.headers()['content-type'];
  expect(contentType).toBeTruthy();

  // Test: Content-Type header includes application/xml
  expect(contentType).toContain('application/xml');
});
