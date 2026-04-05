// spec: specs/greenkart.test.plan.md
// seed: tests/seed.spec.js

const { test, expect } = require('@playwright/test');

test.describe('Product Catalog and Cart Operations', () => {
  test('Add multiple products to cart and verify cart summary', async ({ page }) => {
    // Navigate to the GreenKart site for scenario 1.1: Add multiple products to cart and verify cart summary.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // Step 1: Search for 'Tomato' in the search box.
    await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).fill('Tomato');

    // Verify only 'Tomato - 1 Kg' product is visible after search.
    await expect(page.getByText('Tomato - 1 Kg')).toBeVisible();

    // Step 2: Increase quantity to 3 using the '+' button for Tomato.
    await page.getByText('Tomato - 1 Kg').filter({hasText:"+"}).click();
    await page.getByText('Tomato - 1 Kg').filter({hasText:"+"}).click();

    // Verify quantity spinbutton shows '3' for Tomato.
    await expect(page.getByRole('spinbutton')).toHaveValue('3');

    // Step 3: Click 'ADD TO CART' for Tomato.
    await page.getByRole('button', { name: 'ADD TO CART' }).click();

    // Step 4: Clear search to show all products.
    await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).fill('');

    // Step 4: Search for 'Brocolli' in the search box.
    await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).fill('Brocolli');

    // Increase quantity to 2 using the '+' button for Brocolli.
    await page.getByRole('link', { name: '+' }).click();

    // Verify quantity spinbutton shows '2' for Brocolli.
    await expect(page.getByRole('spinbutton')).toHaveValue('2');

    // Click 'ADD TO CART' for Brocolli (quantity 2).
    await page.getByRole('button', { name: 'ADD TO CART' }).click();

    // Step 5: Click on the 'Cart' link in the header.
    await page.getByRole('link', { name: 'Cart' }).click();

    // Cart page/modal displays both products with correct quantities and prices.
    await expect(page.getByText('Tomato - 1 Kg')).toBeVisible();
    await expect(page.getByText('3 Nos.')).toBeVisible();
    await expect(page.getByText('₹ 48')).toBeVisible();
    await expect(page.getByText('Brocolli - 1 Kg')).toBeVisible();
    await expect(page.getByText('2 Nos.')).toBeVisible();
    await expect(page.getByText('₹ 240')).toBeVisible();
  });
});
