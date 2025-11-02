
import { test, expect  } from '@playwright/test';
import fs from 'fs';


test('Request Loan', async ({ request }) => {
  const rawData = fs.readFileSync('customerData.json');
  const items = JSON.parse(rawData)
  const customerId = items.customerId;
  const newAccountId = items.newAccountId;
  const accountId = items.accountId;

  const startTime = Date.now();
  const response = await request.post(`https://parabank.parasoft.com/parabank/services/bank/requestLoan?customerId=${customerId}&amount=11&downPayment=1&fromAccountId=${newAccountId}`);
  const responseTime = Date.now() - startTime;
  // Post-response Script (Tests)

  // Status code is 2xx
  const respText = await response.text();
  await expect(response).toBeOK();

  // Response body is not empty
  const body = await response.text();
  //console.log(body)

  const match = body.match(/<accountId>(.*?)<\/accountId>/);
  let loanId = null;

  if (match && match[1]) {
    loanId = match[1];
    console.log('Extracted loanId:', loanId);

    // You can store this in a variable for reuse across tests if needed
    // e.g., using environment/global storage
    test.info().annotations.push({ type: 'loanId', description: loanId });
  } else {
    console.warn('loanId not found in XML response');
  }

  // Verify loanId was found
  expect(loanId, 'loanId should be present in the response').toBeTruthy();


});
  