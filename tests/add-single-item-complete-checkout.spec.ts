// spec: saucedemo-checkout-test-plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutInfoPage,
  CheckoutOverviewPage,
  CheckoutCompletePage,
} from '../pages';

test.describe('Add a single item to cart and complete checkout (happy path)', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    // 1. Navigate to https://www.saucedemo.com
    await login.goto();

    // 2-4. Login
    await login.login('standard_user', 'secret_sauce');
  });

  test('Add a single item to cart and complete checkout (happy path)', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const info = new CheckoutInfoPage(page);
    const overview = new CheckoutOverviewPage(page);
    const complete = new CheckoutCompletePage(page);

    // 5. Add Backpack
    await inventory.addBackpack();

    // 6. Verify the cart badge increments to `1`.
    const badge = await inventory.cartBadgeText();
    expect(badge).toBe('1');

    // 7. Click the cart icon to go to the cart page.
    await inventory.openCart();

    // 8. Verify the added item appears and price
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    const cartItemPrice = page.locator('.cart_item .inventory_item_price');
    await expect(cartItemPrice).toHaveText('$29.99');

    // 9. Click Checkout.
    await cart.clickCheckout();

    // 10. Fill info
    await info.fillInfo('Test', 'User', '12345');

    // 11. Continue
    await info.continue();

    // 12. Verify overview items and totals
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    const overviewPrice = page.locator('.cart_item .inventory_item_price');
    await expect(overviewPrice).toHaveText('$29.99');

    const { itemTotal: itemTotalText, tax: taxText, total: totalText } = await overview.getSummaryText();

    const parsePrice = (s: string | null) => {
      if (!s) return 0;
      const m = s.match(/\$([0-9]+\.[0-9]{2})/);
      return m ? parseFloat(m[1]) : 0;
    };

    const itemTotal = parsePrice(itemTotalText);
    const tax = parsePrice(taxText);
    const total = parsePrice(totalText);

    expect(itemTotal).toBeGreaterThan(0);
    expect(tax).toBeGreaterThan(0);
    expect(Math.abs(itemTotal + tax - total)).toBeLessThan(0.01);

    // 13. Finish.
    await overview.finish();

    // 14. Verify completion page and cart cleared.
    await expect(page.getByRole('heading', { name: /thank you for your order/i })).toBeVisible();

    await complete.backToProducts();
    // cart badge should be absent or 0
    const maybeBadge = page.locator('.shopping_cart_badge');
    await expect(maybeBadge).toHaveCount(0);
  });
});
