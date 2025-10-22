import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getItemPrices(): Promise<string[]> {
    return this.page.locator('.cart_item .inventory_item_price').allTextContents();
  }

  async removeByTestId(testId: string) {
    await this.page.locator(`[data-test="${testId}"]`).click();
  }

  async clickCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
