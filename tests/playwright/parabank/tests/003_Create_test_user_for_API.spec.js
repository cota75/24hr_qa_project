import { test, expect } from '@playwright/test';


test('Configure JDBC', async ({page}) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Admin Page' }).click();
  await page.getByRole('cell', { name: 'JDBC*' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
})

test('Register test user for test', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('[id="customer.firstName"]').click();
  await page.locator('[id="customer.firstName"]').fill('test');
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
  await page.locator('[id="customer.username"]').fill('rlau');
  await page.locator('[id="customer.username"]').press('Tab');
  await page.locator('[id="customer.password"]').fill('test');
  await page.locator('[id="customer.password"]').press('Tab');
  await page.locator('#repeatedPassword').fill('test');
  await page.getByRole('button', { name: 'Register' }).click();
});
