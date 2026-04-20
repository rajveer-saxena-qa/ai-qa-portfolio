import { test, expect } from '@playwright/test';
import { login } from '../../utils/loginHelper.js';
import { criticalMenuItems } from '../../utils/menuItems.js';
test.describe('Homepage Module - Sanity', () => {
    test('TC008 - Validate critical menu items on Manager Homepage', async ({ page }) => {
        await login(page);
//validate critical left panel menu items
        for (const items of criticalMenuItems) {
        await expect(page.getByRole('link',{name: items})).toBeVisible();
        }
});
});