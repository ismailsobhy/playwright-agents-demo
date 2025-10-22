import { Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isThankYouVisible(): Promise<boolean> {
    return (await this.page.getByRole('heading', { name: /thank you for your order/i }).count()) > 0;
  }

  async backToProducts() {
    await this.page.locator('[data-test="back-to-products"]').click();
  }
}
