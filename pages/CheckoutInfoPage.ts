import { Page } from '@playwright/test';

export class CheckoutInfoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async continue() {
    await this.page.locator('[data-test="continue"]').click();
  }
}
