
import { test, expect  } from '@playwright/test';
import fs from 'fs';
import { saveData } from './dataHelper';

test('Account Overview', async ({ request }) => {
  const {customerId} = JSON.parse(fs.readFileSync('customerData.json', 'utf8'))
  console.log('Using Customer ID:', customerId);

  const startTime = Date.now();
  const response = await request.get(`https://parabank.parasoft.com/parabank/services/bank/customers/${customerId}/accounts`);
  const responseTime = Date.now() - startTime;
    
  // Post-response Script (Tests)
  const respText = await response.text();

  // Status code is 2xx
  await expect(response).toBeOK();

  // Extract and save customer id from XML
  const match = respText.match(/<id>(\d+)<\/id>/);
  const accountId = match ? match[1] : null;
  
  const saved = saveData({accountId})
  //console.log(saved)
  console.log('Account ID:', accountId); 

});
  