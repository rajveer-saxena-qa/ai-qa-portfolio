import { test, expect } from '@playwright/test';
import { login } from '../../utils/loginHelper.js';
import { readFileSync } from 'fs';
//Read latest Customer ID from customerData.json
const customerData = JSON.parse(readFileSync('testdata/customerData.json', 'utf8'));
const customerId = customerData[customerData.length - 1].customerId;
test.describe('Edit Customer Module - Smoke', () => {
  test('TC021 - Edit customer city and state with valid Customer ID', async ({ page }) => {
    test.setTimeout(120000);
    //Login and navigate to Edit Customer page
    await login(page);
    await page.getByRole('link', { name: 'Edit Customer' }).click();
    //Enter Customer ID from customerData.json
    await page.fill('input[name="cusid"]', customerId);
    //Click Submit to load customer details
    await page.click('input[name="AccSubmit"]');
    await page.waitForTimeout(3000);
    //Edit City and State
    await page.fill('input[name="city"]', 'Pune');
    await page.fill('input[name="state"]', 'Goa');
    //Click Submit to save changes
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(3000);
    //Validate URL stays on editCustomerPage
    await expect(page).toHaveURL(/editCustomerPage/);
    //Navigate back to verify changes saved
    //Page goes blank after submit - navigate directly to Edit Customer URL
    await page.goto('https://demo.guru99.com/V4/manager/EditCustomer.php');
    await page.fill('input[name="cusid"]', customerId);
    await page.click('input[name="AccSubmit"]');
    await page.waitForTimeout(3000);
    //Validate updated City and State values
    await expect(page.locator('input[name="city"]')).toHaveValue('Pune');
    await expect(page.locator('input[name="state"]')).toHaveValue('Goa');
  });
});