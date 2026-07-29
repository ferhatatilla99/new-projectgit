const { test, expect } = require('@playwright/test');

test('login test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('ferhatatilla123@example.com');
    await page.locator('#userPassword').fill('1234567890000');
    await page.locator('#login').click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard');
});