import { test, expect } from '@playwright/test';

function generateUsernameFromDate() {
  const now = new Date(); 

  // Extract components
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

  const username = `user_${year}${month}${day}_${hours}${minutes}${seconds}`;

  return username;
}

const newUsername = generateUsernameFromDate();

test.beforeEach(async ({page}) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
})

test('Invalid login', async ({ page }) => {
  await page.locator('input[name="username"]').fill('junkname');
  await page.locator('input[name="password"]').fill('test');
  await page.getByRole('button', { name: 'Log In' }).click();

  //const errorMessage = page.getByText('An internal error has occurred and has been logged.');
  const errorMessage = page.getByText('The username and password could not be verified.');
  await expect(errorMessage).toBeVisible();
})

test('No transactions found', async ({ page }) => {
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('[id="customer.firstName"]').click();
  await page.locator('[id="customer.firstName"]').fill(newUsername);
  await page.locator('[id="customer.lastName"]').fill('test');
  await page.locator('[id="customer.address.street"]').fill('somewhere');
  await page.locator('[id="customer.address.street"]').press('Tab');
  await page.locator('[id="customer.address.city"]').fill('city');
  await page.locator('[id="customer.address.city"]').press('Tab');
  await page.locator('[id="customer.address.state"]').fill('state');
  await page.locator('[id="customer.address.state"]').press('Tab');
  await page.locator('[id="customer.address.zipCode"]').fill('12354');
  await page.locator('[id="customer.address.zipCode"]').press('Tab');
  await page.locator('[id="customer.phoneNumber"]').fill('1234435345');
  await page.locator('[id="customer.phoneNumber"]').press('Tab');
  await page.locator('[id="customer.ssn"]').fill('123123123');
  await page.locator('[id="customer.username"]').fill(newUsername);
  await page.locator('[id="customer.username"]').press('Tab');
  await page.locator('[id="customer.password"]').fill('test');
  await page.locator('[id="customer.password"]').press('Tab');
  await page.locator('#repeatedPassword').fill('test');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('link', { name: 'Accounts Overview' }).click();
  await expect(page.getByText('Total')).toBeVisible();
  await page.locator('table a:first-of-type').click()
  await page.locator('#month').selectOption('January');
  await page.getByRole('button', { name: 'Go' }).click();

  const noTransactionsMessage = page.getByText('No transactions found.');
  await expect(noTransactionsMessage).toBeVisible();

});
