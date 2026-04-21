import { test, expect } from '@playwright/test';
import { login } from '../../utils/loginHelper.js';

test.describe('Edit Customer Module - Regression', () => {

  test('TC022 - Blank, Character and Special characters in Customer ID', async ({ page }) => {
    test.setTimeout(120000);

    //Login and navigate to Edit Customer page
    await login(page);
    await page.getByRole('link', { name: 'Edit Customer' }).click();

    //Test 1 - Blank Customer ID - trigger blur to show inline error
    await page.focus('input[name="cusid"]');
    await page.locator('input[name="cusid"]').blur();
    await page.waitForTimeout(1000);
    await expect(page.locator('body')).toContainText('Customer ID is required');

    //Test 2 - Special characters in Customer ID
    await page.fill('input[name="cusid"]', '@#$%');
    await page.click('input[name="AccSubmit"]');
    await page.waitForTimeout(2000);
    await expect(page.locator('body')).toContainText('Special characters are not allowed');

    //Test 3 - Alphabets in Customer ID
    await page.fill('input[name="cusid"]', 'ABCDEF');
    await page.click('input[name="AccSubmit"]');
    await page.waitForTimeout(2000);
    await expect(page.locator('body')).toContainText('Characters are not allowed');
  });

});