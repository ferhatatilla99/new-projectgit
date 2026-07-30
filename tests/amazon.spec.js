const { test, expect } = require('@playwright/test');

test('login test', async ({ page }) => {
    await page.setContent(`
      <form id="login-form">
        <input id="userEmail" type="email" />
        <input id="userPassword" type="password" />
        <button id="login" type="submit">Login</button>
      </form>
      <script>
        document.getElementById('login-form').addEventListener('submit', function (event) {
          event.preventDefault();
          window.location.hash = '#/dashboard';
        });
      </script>
    `);
    await page.locator('#userEmail').fill('user@example.com');
    await page.locator('#userPassword').fill('123456');
    await page.locator('#login').click();
    await expect(page).toHaveURL(/#\/dashboard$/);
});