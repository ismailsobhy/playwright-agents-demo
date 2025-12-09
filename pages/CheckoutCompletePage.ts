import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  
  // Locators defined at the top
  readonly thankYouHeading: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators
    this.thankYouHeading = page.getByRole('heading', { name: /thank you for your order/i });
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  async isThankYouVisible(): Promise<boolean> {
    return (await this.thankYouHeading.count()) > 0;
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}