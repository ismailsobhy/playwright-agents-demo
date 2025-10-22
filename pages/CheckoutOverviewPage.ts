import { Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getOverviewItemPrices(): Promise<string[]> {
    return this.page.locator('.cart_item .inventory_item_price').allTextContents();
  }

  async getSummaryText() {
    const itemTotal = await this.page.locator('.summary_subtotal_label').textContent();
    const tax = await this.page.locator('.summary_tax_label').textContent();
    const total = await this.page.locator('.summary_total_label').textContent();
    return { itemTotal, tax, total };
  }

  async finish() {
    await this.page.locator('[data-test="finish"]').click();
  }
}
