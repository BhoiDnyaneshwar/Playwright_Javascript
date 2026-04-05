const { test, expect } = require('@playwright/test');

test('@smoke @regression login to client application', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  await page.fill('#userEmail', 'dnyanumore97+rahulshetty@gmail.com');
  await page.fill('#userPassword', 'Dnyanu@123');
  await page.click('#login');

  const dashboardProduct = page.locator('h5 > b').first();
  await expect(dashboardProduct).toBeVisible({ timeout: 20000 });

  const productTitle = await dashboardProduct.textContent();
  expect(productTitle).toBeTruthy();

  await expect(page).toHaveURL(/dashboard/, { timeout: 20000 });
});
