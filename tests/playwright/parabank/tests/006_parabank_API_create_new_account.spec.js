
import { test, expect  } from '@playwright/test';
import fs from 'fs';
import { saveData } from './dataHelper';

test('Create New Account', async ({ request }) => {
  const rawData = fs.readFileSync('customerData.json');
  const items = JSON.parse(rawData)
  const customerId = items.customerId;
  const accountId = items.accountId;

  console.log('Using Customer ID:', customerId);
  console.log('Using Account ID:', accountId);

  
  const startTime = Date.now();
  const response = await request.post(`https://parabank.parasoft.com/parabank/services/bank/createAccount?customerId=${customerId}&newAccountType=0&fromAccountId=${accountId}`);
  const responseTime = Date.now() - startTime;
  // Post-response Script (Tests)
  
  // Status code is 2xx
  const respText = await response.text();
  await expect(response).toBeOK();

  // Extract and store new account id from XML
  const match = respText.match(/<id>(\d+)<\/id>/);
  const newAccountId = match ? match[1] : null;

  //accountId saved to collection variables

  const saved = saveData({newAccountId})
  //console.log(saved)

  console.log('New account ID:', newAccountId); 


});
  