import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  
  // Locators defined at the top
  readonly cartItemPrices: Locator;
  readonly summarySubtotal: Locator;
  readonly summaryTax: Locator;
  readonly summaryTotal: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators
    this.cartItemPrices = page.locator('.cart_item .inventory_item_price');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTax = page.locator('.summary_tax_label');
    this.summaryTotal = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async getOverviewItemPrices(): Promise<string[]> {
    return this.cartItemPrices.allTextContents();
  }

  async getSummaryText() {
    const itemTotal = await this.summarySubtotal.textContent();
    const tax = await this.summaryTax.textContent();
    const total = await this.summaryTotal.textContent();
    return { itemTotal, tax, total };
  }

  async finish() {
    await this.finishButton.click();
  }
}