import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getFormattedDate() {
  const today = new Date();

  // Get month, day, and year
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because getMonth() is 0-indexed
  const day = (today.getDate()).toString().padStart(2, '0');
  const dayPlus = (today.getDate() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();

  return `${month}-${day}-${year}`;
}

const randomString = generateRandomString(10)

test.beforeEach(async ({page}) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
})

test('Configure JDBC', async ({page}) => {
  await page.getByRole('link', { name: 'Admin Page' }).click();
  await page.getByRole('cell', { name: 'JDBC*' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
})

test('Create user', async ({ page }) => {
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('[id="customer.firstName"]').click();
  await page.locator('[id="customer.firstName"]').fill(randomString);
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
  await page.locator('[id="customer.username"]').fill(randomString);
  await page.locator('[id="customer.username"]').press('Tab');
  await page.locator('[id="customer.password"]').fill('test');
  await page.locator('[id="customer.password"]').press('Tab');
  await page.locator('#repeatedPassword').fill('test');
  await page.getByRole('button', { name: 'Register' }).click();

  const successMessage = page.getByText('Your account was created successfully');
  await expect(successMessage).toBeVisible();

  await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();

});


test('Transfer funds', async ({ page }) => {
  await page.locator('input[name="username"]').fill(randomString)
  await page.locator('input[name="password"]').fill('test')
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Accounts Overview' }).click();
  await page.getByRole('link', { name: 'Transfer Funds' }).click();
  await page.locator('#amount').click();
  await page.locator('#amount').fill('123123');
  await page.getByRole('button', { name: 'Transfer' }).click();
  await page.getByRole('heading', { name: 'Transfer Complete!' }).click();
  await page.getByText('See Account Activity for more').click();
  await page.getByText('$123123.00 has been').click();

  await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();

  const confirmationText = page.getByText('$123123.00 has been');
  await expect(confirmationText).toBeVisible();
  await expect(confirmationText).toContainText('$123123.00 has been');
})

test('Verify transfer', async ({page}) => {
  await page.locator('input[name="username"]').fill(randomString)
  await page.locator('input[name="password"]').fill('test')

  //let formattedDate = getFormattedDate();
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Find Transactions' }).click();
  await page.locator('#amount').click();
  await page.locator('#amount').fill('123123');
  await page.locator('#findByAmount').click();

  const resultHeader = page.getByRole('heading', { name: 'Transaction Results' });
  await expect(resultHeader).toBeVisible();

  const transferCell = page.getByRole('cell', { name: 'Funds Transfer Sent' });
  await expect(transferCell).toBeVisible();
})
