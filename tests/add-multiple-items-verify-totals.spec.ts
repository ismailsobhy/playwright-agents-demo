// spec: saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutInfoPage,
  CheckoutOverviewPage,
  CheckoutCompletePage,
} from '../pages';

test.describe('Add multiple items and verify totals (2 or more items)', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    // Navigate and login
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('Add multiple items and verify totals (2 or more items)', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const info = new CheckoutInfoPage(page);
    const overview = new CheckoutOverviewPage(page);
    const complete = new CheckoutCompletePage(page);

    // Add 3 items
    await inventory.addBackpack();
    await inventory.addBikeLight();
    await inventory.addBoltTshirt();

    // Verify badge shows 3
    const badge = await inventory.cartBadgeText();
    expect(badge).toBe('3');

    // Go to cart
    await inventory.openCart();

    // Verify 3 item prices present
    const cartItemPrices = await cart.getItemPrices();
    expect(cartItemPrices.length).toBe(3);

    // Checkout -> fill info -> continue
    await cart.clickCheckout();
    await info.fillInfo('Test', 'User', '12345');
    await info.continue();

    // Compute expected item total
    const parsePrice = (s: string) => parseFloat(s.replace(/[^0-9.]/g, ''));
    const priceNumbers = cartItemPrices.map(p => parsePrice(p));
    const expectedItemTotal = priceNumbers.reduce((a, b) => a + b, 0);

    const { itemTotal: itemTotalText, tax: taxText, total: totalText } = await overview.getSummaryText();

    const itemTotal = parsePrice(itemTotalText || '0');
    const tax = parsePrice(taxText || '0');
    const total = parsePrice(totalText || '0');

    expect(Math.abs(itemTotal - expectedItemTotal)).toBeLessThan(0.01);
    expect(tax).toBeGreaterThan(0);
    expect(Math.abs(itemTotal + tax - total)).toBeLessThan(0.01);

    // Finish
    await overview.finish();
    await expect(page.getByRole('heading', { name: /thank you for your order/i })).toBeVisible();

    await complete.backToProducts();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });
});
