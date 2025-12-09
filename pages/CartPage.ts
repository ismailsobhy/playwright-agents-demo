import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  
  // Locators defined at the top
  readonly cartItemPrices: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators
    this.cartItemPrices = page.locator('.cart_item .inventory_item_price');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getItemPrices(): Promise<string[]> {
    return this.cartItemPrices.allTextContents();
  }

  async removeByTestId(testId: string) {
    // Dynamic locators can stay in the method since they depend on parameters
    await this.page.locator(`[data-test="${testId}"]`).click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}