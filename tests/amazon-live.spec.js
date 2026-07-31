const { test, expect } = require('@playwright/test');

test.describe('Amazon live search flow', () => {
  test.skip(!process.env.RUN_LIVE_AMAZON, 'Set RUN_LIVE_AMAZON=1 to run live Amazon tests');

  test('go to amazon, search milk, open a result', async ({ page }) => {
    await page.goto('https://www.amazon.com', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('#twotabsearchtextbox')).toBeVisible();
    await page.locator('#twotabsearchtextbox').fill('milk');
    await page.locator('#nav-search-submit-button').click();

    await expect(page).toHaveURL(/k=milk/i);
    const results = page.locator('[data-component-type="s-search-result"]');
    await expect(results.first()).toBeVisible();

    await results.first().locator('h2 a').first().click();
    await expect(page.locator('#productTitle')).toBeVisible();
    await expect(page.locator('#productTitle')).toHaveText(/.+/);
  });
});
