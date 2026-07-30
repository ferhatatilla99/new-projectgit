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

test('counter increases when button is clicked', async ({ page }) => {
    await page.setContent(`
      <button id="increment">Click me</button>
      <p id="count">0</p>
      <script>
        const count = document.getElementById('count');
        document.getElementById('increment').addEventListener('click', function () {
          count.textContent = String(Number(count.textContent) + 1);
        });
      </script>
    `);

    await page.locator('#increment').click();
    await page.locator('#increment').click();
    await expect(page.locator('#count')).toHaveText('2');
});

test('text appears after clicking show button', async ({ page }) => {
    await page.setContent(`
      <button id="show">Show message</button>
      <p id="message" hidden>Welcome</p>
      <script>
        document.getElementById('show').addEventListener('click', function () {
          document.getElementById('message').hidden = false;
        });
      </script>
    `);

    await expect(page.locator('#message')).toBeHidden();
    await page.locator('#show').click();
    await expect(page.locator('#message')).toBeVisible();
    await expect(page.locator('#message')).toHaveText('Welcome');
});