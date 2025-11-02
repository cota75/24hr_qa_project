
import { test, expect  } from '@playwright/test';
import fs from 'fs';


test('Get Transactions', async ({ request }) => {
  const rawData = fs.readFileSync('customerData.json');
  const items = JSON.parse(rawData)
  const accountId = items.accountId;

  const startTime = Date.now();
  const response = await request.get(`https://parabank.parasoft.com/parabank/services/bank/accounts/${accountId}/transactions`);
  const responseTime = Date.now() - startTime;
  // Post-response Script (Tests)

  // Status code is 2xx
  const respText = await response.text();
  await expect(response).toBeOK();

  // Response body is not empty
  const body = await response.text();
  expect(body, 'Response body should not be empty').toBeTruthy();

  // Check transactions 
  const hasTransactionsTag = body.includes('<transactions>') && body.includes('<transaction>');
  expect(hasTransactionsTag, 'Transactions should be present in XML').toBeTruthy();
});
  