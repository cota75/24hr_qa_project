import { test, expect  } from '@playwright/test';
import fs from 'fs';
import { saveData } from './dataHelper';


test('Login', async ({ request }) => {

  const startTime = Date.now();
  const response = await request.get('https://parabank.parasoft.com/parabank/services/bank/login/rlau/test');
  const responseTime = Date.now() - startTime;
  // Post-response Script (Tests)

  // Status code is 2xx
  await expect(response).toBeOK();

  const respText = await response.text();
  //console.log(respText)

  const match = respText.match(/<id>(\d+)<\/id>/);
  const customerId = match ? match[1] : null;
  
  //const saved = saveData({customerId})
  //console.log(saved)
  fs.writeFileSync('customerData.json', JSON.stringify({customerId}))
  console.log('ID:', customerId); 

});
