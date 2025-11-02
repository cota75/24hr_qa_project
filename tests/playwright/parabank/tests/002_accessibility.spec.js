import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

function generateUsernameFromDate() {
  const now = new Date(); 

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  const username = `user_${year}${month}${day}_${hours}${minutes}`;

  return username;
}

const newUsername = generateUsernameFromDate();

test.beforeEach(async ({page}) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
})

test('Register new user for test', async ({ page }) => {
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
});

test('Should not have any accessibility violations', async ({ page }) => {
  await page.locator('input[name="username"]').fill(newUsername)
  await page.locator('input[name="password"]').fill('test')
  await page.getByRole('button', { name: 'Log In' }).click();

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
  console.log('Accessibility Violations:', accessibilityScanResults.violations);
  expect(accessibilityScanResults.violations).toEqual([]);
});