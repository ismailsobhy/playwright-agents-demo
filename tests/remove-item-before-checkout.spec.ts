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

test.describe('Remove an item from the cart before checkout', () => {
  test('Remove an item from the cart before checkout', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const info = new CheckoutInfoPage(page);
    const overview = new CheckoutOverviewPage(page);
    const complete = new CheckoutCompletePage(page);

    // Navigate and login
    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    // Add two items
    await inventory.addBackpack();
    await inventory.addBikeLight();

    // Open cart and remove Bike Light
    await inventory.openCart();
    await cart.removeByTestId('remove-sauce-labs-bike-light');

    // Verify cart badge decremented to 1
    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('1');

    // Checkout -> fill -> continue
    await cart.clickCheckout();
    await info.fillInfo('Test', 'User', '12345');
    await info.continue();

    // Verify overview lists only remaining item and totals match
    const overviewPrices = await overview.getOverviewItemPrices();
    expect(overviewPrices.length).toBe(1);
    const parsePrice = (s: string) => parseFloat(s.replace(/[^0-9.]/g, ''));
    const itemPrice = parsePrice(overviewPrices[0]);

    const { itemTotal: itemTotalText, tax: taxText, total: totalText } = await overview.getSummaryText();

    const itemTotal = parsePrice(itemTotalText || '0');
    const tax = parsePrice(taxText || '0');
    const total = parsePrice(totalText || '0');

    expect(Math.abs(itemTotal - itemPrice)).toBeLessThan(0.01);
    expect(Math.abs(itemTotal + tax - total)).toBeLessThan(0.01);

    // Finish and confirm
    await overview.finish();
    await expect(page.getByRole('heading', { name: /thank you for your order/i })).toBeVisible();

    await complete.backToProducts();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });
});
